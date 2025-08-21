/**
 * LoadingSpinner Accessibility Tests
 */

import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { describe, it, expect } from 'vitest';
import { LoadingSpinner } from '../LoadingSpinner';

expect.extend(toHaveNoViolations);

describe('LoadingSpinner Accessibility Tests', () => {
  it('should not have any accessibility violations', async () => {
    const { container } = render(<LoadingSpinner />);
    
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should not have accessibility violations with custom message', async () => {
    const { container } = render(<LoadingSpinner message="Loading study guide..." />);
    
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should not have accessibility violations with different sizes', async () => {
    const { container } = render(<LoadingSpinner size="large" />);
    
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});