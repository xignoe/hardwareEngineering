import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Layout } from '../Layout';
import styles from '../Layout.module.css';

describe('Layout Component', () => {
  it('renders children correctly', () => {
    const testContent = 'Test content';
    render(
      <Layout>
        <div>{testContent}</div>
      </Layout>
    );
    
    expect(screen.getByText(testContent)).toBeInTheDocument();
  });

  it('applies default CSS classes', () => {
    const { container } = render(
      <Layout>
        <div>Test content</div>
      </Layout>
    );
    
    const layoutElement = container.firstChild as HTMLElement;
    expect(layoutElement).toHaveClass(styles.layout);
  });

  it('applies additional className when provided', () => {
    const customClass = 'custom-layout-class';
    const { container } = render(
      <Layout className={customClass}>
        <div>Test content</div>
      </Layout>
    );
    
    const layoutElement = container.firstChild as HTMLElement;
    expect(layoutElement).toHaveClass(styles.layout);
    expect(layoutElement).toHaveClass(customClass);
  });

  it('renders with proper semantic structure', () => {
    render(
      <Layout>
        <h1>Test Heading</h1>
        <p>Test paragraph</p>
      </Layout>
    );
    
    const mainElement = screen.getByRole('main');
    expect(mainElement).toBeInTheDocument();
    expect(mainElement).toContainElement(screen.getByText('Test Heading'));
    expect(mainElement).toContainElement(screen.getByText('Test paragraph'));
  });

  it('handles empty children gracefully', () => {
    const { container } = render(<Layout>{null}</Layout>);
    
    const layoutElement = container.firstChild as HTMLElement;
    expect(layoutElement).toBeInTheDocument();
    expect(layoutElement).toHaveClass(styles.layout);
  });

  it('handles multiple children correctly', () => {
    render(
      <Layout>
        <div>First child</div>
        <div>Second child</div>
        <div>Third child</div>
      </Layout>
    );
    
    expect(screen.getByText('First child')).toBeInTheDocument();
    expect(screen.getByText('Second child')).toBeInTheDocument();
    expect(screen.getByText('Third child')).toBeInTheDocument();
  });

  it('maintains proper container structure', () => {
    const { container } = render(
      <Layout>
        <div>Test content</div>
      </Layout>
    );
    
    const layoutElement = container.firstChild as HTMLElement;
    const containerElement = layoutElement.querySelector(`.${styles.container}`);
    const mainElement = layoutElement.querySelector('main');
    
    expect(containerElement).toBeInTheDocument();
    expect(mainElement).toBeInTheDocument();
    expect(containerElement).toContainElement(mainElement);
  });

  it('applies correct CSS module classes for responsive design', () => {
    const { container } = render(
      <Layout>
        <div>Test content</div>
      </Layout>
    );
    
    const layoutElement = container.firstChild as HTMLElement;
    const containerElement = layoutElement.querySelector(`.${styles.container}`);
    const mainElement = layoutElement.querySelector(`.${styles.main}`);
    
    expect(layoutElement).toHaveClass(styles.layout);
    expect(containerElement).toHaveClass(styles.container);
    expect(mainElement).toHaveClass(styles.main);
  });

  it('has proper accessibility structure', () => {
    render(
      <Layout>
        <h1>Test Heading</h1>
        <p>Test content</p>
      </Layout>
    );
    
    const mainElement = screen.getByRole('main');
    expect(mainElement).toBeInTheDocument();
    
    // Verify the main element contains the content
    expect(mainElement).toContainElement(screen.getByRole('heading', { level: 1 }));
  });
});