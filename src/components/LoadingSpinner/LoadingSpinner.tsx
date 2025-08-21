import React from 'react';
import styles from './LoadingSpinner.module.css';

export interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large';
  message?: string;
  className?: string;
  'data-testid'?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'medium',
  message = 'Loading...',
  className = '',
  'data-testid': testId = 'loading-spinner'
}) => {
  return (
    <div 
      className={`${styles.loadingContainer} ${className}`}
      data-testid={testId}
      role="status"
      aria-live="polite"
    >
      <div className={`${styles.spinner} ${styles[size]}`} aria-hidden="true">
        <div className={styles.spinnerInner}></div>
      </div>
      {message && (
        <p className={styles.loadingMessage} aria-label={message}>
          {message}
        </p>
      )}
    </div>
  );
};

export default LoadingSpinner;