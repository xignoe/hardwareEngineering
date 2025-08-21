import React, { createContext, useContext, useReducer, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { StudyGuideState, StudyGuideAction, StudyGuideContextType, Section, Question } from '../types';
import { availableSections, loadSection } from '../data/sectionLoader';

// Storage key for persistence
const STORAGE_KEY = 'hardware-study-guide-state';

// Load state from localStorage
const loadPersistedState = (): Partial<StudyGuideState> => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      // Only persist navigation state, not the sections data
      return {
        currentSection: parsed.currentSection || null,
        currentQuestion: parsed.currentQuestion || null
      };
    }
  } catch (error) {
    console.warn('Failed to load persisted state:', error);
  }
  return {};
};

// Save state to localStorage
const saveStateToStorage = (state: StudyGuideState): void => {
  try {
    const stateToSave = {
      currentSection: state.currentSection,
      currentQuestion: state.currentQuestion
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stateToSave));
  } catch (error) {
    console.warn('Failed to save state to storage:', error);
  }
};

// Initial state factory function
const createInitialState = (): StudyGuideState => {
  const persistedState = loadPersistedState();
  return {
    currentSection: persistedState.currentSection || null,
    currentQuestion: persistedState.currentQuestion || null,
    sections: [] // Will be populated dynamically
  };
};

// Base initial state (without persistence)
const baseInitialState: StudyGuideState = {
  currentSection: null,
  currentQuestion: null,
  sections: [] // Will be populated dynamically
};

// Reducer function with persistence
function studyGuideReducer(state: StudyGuideState, action: StudyGuideAction): StudyGuideState {
  let newState: StudyGuideState;
  
  switch (action.type) {
    case 'SET_CURRENT_SECTION':
      newState = {
        ...state,
        currentSection: action.payload,
        currentQuestion: null // Reset question when changing sections
      };
      break;
    
    case 'SET_CURRENT_QUESTION':
      newState = {
        ...state,
        currentQuestion: action.payload
      };
      break;
    
    case 'SET_SECTIONS':
      newState = {
        ...state,
        sections: action.payload
      };
      break;
    
    case 'RESET_STATE':
      newState = createInitialState();
      // Clear persisted state when resetting
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch (error) {
        console.warn('Failed to clear persisted state:', error);
      }
      break;
    
    case 'CLEAR_PERSISTENCE':
      newState = state;
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch (error) {
        console.warn('Failed to clear persisted state:', error);
      }
      break;
    
    default:
      return state;
  }
  
  // Save state to localStorage after each action (except for SET_SECTIONS)
  if (action.type !== 'SET_SECTIONS' && action.type !== 'CLEAR_PERSISTENCE') {
    saveStateToStorage(newState);
  }
  
  return newState;
}

// Create context
const StudyGuideContext = createContext<StudyGuideContextType | undefined>(undefined);

// Provider component
interface StudyGuideProviderProps {
  children: ReactNode;
}

export const StudyGuideProvider: React.FC<StudyGuideProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(studyGuideReducer, baseInitialState, createInitialState);

  // Load available sections on mount
  useEffect(() => {
    const loadAvailableSections = async () => {
      try {
        console.log('Loading sections...', availableSections.length, 'sections to load');
        
        // Load all sections dynamically
        const sectionPromises = availableSections.map(async (metadata) => {
          try {
            console.log(`Loading section: ${metadata.id}`);
            const section = await loadSection(metadata.id);
            console.log(`Loaded section: ${metadata.id} with ${section.questions.length} questions`);
            return section;
          } catch (error) {
            console.error(`Failed to load section ${metadata.id}:`, error);
            // Return a placeholder section if loading fails
            return {
              id: metadata.id,
              title: metadata.title,
              description: metadata.description,
              questionCount: 0,
              questions: []
            };
          }
        });

        const loadedSections = await Promise.all(sectionPromises);
        console.log('All sections loaded:', loadedSections.length, 'sections');
        dispatch({ type: 'SET_SECTIONS', payload: loadedSections });
      } catch (error) {
        console.error('Failed to load sections:', error);
        // Set empty sections array to prevent infinite loading
        dispatch({ type: 'SET_SECTIONS', payload: [] });
      }
    };

    loadAvailableSections();
  }, []);

  // Validate persisted state on mount - run only once after initial render
  useEffect(() => {
    const validatePersistedState = () => {
      let needsUpdate = false;
      let newSection = state.currentSection;
      let newQuestion = state.currentQuestion;

      // Check if current section exists in available sections
      if (state.currentSection) {
        const sectionExists = state.sections.some(section => section.id === state.currentSection);
        if (!sectionExists) {
          newSection = null;
          newQuestion = null;
          needsUpdate = true;
        }
      }

      // Check if current question exists in current section
      if (state.currentQuestion && newSection) {
        const section = state.sections.find(s => s.id === newSection);
        if (section) {
          const questionExists = section.questions.some(q => q.id === state.currentQuestion);
          if (!questionExists) {
            newQuestion = null;
            needsUpdate = true;
          }
        }
      }

      // Only dispatch if we need to update
      if (needsUpdate) {
        if (newSection !== state.currentSection) {
          dispatch({ type: 'SET_CURRENT_SECTION', payload: newSection });
        } else if (newQuestion !== state.currentQuestion) {
          dispatch({ type: 'SET_CURRENT_QUESTION', payload: newQuestion });
        }
      }
    };

    // Only validate if we have sections loaded and this is the initial mount
    if (state.sections.length > 0) {
      // Use setTimeout to allow the component to render first
      const timeoutId = setTimeout(validatePersistedState, 0);
      return () => clearTimeout(timeoutId);
    }
  }, []); // Run only once on mount

  const value: StudyGuideContextType = {
    state,
    dispatch
  };

  return (
    <StudyGuideContext.Provider value={value}>
      {children}
    </StudyGuideContext.Provider>
  );
};

