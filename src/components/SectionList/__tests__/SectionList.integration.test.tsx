/**
 * Integration tests for SectionList component with real data
 * 
 * Tests the component with actual question data to ensure
 * it works correctly with the MVP dataset.
 */

import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { SectionList } from '../SectionList';
import { sections } from '../../../data/questions';

describe('SectionList Integration Tests', () => {
  it('should render with real MVP data', () => {
    const mockOnSectionSelect = vi.fn();
    
    render(
      <SectionList 
        sections={sections} 
        onSectionSelect={mockOnSectionSelect} 
      />
    );

    // Should render the Basic Circuits section from real data
    expect(screen.getByText('Basic Circuits')).toBeInTheDocument();
    expect(screen.getByText('6 questions')).toBeInTheDocument();
    expect(screen.getByText(/Fundamental concepts in electrical circuit analysis/)).toBeInTheDocument();
  });

  it('should handle section selection with real data', () => {
    const mockOnSectionSelect = vi.fn();
    
    render(
      <SectionList 
        sections={sections} 
        onSectionSelect={mockOnSectionSelect} 
      />
    );

    const basicCircuitsCard = screen.getByTestId('section-list-card-basic-circuits');
    fireEvent.click(basicCircuitsCard);

    expect(mockOnSectionSelect).toHaveBeenCalledWith('basic-circuits');
  });

  it('should display correct question count from real data', () => {
    const mockOnSectionSelect = vi.fn();
    
    render(
      <SectionList 
        sections={sections} 
        onSectionSelect={mockOnSectionSelect} 
      />
    );

    // The MVP should have exactly 6 questions in basic circuits
    expect(screen.getByTestId('section-list-count-basic-circuits')).toHaveTextContent('6 questions');
  });

  it('should highlight active section correctly', () => {
    const mockOnSectionSelect = vi.fn();
    
    render(
      <SectionList 
        sections={sections} 
        onSectionSelect={mockOnSectionSelect}
        currentSection="basic-circuits"
      />
    );

    const basicCircuitsCard = screen.getByTestId('section-list-card-basic-circuits');
    expect(basicCircuitsCard.className).toMatch(/active/);
  });
});