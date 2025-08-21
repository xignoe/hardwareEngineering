/**
 * QuestionCard Integration Tests
 * Tests the component with real data from the questions dataset
 */

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { QuestionCard } from '../QuestionCard';
import { basicCircuitsQuestions } from '../../../data/questions';
import styles from '../QuestionCard.module.css';

describe('QuestionCard Integration Tests', () => {
  describe('Real Data Integration', () => {
    it('renders correctly with actual question data', () => {
      const question = basicCircuitsQuestions[0]; // Ohm's law question
      
      render(<QuestionCard question={question} />);
      
      expect(screen.getByText('What is Ohm\'s law?')).toBeInTheDocument();
      expect(screen.getByText('basic')).toBeInTheDocument();
      expect(screen.getByText('ohms-law')).toBeInTheDocument();
      expect(screen.getByText('voltage')).toBeInTheDocument();
      expect(screen.getByText('current')).toBeInTheDocument();
    });

    it('handles complex mathematical formulas in answers', async () => {
      const question = basicCircuitsQuestions[0]; // Contains V = I × R formula
      
      render(<QuestionCard question={question} />);
      
      // Expand the answer
      const questionButton = screen.getByTestId('question-button');
      fireEvent.click(questionButton);
      
      await waitFor(() => {
        // Check that mathematical formulas are properly formatted
        const answerSection = screen.getByTestId('answer-section');
        const formulaElements = answerSection.querySelectorAll('.formula');
        expect(formulaElements.length).toBeGreaterThan(0);
        
        // Check for specific formula content
        expect(screen.getByText(/V = I × R/)).toBeInTheDocument();
      });
    });

    it('displays conceptual explanations correctly', async () => {
      const question = basicCircuitsQuestions[1]; // Conceptual Ohm's law explanation
      
      render(<QuestionCard question={question} />);
      
      // Expand the answer
      const questionButton = screen.getByTestId('question-button');
      fireEvent.click(questionButton);
      
      await waitFor(() => {
        expect(screen.getByText(/Think of Ohm's law like water flowing/)).toBeInTheDocument();
        expect(screen.getByText(/Water Analogy:/)).toBeInTheDocument();
      });
    });

    it('handles questions with multiple sections and formatting', async () => {
      const question = basicCircuitsQuestions[2]; // Basic circuit analysis laws
      
      render(<QuestionCard question={question} />);
      
      // Expand the answer
      const questionButton = screen.getByTestId('question-button');
      fireEvent.click(questionButton);
      
      await waitFor(() => {
        expect(screen.getByText(/Ohm's Law/)).toBeInTheDocument();
        expect(screen.getByText(/Kirchhoff's Current Law/)).toBeInTheDocument();
        expect(screen.getByText(/Kirchhoff's Voltage Law/)).toBeInTheDocument();
      });
    });

    it('works with all difficulty levels from real data', () => {
      // All current questions are 'basic' difficulty
      basicCircuitsQuestions.forEach((question, index) => {
        const { unmount } = render(<QuestionCard question={question} />);
        
        expect(screen.getByText('basic')).toBeInTheDocument();
        expect(screen.getByTestId('difficulty-badge')).toBeInTheDocument();
        
        unmount();
      });
    });

    it('displays all tags correctly for each question', () => {
      basicCircuitsQuestions.forEach((question, index) => {
        if (question.tags && question.tags.length > 0) {
          const { unmount } = render(<QuestionCard question={question} />);
          
          const tagsContainer = screen.getByTestId('question-tags');
          expect(tagsContainer).toBeInTheDocument();
          
          // Check that at least the first tag is displayed
          expect(screen.getByText(question.tags[0])).toBeInTheDocument();
          
          unmount();
        }
      });
    });

    it('handles the longest answer content correctly', async () => {
      // Find the question with the longest answer
      const longestQuestion = basicCircuitsQuestions.reduce((prev, current) => 
        current.answer.length > prev.answer.length ? current : prev
      );
      
      render(<QuestionCard question={longestQuestion} />);
      
      // Expand the answer
      const questionButton = screen.getByTestId('question-button');
      fireEvent.click(questionButton);
      
      await waitFor(() => {
        const answerSection = screen.getByTestId('answer-section');
        expect(answerSection).toBeInTheDocument();
        
        // Check that the content is properly formatted and accessible
        const answerContent = answerSection.querySelector('[class*="answerContent"]');
        expect(answerContent).toBeInTheDocument();
        expect(answerContent?.textContent?.length).toBeGreaterThan(100);
      });
    });
  });

  describe('User Experience with Real Data', () => {
    it('provides smooth interaction flow for studying', async () => {
      const question = basicCircuitsQuestions[0];
      
      render(<QuestionCard question={question} />);
      
      // Initial state - collapsed
      const answerSection = screen.getByTestId('answer-section');
      expect(answerSection).not.toHaveClass(styles.expanded);
      
      // User clicks to see answer
      const questionButton = screen.getByTestId('question-button');
      fireEvent.click(questionButton);
      
      // Answer expands
      await waitFor(() => {
        expect(answerSection).toHaveClass(styles.expanded);
      });
      
      // User can collapse again
      fireEvent.click(questionButton);
      
      await waitFor(() => {
        expect(answerSection).not.toHaveClass(styles.expanded);
      });
    });

    it('maintains accessibility with complex content', async () => {
      const question = basicCircuitsQuestions[3]; // KCL/KVL question
      
      render(<QuestionCard question={question} />);
      
      const questionButton = screen.getByTestId('question-button');
      
      // Check ARIA attributes
      expect(questionButton).toHaveAttribute('aria-expanded', 'false');
      expect(questionButton).toHaveAttribute('aria-controls', `answer-${question.id}`);
      
      // Expand and check updated ARIA
      fireEvent.click(questionButton);
      
      await waitFor(() => {
        expect(questionButton).toHaveAttribute('aria-expanded', 'true');
      });
    });
  });

  describe('Performance with Real Data', () => {
    it('renders multiple question cards efficiently', () => {
      const startTime = performance.now();
      
      // Render all questions
      const { unmount } = render(
        <div>
          {basicCircuitsQuestions.map(question => (
            <QuestionCard key={question.id} question={question} />
          ))}
        </div>
      );
      
      const endTime = performance.now();
      const renderTime = endTime - startTime;
      
      // Should render reasonably quickly (less than 100ms for 6 questions)
      expect(renderTime).toBeLessThan(100);
      
      // All questions should be rendered
      basicCircuitsQuestions.forEach(question => {
        expect(screen.getByText(question.question)).toBeInTheDocument();
      });
      
      unmount();
    });
  });
});