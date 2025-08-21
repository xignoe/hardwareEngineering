/**
 * Data validation utilities for question and section data
 */

import type { Question, Section, DifficultyLevel } from './index';

// Validation error types
export interface ValidationError {
  field: string;
  message: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
}

// Utility functions for validation
export const isValidDifficulty = (difficulty: string): difficulty is DifficultyLevel => {
  return ['basic', 'intermediate', 'advanced'].includes(difficulty);
};

export const isNonEmptyString = (value: unknown): value is string => {
  return typeof value === 'string' && value.trim().length > 0;
};

export const isValidArray = <T>(value: unknown, itemValidator?: (item: unknown) => item is T): value is T[] => {
  if (!Array.isArray(value)) return false;
  if (!itemValidator) return true;
  return value.every(itemValidator);
};

// Question validation
export const validateQuestion = (data: unknown): ValidationResult => {
  const errors: ValidationError[] = [];

  if (!data || typeof data !== 'object') {
    return {
      isValid: false,
      errors: [{ field: 'root', message: 'Question data must be an object' }]
    };
  }

  const question = data as Partial<Question>;

  // Validate required fields
  if (!isNonEmptyString(question.id)) {
    errors.push({ field: 'id', message: 'Question ID is required and must be a non-empty string' });
  }

  if (!isNonEmptyString(question.question)) {
    errors.push({ field: 'question', message: 'Question text is required and must be a non-empty string' });
  }

  if (!isNonEmptyString(question.answer)) {
    errors.push({ field: 'answer', message: 'Answer text is required and must be a non-empty string' });
  }

  if (!isNonEmptyString(question.section)) {
    errors.push({ field: 'section', message: 'Section is required and must be a non-empty string' });
  }

  // Validate optional fields
  if (question.tags !== undefined && !isValidArray(question.tags, isNonEmptyString)) {
    errors.push({ field: 'tags', message: 'Tags must be an array of non-empty strings' });
  }

  if (question.difficulty !== undefined && !isValidDifficulty(question.difficulty)) {
    errors.push({ field: 'difficulty', message: 'Difficulty must be "basic", "intermediate", or "advanced"' });
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

// Section validation
export const validateSection = (data: unknown): ValidationResult => {
  const errors: ValidationError[] = [];

  if (!data || typeof data !== 'object') {
    return {
      isValid: false,
      errors: [{ field: 'root', message: 'Section data must be an object' }]
    };
  }

  const section = data as Partial<Section>;

  // Validate required fields
  if (!isNonEmptyString(section.id)) {
    errors.push({ field: 'id', message: 'Section ID is required and must be a non-empty string' });
  }

  if (!isNonEmptyString(section.title)) {
    errors.push({ field: 'title', message: 'Section title is required and must be a non-empty string' });
  }

  if (!isNonEmptyString(section.description)) {
    errors.push({ field: 'description', message: 'Section description is required and must be a non-empty string' });
  }

  if (typeof section.questionCount !== 'number' || section.questionCount < 0) {
    errors.push({ field: 'questionCount', message: 'Question count must be a non-negative number' });
  }

  if (!Array.isArray(section.questions)) {
    errors.push({ field: 'questions', message: 'Questions must be an array' });
  } else {
    // Validate each question in the section
    section.questions.forEach((question, index) => {
      const questionValidation = validateQuestion(question);
      if (!questionValidation.isValid) {
        questionValidation.errors.forEach(error => {
          errors.push({
            field: `questions[${index}].${error.field}`,
            message: error.message
          });
        });
      }
    });

    // Validate that questionCount matches actual questions array length
    if (typeof section.questionCount === 'number' && section.questions.length !== section.questionCount) {
      errors.push({
        field: 'questionCount',
        message: `Question count (${section.questionCount}) does not match actual questions array length (${section.questions.length})`
      });
    }
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

// Utility function to validate an array of questions
export const validateQuestions = (questions: unknown[]): ValidationResult => {
  const errors: ValidationError[] = [];

  questions.forEach((question, index) => {
    const validation = validateQuestion(question);
    if (!validation.isValid) {
      validation.errors.forEach(error => {
        errors.push({
          field: `questions[${index}].${error.field}`,
          message: error.message
        });
      });
    }
  });

  return {
    isValid: errors.length === 0,
    errors
  };
};

// Utility function to validate an array of sections
export const validateSections = (sections: unknown[]): ValidationResult => {
  const errors: ValidationError[] = [];

  sections.forEach((section, index) => {
    const validation = validateSection(section);
    if (!validation.isValid) {
      validation.errors.forEach(error => {
        errors.push({
          field: `sections[${index}].${error.field}`,
          message: error.message
        });
      });
    }
  });

  // Check for duplicate section IDs
  const sectionIds = new Set<string>();
  sections.forEach((section, index) => {
    if (section && typeof section === 'object' && 'id' in section) {
      const id = (section as { id: unknown }).id;
      if (typeof id === 'string') {
        if (sectionIds.has(id)) {
          errors.push({
            field: `sections[${index}].id`,
            message: `Duplicate section ID: ${id}`
          });
        } else {
          sectionIds.add(id);
        }
      }
    }
  });

  return {
    isValid: errors.length === 0,
    errors
  };
};

// Type guards for runtime type checking
export const isQuestion = (data: unknown): data is Question => {
  return validateQuestion(data).isValid;
};

export const isSection = (data: unknown): data is Section => {
  return validateSection(data).isValid;
};