import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { StudyGuideProvider, useStudyGuide, useNavigation } from '../StudyGuideContext';

// Test component that uses the context
const TestComponent: React.FC = () => {
  const { state, dispatch } = useStudyGuide();
  
  return (
    <div>
      <div data-testid="current-section">
        {state.currentSection || 'none'}
      </div>
      <div data-testid="current-question">
        {state.currentQuestion || 'none'}
      </div>
      <div data-testid="sections-count">
        {state.sections.length}
      </div>
      <button 
        onClick={() => dispatch({ type: 'SET_CURRENT_SECTION', payload: 'basic-circuits' })}
      >
        Set Section
      </button>
      <button 
        onClick={() => dispatch({ type: 'SET_CURRENT_QUESTION', payload: 'bc-001' })}
      >
        Set Question
      </button>
      <button 
        onClick={() => dispatch({ type: 'RESET_STATE' })}
      >
        Reset
      </button>
    </div>
  );
};

// Test component for navigation hooks
const NavigationTestComponent: React.FC = () => {
  const {
    state,
    getCurrentSection,
    getCurrentQuestion,
    navigateToSection,
    navigateToQuestion,
    navigateToNextQuestion,
    navigateToPreviousQuestion,
    canNavigateNext,
    canNavigatePrevious,
    clearPersistedState,
    resetToInitialState
  } = useNavigation();
  
  const section = getCurrentSection();
  const question = getCurrentQuestion();
  
  return (
    <div>
      <div data-testid="nav-current-section">
        {section?.title || 'none'}
      </div>
      <div data-testid="nav-current-question">
        {question?.id || 'none'}
      </div>
      <div data-testid="can-navigate-next">
        {canNavigateNext().toString()}
      </div>
      <div data-testid="can-navigate-previous">
        {canNavigatePrevious().toString()}
      </div>
      <button onClick={() => navigateToSection('basic-circuits')}>
        Navigate to Section
      </button>
      <button onClick={() => navigateToQuestion('bc-001')}>
        Navigate to Question
      </button>
      <button onClick={() => navigateToNextQuestion()}>
        Next Question
      </button>
      <button onClick={() => navigateToPreviousQuestion()}>
        Previous Question
      </button>
      <button onClick={() => navigateToSection('')}>
        Go to Overview
      </button>
      <button onClick={() => clearPersistedState()}>
        Clear Persistence
      </button>
      <button onClick={() => resetToInitialState()}>
        Reset to Initial
      </button>
    </div>
  );
};

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock
});

