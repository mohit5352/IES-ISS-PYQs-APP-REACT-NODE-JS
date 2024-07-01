import React from 'react';
import './Snackbar.css'

interface SnackbarProps {
  message: string | null;
  onClose: () => void;
  type: 'success' | 'error' | '';
}

const Snackbar: React.FC<SnackbarProps> = ({ message, onClose, type }) => {
  const snackbarClass = type === 'success' ? 'snackbar-container success' : 'snackbar-container error';

  return (
    <div className={snackbarClass}>
      <span>{message}</span>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default Snackbar;