// Custom hook to use the context
export const useStudyGuide = (): StudyGuideContextType => {
  const context = useContext(StudyGuideContext);
  if (context === undefined) {
    throw new Error('useStudyGuide must be used within a StudyGuideProvider');
  }
  return context;
};

// Navigation helper functions
export const useNavigation = () => {
  const { state, dispatch } = useStudyGuide();

  const setCurrentSection = (sectionId: string | null) => {
    dispatch({ type: 'SET_CURRENT_SECTION', payload: sectionId });
  };

  const setCurrentQuestion = (questionId: string | null) => {
    dispatch({ type: 'SET_CURRENT_QUESTION', payload: questionId });
  };

  const getCurrentSection = (): Section | null => {
    if (!state.currentSection) return null;
    return state.sections.find(section => section.id === state.currentSection) || null;
  };

  const getCurrentQuestion = (): Question | null => {
    if (!state.currentQuestion) return null;
    const section = getCurrentSection();
    if (!section) return null;
    return section.questions.find(question => question.id === state.currentQuestion) || null;
  };

  const navigateToNextQuestion = (): boolean => {
    const section = getCurrentSection();
    const question = getCurrentQuestion();
    
    if (!section || !question) return false;
    
    const currentIndex = section.questions.findIndex(q => q.id === question.id);
    if (currentIndex === -1 || currentIndex >= section.questions.length - 1) return false;
    
    const nextQuestion = section.questions[currentIndex + 1];
    setCurrentQuestion(nextQuestion.id);
    return true;
  };

  const navigateToPreviousQuestion = (): boolean => {
    const section = getCurrentSection();
    const question = getCurrentQuestion();
    
    if (!section || !question) return false;
    
    const currentIndex = section.questions.findIndex(q => q.id === question.id);
    if (currentIndex <= 0) return false;
    
    const previousQuestion = section.questions[currentIndex - 1];
    setCurrentQuestion(previousQuestion.id);
    return true;
  };

  const canNavigateNext = (): boolean => {
    const section = getCurrentSection();
    const question = getCurrentQuestion();
    
    if (!section || !question) return false;
    
    const currentIndex = section.questions.findIndex(q => q.id === question.id);
    return currentIndex !== -1 && currentIndex < section.questions.length - 1;
  };

  const canNavigatePrevious = (): boolean => {
    const section = getCurrentSection();
    const question = getCurrentQuestion();
    
    if (!section || !question) return false;
    
    const currentIndex = section.questions.findIndex(q => q.id === question.id);
    return currentIndex > 0;
  };

  const navigateToSection = async (sectionId: string) => {
    if (sectionId === '') {
      // Navigate to sections overview
      setCurrentSection(null);
      setCurrentQuestion(null);
    } else {
      // Check if section is already loaded
      const existingSection = state.sections.find(s => s.id === sectionId);
      if (!existingSection) {
        try {
          // Load the section dynamically
          const section = await loadSection(sectionId);
          dispatch({ type: 'SET_SECTIONS', payload: [...state.sections, section] });
        } catch (error) {
          console.error(`Failed to load section ${sectionId}:`, error);
          return;
        }
      }
      
      setCurrentSection(sectionId);
      setCurrentQuestion(null);
    }
  };

  const navigateToQuestion = (questionId: string) => {
    setCurrentQuestion(questionId);
  };

  const clearPersistedState = () => {
    dispatch({ type: 'CLEAR_PERSISTENCE' });
  };

  const resetToInitialState = () => {
    dispatch({ type: 'RESET_STATE' });
  };

  return {
    state,
    setCurrentSection,
    setCurrentQuestion,
    getCurrentSection,
    getCurrentQuestion,
    navigateToNextQuestion,
    navigateToPreviousQuestion,
    canNavigateNext,
    canNavigatePrevious,
    navigateToSection,
    navigateToQuestion,
    clearPersistedState,
    resetToInitialState
  };
};

export default StudyGuideContext;