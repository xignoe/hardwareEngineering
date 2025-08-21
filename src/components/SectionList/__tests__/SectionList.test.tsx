/**
 * Unit tests for SectionList component
 * 
 * Tests cover:
 * - Component rendering with different props
 * - Click handlers for section navigation
 * - Keyboard navigation support
 * - Card-based layout display
 * - Section titles and question counts
 * - Empty state handling
 * - Accessibility features
 */

import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { SectionList } from '../SectionList';
import type { Section } from '../../../types';

// Mock data for testing
const mockSections: Section[] = [
  {
    id: 'basic-circuits',
    title: 'Basic Circuits',
    description: 'Fundamental concepts in electrical circuit analysis',
    questionCount: 6,
    questions: []
  },
  {
    id: 'advanced-circuits',
    title: 'Advanced Circuits',
    description: 'Complex circuit analysis and design',
    questionCount: 12,
    questions: []
  },
  {
    id: 'digital-logic',
    title: 'Digital Logic',
    description: 'Boolean algebra and digital circuit design',
    questionCount: 8,
    questions: []
  }
];

const mockSingleSection: Section[] = [
  {
    id: 'test-section',
    title: 'Test Section',
    description: 'A test section for unit testing',
    questionCount: 1,
    questions: []
  }
];

describe('SectionList Component', () => {
  describe('Basic Rendering', () => {
    it('should render section list with multiple sections', () => {
      const mockOnSectionSelect = vi.fn();
      
      render(
        <SectionList 
          sections={mockSections} 
          onSectionSelect={mockOnSectionSelect} 
        />
      );

      // Check that all sections are rendered
      expect(screen.getByText('Basic Circuits')).toBeInTheDocument();
      expect(screen.getByText('Advanced Circuits')).toBeInTheDocument();
      expect(screen.getByText('Digital Logic')).toBeInTheDocument();
    });

    it('should render section descriptions', () => {
      const mockOnSectionSelect = vi.fn();
      
      render(
        <SectionList 
          sections={mockSections} 
          onSectionSelect={mockOnSectionSelect} 
        />
      );

      expect(screen.getByText('Fundamental concepts in electrical circuit analysis')).toBeInTheDocument();
      expect(screen.getByText('Complex circuit analysis and design')).toBeInTheDocument();
      expect(screen.getByText('Boolean algebra and digital circuit design')).toBeInTheDocument();
    });

    it('should render with custom className', () => {
      const mockOnSectionSelect = vi.fn();
      
      render(
        <SectionList 
          sections={mockSections} 
          onSectionSelect={mockOnSectionSelect}
          className="custom-class"
          data-testid="custom-section-list"
        />
      );

      const sectionList = screen.getByTestId('custom-section-list');
      expect(sectionList).toHaveClass('custom-class');
    });
  });

  describe('Question Count Display', () => {
    it('should display question counts by default', () => {
      const mockOnSectionSelect = vi.fn();
      
      render(
        <SectionList 
          sections={mockSections} 
          onSectionSelect={mockOnSectionSelect} 
        />
      );

      expect(screen.getByText('6 questions')).toBeInTheDocument();
      expect(screen.getByText('12 questions')).toBeInTheDocument();
      expect(screen.getByText('8 questions')).toBeInTheDocument();
    });

    it('should handle singular question count correctly', () => {
      const mockOnSectionSelect = vi.fn();
      
      render(
        <SectionList 
          sections={mockSingleSection} 
          onSectionSelect={mockOnSectionSelect} 
        />
      );

      expect(screen.getByText('1 question')).toBeInTheDocument();
    });

    it('should hide question counts when showQuestionCount is false', () => {
      const mockOnSectionSelect = vi.fn();
      
      render(
        <SectionList 
          sections={mockSections} 
          onSectionSelect={mockOnSectionSelect}
          showQuestionCount={false}
        />
      );

      expect(screen.queryByText('6 questions')).not.toBeInTheDocument();
      expect(screen.queryByText('12 questions')).not.toBeInTheDocument();
      expect(screen.queryByText('8 questions')).not.toBeInTheDocument();
    });
  });

  describe('Layout Options', () => {
    it('should apply grid layout by default', () => {
      const mockOnSectionSelect = vi.fn();
      
      render(
        <SectionList 
          sections={mockSections} 
          onSectionSelect={mockOnSectionSelect}
          data-testid="section-list"
        />
      );

      const sectionList = screen.getByTestId('section-list');
      // Check that the element has CSS module classes that include grid
      expect(sectionList.className).toMatch(/grid/);
    });

    it('should apply list layout when specified', () => {
      const mockOnSectionSelect = vi.fn();
      
      render(
        <SectionList 
          sections={mockSections} 
          onSectionSelect={mockOnSectionSelect}
          layout="list"
          data-testid="section-list"
        />
      );

      const sectionList = screen.getByTestId('section-list');
      // Check that the element has CSS module classes that include list
      expect(sectionList.className).toMatch(/list/);
    });
  });

  describe('Section Selection', () => {
    it('should call onSectionSelect when section card is clicked', () => {
      const mockOnSectionSelect = vi.fn();
      
      render(
        <SectionList 
          sections={mockSections} 
          onSectionSelect={mockOnSectionSelect} 
        />
      );

      const basicCircuitsCard = screen.getByTestId('section-list-card-basic-circuits');
      fireEvent.click(basicCircuitsCard);

      expect(mockOnSectionSelect).toHaveBeenCalledWith('basic-circuits');
      expect(mockOnSectionSelect).toHaveBeenCalledTimes(1);
    });

    it('should call onSectionSelect for different sections', () => {
      const mockOnSectionSelect = vi.fn();
      
      render(
        <SectionList 
          sections={mockSections} 
          onSectionSelect={mockOnSectionSelect} 
        />
      );

      const advancedCircuitsCard = screen.getByTestId('section-list-card-advanced-circuits');
      const digitalLogicCard = screen.getByTestId('section-list-card-digital-logic');

      fireEvent.click(advancedCircuitsCard);
      expect(mockOnSectionSelect).toHaveBeenCalledWith('advanced-circuits');

      fireEvent.click(digitalLogicCard);
      expect(mockOnSectionSelect).toHaveBeenCalledWith('digital-logic');

      expect(mockOnSectionSelect).toHaveBeenCalledTimes(2);
    });
  });

  describe('Keyboard Navigation', () => {
    it('should handle Enter key press for section selection', () => {
      const mockOnSectionSelect = vi.fn();
      
      render(
        <SectionList 
          sections={mockSections} 
          onSectionSelect={mockOnSectionSelect} 
        />
      );

      const basicCircuitsCard = screen.getByTestId('section-list-card-basic-circuits');
      fireEvent.keyDown(basicCircuitsCard, { key: 'Enter' });

      expect(mockOnSectionSelect).toHaveBeenCalledWith('basic-circuits');
    });

    it('should handle Space key press for section selection', () => {
      const mockOnSectionSelect = vi.fn();
      
      render(
        <SectionList 
          sections={mockSections} 
          onSectionSelect={mockOnSectionSelect} 
        />
      );

      const basicCircuitsCard = screen.getByTestId('section-list-card-basic-circuits');
      fireEvent.keyDown(basicCircuitsCard, { key: ' ' });

      expect(mockOnSectionSelect).toHaveBeenCalledWith('basic-circuits');
    });

    it('should not trigger selection for other keys', () => {
      const mockOnSectionSelect = vi.fn();
      
      render(
        <SectionList 
          sections={mockSections} 
          onSectionSelect={mockOnSectionSelect} 
        />
      );

      const basicCircuitsCard = screen.getByTestId('section-list-card-basic-circuits');
      fireEvent.keyDown(basicCircuitsCard, { key: 'Tab' });
      fireEvent.keyDown(basicCircuitsCard, { key: 'Escape' });

      expect(mockOnSectionSelect).not.toHaveBeenCalled();
    });
  });

  describe('Current Section Highlighting', () => {
    it('should highlight current section when specified', () => {
      const mockOnSectionSelect = vi.fn();
      
      render(
        <SectionList 
          sections={mockSections} 
          onSectionSelect={mockOnSectionSelect}
          currentSection="basic-circuits"
        />
      );

      const basicCircuitsCard = screen.getByTestId('section-list-card-basic-circuits');
      const advancedCircuitsCard = screen.getByTestId('section-list-card-advanced-circuits');

      // Check that the active section has CSS module classes that include active
      expect(basicCircuitsCard.className).toMatch(/active/);
      expect(advancedCircuitsCard.className).not.toMatch(/active/);
    });

    it('should not highlight any section when currentSection is null', () => {
      const mockOnSectionSelect = vi.fn();
      
      render(
        <SectionList 
          sections={mockSections} 
          onSectionSelect={mockOnSectionSelect}
          currentSection={null}
        />
      );

      const basicCircuitsCard = screen.getByTestId('section-list-card-basic-circuits');
      const advancedCircuitsCard = screen.getByTestId('section-list-card-advanced-circuits');

      // Check that no sections have CSS module classes that include active
      expect(basicCircuitsCard.className).not.toMatch(/active/);
      expect(advancedCircuitsCard.className).not.toMatch(/active/);
    });
  });

  describe('Empty State', () => {
    it('should render empty state when no sections provided', () => {
      const mockOnSectionSelect = vi.fn();
      
      render(
        <SectionList 
          sections={[]} 
          onSectionSelect={mockOnSectionSelect} 
        />
      );

      expect(screen.getByText('No study sections available.')).toBeInTheDocument();
      expect(screen.getByTestId('section-list-empty')).toBeInTheDocument();
    });

    it('should apply custom className to empty state', () => {
      const mockOnSectionSelect = vi.fn();
      
      render(
        <SectionList 
          sections={[]} 
          onSectionSelect={mockOnSectionSelect}
          className="custom-empty-class"
        />
      );

      const emptyState = screen.getByTestId('section-list-empty');
      expect(emptyState).toHaveClass('custom-empty-class');
    });
  });

  describe('Accessibility', () => {
    it('should have proper ARIA labels for section cards', () => {
      const mockOnSectionSelect = vi.fn();
      
      render(
        <SectionList 
          sections={mockSections} 
          onSectionSelect={mockOnSectionSelect} 
        />
      );

      const basicCircuitsCard = screen.getByTestId('section-list-card-basic-circuits');
      expect(basicCircuitsCard).toHaveAttribute('aria-label', 'Study section: Basic Circuits (6 questions)');
      expect(basicCircuitsCard).toHaveAttribute('role', 'listitem');
      expect(basicCircuitsCard).toHaveAttribute('tabIndex', '0');
    });

    it('should have proper ARIA labels when question count is hidden', () => {
      const mockOnSectionSelect = vi.fn();
      
      render(
        <SectionList 
          sections={mockSections} 
          onSectionSelect={mockOnSectionSelect}
          showQuestionCount={false}
        />
      );

      const basicCircuitsCard = screen.getByTestId('section-list-card-basic-circuits');
      expect(basicCircuitsCard).toHaveAttribute('aria-label', 'Study section: Basic Circuits');
    });

    it('should have proper test IDs for question counts', () => {
      const mockOnSectionSelect = vi.fn();
      
      render(
        <SectionList 
          sections={mockSections} 
          onSectionSelect={mockOnSectionSelect} 
        />
      );

      expect(screen.getByTestId('section-list-count-basic-circuits')).toBeInTheDocument();
      expect(screen.getByTestId('section-list-count-advanced-circuits')).toBeInTheDocument();
      expect(screen.getByTestId('section-list-count-digital-logic')).toBeInTheDocument();
    });
  });

  describe('Requirements Compliance', () => {
    it('should satisfy requirement 2.1: Display questions organized into logical sections', () => {
      const mockOnSectionSelect = vi.fn();
      
      render(
        <SectionList 
          sections={mockSections} 
          onSectionSelect={mockOnSectionSelect} 
        />
      );

      // Each section should be displayed as a separate card
      expect(screen.getByTestId('section-list-card-basic-circuits')).toBeInTheDocument();
      expect(screen.getByTestId('section-list-card-advanced-circuits')).toBeInTheDocument();
      expect(screen.getByTestId('section-list-card-digital-logic')).toBeInTheDocument();
    });

    it('should satisfy requirement 2.2: Show all questions and answers for selected topic', () => {
      const mockOnSectionSelect = vi.fn();
      
      render(
        <SectionList 
          sections={mockSections} 
          onSectionSelect={mockOnSectionSelect} 
        />
      );

      // Component should provide navigation to sections via click handlers
      const basicCircuitsCard = screen.getByTestId('section-list-card-basic-circuits');
      fireEvent.click(basicCircuitsCard);
      
      expect(mockOnSectionSelect).toHaveBeenCalledWith('basic-circuits');
    });

    it('should satisfy requirement 2.3: Clearly indicate section name and question count', () => {
      const mockOnSectionSelect = vi.fn();
      
      render(
        <SectionList 
          sections={mockSections} 
          onSectionSelect={mockOnSectionSelect} 
        />
      );

      // Section names should be clearly displayed
      expect(screen.getByText('Basic Circuits')).toBeInTheDocument();
      expect(screen.getByText('Advanced Circuits')).toBeInTheDocument();
      expect(screen.getByText('Digital Logic')).toBeInTheDocument();

      // Question counts should be clearly displayed
      expect(screen.getByText('6 questions')).toBeInTheDocument();
      expect(screen.getByText('12 questions')).toBeInTheDocument();
      expect(screen.getByText('8 questions')).toBeInTheDocument();
    });
  });
});