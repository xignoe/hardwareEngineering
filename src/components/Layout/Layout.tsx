import React from 'react';
import styles from './Layout.module.css';

export interface LayoutProps {
  children: React.ReactNode;
  className?: string;
}

export const Layout: React.FC<LayoutProps> = ({ children, className = '' }) => {
  return (
    <div className={`${styles.layout} ${className}`}>
      {/* Skip to main content link for screen readers */}
      <a href="#main-content" className={styles.skipLink}>
        Skip to main content
      </a>
      
      <div className={styles.container}>
        <main 
          id="main-content" 
          className={styles.main}
          role="main"
          aria-label="Hardware Engineering Study Guide"
          tabIndex={-1}
        >
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;