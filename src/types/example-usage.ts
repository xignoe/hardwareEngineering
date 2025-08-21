/**
 * Example usage of the TypeScript interfaces and validation utilities
 * This file demonstrates how to use the types and validates they work correctly
 */

import type { Question, Section, StudyGuideState, StudyGuideAction } from './index';
import { validateQuestion, validateSection, isQuestion, isSection } from './validation';

// Example question data
const exampleQuestion: Question = {
  id: 'basic-circuits-001',
  question: 'What is Ohm\'s law and how is it expressed mathematically?',
  answer: 'Ohm\'s law states that the voltage across a conductor is directly proportional to the current flowing through it, provided the temperature remains constant. It is expressed as V = I × R, where V is voltage in volts, I is current in amperes, and R is resistance in ohms.',
  section: 'basic-circuits',
  tags: ['ohms-law', 'fundamentals', 'voltage', 'current', 'resistance'],
  difficulty: 'basic'
};

// Example section data
const exampleSection: Section = {
  id: 'basic-circuits',
  title: 'Basic Circuits',
  description: 'Fundamental concepts in circuit analysis including Ohm\'s law, KCL, KVL, and power calculations.',
  questionCount: 1,
  questions: [exampleQuestion]
};

// Example application state
const exampleState: StudyGuideState = {
  currentSection: 'basic-circuits',
  currentQuestion: 'basic-circuits-001',
  sections: [exampleSection]
};

// Example state actions
const setSectionAction: StudyGuideAction = {
  type: 'SET_CURRENT_SECTION',
  payload: 'basic-circuits'
};

const setQuestionAction: StudyGuideAction = {
  type: 'SET_CURRENT_QUESTION',
  payload: 'basic-circuits-001'
};

const resetAction: StudyGuideAction = {
  type: 'RESET_STATE'
};

// Example validation usage
export function validateExampleData() {
  // Validate the example question
  const questionValidation = validateQuestion(exampleQuestion);
  console.log('Question validation:', questionValidation);

  // Validate the example section
  const sectionValidation = validateSection(exampleSection);
  console.log('Section validation:', sectionValidation);

  // Use type guards
  const isValidQuestion = isQuestion(exampleQuestion);
  const isValidSection = isSection(exampleSection);
  
  console.log('Type guard results:', { isValidQuestion, isValidSection });

  return {
    questionValid: questionValidation.isValid,
    sectionValid: sectionValidation.isValid,
    typeGuardsWork: isValidQuestion && isValidSection
  };
}

// Export example data for use in other parts of the application
export {
  exampleQuestion,
  exampleSection,
  exampleState,
  setSectionAction,
  setQuestionAction,
  resetAction
};