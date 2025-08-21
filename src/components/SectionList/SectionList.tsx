import React from 'react';
import type { SectionListProps } from '../../types/components';
import styles from './SectionList.module.css';

/**
 * SectionList Component
 * 
 * Displays available study sections in a card-based layout with section titles
 * and question counts. Provides navigation to individual sections.
 * 
 * Requirements addressed:
 * - 2.1: Display questions organized into logical sections
 * - 2.2: Show all questions and answers for selected topic
 * - 2.3: Clearly indicate section name and question count
 */
export const SectionList: React.FC<SectionListProps> = ({
  sections,
  onSectionSelect,
  currentSection = null,
  showQuestionCount = true,
  layout = 'grid',
  className = '',
  'data-testid': dataTestId = 'section-list'
}) => {
  const handleSectionClick = (sectionId: string) => {
    onSectionSelect(sectionId);
  };

  const handleKeyDown = (event: React.KeyboardEvent, sectionId: string) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleSectionClick(sectionId);
    }
  };

  // Focus management for keyboard navigation
  const handleKeyNavigation = (event: React.KeyboardEvent, index: number) => {
    const cards = document.querySelectorAll('[data-section-card]');
    let nextIndex = index;

    switch (event.key) {
      case 'ArrowDown':
      case 'ArrowRight':
        event.preventDefault();
        nextIndex = (index + 1) % cards.length;
        break;
      case 'ArrowUp':
      case 'ArrowLeft':
        event.preventDefault();
        nextIndex = (index - 1 + cards.length) % cards.length;
        break;
      case 'Home':
        event.preventDefault();
        nextIndex = 0;
        break;
      case 'End':
        event.preventDefault();
        nextIndex = cards.length - 1;
        break;
      default:
        return;
    }

    (cards[nextIndex] as HTMLElement)?.focus();
  };

  if (sections.length === 0) {
    return (
      <div className={`${styles.emptyState} ${className}`} data-testid={`${dataTestId}-empty`}>
        <p className={styles.emptyMessage}>No study sections available.</p>
      </div>
    );
  }

  return (
    <div 
      className={`${styles.sectionList} ${styles[layout]} ${className}`}
      data-testid={dataTestId}
      role="list"
      aria-label="Study sections"
    >
      {sections.map((section, index) => {
        const isActive = currentSection === section.id;
        
        return (
          <div
            key={section.id}
            className={`${styles.sectionCard} ${isActive ? styles.active : ''}`}
            onClick={() => handleSectionClick(section.id)}
            onKeyDown={(e) => {
              handleKeyDown(e, section.id);
              handleKeyNavigation(e, index);
            }}
            role="listitem"
            tabIndex={0}
            aria-label={`Study section: ${section.title}${showQuestionCount ? ` (${section.questionCount} questions)` : ''}`}
            aria-current={isActive ? 'page' : undefined}
            data-testid={`${dataTestId}-card-${section.id}`}
            data-section-card
          >
            <article>
            <header className={styles.cardHeader}>
              <h3 className={styles.sectionTitle} id={`section-title-${section.id}`}>
                {section.title}
              </h3>
              {showQuestionCount && (
                <span 
                  className={styles.questionCount}
                  data-testid={`${dataTestId}-count-${section.id}`}
                  aria-label={`${section.questionCount} questions available`}
                >
                  {section.questionCount} question{section.questionCount !== 1 ? 's' : ''}
                </span>
              )}
            </header>
            
            <p className={styles.sectionDescription} aria-describedby={`section-title-${section.id}`}>
              {section.description}
            </p>
            
            <footer className={styles.cardFooter}>
              <span className={styles.studyPrompt} aria-hidden="true">
                Click to study →
              </span>
            </footer>
            </article>
          </div>
        );
      })}
    </div>
  );
};

export default SectionList;