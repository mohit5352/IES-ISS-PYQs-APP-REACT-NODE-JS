// ErrorDisplay.tsx
import React from 'react';

interface Props {
  error: string;
}

const ErrorDisplay: React.FC<Props> = ({ error }) => {
  return (
    <div className="error-display">
      <p>{error}</p>
    </div>
  );
};

export default ErrorDisplay;
