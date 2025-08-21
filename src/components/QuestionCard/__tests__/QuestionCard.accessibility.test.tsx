import React from 'react';
import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { describe, it, expect, vi } from 'vitest';
import { QuestionCard } from '../QuestionCard';
import { mockQuestions } from '../../../data/__tests__/questions.test';

expect.extend(toHaveNoViolations);

const mockQuestion = mockQuestions[0];

describe('QuestionCard Accessibility Tests', () => {
  it('should not have any accessibility violations', async () => {
    const { container } = render(
      <QuestionCard 
        question={mockQuestion}
        showAnswer={true}
        showTags={true}
        showDifficulty={true}
      />
    );
    
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should have proper semantic structure', () => {
    render(
      <QuestionCard 
        question={mockQuestion}
        showAnswer={true}
        showTags={true}
        showDifficulty={true}
      />
    );
    
    // Check for article element
    const article = screen.getByRole('article');
    expect(article).toBeInTheDocument();
    expect(article).toHaveAttribute('aria-labelledby', `question-${mockQuestion.id}`);
    
    // Check for proper heading
    const heading = screen.getByRole('heading', { level: 3 });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveAttribute('id', `question-${mockQuestion.id}`);
  });

  it('should have proper button accessibility', () => {
    render(
      <QuestionCard 
        question={mockQuestion}
        showAnswer={true}
        showTags={true}
        showDifficulty={true}
      />
    );
    
    // Check for expandable button
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('type', 'button');
    expect(button).toHaveAttribute('aria-expanded', 'false');
    expect(button).toHaveAttribute('aria-controls', `answer-${mockQuestion.id}`);
    expect(button).toHaveAttribute('aria-describedby', `question-meta-${mockQuestion.id}`);
  });

  it('should have proper answer section accessibility', () => {
    render(
      <QuestionCard 
        question={mockQuestion}
        isExpanded={true}
        showAnswer={true}
        showTags={true}
        showDifficulty={true}
      />
    );
    
    // Check for answer section
    const answerSection = screen.getByRole('region', { name: 'Answer' });
    expect(answerSection).toBeInTheDocument();
    expect(answerSection).toHaveAttribute('id', `answer-${mockQuestion.id}`);
    expect(answerSection).toHaveAttribute('aria-labelledby', `answer-heading-${mockQuestion.id}`);
    expect(answerSection).toHaveAttribute('aria-hidden', 'false');
    
    // Check for answer content with live region
    const answerContent = document.querySelector('[aria-live="polite"]');
    expect(answerContent).toBeInTheDocument();
    expect(answerContent).toHaveAttribute('aria-live', 'polite');
  });

  it('should have proper collapsed state accessibility', () => {
    render(
      <QuestionCard 
        question={mockQuestion}
        isExpanded={false}
        showAnswer={true}
        showTags={true}
        showDifficulty={true}
      />
    );
    
    // Check button expanded state
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-expanded', 'false');
    
    // Check answer section is hidden
    const answerSection = document.getElementById(`answer-${mockQuestion.id}`);
    expect(answerSection).toHaveAttribute('aria-hidden', 'true');
  });

  it('should have proper difficulty badge accessibility', () => {
    const questionWithDifficulty = {
      ...mockQuestion,
      difficulty: 'intermediate' as const
    };
    
    render(
      <QuestionCard 
        question={questionWithDifficulty}
        showAnswer={true}
        showTags={true}
        showDifficulty={true}
      />
    );
    
    // Check for difficulty badge
    const difficultyBadge = screen.getByText('intermediate');
    expect(difficultyBadge).toBeInTheDocument();
    expect(difficultyBadge).toHaveAttribute('aria-label', 'Difficulty level: intermediate');
  });

  it('should have proper tags accessibility', () => {
    const questionWithTags = {
      ...mockQuestion,
      tags: ['circuits', 'ohms-law', 'basic']
    };
    
    render(
      <QuestionCard 
        question={questionWithTags}
        showAnswer={true}
        showTags={true}
        showDifficulty={true}
      />
    );
    
    // Check for tags list
    const tagsList = screen.getByRole('list', { name: 'Question topics' });
    expect(tagsList).toBeInTheDocument();
    
    // Check for tag items
    const tagItems = screen.getAllByRole('listitem');
    expect(tagItems).toHaveLength(3);
    
    tagItems.forEach((item, index) => {
      expect(item).toHaveTextContent(questionWithTags.tags![index]);
    });
  });

  it('should have proper tags with overflow accessibility', () => {
    const questionWithManyTags = {
      ...mockQuestion,
      tags: ['circuits', 'ohms-law', 'basic', 'voltage', 'current', 'resistance']
    };
    
    render(
      <QuestionCard 
        question={questionWithManyTags}
        showAnswer={true}
        showTags={true}
        showDifficulty={true}
      />
    );
    
    // Check for tags list
    const tagsList = screen.getByRole('list', { name: 'Question topics' });
    expect(tagsList).toBeInTheDocument();
    
    // Check for overflow indicator
    const overflowIndicator = screen.getByText('+3');
    expect(overflowIndicator).toBeInTheDocument();
    expect(overflowIndicator).toHaveAttribute('aria-label', '3 more topics');
  });

  it('should have proper keyboard navigation', () => {
    const onQuestionSelect = vi.fn();
    
    render(
      <QuestionCard 
        question={mockQuestion}
        showAnswer={true}
        showTags={true}
        showDifficulty={true}
        onQuestionSelect={onQuestionSelect}
      />
    );
    
    // Check that button is focusable
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    
    // Focus the button
    button.focus();
    expect(button).toHaveFocus();
  });

  it('should have proper metadata accessibility', () => {
    render(
      <QuestionCard 
        question={mockQuestion}
        showAnswer={true}
        showTags={true}
        showDifficulty={true}
      />
    );
    
    // Check for metadata container
    const metadata = document.getElementById(`question-meta-${mockQuestion.id}`);
    expect(metadata).toBeInTheDocument();
  });
});