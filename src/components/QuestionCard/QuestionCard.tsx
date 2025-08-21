/**
 * QuestionCard Component
 * Displays individual questions with expandable answer sections
 */

import React, { useState } from 'react';
import type { QuestionCardProps } from '../../types';
import styles from './QuestionCard.module.css';

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  isExpanded: controlledExpanded,
  onToggleExpanded,
  showAnswer = true,
  showTags = true,
  showDifficulty = true,
  onQuestionSelect,
  className = '',
  'data-testid': testId = 'question-card'
}) => {
  // Internal state for expansion when not controlled
  const [internalExpanded, setInternalExpanded] = useState(false);
  
  // Use controlled state if provided, otherwise use internal state
  const isExpanded = controlledExpanded !== undefined ? controlledExpanded : internalExpanded;
  
  const handleToggleExpanded = () => {
    if (onToggleExpanded) {
      onToggleExpanded();
    } else {
      setInternalExpanded(!internalExpanded);
    }
  };

  const handleQuestionClick = () => {
    if (onQuestionSelect) {
      onQuestionSelect(question.id);
    }
    if (showAnswer) {
      handleToggleExpanded();
    }
  };

  const formatAnswer = (answer: string) => {
    // Split answer into paragraphs and format mathematical formulas
    const paragraphs = answer.split('\n\n');
    
    return paragraphs.map((paragraph, index) => {
      // Check if paragraph contains mathematical formulas (indicated by ** or specific patterns)
      if (paragraph.includes('**') || paragraph.includes('=') || paragraph.includes('×') || paragraph.includes('÷')) {
        // Handle bold formatting and mathematical expressions
        const formattedParagraph = paragraph
          .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
          .replace(/([A-Z]\s*=\s*[^,\n]+)/g, '<code class="formula">$1</code>');
        
        return (
          <div 
            key={index} 
            className={styles.answerParagraph}
            dangerouslySetInnerHTML={{ __html: formattedParagraph }}
          />
        );
      }
      
      // Regular paragraph
      return (
        <p key={index} className={styles.answerParagraph}>
          {paragraph}
        </p>
      );
    });
  };

  return (
    <article 
      className={`${styles.questionCard} ${className}`}
      data-testid={testId}
      aria-labelledby={`question-${question.id}`}
    >
      {/* Question Header */}
      <header className={styles.questionHeader}>
        <button
          className={styles.questionButton}
          onClick={handleQuestionClick}
          aria-expanded={isExpanded}
          aria-controls={`answer-${question.id}`}
          aria-describedby={`question-meta-${question.id}`}
          data-testid="question-button"
          type="button"
        >
          <h3 id={`question-${question.id}`} className={styles.questionText}>
            {question.question}
          </h3>
          {showAnswer && (
            <span 
              className={`${styles.expandIcon} ${isExpanded ? styles.expanded : ''}`}
              aria-hidden="true"
            >
              ▼
            </span>
          )}
        </button>
        
        {/* Question Metadata */}
        <div id={`question-meta-${question.id}`} className={styles.questionMeta}>
          {showDifficulty && question.difficulty && (
            <span 
              className={`${styles.difficultyBadge} ${styles[question.difficulty]}`}
              data-testid="difficulty-badge"
              aria-label={`Difficulty level: ${question.difficulty}`}
            >
              {question.difficulty}
            </span>
          )}
          {showTags && question.tags && question.tags.length > 0 && (
            <div className={styles.tags} data-testid="question-tags" role="list" aria-label="Question topics">
              {question.tags.slice(0, 3).map(tag => (
                <span key={tag} className={styles.tag} role="listitem">
                  {tag}
                </span>
              ))}
              {question.tags.length > 3 && (
                <span className={styles.tagMore} aria-label={`${question.tags.length - 3} more topics`}>
                  +{question.tags.length - 3}
                </span>
              )}
            </div>
          )}
        </div>
      </header>

      {/* Expandable Answer Section */}
      {showAnswer && (
        <section 
          id={`answer-${question.id}`}
          className={`${styles.answerSection} ${isExpanded ? styles.expanded : ''}`}
          data-testid="answer-section"
          aria-labelledby={`answer-heading-${question.id}`}
          aria-hidden={!isExpanded}
        >
          <h4 id={`answer-heading-${question.id}`} className="visually-hidden">
            Answer
          </h4>
          <div className={styles.answerContent} aria-live="polite">
            {formatAnswer(question.answer)}
          </div>
        </section>
      )}
    </article>
  );
};

export default QuestionCard;