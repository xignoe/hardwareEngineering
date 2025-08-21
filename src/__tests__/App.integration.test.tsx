import { render, screen, fireEvent, waitFor } from '@testing-library/react';
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

describe('App Integration Tests', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  describe('Navigation Flow', () => {
    it('should navigate from home to section view', async () => {
      render(<App />);
      
      await waitFor(() => {
        expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument();
      });

      // Click on Basic Circuits section
      const sectionCard = screen.getByTestId('section-list-card-basic-circuits');
      fireEvent.click(sectionCard);

      // Should show section view
      await waitFor(() => {
        expect(screen.getByText('Question 1')).toBeInTheDocument();
        expect(screen.getByText('What is Ohm\'s law?')).toBeInTheDocument();
      });
    });

    it('should navigate from section to individual question', async () => {
      render(<App />);
      
      await waitFor(() => {
        expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument();
      });

      // Navigate to section
      const sectionCard = screen.getByTestId('section-list-card-basic-circuits');
      fireEvent.click(sectionCard);

      await waitFor(() => {
        expect(screen.getByText('Question 1')).toBeInTheDocument();
      });

      // Click on first question
      const questionButtons = screen.getAllByTestId('question-button');
      fireEvent.click(questionButtons[0]);

      // Should show individual question view
      await waitFor(() => {
        expect(screen.getByText('What is Ohm\'s law?')).toBeInTheDocument();
        expect(screen.getByText(/Ohm's law states that the current/)).toBeInTheDocument();
      });
    });

    it('should navigate between questions using navigation controls', async () => {
      render(<App />);
      
      await waitFor(() => {
        expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument();
      });

      // Navigate to section and first question
      const sectionCard = screen.getByTestId('section-list-card-basic-circuits');
      fireEvent.click(sectionCard);

      await waitFor(() => {
        expect(screen.getByText('Question 1')).toBeInTheDocument();
      });

      const questionButtons = screen.getAllByTestId('question-button');
      fireEvent.click(questionButtons[0]);

      await waitFor(() => {
        expect(screen.getByText('What is Ohm\'s law?')).toBeInTheDocument();
      });

      // Click next button
      const nextButton = screen.getByRole('button', { name: /next/i });
      fireEvent.click(nextButton);

      // Should show second question
      await waitFor(() => {
        expect(screen.getByText("Conceptually explain Ohm's law")).toBeInTheDocument();
      });
    });
  });

  describe('Error Handling', () => {
    it('should handle navigation errors gracefully', async () => {
      render(<App />);
      
      await waitFor(() => {
        expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument();
      });

      // App should load successfully
      expect(screen.getByText('Hardware Engineering Study Guide')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('should have proper ARIA labels and roles', async () => {
      render(<App />);
      
      await waitFor(() => {
        expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument();
      });

      // Check for main landmark
      expect(screen.getByRole('main')).toBeInTheDocument();
      
      // Check for proper heading hierarchy
      expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
    });

    it('should support keyboard navigation', async () => {
      render(<App />);
      
      await waitFor(() => {
        expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument();
      });

      // Section cards should be focusable
      const sectionCard = screen.getByTestId('section-list-card-basic-circuits');
      expect(sectionCard).toBeInTheDocument();
      
      // Focus the section card
      sectionCard.focus();
      expect(document.activeElement).toBe(sectionCard);
    });
  });

  describe('Complete User Flow', () => {
    it('should support complete study session flow', async () => {
      render(<App />);
      
      await waitFor(() => {
        expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument();
      });

      // 1. Start at home
      expect(screen.getByText('Hardware Engineering Study Guide')).toBeInTheDocument();

      // 2. Select a section
      const sectionCard = screen.getByTestId('section-list-card-basic-circuits');
      fireEvent.click(sectionCard);

      await waitFor(() => {
        expect(screen.getByText('Question 1')).toBeInTheDocument();
      });

      // 3. Select first question
      const questionButtons = screen.getAllByTestId('question-button');
      fireEvent.click(questionButtons[0]);

      await waitFor(() => {
        expect(screen.getByText('What is Ohm\'s law?')).toBeInTheDocument();
      });

      // 4. Navigate through questions
      const nextButton = screen.getByRole('button', { name: /next/i });
      fireEvent.click(nextButton);

      await waitFor(() => {
        expect(screen.getByText("Conceptually explain Ohm's law")).toBeInTheDocument();
      });

      // 5. Go back to previous question
      const prevButton = screen.getByRole('button', { name: /previous/i });
      fireEvent.click(prevButton);

      await waitFor(() => {
        expect(screen.getByText('What is Ohm\'s law?')).toBeInTheDocument();
      });
    });
  });
});