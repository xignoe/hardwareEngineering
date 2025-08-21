/**
 * Additional component prop and state type definitions
 */

import type { Question, Section } from './index';

// Common component props
export interface BaseComponentProps {
  className?: string;
  'data-testid'?: string;
}

// Layout component specific props
export interface LayoutProps extends BaseComponentProps {
  children: React.ReactNode;
  title?: string;
}

// Navigation component props with extended functionality
export interface NavigationProps extends BaseComponentProps {
  currentSection: string | null;
  currentQuestion: string | null;
  sections: Section[];
  onSectionChange: (sectionId: string) => void;
  onQuestionChange: (questionId: string) => void;
  onBack: () => void;
  showBreadcrumbs?: boolean;
  showProgress?: boolean;
}

// Section list component props
export interface SectionListProps extends BaseComponentProps {
  sections: Section[];
  onSectionSelect: (sectionId: string) => void;
  currentSection?: string | null;
  showQuestionCount?: boolean;
  layout?: 'grid' | 'list';
}

// Question card component props with enhanced features
export interface QuestionCardProps extends BaseComponentProps {
  question: Question;
  isExpanded?: boolean;
  onToggleExpanded?: () => void;
  showAnswer?: boolean;
  showTags?: boolean;
  showDifficulty?: boolean;
  onQuestionSelect?: (questionId: string) => void;
}

// Hook return types
export interface UseStudyGuideReturn {
  currentSection: Section | null;
  currentQuestion: Question | null;
  sections: Section[];
  navigateToSection: (sectionId: string) => void;
  navigateToQuestion: (questionId: string) => void;
  goBack: () => void;
  getNextQuestion: () => Question | null;
  getPreviousQuestion: () => Question | null;
  isLoading: boolean;
  error: string | null;
}

// Navigation state for complex navigation scenarios
export interface NavigationState {
  history: Array<{
    type: 'section' | 'question';
    id: string;
    timestamp: number;
  }>;
  currentIndex: number;
  canGoBack: boolean;
  canGoForward: boolean;
}

// Search and filter types for future extensibility
export interface SearchFilters {
  query?: string;
  section?: string;
  difficulty?: string[];
  tags?: string[];
}

export interface SearchResult {
  question: Question;
  relevanceScore: number;
  matchedFields: string[];
}

// Error handling types
export interface AppError {
  code: string;
  message: string;
  details?: Record<string, unknown>;
}

// Loading states for different parts of the application
export interface LoadingState {
  sections: boolean;
  questions: boolean;
  navigation: boolean;
}

// Theme and styling types
export interface ThemeConfig {
  colors: {
    primary: string;
    secondary: string;
    background: string;
    text: string;
    border: string;
  };
  spacing: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
  breakpoints: {
    mobile: string;
    tablet: string;
    desktop: string;
  };
}