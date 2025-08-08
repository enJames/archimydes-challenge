import { useState } from 'react';
import { User, CreateUserData, UpdateUserData } from '@/types/user';
import { UserModal } from '../UserModal/UserModal';
import './UserList.css';

interface UserListProps {
  users: User[];
  onCreateUser: (userData: CreateUserData) => void;
  onUpdateUser: (userData: UpdateUserData) => void;
  onDeleteUser: (userId: string) => void;
}

export const UserList = ({ users, onCreateUser, onUpdateUser, onDeleteUser }: UserListProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const handleCreateUser = () => {
    setModalMode('create');
    setSelectedUser(null);
    setIsModalOpen(true);
  };

  const handleEditUser = (user: User) => {
    setModalMode('edit');
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleModalSubmit = (userData: CreateUserData | UpdateUserData) => {
    if (modalMode === 'create') {
      onCreateUser(userData as CreateUserData);
    } else {
      onUpdateUser(userData as UpdateUserData);
    }
  };

  return (
    <div className="user-list-container">
      <div className="user-list-wrapper">
        <div className="header-section">
          <h1 className="main-title">Archimydes Challenge</h1>

          <div className="users-header">
            <h2 className="users-title">Users</h2>
            <button
              onClick={handleCreateUser}
              className="create-button"
            >
              + Create User
            </button>
          </div>

          <div className="table-container">
            <table className="users-table">
              <thead className="table-header">
                <tr>
                  <th>NAME</th>
                  <th>
                    <div className="header-with-icon">
                      EMAIL
                      <svg className="chevron-icon" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </th>
                  <th>
                    <div className="header-with-icon">
                      ROLE
                      <svg className="chevron-icon" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </th>
                  <th>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr
                    key={user.id}
                    className="table-row"
                    onClick={() => handleEditUser(user)}
                  >
                    <td className="table-cell name">
                      {user.name}
                    </td>
                    <td className="table-cell email">
                      {user.emailAddress}
                    </td>
                    <td className="table-cell role">
                      {user.role}
                    </td>
                    <td className="table-cell">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onDeleteUser(user.id);
                        }}
                        className="delete-button"
                      >
                        <svg className="delete-icon" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <UserModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleModalSubmit}
        user={selectedUser}
        mode={modalMode}
      />
    </div>
  );
};