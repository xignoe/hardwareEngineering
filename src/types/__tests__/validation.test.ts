/**
 * Tests for validation utilities
 */

import { describe, it, expect } from 'vitest';
import {
  validateQuestion,
  validateSection,
  validateQuestions,
  validateSections,
  isQuestion,
  isSection
} from '../validation';
import type { Question, Section } from '../index';

describe('Question Validation', () => {
  const validQuestion: Question = {
    id: 'q1',
    question: 'What is Ohm\'s law?',
    answer: 'Ohm\'s law states that V = I × R',
    section: 'basic-circuits',
    tags: ['ohms-law', 'fundamentals'],
    difficulty: 'basic'
  };

  it('should validate a correct question', () => {
    const result = validateQuestion(validQuestion);
    expect(result.isValid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  it('should reject question with missing required fields', () => {
    const invalidQuestion = {
      id: '',
      question: 'What is Ohm\'s law?',
      // missing answer and section
    };

    const result = validateQuestion(invalidQuestion);
    expect(result.isValid).toBe(false);
    expect(result.errors.length).toBeGreaterThan(0);
    expect(result.errors.some(e => e.field === 'id')).toBe(true);
    expect(result.errors.some(e => e.field === 'answer')).toBe(true);
    expect(result.errors.some(e => e.field === 'section')).toBe(true);
  });

  it('should reject question with invalid difficulty', () => {
    const invalidQuestion = {
      ...validQuestion,
      difficulty: 'invalid-difficulty'
    };

    const result = validateQuestion(invalidQuestion);
    expect(result.isValid).toBe(false);
    expect(result.errors.some(e => e.field === 'difficulty')).toBe(true);
  });

  it('should reject question with invalid tags', () => {
    const invalidQuestion = {
      ...validQuestion,
      tags: ['valid-tag', '', 'another-valid-tag'] // empty string in tags
    };

    const result = validateQuestion(invalidQuestion);
    expect(result.isValid).toBe(false);
    expect(result.errors.some(e => e.field === 'tags')).toBe(true);
  });
});

describe('Section Validation', () => {
  const validQuestion: Question = {
    id: 'q1',
    question: 'What is Ohm\'s law?',
    answer: 'Ohm\'s law states that V = I × R',
    section: 'basic-circuits'
  };

  const validSection: Section = {
    id: 'basic-circuits',
    title: 'Basic Circuits',
    description: 'Fundamental circuit analysis concepts',
    questionCount: 1,
    questions: [validQuestion]
  };

  it('should validate a correct section', () => {
    const result = validateSection(validSection);
    expect(result.isValid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  it('should reject section with missing required fields', () => {
    const invalidSection = {
      id: '',
      title: 'Basic Circuits',
      // missing description, questionCount, and questions
    };

    const result = validateSection(invalidSection);
    expect(result.isValid).toBe(false);
    expect(result.errors.length).toBeGreaterThan(0);
    expect(result.errors.some(e => e.field === 'id')).toBe(true);
    expect(result.errors.some(e => e.field === 'description')).toBe(true);
    expect(result.errors.some(e => e.field === 'questionCount')).toBe(true);
  });

  it('should reject section with mismatched question count', () => {
    const invalidSection = {
      ...validSection,
      questionCount: 5 // doesn't match actual questions array length
    };

    const result = validateSection(invalidSection);
    expect(result.isValid).toBe(false);
    expect(result.errors.some(e => e.field === 'questionCount')).toBe(true);
  });

  it('should validate questions within section', () => {
    const invalidQuestion = {
      id: '',
      question: 'What is Ohm\'s law?',
      answer: '',
      section: 'basic-circuits'
    };

    const invalidSection = {
      ...validSection,
      questions: [invalidQuestion],
      questionCount: 1
    };

    const result = validateSection(invalidSection);
    expect(result.isValid).toBe(false);
    expect(result.errors.some(e => e.field.includes('questions[0]'))).toBe(true);
  });
});

describe('Type Guards', () => {
  const validQuestion: Question = {
    id: 'q1',
    question: 'What is Ohm\'s law?',
    answer: 'Ohm\'s law states that V = I × R',
    section: 'basic-circuits'
  };

  const validSection: Section = {
    id: 'basic-circuits',
    title: 'Basic Circuits',
    description: 'Fundamental circuit analysis concepts',
    questionCount: 1,
    questions: [validQuestion]
  };

  it('should correctly identify valid questions', () => {
    expect(isQuestion(validQuestion)).toBe(true);
    expect(isQuestion({ id: '', question: 'test' })).toBe(false);
    expect(isQuestion(null)).toBe(false);
    expect(isQuestion('not an object')).toBe(false);
  });

  it('should correctly identify valid sections', () => {
    expect(isSection(validSection)).toBe(true);
    expect(isSection({ id: '', title: 'test' })).toBe(false);
    expect(isSection(null)).toBe(false);
    expect(isSection('not an object')).toBe(false);
  });
});

describe('Array Validation', () => {
  const validQuestion: Question = {
    id: 'q1',
    question: 'What is Ohm\'s law?',
    answer: 'Ohm\'s law states that V = I × R',
    section: 'basic-circuits'
  };

  const validSection: Section = {
    id: 'basic-circuits',
    title: 'Basic Circuits',
    description: 'Fundamental circuit analysis concepts',
    questionCount: 1,
    questions: [validQuestion]
  };

  it('should validate array of questions', () => {
    const result = validateQuestions([validQuestion, validQuestion]);
    expect(result.isValid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  it('should validate array of sections', () => {
    const result = validateSections([validSection]);
    expect(result.isValid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  it('should detect duplicate section IDs', () => {
    const duplicateSection = { ...validSection };
    const result = validateSections([validSection, duplicateSection]);
    expect(result.isValid).toBe(false);
    expect(result.errors.some(e => e.message.includes('Duplicate section ID'))).toBe(true);
  });
});