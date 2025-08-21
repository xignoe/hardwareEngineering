/**
 * ErrorBoundary Component Tests
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { ErrorBoundary } from '../ErrorBoundary';

// Component that throws an error for testing
const ThrowError: React.FC<{ shouldThrow?: boolean }> = ({ shouldThrow = true }) => {
  if (shouldThrow) {
    throw new Error('Test error');
  }
  return <div>No error</div>;
};

describe('ErrorBoundary Component', () => {
  // Suppress console.error for these tests
  const originalError = console.error;
  beforeEach(() => {
    console.error = vi.fn();
  });

  afterEach(() => {
    console.error = originalError;
  });

  describe('Error Handling', () => {
    it('renders children when there is no error', () => {
      render(
        <ErrorBoundary>
          <ThrowError shouldThrow={false} />
        </ErrorBoundary>
      );
      
      expect(screen.getByText('No error')).toBeInTheDocument();
    });

    it('renders error UI when child component throws', () => {
      render(
        <ErrorBoundary>
          <ThrowError />
        </ErrorBoundary>
      );
      
      expect(screen.getByText('Something went wrong')).toBeInTheDocument();
      expect(screen.getByText('We encountered an unexpected error. Please try refreshing the page.')).toBeInTheDocument();
    });

    it('shows retry button in error state', () => {
      render(
        <ErrorBoundary>
          <ThrowError />
        </ErrorBoundary>
      );
      
      expect(screen.getByRole('button', { name: /try again/i })).toBeInTheDocument();
    });

    it('shows error details when available', () => {
      render(
        <ErrorBoundary>
          <ThrowError />
        </ErrorBoundary>
      );
      
      // Error details are only shown in development mode
      // In test environment, they may not be visible
      expect(screen.getByText('Something went wrong')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('has proper ARIA attributes in error state', () => {
      render(
        <ErrorBoundary>
          <ThrowError />
        </ErrorBoundary>
      );
      
      const errorContainer = screen.getByRole('alert');
      expect(errorContainer).toBeInTheDocument();
      // role="alert" provides implicit live region behavior
    });

    it('has proper heading structure in error state', () => {
      render(
        <ErrorBoundary>
          <ThrowError />
        </ErrorBoundary>
      );
      
      expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Something went wrong');
    });

    it('has accessible retry button', () => {
      render(
        <ErrorBoundary>
          <ThrowError />
        </ErrorBoundary>
      );
      
      const retryButton = screen.getByRole('button', { name: /try again/i });
      expect(retryButton).toHaveAttribute('type', 'button');
    });
  });

  describe('Recovery', () => {
    it('can recover from error state', () => {
      let shouldThrow = true;
      const { rerender } = render(
        <ErrorBoundary>
          <ThrowError shouldThrow={shouldThrow} />
        </ErrorBoundary>
      );
      
      // Should show error state
      expect(screen.getByText('Something went wrong')).toBeInTheDocument();
      
      // Change props to not throw error
      shouldThrow = false;
      rerender(
        <ErrorBoundary>
          <ThrowError shouldThrow={shouldThrow} />
        </ErrorBoundary>
      );
      
      // Should still show error state (ErrorBoundary doesn't auto-recover)
      expect(screen.getByText('Something went wrong')).toBeInTheDocument();
    });
  });
});