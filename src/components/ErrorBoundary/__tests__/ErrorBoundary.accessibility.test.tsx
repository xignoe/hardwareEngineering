/**
 * ErrorBoundary Accessibility Tests
 */

import React from 'react';
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { describe, it, expect, vi } from 'vitest';
import { ErrorBoundary } from '../ErrorBoundary';

expect.extend(toHaveNoViolations);

// Component that throws an error for testing
const ThrowError: React.FC = () => {
  throw new Error('Test error for accessibility testing');
};

describe('ErrorBoundary Accessibility Tests', () => {
  // Suppress console.error for these tests
  const originalError = console.error;
  beforeEach(() => {
    console.error = vi.fn();
  });

  afterEach(() => {
    console.error = originalError;
  });

  it('should not have accessibility violations in error state', async () => {
    const { container } = render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    );
    
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should not have accessibility violations in normal state', async () => {
    const { container } = render(
      <ErrorBoundary>
        <div>Normal content</div>
      </ErrorBoundary>
    );
    
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});