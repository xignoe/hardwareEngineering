/**
 * Tests for basic circuits question data
 */

import { describe, it, expect } from 'vitest';
import { basicCircuitsQuestions, basicCircuitsSection, sections, allQuestions } from '../questions';
import { validateQuestion, validateSection } from '../../types/validation';
import type { Question, Section } from '../../types';

// Mock data for accessibility tests
export const mockQuestions: Question[] = [
  {
    id: 'test-001',
    question: 'What is a test question?',
    answer: 'This is a test answer with **bold text** and formulas like V = I × R.',
    section: 'test-section',
    tags: ['test', 'example'],
    difficulty: 'basic'
  },
  {
    id: 'test-002',
    question: 'What is another test question?',
    answer: 'This is another test answer.',
    section: 'test-section',
    tags: ['test', 'example', 'second'],
    difficulty: 'intermediate'
  }
];

export const mockSections: Section[] = [
  {
    id: 'test-section',
    title: 'Test Section',
    description: 'A test section for accessibility testing.',
    questionCount: 2,
    questions: mockQuestions
  },
  {
    id: 'test-section-2',
    title: 'Second Test Section',
    description: 'Another test section for accessibility testing.',
    questionCount: 1,
    questions: [mockQuestions[0]]
  }
];

describe('Basic Circuits Questions Data', () => {
  it('should have exactly 6 questions for MVP', () => {
    expect(basicCircuitsQuestions).toHaveLength(6);
  });

  it('should have all questions with valid structure', () => {
    basicCircuitsQuestions.forEach((question, index) => {
      const validation = validateQuestion(question);
      expect(validation.isValid, `Question ${index + 1} should be valid: ${validation.errors.map(e => e.message).join(', ')}`).toBe(true);
    });
  });

  it('should have all questions in basic-circuits section', () => {
    basicCircuitsQuestions.forEach((question) => {
      expect(question.section).toBe('basic-circuits');
    });
  });

  it('should have unique question IDs', () => {
    const ids = basicCircuitsQuestions.map(q => q.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);
  });

  it('should have all questions with basic difficulty', () => {
    basicCircuitsQuestions.forEach((question) => {
      expect(question.difficulty).toBe('basic');
    });
  });

  it('should cover required topics', () => {
    const allTags = basicCircuitsQuestions.flatMap(q => q.tags || []);
    
    // Should include Ohm's law topics
    expect(allTags).toContain('ohms-law');
    
    // Should include Kirchhoff's laws
    expect(allTags).toContain('kirchhoff');
    expect(allTags).toContain('kcl');
    expect(allTags).toContain('kvl');
    
    // Should include power calculations
    expect(allTags).toContain('power');
  });
});

describe('Basic Circuits Section', () => {
  it('should have valid section structure', () => {
    const validation = validateSection(basicCircuitsSection);
    expect(validation.isValid, `Section should be valid: ${validation.errors.map(e => e.message).join(', ')}`).toBe(true);
  });

  it('should have correct question count', () => {
    expect(basicCircuitsSection.questionCount).toBe(6);
    expect(basicCircuitsSection.questions).toHaveLength(6);
  });

  it('should have correct section ID', () => {
    expect(basicCircuitsSection.id).toBe('basic-circuits');
  });

  it('should have descriptive title and description', () => {
    expect(basicCircuitsSection.title).toBe('Basic Circuits');
    expect(basicCircuitsSection.description).toContain('Fundamental concepts');
  });
});

describe('Exported Data Arrays', () => {
  it('should export sections array with basic circuits', () => {
    expect(sections).toHaveLength(1);
    expect(sections[0]).toBe(basicCircuitsSection);
  });

  it('should export allQuestions array with all basic circuits questions', () => {
    expect(allQuestions).toHaveLength(6);
    expect(allQuestions).toEqual(basicCircuitsQuestions);
  });
});