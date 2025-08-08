// Ensure env is set BEFORE importing the hook so the compiled constant picks it up (if not statically inlined in tests)
// @ts-ignore
(import.meta as any).env = { ...(import.meta as any).env, VITE_API_BASE_URL: (import.meta as any).env?.VITE_API_BASE_URL || '/api' };

import { renderHook, act, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { vi } from 'vitest';
import React from 'react';
import { UserRole } from '../types/user';
import { useUsers } from './useUsers';

// Helper to extract pathname (works for relative or absolute)
const getPath = (url: RequestInfo | URL) => {
  const s = url.toString();
  try { return new URL(s).pathname; } catch { return s.startsWith('http') ? s : s; }
};

const initialUsers = [
  { id: '1', name: 'Michael Johnson', emailAddress: 'michael@example.com', role: UserRole.Admin },
  { id: '2', name: 'Sarah Williams', emailAddress: 'sarah@example.com', role: UserRole.User },
];

// Wrapper factory (new client each test for isolation)
const createWrapper = () => {
  const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

// Base-agnostic fetch mock: only cares about trailing /users or /users/:id
function mockFetch(options: { getSequence: any[]; post?: any; put?: any; del?: any }) {
  const { getSequence, post, put, del } = options;
  const sequence = [...getSequence];
  const terminal = sequence[sequence.length - 1];
  (global.fetch as any) = vi.fn((url: RequestInfo | URL, init?: RequestInit) => {
    const method = (init?.method || 'GET').toUpperCase();
    const path = getPath(url);

    const isUsersRoot = /\/users$/.test(path);
    const userIdMatch = path.match(/\/users\/([^/]+)$/);

    if (isUsersRoot && method === 'GET') {
      const next = sequence.length > 0 ? sequence.shift() : terminal;
      return Promise.resolve({ ok: true, json: async () => next });
    }
    if (isUsersRoot && method === 'POST') {
      return Promise.resolve({ ok: true, json: async () => post });
    }
    if (userIdMatch && method === 'PUT') {
      return Promise.resolve({ ok: true, json: async () => put });
    }
    if (userIdMatch && method === 'DELETE') {
      return Promise.resolve({ ok: true, json: async () => del ?? {} });
    }
    return Promise.reject(new Error(`Unexpected fetch call: ${url}`));
  });
}

describe('useUsers', () => {
  afterEach(() => vi.restoreAllMocks());

  it('loads users', async () => {
    mockFetch({ getSequence: [initialUsers] });
    const { result } = renderHook(() => useUsers(), { wrapper: createWrapper() });
    await waitFor(() => expect(result.current.isLoading).toBe(false));
    expect(result.current.users).toHaveLength(2);
    expect((fetch as any).mock.calls).toHaveLength(1);
    expect((fetch as any).mock.calls.map((c: any) => (c[1]?.method || 'GET'))).toEqual(['GET']);
  });

  it('creates user', async () => {
    const newUser = { id: '3', name: 'New User', emailAddress: 'new@example.com', role: UserRole.User };
    mockFetch({ getSequence: [initialUsers, [...initialUsers, newUser]], post: newUser });
    const { result } = renderHook(() => useUsers(), { wrapper: createWrapper() });
    await waitFor(() => expect(result.current.isLoading).toBe(false));
    await act(async () => {
      await result.current.createUser({ name: newUser.name, emailAddress: newUser.emailAddress, role: newUser.role });
    });
    await waitFor(() => expect(result.current.users).toHaveLength(3));
    expect(result.current.users.find(u => u.id === '3')?.name).toBe('New User');
    expect((fetch as any).mock.calls.map((c: any) => (c[1]?.method || 'GET'))).toEqual(['GET', 'POST', 'GET']);
  });

  it('updates user', async () => {
    const updated = { id: '1', name: 'Updated Name', emailAddress: 'updated@example.com', role: UserRole.Admin };
    mockFetch({ getSequence: [initialUsers, [updated, initialUsers[1]]], put: updated });
    const { result } = renderHook(() => useUsers(), { wrapper: createWrapper() });
    await waitFor(() => expect(result.current.isLoading).toBe(false));
    await act(async () => { await result.current.updateUser(updated); });
    await waitFor(() => expect(result.current.users[0].name).toBe('Updated Name'));
    expect(result.current.users[0].emailAddress).toBe('updated@example.com');
    expect((fetch as any).mock.calls.map((c: any) => (c[1]?.method || 'GET'))).toEqual(['GET', 'PUT', 'GET']);
  });

  it('deletes user', async () => {
    mockFetch({ getSequence: [initialUsers, [initialUsers[1]]], del: {} });
    const { result } = renderHook(() => useUsers(), { wrapper: createWrapper() });
    await waitFor(() => expect(result.current.isLoading).toBe(false));
    await act(async () => { await result.current.deleteUser('1'); });
    await waitFor(() => expect(result.current.users).toHaveLength(1));
    expect(result.current.users[0].id).toBe('2');
    expect((fetch as any).mock.calls.map((c: any) => (c[1]?.method || 'GET'))).toEqual(['GET', 'DELETE', 'GET']);
  });
});
