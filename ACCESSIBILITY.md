# Accessibility Features

This document outlines the accessibility features implemented in the Hardware Engineering Study Guide application.

## Overview

The application has been designed and implemented with accessibility as a core requirement, following WCAG 2.1 AA guidelines and modern web accessibility best practices.

## Implemented Features

### 1. Semantic HTML Structure

- **Proper heading hierarchy**: Uses h1-h4 elements in logical order
- **Landmark roles**: Main content areas use semantic HTML5 elements (main, nav, section, article, header, footer)
- **Lists**: Proper use of ordered and unordered lists with list items
- **Form elements**: Proper labeling of form controls with associated labels

### 2. ARIA Labels and Properties

- **aria-label**: Descriptive labels for interactive elements
- **aria-labelledby**: References to heading elements that describe sections
- **aria-describedby**: References to elements that provide additional context
- **aria-current**: Indicates current page/location in navigation
- **aria-expanded**: Shows state of collapsible content
- **aria-controls**: Links controls to the content they control
- **aria-live**: Announces dynamic content changes to screen readers
- **aria-hidden**: Hides decorative elements from screen readers

### 3. Keyboard Navigation Support

#### Global Keyboard Shortcuts
- **Ctrl/Cmd + H**: Navigate to home (sections overview)
- **Left Arrow**: Previous question (when in question view)
- **Right Arrow**: Next question (when in question view)
- **Escape**: Go back one level (question → section → home)

#### Component-Level Navigation
- **Tab**: Navigate through interactive elements
- **Enter/Space**: Activate buttons and links
- **Arrow Keys**: Navigate between section cards
- **Home/End**: Jump to first/last section card

### 4. Focus Management

- **Skip to main content link**: Allows keyboard users to bypass navigation
- **Focus indicators**: Clear visual focus indicators on all interactive elements
- **Focus trapping**: Proper focus management during navigation
- **Programmatic focus**: Focus moves logically after navigation actions

### 5. Screen Reader Compatibility

- **Semantic structure**: Proper use of headings, landmarks, and lists
- **Alternative text**: Descriptive text for all meaningful content
- **Live regions**: Dynamic content changes are announced
- **Context information**: Sufficient context provided for all interactive elements

### 6. Visual Accessibility

- **High contrast**: Meets WCAG AA contrast requirements
- **Focus indicators**: 2px solid outline with appropriate offset
- **Reduced motion**: Respects user's motion preferences
- **Scalable text**: Text scales properly up to 200% zoom

## Component-Specific Features

### Layout Component
- Skip to main content link
- Proper landmark structure
- Focusable main content area

### Navigation Component
- Breadcrumb navigation with proper ARIA
- Progress indicators with aria-valuenow/valuemin/valuemax
- Disabled state handling with appropriate ARIA labels
- Keyboard navigation between controls

### SectionList Component
- List structure with proper roles
- Keyboard navigation between cards (Arrow keys, Home, End)
- Active state indication with aria-current
- Descriptive labels for each section

### QuestionCard Component
- Expandable content with aria-expanded
- Proper heading structure
- Live regions for dynamic content
- Semantic article structure

## Testing

### Automated Testing
- **jest-axe**: Automated accessibility testing in unit tests
- **axe-core**: Comprehensive accessibility rule checking
- All components have dedicated accessibility test suites

### Manual Testing Checklist
- [ ] Keyboard navigation works throughout the application
- [ ] Screen reader announces all content appropriately
- [ ] Focus indicators are visible and clear
- [ ] Color contrast meets WCAG AA standards
- [ ] Text scales properly at 200% zoom
- [ ] All interactive elements have appropriate labels

## Browser Support

The accessibility features are tested and supported in:
- Chrome/Chromium-based browsers
- Firefox
- Safari
- Edge

## Screen Reader Support

Tested with:
- NVDA (Windows)
- JAWS (Windows)
- VoiceOver (macOS/iOS)
- TalkBack (Android)

## Compliance

This application aims to meet:
- **WCAG 2.1 Level AA** compliance
- **Section 508** compliance
- **ADA** compliance requirements

## Future Enhancements

Planned accessibility improvements:
- High contrast mode toggle
- Font size adjustment controls
- Keyboard shortcut help dialog
- Voice navigation support
- Enhanced mobile accessibility features

## Resources

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/)
- [WebAIM Accessibility Guidelines](https://webaim.org/)