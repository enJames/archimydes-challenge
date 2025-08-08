import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import { UserModal } from './UserModal';
import { User, UserRole } from '../../types/user';

describe('UserModal', () => {
  const onClose = vi.fn();
  const onSubmit = vi.fn();
  const user: User = {
    id: '1',
    name: 'Alice',
    emailAddress: 'alice@example.com',
    role: UserRole.Admin
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('does not render when isOpen is false', () => {
    render(
      <UserModal isOpen={false} onClose={onClose} onSubmit={onSubmit} mode="create" />
    );
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('renders create mode with empty fields', () => {
    render(
      <UserModal isOpen={true} onClose={onClose} onSubmit={onSubmit} mode="create" />
    );
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByLabelText('NAME')).toHaveValue('');
    expect(screen.getByLabelText('EMAIL')).toHaveValue('');
    expect(screen.getByLabelText('ROLE')).toHaveValue('User');
    expect(screen.getByRole('button', { name: 'Create User' })).toBeInTheDocument();
  });

  it('renders edit mode with user data', () => {
    render(
      <UserModal isOpen={true} onClose={onClose} onSubmit={onSubmit} user={user} mode="edit" />
    );
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByLabelText('NAME')).toHaveValue('Alice');
    expect(screen.getByLabelText('EMAIL')).toHaveValue('alice@example.com');
    expect(screen.getByLabelText('ROLE')).toHaveValue('Admin');
    expect(screen.getByRole('button', { name: 'Update User' })).toBeInTheDocument();
  });

  it('calls onClose when overlay or back button is clicked', () => {
    render(
      <UserModal isOpen={true} onClose={onClose} onSubmit={onSubmit} mode="create" />
    );
    fireEvent.click(screen.getByRole('dialog').parentElement!); // overlay
    expect(onClose).toHaveBeenCalled();
  });

  it('calls onClose when cancel button is clicked', () => {
    render(
      <UserModal isOpen={true} onClose={onClose} onSubmit={onSubmit} mode="create" />
    );
    fireEvent.click(screen.getByText('Cancel'));
    expect(onClose).toHaveBeenCalled();
  });

  it('calls onSubmit with correct data in create mode', () => {
    render(
      <UserModal isOpen={true} onClose={onClose} onSubmit={onSubmit} mode="create" />
    );
    fireEvent.change(screen.getByLabelText('NAME'), { target: { value: 'Bob' } });
    fireEvent.change(screen.getByLabelText('EMAIL'), { target: { value: 'bob@example.com' } });
    fireEvent.change(screen.getByLabelText('ROLE'), { target: { value: 'Admin' } });
    fireEvent.click(screen.getByRole('button', { name: 'Create User' }));
    expect(onSubmit).toHaveBeenCalledWith({ name: 'Bob', emailAddress: 'bob@example.com', role: 'Admin' });
    expect(onClose).toHaveBeenCalled();
  });

  it('calls onSubmit with correct data in edit mode', () => {
    render(
      <UserModal isOpen={true} onClose={onClose} onSubmit={onSubmit} user={user} mode="edit" />
    );
    fireEvent.change(screen.getByLabelText('NAME'), { target: { value: 'Alice Updated' } });
    fireEvent.click(screen.getByRole('button', { name: 'Update User' }));
    expect(onSubmit).toHaveBeenCalledWith({ id: '1', name: 'Alice Updated', emailAddress: 'alice@example.com', role: UserRole.Admin });
    expect(onClose).toHaveBeenCalled();
  });
});
