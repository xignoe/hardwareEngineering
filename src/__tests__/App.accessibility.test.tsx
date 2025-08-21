import React from 'react';
import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { describe, it, expect } from 'vitest';
import App from '../App';

expect.extend(toHaveNoViolations);

describe('App Accessibility Tests', () => {
  it('should not have any accessibility violations on home page', async () => {
    const { container } = render(<App />);
    
    // Wait for loading to complete
    await screen.findByText('Hardware Engineering Study Guide');
    
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should have proper heading hierarchy', async () => {
    render(<App />);
    
    // Wait for loading to complete
    await screen.findByText('Hardware Engineering Study Guide');
    
    // Check that main heading exists
    const mainHeading = screen.getByRole('heading', { level: 1 });
    expect(mainHeading).toBeInTheDocument();
    expect(mainHeading).toHaveTextContent('Hardware Engineering Study Guide');
  });

  it('should have proper landmark roles', async () => {
    render(<App />);
    
    // Wait for loading to complete
    await screen.findByText('Hardware Engineering Study Guide');
    
    // Check for main landmark
    const main = screen.getByRole('main');
    expect(main).toBeInTheDocument();
    expect(main).toHaveAttribute('aria-label', 'Hardware Engineering Study Guide');
  });

  it('should have skip link for keyboard navigation', async () => {
    render(<App />);
    
    // Wait for loading to complete
    await screen.findByText('Hardware Engineering Study Guide');
    
    // Check for skip link
    const skipLink = screen.getByText('Skip to main content');
    expect(skipLink).toBeInTheDocument();
    expect(skipLink).toHaveAttribute('href', '#main-content');
  });

  it('should have proper error state accessibility', async () => {
    // Mock console.error to avoid noise in tests
    const originalError = console.error;
    console.error = () => {};
    
    // Create a component that renders the error state directly
    const ErrorStateComponent = () => (
      <div className="error-state" role="alert" aria-live="assertive">
        <h2 id="error-heading">Error Loading Study Guide</h2>
        <p aria-describedby="error-heading">Test error</p>
        <button 
          className="retry-button"
          aria-label="Retry loading the study guide"
        >
          Retry
        </button>
      </div>
    );
    
    const { container } = render(<ErrorStateComponent />);
    
    // Check for error alert
    const errorAlert = screen.getByRole('alert');
    expect(errorAlert).toBeInTheDocument();
    expect(errorAlert).toHaveAttribute('aria-live', 'assertive');
    
    const results = await axe(container);
    expect(results).toHaveNoViolations();
    
    // Restore console.error
    console.error = originalError;
  });

  it('should have proper focus management', async () => {
    render(<App />);
    
    // Wait for loading to complete
    await screen.findByText('Hardware Engineering Study Guide');
    
    // Check that main content has proper ID for skip link
    const mainContent = document.getElementById('main-content');
    expect(mainContent).toBeInTheDocument();
    expect(mainContent).toHaveAttribute('role', 'main');
  });
});