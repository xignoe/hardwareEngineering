import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { describe, it, expect, vi } from 'vitest';
import { SectionList } from '../SectionList';
import { mockSections } from '../../../data/__tests__/questions.test';

expect.extend(toHaveNoViolations);

const mockProps = {
  sections: mockSections,
  onSectionSelect: vi.fn(),
  showQuestionCount: true,
  layout: 'grid' as const,
};

describe('SectionList Accessibility Tests', () => {
  it('should not have any accessibility violations', async () => {
    const { container } = render(<SectionList {...mockProps} />);
    
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should have proper list structure', () => {
    render(<SectionList {...mockProps} />);
    
    // Check for list role
    const list = screen.getByRole('list', { name: 'Study sections' });
    expect(list).toBeInTheDocument();
    
    // Check for listitem roles
    const listItems = screen.getAllByRole('listitem');
    expect(listItems).toHaveLength(mockSections.length);
  });

  it('should have proper section card accessibility', () => {
    render(<SectionList {...mockProps} />);
    
    const firstSection = mockSections[0];
    
    // Check for article element
    const article = screen.getByRole('listitem', { 
      name: `Study section: ${firstSection.title} (${firstSection.questionCount} questions)` 
    });
    expect(article).toBeInTheDocument();
    expect(article).toHaveAttribute('tabindex', '0');
    expect(article).toHaveAttribute('data-section-card');
    
    // Check for proper heading
    const heading = screen.getByRole('heading', { level: 3, name: firstSection.title });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveAttribute('id', `section-title-${firstSection.id}`);
  });

  it('should have proper keyboard navigation', () => {
    render(<SectionList {...mockProps} />);
    
    const sectionCards = screen.getAllByRole('listitem');
    const firstCard = sectionCards[0];
    const secondCard = sectionCards[1];
    
    // Focus first card
    firstCard.focus();
    expect(firstCard).toHaveFocus();
    
    // Test arrow key navigation
    fireEvent.keyDown(firstCard, { key: 'ArrowDown' });
    expect(secondCard).toHaveFocus();
    
    // Test arrow up navigation
    fireEvent.keyDown(secondCard, { key: 'ArrowUp' });
    expect(firstCard).toHaveFocus();
    
    // Test Home key
    secondCard.focus();
    fireEvent.keyDown(secondCard, { key: 'Home' });
    expect(firstCard).toHaveFocus();
    
    // Test End key
    fireEvent.keyDown(firstCard, { key: 'End' });
    expect(sectionCards[sectionCards.length - 1]).toHaveFocus();
  });

  it('should have proper Enter and Space key activation', () => {
    const onSectionSelect = vi.fn();
    render(<SectionList {...mockProps} onSectionSelect={onSectionSelect} />);
    
    const firstCard = screen.getAllByRole('listitem')[0];
    
    // Test Enter key
    fireEvent.keyDown(firstCard, { key: 'Enter' });
    expect(onSectionSelect).toHaveBeenCalledWith(mockSections[0].id);
    
    // Test Space key
    fireEvent.keyDown(firstCard, { key: ' ' });
    expect(onSectionSelect).toHaveBeenCalledWith(mockSections[0].id);
  });

  it('should have proper question count accessibility', () => {
    render(<SectionList {...mockProps} />);
    
    const firstSection = mockSections[0];
    const questionCount = screen.getByText(`${firstSection.questionCount} questions`);
    expect(questionCount).toBeInTheDocument();
    expect(questionCount).toHaveAttribute('aria-label', `${firstSection.questionCount} questions available`);
  });

  it('should have proper description accessibility', () => {
    render(<SectionList {...mockProps} />);
    
    const firstSection = mockSections[0];
    const description = screen.getByText(firstSection.description);
    expect(description).toBeInTheDocument();
    expect(description).toHaveAttribute('aria-describedby', `section-title-${firstSection.id}`);
  });

  it('should have proper active state accessibility', () => {
    const propsWithCurrentSection = {
      ...mockProps,
      currentSection: mockSections[0].id,
    };
    
    render(<SectionList {...propsWithCurrentSection} />);
    
    const activeCard = screen.getByRole('listitem', { 
      name: `Study section: ${mockSections[0].title} (${mockSections[0].questionCount} questions)` 
    });
    expect(activeCard).toHaveAttribute('aria-current', 'page');
  });

  it('should have proper empty state accessibility', () => {
    const emptyProps = {
      ...mockProps,
      sections: [],
    };
    
    render(<SectionList {...emptyProps} />);
    
    const emptyMessage = screen.getByText('No study sections available.');
    expect(emptyMessage).toBeInTheDocument();
  });

  it('should have proper footer accessibility', () => {
    render(<SectionList {...mockProps} />);
    
    // Check that study prompt is hidden from screen readers
    const studyPrompts = screen.getAllByText('Click to study →');
    studyPrompts.forEach(prompt => {
      expect(prompt).toHaveAttribute('aria-hidden', 'true');
    });
  });

  it('should handle keyboard navigation edge cases', () => {
    render(<SectionList {...mockProps} />);
    
    const sectionCards = screen.getAllByRole('listitem');
    const firstCard = sectionCards[0];
    const lastCard = sectionCards[sectionCards.length - 1];
    
    // Test wrapping from last to first with ArrowDown
    lastCard.focus();
    fireEvent.keyDown(lastCard, { key: 'ArrowDown' });
    expect(firstCard).toHaveFocus();
    
    // Test wrapping from first to last with ArrowUp
    firstCard.focus();
    fireEvent.keyDown(firstCard, { key: 'ArrowUp' });
    expect(lastCard).toHaveFocus();
  });

  it('should not interfere with other key presses', () => {
    const onSectionSelect = vi.fn();
    render(<SectionList {...mockProps} onSectionSelect={onSectionSelect} />);
    
    const firstCard = screen.getAllByRole('listitem')[0];
    
    // Test that other keys don't trigger navigation
    fireEvent.keyDown(firstCard, { key: 'Tab' });
    fireEvent.keyDown(firstCard, { key: 'Escape' });
    fireEvent.keyDown(firstCard, { key: 'a' });
    
    expect(onSectionSelect).not.toHaveBeenCalled();
  });
});