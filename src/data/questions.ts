/**
 * Hardware Study Guide - Questions Data
 * Main entry point for question data with code splitting support
 */

import type { Question, Section } from '../types';
// import { availableSections, loadSection, getSectionMetadata } from './sectionLoader';

// Re-export section loader utilities for external use
export { loadSection, getSectionMetadata, availableSections, preloadSection } from './sectionLoader';

// Legacy exports for backward compatibility (will be deprecated)
// These load the basic circuits section synchronously for existing code
import { basicCircuitsQuestions, basicCircuitsSection } from './sections/basic-circuits';

// Export all sections (currently just basic circuits for MVP)
// Note: This will be deprecated in favor of dynamic loading
export const sections: Section[] = [
  basicCircuitsSection
];

// Export all questions (currently just basic circuits for MVP)  
// Note: This will be deprecated in favor of dynamic loading
export const allQuestions: Question[] = [
  ...basicCircuitsQuestions
];

// Legacy exports for backward compatibility
export { basicCircuitsQuestions, basicCircuitsSection };