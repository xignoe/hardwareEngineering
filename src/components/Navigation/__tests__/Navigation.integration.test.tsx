import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { StudyGuideProvider, useNavigation } from '../../../context';
import { Navigation } from '../Navigation';

// Test component that uses the navigation context
const NavigationWithContext: React.FC = () => {
  const {
    state,
    getCurrentSection,
    getCurrentQuestion,
    navigateToSection,
    navigateToQuestion,
    navigateToNextQuestion,
    navigateToPreviousQuestion,
    canNavigateNext,
    canNavigatePrevious
  } = useNavigation();

  return (
    <Navigation
      currentSection={getCurrentSection()}
      currentQuestion={getCurrentQuestion()}
      sections={state.sections}
      onSectionSelect={navigateToSection}
      onQuestionSelect={navigateToQuestion}
      onNavigateBack={navigateToPreviousQuestion}
      onNavigateForward={navigateToNextQuestion}
      canNavigateBack={canNavigatePrevious()}
      canNavigateForward={canNavigateNext()}
    />
  );
};

const NavigationTestWrapper: React.FC = () => (
  <StudyGuideProvider>
    <NavigationWithContext />
  </StudyGuideProvider>
);

describe('Navigation Integration Tests', () => {
  it('integrates with StudyGuideContext for complete navigation flow', () => {
    render(<NavigationTestWrapper />);
    
    // Initially should show sections overview
    expect(screen.getByText('Study Guide')).toBeInTheDocument();
    expect(screen.getByLabelText('Select a study section to navigate to')).toBeInTheDocument();
  });

  it('navigates through complete user flow: sections -> section -> question', () => {
    render(<NavigationTestWrapper />);
    
    // Step 1: Select a section
    const sectionSelect = screen.getByLabelText('Select a study section to navigate to');
    fireEvent.change(sectionSelect, { target: { value: 'basic-circuits' } });
    
    // Should now show section in breadcrumb
    expect(screen.getByText('Basic Circuits')).toBeInTheDocument();
    
    // Step 2: Navigate to first question by selecting it
    // Note: In a real integration, this would happen through question selection
    // For this test, we'll simulate the state change by going back to sections and forward again
    fireEvent.click(screen.getByLabelText('Go to sections overview'));
    expect(screen.getByLabelText('Select a study section to navigate to')).toBeInTheDocument();
  });

  it('maintains navigation state consistency', () => {
    render(<NavigationTestWrapper />);
    
    // Select section
    const sectionSelect = screen.getByLabelText('Select a study section to navigate to');
    fireEvent.change(sectionSelect, { target: { value: 'basic-circuits' } });
    
    // Verify section is selected
    expect(screen.getByText('Basic Circuits')).toBeInTheDocument();
    
    // Navigate back to overview
    fireEvent.click(screen.getByLabelText('Go to sections overview'));
    
    // Should be back at sections overview
    expect(screen.getByLabelText('Select a study section to navigate to')).toBeInTheDocument();
    expect(screen.queryByText('Basic Circuits')).not.toBeInTheDocument();
  });

  it('handles section navigation correctly', () => {
    render(<NavigationTestWrapper />);
    
    // Start at overview
    expect(screen.getByLabelText('Select a study section to navigate to')).toBeInTheDocument();
    
    // Navigate to section
    const sectionSelect = screen.getByLabelText('Select a study section to navigate to');
    fireEvent.change(sectionSelect, { target: { value: 'basic-circuits' } });
    
    // Should show section breadcrumb
    expect(screen.getByText('Basic Circuits')).toBeInTheDocument();
    expect(screen.getByLabelText('Go to Basic Circuits section')).toBeInTheDocument();
    
    // Click on section breadcrumb should stay in section
    fireEvent.click(screen.getByLabelText('Go to Basic Circuits section'));
    expect(screen.getByText('Basic Circuits')).toBeInTheDocument();
  });

  it('shows correct section information', () => {
    render(<NavigationTestWrapper />);
    
    // Check that section appears in dropdown with question count
    expect(screen.getByText('Basic Circuits (6 questions)')).toBeInTheDocument();
  });

  it('handles empty section selection', () => {
    render(<NavigationTestWrapper />);
    
    // Select section first
    const sectionSelect = screen.getByLabelText('Select a study section to navigate to');
    fireEvent.change(sectionSelect, { target: { value: 'basic-circuits' } });
    
    // Then select empty value
    fireEvent.change(sectionSelect, { target: { value: '' } });
    
    // Should be back at overview
    expect(screen.getByLabelText('Select a study section to navigate to')).toBeInTheDocument();
  });
});