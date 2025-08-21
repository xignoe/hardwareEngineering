/**
 * End-to-End Tests for Critical User Paths
 * Tests complete user journeys through the application
 */

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import App from '../App';

// Mock console.error to avoid noise in tests
const originalConsoleError = console.error;
beforeEach(() => {
  console.error = vi.fn();
  localStorage.clear();
});

afterEach(() => {
  console.error = originalConsoleError;
});

describe('End-to-End User Journey Tests', () => {
  describe('Complete Study Session Flow', () => {
    it('should support a complete study session from start to finish', async () => {
      render(<App />);
      
      // Wait for app to load
      await waitFor(() => {
        expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument();
      });

      // Step 1: User arrives at home page
      expect(screen.getByText('Hardware Engineering Study Guide')).toBeInTheDocument();
      expect(screen.getByText('Basic Circuits')).toBeInTheDocument();
      expect(screen.getByText('6 questions')).toBeInTheDocument();

      // Step 2: User selects a study section
      const sectionCard = screen.getByTestId('section-list-card-basic-circuits');
      fireEvent.click(sectionCard);

      // Step 3: User sees section overview with all questions
      await waitFor(() => {
        expect(screen.getByText('Question 1')).toBeInTheDocument();
        expect(screen.getByText('What is Ohm\'s law?')).toBeInTheDocument();
      });

      // Verify all 6 questions are visible
      const questionButtons = screen.getAllByTestId('question-button');
      expect(questionButtons).toHaveLength(6);

      // Step 4: User selects first question
      fireEvent.click(questionButtons[0]);

      // Step 5: User views question and answer
      await waitFor(() => {
        expect(screen.getByText('What is Ohm\'s law?')).toBeInTheDocument();
        expect(screen.getByText(/Ohm's law states that the current/)).toBeInTheDocument();
      });

      // Step 6: User navigates to next question
      const nextButton = screen.getByRole('button', { name: /next/i });
      fireEvent.click(nextButton);

      await waitFor(() => {
        expect(screen.getByText("Conceptually explain Ohm's law")).toBeInTheDocument();
      });

      // Step 7: User navigates back to previous question
      const prevButton = screen.getByRole('button', { name: /previous/i });
      fireEvent.click(prevButton);

      await waitFor(() => {
        expect(screen.getByText('What is Ohm\'s law?')).toBeInTheDocument();
      });

      // Step 8: User jumps to a specific question using dropdown
      const questionSelect = screen.getByLabelText('Select a question in this section to navigate to');
      fireEvent.change(questionSelect, { target: { value: 'bc-003' } });

      await waitFor(() => {
        expect(screen.getByText(/What are some basic circuit analysis laws/)).toBeInTheDocument();
      });

      // Step 9: User returns to section overview
      const breadcrumbSection = screen.getByLabelText('Go to Basic Circuits section');
      fireEvent.click(breadcrumbSection);

      await waitFor(() => {
        expect(screen.getByText('Question 1')).toBeInTheDocument();
        expect(screen.getAllByTestId('question-button')).toHaveLength(6);
      });

      // Step 10: User returns to home
      const breadcrumbHome = screen.getByLabelText('Go to sections overview');
      fireEvent.click(breadcrumbHome);

      await waitFor(() => {
        expect(screen.getByText('Hardware Engineering Study Guide')).toBeInTheDocument();
        expect(screen.getByText('Basic Circuits')).toBeInTheDocument();
      });
    });

    it('should maintain state persistence across navigation', async () => {
      render(<App />);
      
      await waitFor(() => {
        expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument();
      });

      // Navigate to a specific question
      const sectionCard = screen.getByTestId('section-list-card-basic-circuits');
      fireEvent.click(sectionCard);

      await waitFor(() => {
        expect(screen.getByText('Question 1')).toBeInTheDocument();
      });

      const questionButtons = screen.getAllByTestId('question-button');
      fireEvent.click(questionButtons[2]); // Third question

      await waitFor(() => {
        expect(screen.getByText(/What are some basic circuit analysis laws/)).toBeInTheDocument();
      });

      // Verify localStorage was updated
      const savedState = localStorage.getItem('hardware-study-guide-state');
      expect(savedState).toBeTruthy();
      
      const parsedState = JSON.parse(savedState!);
      expect(parsedState.currentSection).toBe('basic-circuits');
      expect(parsedState.currentQuestion).toBe('bc-003');
    });
  });

  describe('Accessibility User Journey', () => {
    it('should support complete keyboard navigation', async () => {
      render(<App />);
      
      await waitFor(() => {
        expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument();
      });

      // Test keyboard navigation on section cards
      const sectionCard = screen.getByTestId('section-list-card-basic-circuits');
      sectionCard.focus();
      expect(document.activeElement).toBe(sectionCard);

      // Simulate Enter key press
      fireEvent.keyDown(sectionCard, { key: 'Enter' });

      await waitFor(() => {
        expect(screen.getByText('Question 1')).toBeInTheDocument();
      });

      // Test keyboard navigation on question buttons
      const questionButtons = screen.getAllByTestId('question-button');
      questionButtons[0].focus();
      expect(document.activeElement).toBe(questionButtons[0]);

      // Simulate Enter key press on question
      fireEvent.keyDown(questionButtons[0], { key: 'Enter' });

      await waitFor(() => {
        expect(screen.getByText('What is Ohm\'s law?')).toBeInTheDocument();
      });

      // Test keyboard navigation on navigation buttons
      const nextButton = screen.getByRole('button', { name: /next/i });
      nextButton.focus();
      expect(document.activeElement).toBe(nextButton);
    });

    it('should provide proper screen reader experience', async () => {
      render(<App />);
      
      await waitFor(() => {
        expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument();
      });

      // Check for proper landmarks
      expect(screen.getByRole('main')).toBeInTheDocument();
      expect(screen.getByRole('main')).toHaveAttribute('aria-label', 'Hardware Engineering Study Guide');

      // Check for proper heading hierarchy
      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Hardware Engineering Study Guide');

      // Navigate to section and check ARIA attributes
      const sectionCard = screen.getByTestId('section-list-card-basic-circuits');
      expect(sectionCard).toHaveAttribute('aria-label', 'Study section: Basic Circuits (6 questions)');
      
      fireEvent.click(sectionCard);

      await waitFor(() => {
        expect(screen.getByText('Question 1')).toBeInTheDocument();
      });

      // Check question buttons have proper ARIA
      const questionButtons = screen.getAllByTestId('question-button');
      expect(questionButtons[0]).toHaveAttribute('aria-expanded', 'false');
      expect(questionButtons[0]).toHaveAttribute('aria-controls');
    });
  });

  describe('Error Recovery Journey', () => {
    it('should handle and recover from navigation errors', async () => {
      render(<App />);
      
      await waitFor(() => {
        expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument();
      });

      // App should load successfully even with potential errors
      expect(screen.getByText('Hardware Engineering Study Guide')).toBeInTheDocument();

      // Test navigation still works after potential errors
      const sectionCard = screen.getByTestId('section-list-card-basic-circuits');
      fireEvent.click(sectionCard);

      await waitFor(() => {
        expect(screen.getByText('Question 1')).toBeInTheDocument();
      });

      // Verify error boundaries don't interfere with normal operation
      expect(screen.queryByText('Something went wrong')).not.toBeInTheDocument();
    });
  });

  describe('Performance and Responsiveness', () => {
    it('should load and navigate quickly', async () => {
      const startTime = performance.now();
      
      render(<App />);
      
      await waitFor(() => {
        expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument();
      });

      const loadTime = performance.now() - startTime;
      
      // App should load within reasonable time (2 seconds)
      expect(loadTime).toBeLessThan(2000);

      // Navigation should be responsive
      const navStartTime = performance.now();
      
      const sectionCard = screen.getByTestId('section-list-card-basic-circuits');
      fireEvent.click(sectionCard);

      await waitFor(() => {
        expect(screen.getByText('Question 1')).toBeInTheDocument();
      });

      const navTime = performance.now() - navStartTime;
      
      // Navigation should be fast (under 500ms)
      expect(navTime).toBeLessThan(500);
    });

    it('should handle rapid navigation without issues', async () => {
      render(<App />);
      
      await waitFor(() => {
        expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument();
      });

      // Rapid navigation sequence
      const sectionCard = screen.getByTestId('section-list-card-basic-circuits');
      fireEvent.click(sectionCard);

      await waitFor(() => {
        expect(screen.getByText('Question 1')).toBeInTheDocument();
      });

      // Quickly navigate through questions
      const questionButtons = screen.getAllByTestId('question-button');
      
      for (let i = 0; i < 3; i++) {
        fireEvent.click(questionButtons[i]);
        
        await waitFor(() => {
          expect(screen.getByRole('button', { name: /next/i })).toBeInTheDocument();
        });

        if (i < 2) {
          const nextButton = screen.getByRole('button', { name: /next/i });
          fireEvent.click(nextButton);
        }
      }

      // Should still be functional after rapid navigation
      expect(screen.getByText('What are some basic circuit analysis laws?')).toBeInTheDocument();
    });
  });

  describe('Data Integrity Journey', () => {
    it('should maintain data consistency throughout user session', async () => {
      render(<App />);
      
      await waitFor(() => {
        expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument();
      });

      // Verify initial data is correct
      expect(screen.getByText('Basic Circuits')).toBeInTheDocument();
      expect(screen.getByText('6 questions')).toBeInTheDocument();

      // Navigate to section and verify question count
      const sectionCard = screen.getByTestId('section-list-card-basic-circuits');
      fireEvent.click(sectionCard);

      await waitFor(() => {
        expect(screen.getByText('Question 1')).toBeInTheDocument();
      });

      const questionButtons = screen.getAllByTestId('question-button');
      expect(questionButtons).toHaveLength(6);

      // Test first few questions to verify data integrity
      for (let i = 0; i < Math.min(3, questionButtons.length); i++) {
        fireEvent.click(questionButtons[i]);
        
        await waitFor(() => {
          // Each question should have content
          const questionText = screen.getByTestId('question-card').querySelector('h3');
          expect(questionText).toBeTruthy();
          expect(questionText!.textContent!.length).toBeGreaterThan(5);
        });

        // Go back to section view for next iteration (except for last question)
        if (i < 2) {
          const breadcrumbSection = screen.getByLabelText('Go to Basic Circuits section');
          fireEvent.click(breadcrumbSection);

          await waitFor(() => {
            expect(screen.getByText('Question 1')).toBeInTheDocument();
          });
          
          // Re-get question buttons after navigation
          const updatedQuestionButtons = screen.getAllByTestId('question-button');
          expect(updatedQuestionButtons).toHaveLength(6);
        }
      }
    });
  });
});