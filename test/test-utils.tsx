import { ReactElement, ReactNode } from 'react';
import { render, RenderOptions } from '@testing-library/react';

interface WrapperProps {
  children?: ReactNode;
}

const customRender = (ui: ReactElement, options?: RenderOptions) =>
  render(ui, {
    wrapper: ({ children }: WrapperProps) => <>{children}</>,
    ...options,
  });

// Re-export everything from '@testing-library/react' for convenience
export * from '@testing-library/react';
// Re-export custom render function
export { customRender as render };
