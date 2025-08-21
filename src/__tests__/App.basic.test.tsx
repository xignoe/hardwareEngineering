import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import App from '../App';

// Mock console.error to avoid noise in tests
const originalConsoleError = console.error;
beforeEach(() => {
  console.error = vi.fn();
});

afterEach(() => {
  console.error = originalConsoleError;
});

describe('App Basic Tests', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should render the app without crashing', async () => {
    render(<App />);
    
    // Should show loading initially
    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
    
    // Wait for loading to complete
    await waitFor(() => {
      expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument();
    });

    // Should show the home page
    expect(screen.getByText('Hardware Engineering Study Guide')).toBeInTheDocument();
  });

  it('should display the section list', async () => {
    render(<App />);
    
    await waitFor(() => {
      expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument();
    });

    expect(screen.getByText('Basic Circuits')).toBeInTheDocument();
    expect(screen.getByText('6 questions')).toBeInTheDocument();
  });
});  
it('should navigate to section view when section is clicked', async () => {
    render(<App />);
    
    await waitFor(() => {
      expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument();
    });

    // Click on Basic Circuits section
    const sectionCard = screen.getByTestId('section-list-card-basic-circuits');
    fireEvent.click(sectionCard);

    // Should show section view with questions
    await waitFor(() => {
      expect(screen.getByText('Question 1')).toBeInTheDocument();
      expect(screen.getByText('What is Ohm\'s law?')).toBeInTheDocument();
    });
  });

  it('should navigate to individual question when question is clicked', async () => {
    render(<App />);
    
    await waitFor(() => {
      expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument();
    });

    // If we're already in section view, great! Otherwise navigate to section
    if (!screen.queryByText('Question 1')) {
      const sectionCard = screen.getByTestId('section-list-card-basic-circuits');
      fireEvent.click(sectionCard);

      await waitFor(() => {
        expect(screen.getByText('Question 1')).toBeInTheDocument();
      });
    }

    // Click on first question
    const questionButtons = screen.getAllByTestId('question-button');
    fireEvent.click(questionButtons[0]);

    // Should show individual question view
    await waitFor(() => {
      expect(screen.getByText('What is Ohm\'s law?')).toBeInTheDocument();
      expect(screen.getByText(/Ohm's law states that the current/)).toBeInTheDocument();
    });
  });

  it('should have proper accessibility features', async () => {
    render(<App />);
    
    await waitFor(() => {
      expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument();
    });

    // Check for main landmark
    expect(screen.getByRole('main')).toBeInTheDocument();
    
    // Check for proper heading hierarchy (could be h1, h2, or h3 depending on view)
    const headings = screen.getAllByRole('heading');
    expect(headings.length).toBeGreaterThan(0);

    // Check if we have section cards (home view) or question buttons (section view)
    const sectionCard = screen.queryByTestId('section-list-card-basic-circuits');
    const questionButtons = screen.queryAllByTestId('question-button');
    
    if (sectionCard) {
      // We're in home view - test section card focus
      sectionCard.focus();
      expect(document.activeElement).toBe(sectionCard);
    } else if (questionButtons.length > 0) {
      // We're in section view - test question button focus
      questionButtons[0].focus();
      expect(document.activeElement).toBe(questionButtons[0]);
    }
  });