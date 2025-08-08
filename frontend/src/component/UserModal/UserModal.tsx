import { useState, useEffect } from 'react';
import './UserModal.css';
import { CreateUserData, UpdateUserData, User, UserRole } from '../../types/user';

interface UserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (userData: CreateUserData | UpdateUserData) => void;
  user?: User | null;
  mode: 'create' | 'edit';
}

export const UserModal = ({ isOpen, onClose, onSubmit, user, mode }: UserModalProps) => {
  const [formData, setFormData] = useState({
    name: '',
    emailAddress: '',
    role: UserRole.User
  });

  useEffect(() => {
    if (user && mode === 'edit') {
      setFormData({
        name: user.name,
        emailAddress: user.emailAddress,
        role: user.role
      });
    } else {
      setFormData({
        name: '',
        emailAddress: '',
        role: UserRole.User
      });
    }
  }, [user, mode, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === 'edit' && user) {
      onSubmit({ ...formData, id: user.id });
    } else {
      onSubmit(formData);
    }
    onClose();
  };

  const handleCancel = () => {
    onClose();
    setFormData({
      name: '',
      emailAddress: '',
      role: UserRole.User
    });
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" role="dialog" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title-row">
            <button
              onClick={onClose}
              className="back-button"
            >
              <svg className="back-icon" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
            </button>
            <h2 className="modal-title">
              {mode === 'create' ? 'Create User' : 'Update User'}
            </h2>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label htmlFor="name" className="form-label">
              NAME
            </label>
            <input
              id="name"
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="John Doe"
              required
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email" className="form-label">
              EMAIL
            </label>
            <input
              id="email"
              type="email"
              value={formData.emailAddress}
              onChange={(e) => setFormData({ ...formData, emailAddress: e.target.value })}
              placeholder="johndoe@email.com"
              required
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="role" className="form-label">
              ROLE
            </label>
            <select
              id="role"
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value as UserRole })}
              className="form-select"
            >
              <option value="User">User</option>
              <option value="Admin">Admin</option>
            </select>
          </div>

          <div className="button-group">
            <button type="button" onClick={handleCancel} className="cancel-button">
              Cancel
            </button>
            <button type="submit" className="submit-button">
              {mode === 'create' ? 'Create User' : 'Update User'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};