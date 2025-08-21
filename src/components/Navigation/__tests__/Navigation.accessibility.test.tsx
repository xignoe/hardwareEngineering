import React from 'react';
import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { describe, it, expect, vi } from 'vitest';
import { Navigation } from '../Navigation';
import { mockSections, mockQuestions } from '../../../data/__tests__/questions.test';

expect.extend(toHaveNoViolations);

const mockProps = {
  currentSection: null,
  currentQuestion: null,
  sections: mockSections,
  onSectionSelect: vi.fn(),
  onQuestionSelect: vi.fn(),
  onNavigateBack: vi.fn(),
  onNavigateForward: vi.fn(),
  canNavigateBack: false,
  canNavigateForward: false,
};

describe('Navigation Accessibility Tests', () => {
  it('should not have any accessibility violations', async () => {
    const { container } = render(<Navigation {...mockProps} />);
    
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should have proper navigation landmarks', () => {
    render(<Navigation {...mockProps} />);
    
    // Check for navigation landmark
    const nav = screen.getByRole('navigation', { name: 'Study guide navigation' });
    expect(nav).toBeInTheDocument();
    
    // Check for breadcrumb navigation
    const breadcrumb = screen.getByRole('navigation', { name: 'Breadcrumb navigation' });
    expect(breadcrumb).toBeInTheDocument();
  });

  it('should have proper breadcrumb structure', () => {
    render(<Navigation {...mockProps} />);
    
    // Check for breadcrumb list
    const breadcrumbList = screen.getByRole('list');
    expect(breadcrumbList).toBeInTheDocument();
    
    // Check for breadcrumb items
    const breadcrumbItems = screen.getAllByRole('listitem');
    expect(breadcrumbItems).toHaveLength(1); // Only "Study Guide" when no section selected
    
    // Check for proper button
    const studyGuideButton = screen.getByRole('button', { name: 'Go to sections overview' });
    expect(studyGuideButton).toBeInTheDocument();
    expect(studyGuideButton).toHaveAttribute('type', 'button');
  });

  it('should have proper section selector accessibility', () => {
    render(<Navigation {...mockProps} />);
    
    // Check for section selector
    const sectionSelect = screen.getByRole('combobox', { name: 'Select a study section to navigate to' });
    expect(sectionSelect).toBeInTheDocument();
    expect(sectionSelect).toHaveAttribute('aria-describedby', 'section-selector-help');
    
    // Check for label
    const label = screen.getByText('Jump to section:');
    expect(label).toBeInTheDocument();
    expect(label).toHaveAttribute('for', 'section-select');
  });

  it('should have proper question navigation when in question view', () => {
    const propsWithQuestion = {
      ...mockProps,
      currentSection: mockSections[0],
      currentQuestion: mockQuestions[0],
      canNavigateBack: true,
      canNavigateForward: true,
    };
    
    render(<Navigation {...propsWithQuestion} />);
    
    // Check for navigation buttons
    const prevButton = screen.getByRole('button', { name: 'Go to previous question' });
    expect(prevButton).toBeInTheDocument();
    expect(prevButton).toHaveAttribute('type', 'button');
    expect(prevButton).not.toBeDisabled();
    
    const nextButton = screen.getByRole('button', { name: 'Go to next question' });
    expect(nextButton).toBeInTheDocument();
    expect(nextButton).toHaveAttribute('type', 'button');
    expect(nextButton).not.toBeDisabled();
    
    // Check for progress bar
    const progressBar = screen.getByRole('progressbar');
    expect(progressBar).toBeInTheDocument();
    expect(progressBar).toHaveAttribute('aria-valuenow', '1');
    expect(progressBar).toHaveAttribute('aria-valuemin', '1');
    expect(progressBar).toHaveAttribute('aria-valuemax', mockSections[0].questions.length.toString());
  });

  it('should have proper disabled state accessibility', () => {
    const propsWithDisabledNav = {
      ...mockProps,
      currentSection: mockSections[0],
      currentQuestion: mockQuestions[0],
      canNavigateBack: false,
      canNavigateForward: false,
    };
    
    render(<Navigation {...propsWithDisabledNav} />);
    
    // Check for disabled navigation buttons
    const prevButton = screen.getByRole('button', { name: 'Go to previous question (not available)' });
    expect(prevButton).toBeInTheDocument();
    expect(prevButton).toBeDisabled();
    
    const nextButton = screen.getByRole('button', { name: 'Go to next question (not available)' });
    expect(nextButton).toBeInTheDocument();
    expect(nextButton).toBeDisabled();
  });

  it('should have proper question selector accessibility', () => {
    const propsWithQuestion = {
      ...mockProps,
      currentSection: mockSections[0],
      currentQuestion: mockQuestions[0],
    };
    
    render(<Navigation {...propsWithQuestion} />);
    
    // Check for question selector
    const questionSelect = screen.getByRole('combobox', { name: 'Select a question in this section to navigate to' });
    expect(questionSelect).toBeInTheDocument();
    expect(questionSelect).toHaveAttribute('aria-describedby', 'question-selector-help');
    
    // Check for label
    const label = screen.getByText('Jump to question:');
    expect(label).toBeInTheDocument();
    expect(label).toHaveAttribute('for', 'question-select');
  });

  it('should have proper ARIA current for breadcrumbs', () => {
    const propsWithQuestion = {
      ...mockProps,
      currentSection: mockSections[0],
      currentQuestion: mockQuestions[0],
    };
    
    render(<Navigation {...propsWithQuestion} />);
    
    // Check for current page indicator in breadcrumb
    const breadcrumbCurrent = document.querySelector('[aria-current="page"]');
    expect(breadcrumbCurrent).toBeInTheDocument();
    expect(breadcrumbCurrent).toHaveTextContent('Question 1');
  });
});