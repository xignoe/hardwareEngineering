# Layout Component

A responsive layout component that provides the main structure for the Hardware Study Guide application.

## Features

- **Mobile-first responsive design** with breakpoints at 768px, 1024px, and 1280px
- **CSS custom properties** integration with the design system
- **Semantic HTML structure** with proper accessibility support
- **Flexible container system** that adapts to different screen sizes
- **Clean, minimalist styling** that prioritizes content readability

## Usage

```tsx
import { Layout } from './components/Layout';

function App() {
  return (
    <Layout>
      <h1>Your Content Here</h1>
      <p>The Layout component provides responsive structure.</p>
    </Layout>
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `React.ReactNode` | - | Content to be rendered inside the layout |
| `className` | `string` | `''` | Additional CSS classes to apply to the layout container |

## Responsive Behavior

- **Mobile (< 768px)**: Single column layout with 16px horizontal padding
- **Tablet (768px+)**: Increased padding to 24px, optimized spacing
- **Desktop (1024px+)**: Maximum content width of 800px, centered layout with 48px vertical padding
- **Large Desktop (1280px+)**: Maximum content width increased to 900px

## Accessibility

- Uses semantic `<main>` element for primary content
- Proper heading hierarchy support
- Screen reader compatible structure
- Keyboard navigation friendly

## Testing

The component includes comprehensive unit tests covering:
- Rendering behavior
- CSS class application
- Responsive structure
- Accessibility features
- Edge cases (empty children, multiple children)

Run tests with:
```bash
npm test -- src/components/Layout/__tests__/Layout.test.tsx
```