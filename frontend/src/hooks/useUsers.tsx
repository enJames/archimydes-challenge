import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { User, CreateUserData, UpdateUserData } from '../types/user';

// Remove custom ImportMeta and ImportMetaEnv interfaces; Vite provides these types globally.

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const fetchUsers = async (): Promise<User[]> => {
  const response = await fetch(`${API_BASE_URL}/users`);
  if (!response.ok) throw new Error('Failed to fetch users');
  return response.json();
};

const createUser = async (userData: CreateUserData): Promise<User> => {
  const response = await fetch(`${API_BASE_URL}/users`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  });
  if (!response.ok) throw new Error('Failed to create user');
  return response.json();
};

const updateUser = async (userData: UpdateUserData): Promise<User> => {
  const response = await fetch(`${API_BASE_URL}/users/${userData.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  });
  if (!response.ok) throw new Error('Failed to update user');
  return response.json();
};

const deleteUser = async (userId: string): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/users/${userId}`, { method: 'DELETE' });
  if (!response.ok) throw new Error('Failed to delete user');
};

// Custom hook
export const useUsers = () => {
  const queryClient = useQueryClient();

  const {
    data: users = [],
    isLoading,
    isError,
    error
  } = useQuery<User[]>({
    queryKey: ['users'],
    queryFn: fetchUsers
  });

  const createUserMutation = useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    }
  });

  const updateUserMutation = useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    }
  });

  const deleteUserMutation = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    }
  });

  return {
    users,
    isLoading,
    isError,
    error,
    createUser: createUserMutation.mutateAsync,
    updateUser: updateUserMutation.mutateAsync,
    deleteUser: deleteUserMutation.mutateAsync,
    isCreating: createUserMutation.isPending,
    isUpdating: updateUserMutation.isPending,
    isDeleting: deleteUserMutation.isPending,
  };
};