describe('StudyGuideContext', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    vi.clearAllMocks();
    localStorageMock.getItem.mockReturnValue(null);
  });

  afterEach(() => {
    // Clean up localStorage after each test
    localStorageMock.clear();
  });
  describe('Basic Context Functionality', () => {
    it('provides initial state', () => {
      render(
        <StudyGuideProvider>
          <TestComponent />
        </StudyGuideProvider>
      );
      
      expect(screen.getByTestId('current-section')).toHaveTextContent('none');
      expect(screen.getByTestId('current-question')).toHaveTextContent('none');
      expect(screen.getByTestId('sections-count')).toHaveTextContent('1');
    });

    it('updates current section', () => {
      render(
        <StudyGuideProvider>
          <TestComponent />
        </StudyGuideProvider>
      );
      
      fireEvent.click(screen.getByText('Set Section'));
      expect(screen.getByTestId('current-section')).toHaveTextContent('basic-circuits');
    });

    it('updates current question', () => {
      render(
        <StudyGuideProvider>
          <TestComponent />
        </StudyGuideProvider>
      );
      
      fireEvent.click(screen.getByText('Set Question'));
      expect(screen.getByTestId('current-question')).toHaveTextContent('bc-001');
    });

    it('resets state', () => {
      render(
        <StudyGuideProvider>
          <TestComponent />
        </StudyGuideProvider>
      );
      
      // Set some state
      fireEvent.click(screen.getByText('Set Section'));
      fireEvent.click(screen.getByText('Set Question'));
      
      // Reset
      fireEvent.click(screen.getByText('Reset'));
      
      expect(screen.getByTestId('current-section')).toHaveTextContent('none');
      expect(screen.getByTestId('current-question')).toHaveTextContent('none');
    });

    it('resets question when section changes', () => {
      render(
        <StudyGuideProvider>
          <TestComponent />
        </StudyGuideProvider>
      );
      
      // Set question first
      fireEvent.click(screen.getByText('Set Question'));
      expect(screen.getByTestId('current-question')).toHaveTextContent('bc-001');
      
      // Change section - should reset question
      fireEvent.click(screen.getByText('Set Section'));
      expect(screen.getByTestId('current-question')).toHaveTextContent('none');
    });
  });

  describe('Navigation Hook Functionality', () => {
    it('provides navigation helper functions', () => {
      render(
        <StudyGuideProvider>
          <NavigationTestComponent />
        </StudyGuideProvider>
      );
      
      expect(screen.getByTestId('nav-current-section')).toHaveTextContent('none');
      expect(screen.getByTestId('nav-current-question')).toHaveTextContent('none');
    });

    it('navigates to section', () => {
      render(
        <StudyGuideProvider>
          <NavigationTestComponent />
        </StudyGuideProvider>
      );
      
      fireEvent.click(screen.getByText('Navigate to Section'));
      expect(screen.getByTestId('nav-current-section')).toHaveTextContent('Basic Circuits');
    });

    it('navigates to question', () => {
      render(
        <StudyGuideProvider>
          <NavigationTestComponent />
        </StudyGuideProvider>
      );
      
      // First navigate to section
      fireEvent.click(screen.getByText('Navigate to Section'));
      
      // Then navigate to question
      fireEvent.click(screen.getByText('Navigate to Question'));
      expect(screen.getByTestId('nav-current-question')).toHaveTextContent('bc-001');
    });

    it('handles next question navigation', () => {
      render(
        <StudyGuideProvider>
          <NavigationTestComponent />
        </StudyGuideProvider>
      );
      
      // Navigate to section and first question
      fireEvent.click(screen.getByText('Navigate to Section'));
      fireEvent.click(screen.getByText('Navigate to Question'));
      
      // Should be able to navigate next
      expect(screen.getByTestId('can-navigate-next')).toHaveTextContent('true');
      
      // Navigate to next question
      fireEvent.click(screen.getByText('Next Question'));
      expect(screen.getByTestId('nav-current-question')).toHaveTextContent('bc-002');
    });

    it('handles previous question navigation', () => {
      render(
        <StudyGuideProvider>
          <NavigationTestComponent />
        </StudyGuideProvider>
      );
      
      // Navigate to section and first question
      fireEvent.click(screen.getByText('Navigate to Section'));
      fireEvent.click(screen.getByText('Navigate to Question'));
      
      // Navigate to next question first
      fireEvent.click(screen.getByText('Next Question'));
      
      // Should be able to navigate previous
      expect(screen.getByTestId('can-navigate-previous')).toHaveTextContent('true');
      
      // Navigate to previous question
      fireEvent.click(screen.getByText('Previous Question'));
      expect(screen.getByTestId('nav-current-question')).toHaveTextContent('bc-001');
    });

    it('correctly determines navigation boundaries', () => {
      render(
        <StudyGuideProvider>
          <NavigationTestComponent />
        </StudyGuideProvider>
      );
      
      // Navigate to section and first question
      fireEvent.click(screen.getByText('Navigate to Section'));
      fireEvent.click(screen.getByText('Navigate to Question'));
      
      // At first question - can't go previous
      expect(screen.getByTestId('can-navigate-previous')).toHaveTextContent('false');
      expect(screen.getByTestId('can-navigate-next')).toHaveTextContent('true');
    });

    it('navigates to overview', () => {
      render(
        <StudyGuideProvider>
          <NavigationTestComponent />
        </StudyGuideProvider>
      );
      
      // Navigate to section first
      fireEvent.click(screen.getByText('Navigate to Section'));
      expect(screen.getByTestId('nav-current-section')).toHaveTextContent('Basic Circuits');
      
      // Navigate to overview
      fireEvent.click(screen.getByText('Go to Overview'));
      expect(screen.getByTestId('nav-current-section')).toHaveTextContent('none');
    });
  });

  describe('Error Handling', () => {
    it('throws error when useStudyGuide is used outside provider', () => {
      // Suppress console.error for this test
      const originalError = console.error;
      console.error = () => {};
      
      expect(() => {
        render(<TestComponent />);
      }).toThrow('useStudyGuide must be used within a StudyGuideProvider');
      
      console.error = originalError;
    });
  });

  describe('State Persistence', () => {
    it('saves state to localStorage when section changes', () => {
      render(
        <StudyGuideProvider>
          <TestComponent />
        </StudyGuideProvider>
      );
      
      fireEvent.click(screen.getByText('Set Section'));
      
      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        'hardware-study-guide-state',
        JSON.stringify({
          currentSection: 'basic-circuits',
          currentQuestion: null
        })
      );
    });

    it('saves state to localStorage when question changes', () => {
      render(
        <StudyGuideProvider>
          <TestComponent />
        </StudyGuideProvider>
      );
      
      fireEvent.click(screen.getByText('Set Question'));
      
      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        'hardware-study-guide-state',
        JSON.stringify({
          currentSection: null,
          currentQuestion: 'bc-001'
        })
      );
    });

    it('loads persisted state on initialization', async () => {
      localStorageMock.getItem.mockReturnValue(JSON.stringify({
        currentSection: 'basic-circuits',
        currentQuestion: 'bc-001' // Use a valid question ID that exists in the data
      }));
      
      render(
        <StudyGuideProvider>
          <TestComponent />
        </StudyGuideProvider>
      );
      
      // Wait for validation to complete
      await new Promise(resolve => setTimeout(resolve, 10));
      
      expect(screen.getByTestId('current-section')).toHaveTextContent('basic-circuits');
      expect(screen.getByTestId('current-question')).toHaveTextContent('bc-001');
    });

    it('handles corrupted localStorage data gracefully', () => {
      localStorageMock.getItem.mockReturnValue('invalid-json');
      const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
      
      render(
        <StudyGuideProvider>
          <TestComponent />
        </StudyGuideProvider>
      );
      
      // Should fall back to initial state
      expect(screen.getByTestId('current-section')).toHaveTextContent('none');
      expect(screen.getByTestId('current-question')).toHaveTextContent('none');
      
      // The console.warn should have been called during initialization
      expect(consoleSpy).toHaveBeenCalled();
      expect(consoleSpy.mock.calls[0][0]).toBe('Failed to load persisted state:');
      expect(consoleSpy.mock.calls[0][1]).toBeInstanceOf(SyntaxError);
      
      consoleSpy.mockRestore();
    });

    it('clears localStorage when resetting state', () => {
      render(
        <StudyGuideProvider>
          <TestComponent />
        </StudyGuideProvider>
      );
      
      // Set some state first
      fireEvent.click(screen.getByText('Set Section'));
      
      // Reset state
      fireEvent.click(screen.getByText('Reset'));
      
      expect(localStorageMock.removeItem).toHaveBeenCalledWith('hardware-study-guide-state');
    });

    it('provides clear persistence function', () => {
      render(
        <StudyGuideProvider>
          <NavigationTestComponent />
        </StudyGuideProvider>
      );
      
      fireEvent.click(screen.getByText('Clear Persistence'));
      
      expect(localStorageMock.removeItem).toHaveBeenCalledWith('hardware-study-guide-state');
    });

    it('handles localStorage errors gracefully', () => {
      localStorageMock.setItem.mockImplementation(() => {
        throw new Error('Storage quota exceeded');
      });
      const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
      
      render(
        <StudyGuideProvider>
          <TestComponent />
        </StudyGuideProvider>
      );
      
      fireEvent.click(screen.getByText('Set Section'));
      
      expect(consoleSpy).toHaveBeenCalledWith('Failed to save state to storage:', expect.any(Error));
      
      consoleSpy.mockRestore();
    });
  });

  describe('State Validation', () => {
    it('validates persisted section exists in available sections', async () => {
      localStorageMock.getItem.mockReturnValue(JSON.stringify({
        currentSection: 'non-existent-section',
        currentQuestion: null
      }));
      
      render(
        <StudyGuideProvider>
          <TestComponent />
        </StudyGuideProvider>
      );
      
      // Wait for validation to complete
      await new Promise(resolve => setTimeout(resolve, 10));
      
      // Should reset to null since section doesn't exist
      expect(screen.getByTestId('current-section')).toHaveTextContent('none');
    });

    it('validates persisted question exists in current section', async () => {
      localStorageMock.getItem.mockReturnValue(JSON.stringify({
        currentSection: 'basic-circuits',
        currentQuestion: 'non-existent-question'
      }));
      
      render(
        <StudyGuideProvider>
          <TestComponent />
        </StudyGuideProvider>
      );
      
      // Wait for validation to complete
      await new Promise(resolve => setTimeout(resolve, 10));
      
      // Section should be preserved, question should be reset
      expect(screen.getByTestId('current-section')).toHaveTextContent('basic-circuits');
      expect(screen.getByTestId('current-question')).toHaveTextContent('none');
    });
  });

  describe('Enhanced Navigation Functions', () => {
    it('provides reset to initial state function', () => {
      render(
        <StudyGuideProvider>
          <NavigationTestComponent />
        </StudyGuideProvider>
      );
      
      // Set some state
      fireEvent.click(screen.getByText('Navigate to Section'));
      fireEvent.click(screen.getByText('Navigate to Question'));
      
      // Reset to initial state
      fireEvent.click(screen.getByText('Reset to Initial'));
      
      expect(screen.getByTestId('nav-current-section')).toHaveTextContent('none');
      expect(screen.getByTestId('nav-current-question')).toHaveTextContent('none');
      expect(localStorageMock.removeItem).toHaveBeenCalledWith('hardware-study-guide-state');
    });
  });
});