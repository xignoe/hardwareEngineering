/**
 * Core TypeScript interfaces and data models for the Hardware Study Guide
 * Main barrel export file for all types
 */

import React from 'react';

// Difficulty levels for questions
export type DifficultyLevel = 'basic' | 'intermediate' | 'advanced';

// Core Question interface
export interface Question {
  id: string;
  question: string;
  answer: string;
  section: string;
  tags?: string[];
  difficulty?: DifficultyLevel;
}

// Section interface for organizing questions
export interface Section {
  id: string;
  title: string;
  description: string;
  questionCount: number;
  questions: Question[];
}

// Application state interface
export interface StudyGuideState {
  currentSection: string | null;
  currentQuestion: string | null;
  sections: Section[];
}

// State management action types
export type StudyGuideAction =
  | { type: 'SET_CURRENT_SECTION'; payload: string | null }
  | { type: 'SET_CURRENT_QUESTION'; payload: string | null }
  | { type: 'SET_SECTIONS'; payload: Section[] }
  | { type: 'RESET_STATE' }
  | { type: 'CLEAR_PERSISTENCE' };

// Context interface
export interface StudyGuideContextType {
  state: StudyGuideState;
  dispatch: React.Dispatch<StudyGuideAction>;
}

// Re-export all types from other files
export * from './components';
export * from './validation';