import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react';

import AuthForm from '../components/AuthForm';

jest.mock('../hooks/useTextInput.ts', () => ({
  __esModule: true,
  default: () => ({
    value: '',
    error: false,
    onChange: jest.fn(),
    onBlur: jest.fn(),
  }),
}));

jest.mock('../hooks/useFileInput', () => ({
  __esModule: true,
  default: () => ({
    file: null,
    error: false,
    onChange: jest.fn(),
  }),
}));

describe('AuthForm', () => {
  it('should render auth form', () => {
    render(<AuthForm formTitle="sign-up" formSubTitle="Sign Up Form" />);
    expect(screen.getByText(/sign up form/i)).toBeInTheDocument();
  });

  it('should toggle password visibility', async () => {
    render(<AuthForm formTitle="sign-up" formSubTitle="Sign Up Form" />);
    const passwordInput = screen.getByLabelText(/Password/i);
    const toggleButton = screen.getByLabelText(/toggle password visibility/i);
  
    expect(passwordInput).toHaveAttribute('type', 'password');
  
    fireEvent.click(toggleButton);
    expect(passwordInput).toHaveAttribute('type', 'text');
  
    fireEvent.click(toggleButton);
    expect(passwordInput).toHaveAttribute('type', 'password');
  });

  it('should render avatar field only sign-up form', () => {
    const { rerender } = render(<AuthForm formTitle="sign-up" formSubTitle="Sign Up Form" />);

    expect(screen.getByText(/Avatar/i)).toBeInTheDocument();
  
    rerender(<AuthForm formTitle="login" formSubTitle="Login Form" />);
    expect(screen.queryByText(/Avatar/i)).toBeNull();
  });
})
