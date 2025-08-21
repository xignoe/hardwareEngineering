/**
 * QuestionCard Component Tests
 */

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { QuestionCard } from '../QuestionCard';
import type { Question } from '../../../types';
import styles from '../QuestionCard.module.css';

// Mock question data for testing
const mockQuestion: Question = {
  id: 'test-001',
  question: 'What is Ohm\'s law?',
  answer: `Ohm's law states that the current through a conductor is directly proportional to the voltage.

**Mathematical Formula:**
V = I × R

Where:
- V = Voltage (measured in volts)
- I = Current (measured in amperes)`,
  section: 'basic-circuits',
  tags: ['ohms-law', 'voltage', 'current'],
  difficulty: 'basic'
};

const mockQuestionWithoutOptionalFields: Question = {
  id: 'test-002',
  question: 'Simple question without tags or difficulty',
  answer: 'Simple answer without formatting.',
  section: 'basic-circuits'
};

describe('QuestionCard', () => {
  describe('Basic Rendering', () => {
    it('renders question text correctly', () => {
      render(<QuestionCard question={mockQuestion} />);
      
      expect(screen.getByText('What is Ohm\'s law?')).toBeInTheDocument();
    });

    it('renders with correct test id', () => {
      render(<QuestionCard question={mockQuestion} data-testid="custom-test-id" />);
      
      expect(screen.getByTestId('custom-test-id')).toBeInTheDocument();
    });

    it('applies custom className', () => {
      render(<QuestionCard question={mockQuestion} className="custom-class" />);
      
      const card = screen.getByTestId('question-card');
      expect(card).toHaveClass('custom-class');
    });
  });

  describe('Answer Display and Expansion', () => {
    it('shows expand icon when showAnswer is true', () => {
      render(<QuestionCard question={mockQuestion} showAnswer={true} />);
      
      expect(screen.getByText('▼')).toBeInTheDocument();
    });

    it('hides expand icon when showAnswer is false', () => {
      render(<QuestionCard question={mockQuestion} showAnswer={false} />);
      
      expect(screen.queryByText('▼')).not.toBeInTheDocument();
    });

    it('starts with answer section collapsed by default', () => {
      render(<QuestionCard question={mockQuestion} />);
      
      const answerSection = screen.getByTestId('answer-section');
      expect(answerSection).not.toHaveClass('expanded');
    });

    it('expands answer section when question is clicked', async () => {
      render(<QuestionCard question={mockQuestion} />);
      
      const questionButton = screen.getByTestId('question-button');
      fireEvent.click(questionButton);
      
      await waitFor(() => {
        const answerSection = screen.getByTestId('answer-section');
        expect(answerSection).toHaveClass(styles.expanded);
      });
    });

    it('collapses answer section when clicked again', async () => {
      render(<QuestionCard question={mockQuestion} />);
      
      const questionButton = screen.getByTestId('question-button');
      
      // Expand
      fireEvent.click(questionButton);
      await waitFor(() => {
        expect(screen.getByTestId('answer-section')).toHaveClass(styles.expanded);
      });
      
      // Collapse
      fireEvent.click(questionButton);
      await waitFor(() => {
        expect(screen.getByTestId('answer-section')).not.toHaveClass(styles.expanded);
      });
    });

    it('rotates expand icon when expanded', async () => {
      render(<QuestionCard question={mockQuestion} />);
      
      const questionButton = screen.getByTestId('question-button');
      const expandIcon = screen.getByText('▼');
      
      expect(expandIcon).not.toHaveClass(styles.expanded);
      
      fireEvent.click(questionButton);
      
      await waitFor(() => {
        expect(expandIcon).toHaveClass(styles.expanded);
      });
    });
  });

  describe('Controlled vs Uncontrolled State', () => {
    it('uses controlled expansion state when provided', () => {
      const onToggle = vi.fn();
      render(
        <QuestionCard 
          question={mockQuestion} 
          isExpanded={true}
          onToggleExpanded={onToggle}
        />
      );
      
      const answerSection = screen.getByTestId('answer-section');
      expect(answerSection).toHaveClass(styles.expanded);
    });

    it('calls onToggleExpanded when provided', () => {
      const onToggle = vi.fn();
      render(
        <QuestionCard 
          question={mockQuestion} 
          isExpanded={false}
          onToggleExpanded={onToggle}
        />
      );
      
      const questionButton = screen.getByTestId('question-button');
      fireEvent.click(questionButton);
      
      expect(onToggle).toHaveBeenCalledTimes(1);
    });

    it('calls onQuestionSelect when provided', () => {
      const onSelect = vi.fn();
      render(
        <QuestionCard 
          question={mockQuestion} 
          onQuestionSelect={onSelect}
        />
      );
      
      const questionButton = screen.getByTestId('question-button');
      fireEvent.click(questionButton);
      
      expect(onSelect).toHaveBeenCalledWith('test-001');
    });
  });

  describe('Metadata Display', () => {
    it('shows difficulty badge when showDifficulty is true', () => {
      render(<QuestionCard question={mockQuestion} showDifficulty={true} />);
      
      expect(screen.getByTestId('difficulty-badge')).toBeInTheDocument();
      expect(screen.getByText('basic')).toBeInTheDocument();
    });

    it('hides difficulty badge when showDifficulty is false', () => {
      render(<QuestionCard question={mockQuestion} showDifficulty={false} />);
      
      expect(screen.queryByTestId('difficulty-badge')).not.toBeInTheDocument();
    });

    it('shows tags when showTags is true', () => {
      render(<QuestionCard question={mockQuestion} showTags={true} />);
      
      expect(screen.getByTestId('question-tags')).toBeInTheDocument();
      expect(screen.getByText('ohms-law')).toBeInTheDocument();
      expect(screen.getByText('voltage')).toBeInTheDocument();
      expect(screen.getByText('current')).toBeInTheDocument();
    });

    it('hides tags when showTags is false', () => {
      render(<QuestionCard question={mockQuestion} showTags={false} />);
      
      expect(screen.queryByTestId('question-tags')).not.toBeInTheDocument();
    });

    it('limits tags display to 3 and shows more indicator', () => {
      const questionWithManyTags: Question = {
        ...mockQuestion,
        tags: ['tag1', 'tag2', 'tag3', 'tag4', 'tag5']
      };
      
      render(<QuestionCard question={questionWithManyTags} showTags={true} />);
      
      expect(screen.getByText('tag1')).toBeInTheDocument();
      expect(screen.getByText('tag2')).toBeInTheDocument();
      expect(screen.getByText('tag3')).toBeInTheDocument();
      expect(screen.getByText('+2')).toBeInTheDocument();
      expect(screen.queryByText('tag4')).not.toBeInTheDocument();
    });

    it('handles questions without optional metadata', () => {
      render(<QuestionCard question={mockQuestionWithoutOptionalFields} />);
      
      expect(screen.queryByTestId('difficulty-badge')).not.toBeInTheDocument();
      expect(screen.queryByTestId('question-tags')).not.toBeInTheDocument();
    });
  });

  describe('Answer Formatting', () => {
    it('renders answer content when expanded', async () => {
      render(<QuestionCard question={mockQuestion} />);
      
      const questionButton = screen.getByTestId('question-button');
      fireEvent.click(questionButton);
      
      await waitFor(() => {
        expect(screen.getByText(/Ohm's law states that the current/)).toBeInTheDocument();
        expect(screen.getByText(/Mathematical Formula:/)).toBeInTheDocument();
      });
    });

    it('formats mathematical formulas correctly', async () => {
      render(<QuestionCard question={mockQuestion} />);
      
      const questionButton = screen.getByTestId('question-button');
      fireEvent.click(questionButton);
      
      await waitFor(() => {
        // Check that formulas are wrapped in code elements
        const answerSection = screen.getByTestId('answer-section');
        const codeElements = answerSection.querySelectorAll('.formula');
        expect(codeElements.length).toBeGreaterThan(0);
      });
    });

    it('handles answers without special formatting', async () => {
      render(<QuestionCard question={mockQuestionWithoutOptionalFields} />);
      
      const questionButton = screen.getByTestId('question-button');
      fireEvent.click(questionButton);
      
      await waitFor(() => {
        expect(screen.getByText('Simple answer without formatting.')).toBeInTheDocument();
      });
    });
  });

  describe('Accessibility', () => {
    it('has proper ARIA attributes', () => {
      render(<QuestionCard question={mockQuestion} />);
      
      const questionButton = screen.getByTestId('question-button');
      expect(questionButton).toHaveAttribute('aria-expanded', 'false');
      expect(questionButton).toHaveAttribute('aria-controls', 'answer-test-001');
    });

    it('updates aria-expanded when expanded', async () => {
      render(<QuestionCard question={mockQuestion} />);
      
      const questionButton = screen.getByTestId('question-button');
      fireEvent.click(questionButton);
      
      await waitFor(() => {
        expect(questionButton).toHaveAttribute('aria-expanded', 'true');
      });
    });

    it('has proper heading structure', () => {
      render(<QuestionCard question={mockQuestion} />);
      
      const heading = screen.getByRole('heading', { level: 3 });
      expect(heading).toHaveTextContent('What is Ohm\'s law?');
    });

    it('supports keyboard navigation', () => {
      render(<QuestionCard question={mockQuestion} />);
      
      const questionButton = screen.getByTestId('question-button');
      expect(questionButton).toBeInstanceOf(HTMLButtonElement);
      
      // Button should be focusable
      questionButton.focus();
      expect(document.activeElement).toBe(questionButton);
    });
  });

  describe('Visual States', () => {
    it('applies correct CSS classes for difficulty levels', () => {
      const { rerender } = render(<QuestionCard question={mockQuestion} />);
      
      let badge = screen.getByTestId('difficulty-badge');
      expect(badge).toHaveClass(styles.basic);
      
      const intermediateQuestion = { ...mockQuestion, difficulty: 'intermediate' as const };
      rerender(<QuestionCard question={intermediateQuestion} />);
      
      badge = screen.getByTestId('difficulty-badge');
      expect(badge).toHaveClass(styles.intermediate);
      
      const advancedQuestion = { ...mockQuestion, difficulty: 'advanced' as const };
      rerender(<QuestionCard question={advancedQuestion} />);
      
      badge = screen.getByTestId('difficulty-badge');
      expect(badge).toHaveClass(styles.advanced);
    });
  });
});