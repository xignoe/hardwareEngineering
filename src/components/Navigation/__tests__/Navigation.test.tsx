import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Navigation } from '../Navigation';
import type { Section } from '../../../types';

// Mock data
const mockSections: Section[] = [
  {
    id: 'basic-circuits',
    title: 'Basic Circuits',
    description: 'Fundamental concepts',
    questionCount: 2,
    questions: [
      {
        id: 'bc-001',
        question: 'What is Ohm\'s law?',
        answer: 'V = I × R',
        section: 'basic-circuits',
        difficulty: 'basic'
      },
      {
        id: 'bc-002',
        question: 'What is power?',
        answer: 'P = V × I',
        section: 'basic-circuits',
        difficulty: 'basic'
      }
    ]
  }
];

const mockSection = mockSections[0];
const mockQuestion = mockSection.questions[0];

// Mock functions
const mockOnSectionSelect = vi.fn();
const mockOnQuestionSelect = vi.fn();
const mockOnNavigateBack = vi.fn();
const mockOnNavigateForward = vi.fn();

const defaultProps = {
  currentSection: null,
  currentQuestion: null,
  sections: mockSections,
  onSectionSelect: mockOnSectionSelect,
  onQuestionSelect: mockOnQuestionSelect,
  onNavigateBack: mockOnNavigateBack,
  onNavigateForward: mockOnNavigateForward,
  canNavigateBack: false,
  canNavigateForward: false
};

