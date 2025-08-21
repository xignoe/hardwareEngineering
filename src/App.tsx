import React, { useState, useEffect } from 'react';
import './App.css';
import { Layout } from './components/Layout';
import { Navigation } from './components/Navigation';
import { SectionList } from './components/SectionList';
import { QuestionCard } from './components/QuestionCard';
import { ErrorBoundary } from './components/ErrorBoundary';
import { LoadingSpinner } from './components/LoadingSpinner';
import { StudyGuideProvider, useNavigation } from './context/StudyGuideContext';

/**
 * Main App Content Component
 * Handles the routing logic and orchestrates all other components
 */
const AppContent: React.FC = () => {
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

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Wait for sections to load and handle any initialization errors
  useEffect(() => {
    const initializeApp = async () => {
      try {
        setError(null);
        
        // Wait for sections to be loaded (they start as empty array)
        if (state.sections.length === 0) {
          setIsLoading(true);
          return; // Wait for sections to load
        }
        
        // Sections are loaded, app is ready
        setIsLoading(false);
      } catch (err) {
        console.error('Failed to initialize app:', err);
        setError(err instanceof Error ? err.message : 'Failed to load study guide');
        setIsLoading(false);
      }
    };

    initializeApp();
  }, [state.sections]);

  // Handle navigation actions
  const handleSectionSelect = async (sectionId: string) => {
    try {
      await navigateToSection(sectionId);
      // Focus management: focus main content after navigation
      setTimeout(() => {
        const mainContent = document.getElementById('main-content');
        if (mainContent) {
          mainContent.focus();
        }
      }, 100);
    } catch (err) {
      console.error('Navigation error:', err);
      setError('Failed to navigate to section');
    }
  };

  const handleQuestionSelect = (questionId: string) => {
    try {
      navigateToQuestion(questionId);
      // Focus management: focus the question after navigation
      setTimeout(() => {
        const questionElement = document.querySelector('[data-testid="question-button"]');
        if (questionElement && questionElement instanceof HTMLElement) {
          questionElement.focus();
        }
      }, 100);
    } catch (err) {
      console.error('Navigation error:', err);
      setError('Failed to navigate to question');
    }
  };

  const handleNavigateBack = async () => {
    try {
      navigateToPreviousQuestion();
    } catch (err) {
      console.error('Navigation error:', err);
      setError('Failed to navigate to previous question');
    }
  };

  const handleNavigateForward = () => {
    try {
      navigateToNextQuestion();
    } catch (err) {
      console.error('Navigation error:', err);
      setError('Failed to navigate to next question');
    }
  };

  // Get current data
  const currentSection = getCurrentSection();
  const currentQuestion = getCurrentQuestion();

  // Global keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      try {
        // Only handle global shortcuts when not in an input/textarea/select
        const activeElement = document.activeElement;
        const isInInput = activeElement && (
          activeElement.tagName === 'INPUT' ||
          activeElement.tagName === 'TEXTAREA' ||
          activeElement.tagName === 'SELECT' ||
          activeElement.getAttribute('contenteditable') === 'true'
        );

        if (isInInput) return;

        // Global keyboard shortcuts
        switch (event.key) {
          case 'Escape':
            // Go back one level
            event.preventDefault();
            if (currentQuestion) {
              // From question to section
              navigateToSection(currentSection?.id || '').catch(console.error);
            } else if (currentSection) {
              // From section to home
              navigateToSection('').catch(console.error);
            }
            break;
        }
      } catch (err) {
        console.error('Keyboard navigation error:', err);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [currentSection, currentQuestion, navigateToSection]);

  // Loading state
  if (isLoading) {
    return (
      <Layout>
        <LoadingSpinner 
          size="large" 
          message="Loading Hardware Engineering Study Guide..." 
        />
      </Layout>
    );
  }

  // Error state
  if (error) {
    return (
      <Layout>
        <div className="error-state" role="alert" aria-live="assertive">
          <h2 id="error-heading">Error Loading Study Guide</h2>
          <p aria-describedby="error-heading">{error}</p>
          <button 
            onClick={() => {
              setError(null);
              window.location.reload();
            }}
            className="retry-button"
            aria-label="Retry loading the study guide"
          >
            Retry
          </button>
        </div>
      </Layout>
    );
  }

  // Render different views based on current state
  const renderContent = () => {
    // Question view - show individual question with navigation
    if (currentSection && currentQuestion) {
      return (
        <>
          <Navigation
            currentSection={currentSection}
            currentQuestion={currentQuestion}
            sections={state.sections}
            onSectionSelect={handleSectionSelect}
            onQuestionSelect={handleQuestionSelect}
            onNavigateBack={handleNavigateBack}
            onNavigateForward={handleNavigateForward}
            canNavigateBack={canNavigatePrevious()}
            canNavigateForward={canNavigateNext()}
          />
          <section className="question-view" aria-labelledby="current-question">
            <h2 id="current-question" className="visually-hidden">
              Current Question: {currentQuestion.question}
            </h2>
            <QuestionCard
              question={currentQuestion}
              isExpanded={true}
              showAnswer={true}
              showTags={true}
              showDifficulty={true}
            />
          </section>
        </>
      );
    }

    // Section view - show all questions in the section
    if (currentSection && !currentQuestion) {
      return (
        <>
          <Navigation
            currentSection={currentSection}
            currentQuestion={null}
            sections={state.sections}
            onSectionSelect={handleSectionSelect}
            onQuestionSelect={handleQuestionSelect}
            onNavigateBack={handleNavigateBack}
            onNavigateForward={handleNavigateForward}
            canNavigateBack={false}
            canNavigateForward={false}
          />
          <div className="section-view">
            <header className="section-header">
              <h1 id="section-title">{currentSection.title}</h1>
              <p className="section-description" aria-describedby="section-title">{currentSection.description}</p>
              <p className="section-meta" aria-live="polite">
                {currentSection.questionCount} question{currentSection.questionCount !== 1 ? 's' : ''}
              </p>
            </header>
            <section aria-labelledby="questions-heading">
              <h2 id="questions-heading" className="visually-hidden">Questions in this section</h2>
              <div className="questions-list" role="list">
                {currentSection.questions.map((question, index) => (
                  <div key={question.id} className="question-item" role="listitem">
                    <div className="question-number" aria-label={`Question ${index + 1} of ${currentSection.questionCount}`}>
                      Question {index + 1}
                    </div>
                    <QuestionCard
                      question={question}
                      showAnswer={true}
                      showTags={true}
                      showDifficulty={true}
                      onQuestionSelect={handleQuestionSelect}
                    />
                  </div>
                ))}
              </div>
            </section>
          </div>
        </>
      );
    }

    // Home view - show all sections
    return (
      <>
        <header className="home-header">
          <h1 id="main-heading">Hardware Engineering Study Guide</h1>
          <p className="home-description" aria-describedby="main-heading">
            A clean and simple study guide for hardware engineering concepts. 
            Choose a section below to begin studying.
          </p>
        </header>
        <section aria-labelledby="sections-heading">
          <h2 id="sections-heading" className="visually-hidden">Study Sections</h2>
          <SectionList
            sections={state.sections}
            onSectionSelect={handleSectionSelect}
            currentSection={state.currentSection}
            showQuestionCount={true}
            layout="grid"
          />
        </section>
      </>
    );
  };

  return (
    <Layout>
      <ErrorBoundary
        onError={(error, errorInfo) => {
          console.error('Component error:', error, errorInfo);
          setError('A component error occurred. Please try refreshing the page.');
        }}
      >
        {renderContent()}
      </ErrorBoundary>
    </Layout>
  );
};

/**
 * Main App Component
 * Provides context and error boundary for the entire application
 */
function App() {
  return (
    <ErrorBoundary
      onError={(error, errorInfo) => {
        console.error('App-level error:', error, errorInfo);
      }}
    >
      <StudyGuideProvider>
        <AppContent />
      </StudyGuideProvider>
    </ErrorBoundary>
  );
}

export default App;
