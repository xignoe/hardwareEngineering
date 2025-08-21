# Testing Documentation

This document describes the comprehensive test suite for the Hardware Engineering Study Guide application.

## Test Structure

The test suite is organized into several categories to ensure comprehensive coverage:

### 1. Unit Tests
- **Location**: `**/*.test.tsx` and `**/*.test.ts`
- **Purpose**: Test individual components and functions in isolation
- **Coverage**: All components, utilities, and data models
- **Run with**: `npm run test:unit`

### 2. Integration Tests  
- **Location**: `**/*.integration.test.tsx`
- **Purpose**: Test component interactions and data flow
- **Coverage**: Navigation flows, state management, component communication
- **Run with**: `npm run test:integration`

### 3. Accessibility Tests
- **Location**: `**/*.accessibility.test.tsx`
- **Purpose**: Ensure WCAG 2.1 AA compliance
- **Coverage**: All interactive components, keyboard navigation, screen reader support
- **Run with**: `npm run test:accessibility`

### 4. End-to-End Tests
- **Location**: `src/__tests__/App.e2e.test.tsx`
- **Purpose**: Test complete user journeys
- **Coverage**: Critical user paths, error recovery, data persistence
- **Run with**: `npm run test:e2e`

### 5. Performance Tests
- **Location**: `src/__tests__/App.performance.test.tsx`
- **Purpose**: Verify performance requirements are met
- **Coverage**: Load times, navigation speed, memory usage
- **Run with**: `npm run test:performance`

## Test Coverage

### Components Tested
- ✅ App (main application)
- ✅ Layout (responsive layout system)
- ✅ Navigation (breadcrumb and question navigation)
- ✅ QuestionCard (question display and interaction)
- ✅ SectionList (section overview and selection)
- ✅ LoadingSpinner (loading states)
- ✅ ErrorBoundary (error handling)
- ✅ StudyGuideContext (state management)

### Utilities Tested
- ✅ Data validation functions
- ✅ Type guards
- ✅ Question and section data models

### Requirements Coverage
All requirements from `.kiro/specs/hardware-study-guide/requirements.md` are covered:

#### Requirement 1 (User Interface)
- 1.1: Minimalist interface - tested in App.basic.test.tsx
- 1.2: Intuitive navigation - tested in Navigation.test.tsx
- 1.3: Readable format - tested in accessibility tests

#### Requirement 2 (Section Organization)
- 2.1: Logical sections - tested in SectionList.test.tsx
- 2.2: Section questions - tested in App.integration.test.tsx
- 2.3: Section indicators - tested in SectionList.test.tsx

#### Requirement 3 (Question Display)
- 3.1: Basic circuits questions - tested in questions.test.ts
- 3.2: Complete answers - tested in QuestionCard.test.tsx
- 3.3: Mathematical formulas - tested in QuestionCard.integration.test.tsx
- 3.4: Explanations and analogies - tested in data integration tests

#### Requirement 4 (MVP Content)
- 4.1: Minimum 6 questions - tested in questions.test.ts
- 4.2: Complete answers - tested in QuestionCard tests
- 4.3: Fundamental laws - tested in data validation tests

#### Requirement 5 (Responsive Design)
- 5.1: Mobile-friendly - tested in Layout.test.tsx
- 5.2: Desktop optimization - tested in responsive tests
- 5.3: Consistent functionality - tested in App.e2e.test.tsx

#### Requirement 6 (Navigation)
- 6.1: Question navigation - tested in Navigation.test.tsx
- 6.2: Back navigation - tested in Navigation.integration.test.tsx
- 6.3: Context maintenance - tested in StudyGuideContext.test.tsx

## Running Tests

### All Tests
```bash
npm test
```

### With Coverage Report
```bash
npm run test:coverage
```

### Specific Test Categories
```bash
npm run test:unit           # Unit tests only
npm run test:integration    # Integration tests only
npm run test:accessibility  # Accessibility tests only
npm run test:e2e           # End-to-end tests only
npm run test:performance   # Performance tests only
```

### Watch Mode (for development)
```bash
npm run test:watch
```

### Interactive UI
```bash
npm run test:ui
```

## Coverage Thresholds

The test suite maintains minimum coverage thresholds:
- **Branches**: 80%
- **Functions**: 80%
- **Lines**: 80%
- **Statements**: 80%

## Test Tools and Libraries

### Core Testing Framework
- **Vitest**: Fast unit test runner with native TypeScript support
- **@testing-library/react**: React component testing utilities
- **@testing-library/jest-dom**: Custom Jest matchers for DOM testing

### Accessibility Testing
- **jest-axe**: Automated accessibility testing
- **@axe-core/react**: Runtime accessibility monitoring

### Mocking and Utilities
- **Vitest mocking**: Built-in mocking capabilities
- **jsdom**: DOM environment for Node.js testing

## Test Patterns and Best Practices

### Component Testing Pattern
```typescript
describe('ComponentName', () => {
  describe('Basic Rendering', () => {
    it('renders with default props', () => {
      // Test basic rendering
    });
  });

  describe('User Interactions', () => {
    it('handles click events', () => {
      // Test interactions
    });
  });

  describe('Accessibility', () => {
    it('has proper ARIA attributes', () => {
      // Test accessibility
    });
  });
});
```

### Integration Testing Pattern
```typescript
describe('Feature Integration', () => {
  it('supports complete user flow', async () => {
    // Test end-to-end user journey
  });
});
```

### Accessibility Testing Pattern
```typescript
describe('Component Accessibility', () => {
  it('should not have accessibility violations', async () => {
    const { container } = render(<Component />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
```

## Continuous Integration

Tests are designed to run in CI environments with:
- Consistent results across different environments
- Proper error handling and cleanup
- Performance budgets for build times
- Coverage reporting integration

## Debugging Tests

### Common Issues
1. **Async operations**: Use `waitFor` for async state changes
2. **DOM queries**: Use appropriate queries (`getByRole`, `getByLabelText`, etc.)
3. **Mock cleanup**: Ensure mocks are cleared between tests
4. **Memory leaks**: Clean up event listeners and timers

### Debug Commands
```bash
# Run specific test file
npx vitest run src/components/Navigation/__tests__/Navigation.test.tsx

# Run with verbose output
npx vitest run --reporter=verbose

# Run in debug mode
npx vitest run --inspect-brk
```

## Future Test Enhancements

### Planned Additions
- Visual regression testing for UI consistency
- Cross-browser compatibility testing
- Mobile device testing
- Load testing for larger datasets
- Internationalization testing

### Test Data Management
- Expand mock data for edge cases
- Add test data generators
- Implement test data factories
- Create realistic test scenarios

This comprehensive test suite ensures the Hardware Engineering Study Guide meets all requirements and provides a reliable, accessible, and performant user experience.