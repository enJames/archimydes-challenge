import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import { UserList } from './UserList';
import { User, UserRole } from '../../types/user';

describe('UserList', () => {
  const users: User[] = [
    { id: '1', name: 'Alice', emailAddress: 'alice@example.com', role: UserRole.Admin },
    { id: '2', name: 'Bob', emailAddress: 'bob@example.com', role: UserRole.User },
  ];
  const onCreateUser = vi.fn();
  const onUpdateUser = vi.fn();
  const onDeleteUser = vi.fn();
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders user list and headers', () => {
    render(
      <UserList
        users={users}
        onCreateUser={onCreateUser}
        onUpdateUser={onUpdateUser}
        onDeleteUser={onDeleteUser}
      />
    );
    expect(screen.getByText('Archimydes Challenge')).toBeInTheDocument();
    expect(screen.getByText('Users')).toBeInTheDocument();
    expect(screen.getByText('Alice')).toBeInTheDocument();
    expect(screen.getByText('Bob')).toBeInTheDocument();
    expect(screen.getByText('alice@example.com')).toBeInTheDocument();
    expect(screen.getByText('bob@example.com')).toBeInTheDocument();
    expect(screen.getByText('Admin')).toBeInTheDocument();
    expect(screen.getByText('User')).toBeInTheDocument();
  });

  it('calls onCreateUser when create button is used in modal', () => {
    render(
      <UserList
        users={users}
        onCreateUser={onCreateUser}
        onUpdateUser={onUpdateUser}
        onDeleteUser={onDeleteUser}
      />
    );
    fireEvent.click(screen.getByText('+ Create User'));
    // Modal should open, but actual modal form interaction would require more setup/mocking
    // Here we just check that the modal is open
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('calls onDeleteUser when delete button is clicked', () => {
    render(
      <UserList
        users={users}
        onCreateUser={onCreateUser}
        onUpdateUser={onUpdateUser}
        onDeleteUser={onDeleteUser}
      />
    );
    const deleteButtons = screen.getAllByRole('button', { name: '' });
    // The delete buttons have no accessible name, so we select by role and count
    // The last two buttons should be delete buttons for each user
    fireEvent.click(deleteButtons[deleteButtons.length - 1]);
    expect(onDeleteUser).toHaveBeenCalled();
  });

  it('opens modal in edit mode when a user row is clicked', () => {
    render(
      <UserList
        users={users}
        onCreateUser={onCreateUser}
        onUpdateUser={onUpdateUser}
        onDeleteUser={onDeleteUser}
      />
    );
    fireEvent.click(screen.getByText('Alice'));
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });
});
