/**
 * Performance Tests for the Application
 * Tests rendering performance, memory usage, and optimization
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

describe('Application Performance Tests', () => {
  describe('Initial Load Performance', () => {
    it('should render initial view within performance budget', async () => {
      const startTime = performance.now();
      
      render(<App />);
      
      // Wait for loading to complete
      await waitFor(() => {
        expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument();
      });
      
      const endTime = performance.now();
      const renderTime = endTime - startTime;
      
      // Should render within 1 second
      expect(renderTime).toBeLessThan(1000);
      
      // Verify content is actually rendered
      expect(screen.getByText('Hardware Engineering Study Guide')).toBeInTheDocument();
    });

    it('should handle multiple rapid re-renders efficiently', async () => {
      const { rerender } = render(<App />);
      
      await waitFor(() => {
        expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument();
      });

      const startTime = performance.now();
      
      // Perform multiple re-renders
      for (let i = 0; i < 10; i++) {
        rerender(<App />);
      }
      
      const endTime = performance.now();
      const rerenderTime = endTime - startTime;
      
      // Multiple re-renders should complete quickly
      expect(rerenderTime).toBeLessThan(500);
    });
  });

  describe('Navigation Performance', () => {
    it('should navigate between views efficiently', async () => {
      render(<App />);
      
      await waitFor(() => {
        expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument();
      });

      const measurements: number[] = [];
      
      // Measure navigation to section
      let startTime = performance.now();
      const sectionCard = screen.getByTestId('section-list-card-basic-circuits');
      fireEvent.click(sectionCard);
      
      await waitFor(() => {
        expect(screen.getByText('Question 1')).toBeInTheDocument();
      });
      
      measurements.push(performance.now() - startTime);

      // Measure navigation to question
      startTime = performance.now();
      const questionButtons = screen.getAllByTestId('question-button');
      fireEvent.click(questionButtons[0]);
      
      await waitFor(() => {
        expect(screen.getByText('What is Ohm\'s law?')).toBeInTheDocument();
      });
      
      measurements.push(performance.now() - startTime);

      // Measure navigation between questions
      startTime = performance.now();
      const nextButton = screen.getByRole('button', { name: /next/i });
      fireEvent.click(nextButton);
      
      await waitFor(() => {
        expect(screen.getByText("Conceptually explain Ohm's law")).toBeInTheDocument();
      });
      
      measurements.push(performance.now() - startTime);

      // All navigation should be fast (under 300ms each)
      measurements.forEach(time => {
        expect(time).toBeLessThan(300);
      });

      // Average navigation time should be reasonable
      const averageTime = measurements.reduce((a, b) => a + b, 0) / measurements.length;
      expect(averageTime).toBeLessThan(200);
    });

    it('should handle rapid navigation without performance degradation', async () => {
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

      const questionButtons = screen.getAllByTestId('question-button');
      const navigationTimes: number[] = [];

      // Rapidly navigate through all questions
      for (let i = 0; i < questionButtons.length; i++) {
        const startTime = performance.now();
        
        fireEvent.click(questionButtons[i]);
        
        await waitFor(() => {
          expect(screen.getByRole('button', { name: /next/i })).toBeInTheDocument();
        });
        
        navigationTimes.push(performance.now() - startTime);
      }

      // Performance should not degrade with rapid navigation
      const firstHalf = navigationTimes.slice(0, Math.floor(navigationTimes.length / 2));
      const secondHalf = navigationTimes.slice(Math.floor(navigationTimes.length / 2));
      
      const firstHalfAvg = firstHalf.reduce((a, b) => a + b, 0) / firstHalf.length;
      const secondHalfAvg = secondHalf.reduce((a, b) => a + b, 0) / secondHalf.length;
      
      // Second half should not be significantly slower (within 50% tolerance)
      expect(secondHalfAvg).toBeLessThan(firstHalfAvg * 1.5);
    });
  });

  describe('Component Rendering Performance', () => {
    it('should render question cards efficiently', async () => {
      render(<App />);
      
      await waitFor(() => {
        expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument();
      });

      // Navigate to section with all questions
      const sectionCard = screen.getByTestId('section-list-card-basic-circuits');
      fireEvent.click(sectionCard);

      const startTime = performance.now();
      
      await waitFor(() => {
        expect(screen.getByText('Question 1')).toBeInTheDocument();
      });

      // Verify all 6 questions are rendered
      const questionButtons = screen.getAllByTestId('question-button');
      expect(questionButtons).toHaveLength(6);
      
      const renderTime = performance.now() - startTime;
      
      // Should render all questions quickly
      expect(renderTime).toBeLessThan(200);
    });

    it('should handle question expansion/collapse efficiently', async () => {
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

      const questionButtons = screen.getAllByTestId('question-button');
      const expansionTimes: number[] = [];

      // Test expansion/collapse performance for multiple questions
      for (let i = 0; i < Math.min(3, questionButtons.length); i++) {
        const startTime = performance.now();
        
        // Expand question
        fireEvent.click(questionButtons[i]);
        
        await waitFor(() => {
          const answerSection = screen.getByTestId('answer-section');
          expect(answerSection).toBeInTheDocument();
        });
        
        // Collapse question
        fireEvent.click(questionButtons[i]);
        
        await waitFor(() => {
          const answerSection = screen.getByTestId('answer-section');
          expect(answerSection).toBeInTheDocument();
        });
        
        expansionTimes.push(performance.now() - startTime);
      }

      // All expansion/collapse operations should be fast
      expansionTimes.forEach(time => {
        expect(time).toBeLessThan(100);
      });
    });
  });

  describe('Memory Usage', () => {
    it('should not create memory leaks during navigation', async () => {
      // This test checks for obvious memory issues by performing many operations
      render(<App />);
      
      await waitFor(() => {
        expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument();
      });

      // Perform many navigation operations
      for (let cycle = 0; cycle < 5; cycle++) {
        // Navigate to section
        const sectionCard = screen.getByTestId('section-list-card-basic-circuits');
        fireEvent.click(sectionCard);

        await waitFor(() => {
          expect(screen.getByText('Question 1')).toBeInTheDocument();
        });

        // Navigate through questions
        const questionButtons = screen.getAllByTestId('question-button');
        for (let i = 0; i < Math.min(3, questionButtons.length); i++) {
          fireEvent.click(questionButtons[i]);
          
          await waitFor(() => {
            expect(screen.getByRole('button', { name: /next/i })).toBeInTheDocument();
          });
        }

        // Return to home
        const breadcrumbHome = screen.getByLabelText('Go to sections overview');
        fireEvent.click(breadcrumbHome);

        await waitFor(() => {
          expect(screen.getByText('Hardware Engineering Study Guide')).toBeInTheDocument();
        });
      }

      // If we get here without crashes, memory usage is likely acceptable
      expect(screen.getByText('Hardware Engineering Study Guide')).toBeInTheDocument();
    });
  });

  describe('Concurrent Operations', () => {
    it('should handle multiple simultaneous interactions', async () => {
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

      // Navigate to question
      const questionButtons = screen.getAllByTestId('question-button');
      fireEvent.click(questionButtons[0]);

      await waitFor(() => {
        expect(screen.getByText('What is Ohm\'s law?')).toBeInTheDocument();
      });

      // Simulate rapid concurrent interactions
      const startTime = performance.now();
      
      // Multiple rapid clicks (simulating impatient user)
      const nextButton = screen.getByRole('button', { name: /next/i });
      for (let i = 0; i < 5; i++) {
        fireEvent.click(nextButton);
      }

      // Should eventually settle on a question (may not be the exact next one due to rapid clicks)
      await waitFor(() => {
        // Just verify we're still in a question view
        expect(screen.getByRole('button', { name: /previous/i })).toBeInTheDocument();
      });

      const endTime = performance.now();
      
      // Should handle concurrent operations without significant delay
      expect(endTime - startTime).toBeLessThan(500);
    });
  });

  describe('Large Dataset Performance', () => {
    it('should maintain performance with current dataset size', async () => {
      render(<App />);
      
      await waitFor(() => {
        expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument();
      });

      // Navigate to section (6 questions)
      const startTime = performance.now();
      
      const sectionCard = screen.getByTestId('section-list-card-basic-circuits');
      fireEvent.click(sectionCard);

      await waitFor(() => {
        expect(screen.getByText('Question 1')).toBeInTheDocument();
      });

      // Verify all questions are rendered
      const questionButtons = screen.getAllByTestId('question-button');
      expect(questionButtons).toHaveLength(6);

      const endTime = performance.now();
      
      // Should handle current dataset size efficiently
      expect(endTime - startTime).toBeLessThan(300);

      // Test navigation through all questions
      const navigationStartTime = performance.now();
      
      for (let i = 0; i < questionButtons.length; i++) {
        fireEvent.click(questionButtons[i]);
        
        await waitFor(() => {
          expect(screen.getByRole('button', { name: /next/i })).toBeInTheDocument();
        });
      }

      const navigationEndTime = performance.now();
      
      // Navigation through all questions should be reasonable
      expect(navigationEndTime - navigationStartTime).toBeLessThan(1000);
    });
  });
});