describe('Navigation Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Breadcrumb Navigation', () => {
    it('renders basic breadcrumb with Study Guide link', () => {
      render(<Navigation {...defaultProps} />);
      
      expect(screen.getByText('Study Guide')).toBeInTheDocument();
      expect(screen.getByLabelText('Go to sections overview')).toBeInTheDocument();
    });

    it('renders section in breadcrumb when current section is set', () => {
      render(
        <Navigation 
          {...defaultProps} 
          currentSection={mockSection}
        />
      );
      
      expect(screen.getByText('Study Guide')).toBeInTheDocument();
      expect(screen.getByText('Basic Circuits')).toBeInTheDocument();
      expect(screen.getByLabelText('Go to Basic Circuits section')).toBeInTheDocument();
    });

    it('renders question in breadcrumb when current question is set', () => {
      render(
        <Navigation 
          {...defaultProps} 
          currentSection={mockSection}
          currentQuestion={mockQuestion}
        />
      );
      
      expect(screen.getByText('Study Guide')).toBeInTheDocument();
      expect(screen.getByText('Basic Circuits')).toBeInTheDocument();
      
      // Check for the breadcrumb current item specifically
      const breadcrumbCurrent = screen.getByRole('navigation', { name: 'Breadcrumb navigation' })
        .querySelector('[aria-current="page"]');
      expect(breadcrumbCurrent).toHaveTextContent('Question 1');
    });

    it('calls onSectionSelect when breadcrumb links are clicked', () => {
      render(
        <Navigation 
          {...defaultProps} 
          currentSection={mockSection}
        />
      );
      
      fireEvent.click(screen.getByLabelText('Go to sections overview'));
      expect(mockOnSectionSelect).toHaveBeenCalledWith('');
      
      fireEvent.click(screen.getByLabelText('Go to Basic Circuits section'));
      expect(mockOnSectionSelect).toHaveBeenCalledWith('basic-circuits');
    });
  });

  describe('Section Selector', () => {
    it('renders section selector when no question is selected', () => {
      render(<Navigation {...defaultProps} />);
      
      expect(screen.getByText('Jump to section:')).toBeInTheDocument();
      expect(screen.getByLabelText('Select a study section to navigate to')).toBeInTheDocument();
    });

    it('does not render section selector when question is selected', () => {
      render(
        <Navigation 
          {...defaultProps} 
          currentSection={mockSection}
          currentQuestion={mockQuestion}
        />
      );
      
      expect(screen.queryByText('Jump to section:')).not.toBeInTheDocument();
    });

    it('calls onSectionSelect when section is selected from dropdown', () => {
      render(<Navigation {...defaultProps} />);
      
      const select = screen.getByLabelText('Select a study section to navigate to');
      fireEvent.change(select, { target: { value: 'basic-circuits' } });
      
      expect(mockOnSectionSelect).toHaveBeenCalledWith('basic-circuits');
    });

    it('displays sections with question counts in dropdown', () => {
      render(<Navigation {...defaultProps} />);
      
      expect(screen.getByText('Basic Circuits (2 questions)')).toBeInTheDocument();
    });
  });

  describe('Question Navigation', () => {
    const questionNavProps = {
      ...defaultProps,
      currentSection: mockSection,
      currentQuestion: mockQuestion,
      canNavigateBack: true,
      canNavigateForward: true
    };

    it('renders question navigation when question is selected', () => {
      render(<Navigation {...questionNavProps} />);
      
      expect(screen.getByLabelText('Go to previous question')).toBeInTheDocument();
      expect(screen.getByLabelText('Go to next question')).toBeInTheDocument();
      expect(screen.getByText('Question 1 of 2')).toBeInTheDocument();
    });

    it('calls navigation functions when buttons are clicked', () => {
      render(<Navigation {...questionNavProps} />);
      
      fireEvent.click(screen.getByLabelText('Go to previous question'));
      expect(mockOnNavigateBack).toHaveBeenCalled();
      
      fireEvent.click(screen.getByLabelText('Go to next question'));
      expect(mockOnNavigateForward).toHaveBeenCalled();
    });

    it('disables navigation buttons when cannot navigate', () => {
      render(
        <Navigation 
          {...defaultProps}
          currentSection={mockSection}
          currentQuestion={mockQuestion}
          canNavigateBack={false}
          canNavigateForward={false}
        />
      );
      
      expect(screen.getByLabelText('Go to previous question (not available)')).toBeDisabled();
      expect(screen.getByLabelText('Go to next question (not available)')).toBeDisabled();
    });

    it('renders progress bar with correct progress', () => {
      render(<Navigation {...questionNavProps} />);
      
      const progressBar = screen.getByRole('progressbar');
      expect(progressBar).toHaveAttribute('aria-valuenow', '1');
      expect(progressBar).toHaveAttribute('aria-valuemax', '2');
    });

    it('renders question selector dropdown', () => {
      render(<Navigation {...questionNavProps} />);
      
      expect(screen.getByText('Jump to question:')).toBeInTheDocument();
      expect(screen.getByLabelText('Select a question in this section to navigate to')).toBeInTheDocument();
    });

    it('calls onQuestionSelect when question is selected from dropdown', () => {
      render(<Navigation {...questionNavProps} />);
      
      const select = screen.getByLabelText('Select a question in this section to navigate to');
      fireEvent.change(select, { target: { value: 'bc-002' } });
      
      expect(mockOnQuestionSelect).toHaveBeenCalledWith('bc-002');
    });
  });

  describe('Accessibility', () => {
    it('has proper ARIA labels and roles', () => {
      render(
        <Navigation 
          {...defaultProps}
          currentSection={mockSection}
          currentQuestion={mockQuestion}
        />
      );
      
      expect(screen.getByLabelText('Study guide navigation')).toBeInTheDocument();
      expect(screen.getByLabelText('Breadcrumb navigation')).toBeInTheDocument();
      expect(screen.getByRole('progressbar')).toBeInTheDocument();
    });

    it('marks current breadcrumb item with aria-current', () => {
      render(
        <Navigation 
          {...defaultProps}
          currentSection={mockSection}
          currentQuestion={mockQuestion}
        />
      );
      
      const breadcrumbCurrent = screen.getByRole('navigation', { name: 'Breadcrumb navigation' })
        .querySelector('[aria-current="page"]');
      expect(breadcrumbCurrent).toHaveTextContent('Question 1');
    });

    it('has proper focus management for interactive elements', () => {
      render(<Navigation {...defaultProps} />);
      
      const studyGuideLink = screen.getByLabelText('Go to sections overview');
      studyGuideLink.focus();
      expect(document.activeElement).toBe(studyGuideLink);
    });
  });

  describe('Responsive Behavior', () => {
    it('applies custom className when provided', () => {
      const { container } = render(
        <Navigation {...defaultProps} className="custom-nav" />
      );
      
      expect(container.firstChild).toHaveClass('custom-nav');
    });
  });
});