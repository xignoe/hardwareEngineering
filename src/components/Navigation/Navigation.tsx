import React from 'react';
import type { Question, Section } from '../../types';
import styles from './Navigation.module.css';

export interface NavigationProps {
  currentSection: Section | null;
  currentQuestion: Question | null;
  sections: Section[];
  onSectionSelect: (sectionId: string) => void;
  onQuestionSelect: (questionId: string) => void;
  onNavigateBack: () => void;
  onNavigateForward: () => void;
  canNavigateBack: boolean;
  canNavigateForward: boolean;
  className?: string;
}

export const Navigation: React.FC<NavigationProps> = ({
  currentSection,
  currentQuestion,
  sections,
  onSectionSelect,
  onQuestionSelect,
  onNavigateBack,
  onNavigateForward,
  canNavigateBack,
  canNavigateForward,
  className = ''
}) => {
  const currentQuestionIndex = currentSection && currentQuestion 
    ? currentSection.questions.findIndex(q => q.id === currentQuestion.id)
    : -1;

  const totalQuestions = currentSection ? currentSection.questions.length : 0;

  return (
    <nav className={`${styles.navigation} ${className}`} aria-label="Study guide navigation" role="navigation">
      {/* Breadcrumb Navigation */}
      <nav className={styles.breadcrumb} aria-label="Breadcrumb navigation">
        <ol className={styles.breadcrumbList} role="list">
          <li className={styles.breadcrumbItem} role="listitem">
            <button
              className={styles.breadcrumbLink}
              onClick={() => onSectionSelect('')}
              aria-label="Go to sections overview"
              type="button"
            >
              Study Guide
            </button>
          </li>
          {currentSection && (
            <>
              <li className={styles.breadcrumbSeparator} aria-hidden="true" role="presentation">
                /
              </li>
              <li className={styles.breadcrumbItem} role="listitem">
                <button
                  className={styles.breadcrumbLink}
                  onClick={() => onSectionSelect(currentSection.id)}
                  aria-label={`Go to ${currentSection.title} section`}
                  type="button"
                >
                  {currentSection.title}
                </button>
              </li>
            </>
          )}
          {currentQuestion && (
            <>
              <li className={styles.breadcrumbSeparator} aria-hidden="true" role="presentation">
                /
              </li>
              <li className={styles.breadcrumbItem} role="listitem">
                <span className={styles.breadcrumbCurrent} aria-current="page">
                  Question {currentQuestionIndex + 1}
                </span>
              </li>
            </>
          )}
        </ol>
      </nav>

      {/* Section Selector */}
      {!currentQuestion && (
        <div className={styles.sectionSelector} role="region" aria-labelledby="section-selector-label">
          <label htmlFor="section-select" id="section-selector-label" className={styles.selectorLabel}>
            Jump to section:
          </label>
          <select
            id="section-select"
            className={styles.selectorDropdown}
            value={currentSection?.id || ''}
            onChange={(e) => onSectionSelect(e.target.value)}
            aria-label="Select a study section to navigate to"
            aria-describedby="section-selector-help"
          >
            <option value="">Select a section...</option>
            {sections.map((section) => (
              <option key={section.id} value={section.id}>
                {section.title} ({section.questionCount} questions)
              </option>
            ))}
          </select>
          <div id="section-selector-help" className="visually-hidden">
            Use this dropdown to quickly navigate to any study section
          </div>
        </div>
      )}

      {/* Question Navigation */}
      {currentSection && currentQuestion && (
        <div className={styles.questionNavigation} role="region" aria-labelledby="question-nav-heading">
          <h3 id="question-nav-heading" className="visually-hidden">Question Navigation</h3>
          
          <div className={styles.navigationControls} role="group" aria-label="Question navigation controls">
            <button
              className={`${styles.navButton} ${styles.navButtonPrev}`}
              onClick={onNavigateBack}
              disabled={!canNavigateBack}
              aria-label={`Go to previous question${!canNavigateBack ? ' (not available)' : ''}`}
              type="button"
            >
              <span className={styles.navButtonIcon} aria-hidden="true">←</span>
              Previous
            </button>

            <div className={styles.questionProgress} role="region" aria-labelledby="progress-label">
              <span id="progress-label" className={styles.progressText}>
                Question {currentQuestionIndex + 1} of {totalQuestions}
              </span>
              <div 
                className={styles.progressBar} 
                role="progressbar" 
                aria-valuenow={currentQuestionIndex + 1} 
                aria-valuemin={1} 
                aria-valuemax={totalQuestions}
                aria-label={`Progress: question ${currentQuestionIndex + 1} of ${totalQuestions}`}
              >
                <div 
                  className={styles.progressFill}
                  style={{ width: `${((currentQuestionIndex + 1) / totalQuestions) * 100}%` }}
                />
              </div>
            </div>

            <button
              className={`${styles.navButton} ${styles.navButtonNext}`}
              onClick={onNavigateForward}
              disabled={!canNavigateForward}
              aria-label={`Go to next question${!canNavigateForward ? ' (not available)' : ''}`}
              type="button"
            >
              Next
              <span className={styles.navButtonIcon} aria-hidden="true">→</span>
            </button>
          </div>

          {/* Question Selector for jumping within section */}
          <div className={styles.questionSelector} role="region" aria-labelledby="question-selector-label">
            <label htmlFor="question-select" id="question-selector-label" className={styles.selectorLabel}>
              Jump to question:
            </label>
            <select
              id="question-select"
              className={styles.selectorDropdown}
              value={currentQuestion.id}
              onChange={(e) => onQuestionSelect(e.target.value)}
              aria-label="Select a question in this section to navigate to"
              aria-describedby="question-selector-help"
            >
              {currentSection.questions.map((question, index) => (
                <option key={question.id} value={question.id}>
                  Question {index + 1}
                </option>
              ))}
            </select>
            <div id="question-selector-help" className="visually-hidden">
              Use this dropdown to quickly navigate to any question in the current section
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;