// src/components/auth/LoginForm.tsx
import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { validateLogin } from '../../utils/validators';



type LoginFormData = {
  email: string;
  password: string;
};

export const LoginForm = () => {
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
  });
  const [touched, setTouched] = useState<Record<keyof LoginFormData, boolean>>({
    email: false,
    password: false,
  });
  const [focused, setFocused] = useState<Record<keyof LoginFormData, boolean>>({
    email: false,
    password: false,
  });
  
  const [formError, setFormError] = useState('');
  const { login, loading } = useAuth();
  const navigate = useNavigate();

  // Derived state: calculate errors on every render
  const validation = validateLogin(formData);
  const errors = validation.errors;
  const isFormValid = validation.isValid;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    const { id } = e.target;
    setFocused(prev => ({
      ...prev,
      [id]: true,
    }));
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { id } = e.target;
    setFocused(prev => ({
      ...prev,
      [id]: false,
    }));
    setTouched(prev => ({
      ...prev,
      [id]: true,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    // Mark all as touched on submit attempt
    setTouched({
      email: true,
      password: true,
    });

    if (!isFormValid) {
      return;
    }

    const { success, error } = await login(formData.email, formData.password);
    if (success) {
      navigate('/');
    } else {
      setFormError(error || 'Login failed');
    }
  };

  // Helper to determine if we should show error for a field
  const shouldShowError = (field: keyof LoginFormData) => {
    const hasError = !!errors[field];
    const isFocused = focused[field];
    const isTouched = touched[field];
    
    // Show error if it exists AND (it's focused OR it's been touched)
    return hasError && (isFocused || isTouched);
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
      {formError && (
        <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">{formError}</div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            className={`mt-1 block w-full rounded-md shadow-sm focus:ring-blue-500 ${
              shouldShowError('email') ? 'border-red-500' : 'border-gray-300 focus:border-blue-500'
            }`}
            data-testid="email-input"
          />
          {shouldShowError('email') && (
            <p className="mt-1 text-sm text-red-600">{errors.email}</p>
          )}
        </div>
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            className={`mt-1 block w-full rounded-md shadow-sm focus:ring-blue-500 ${
              shouldShowError('password') ? 'border-red-500' : 'border-gray-300 focus:border-blue-500'
            }`}
            data-testid="password-input"
          />
          {shouldShowError('password') && (
            <p className="mt-1 text-sm text-red-600">{errors.password}</p>
          )}
        </div>
        <button
          type="submit"
          disabled={loading || !isFormValid}
          name="login-button"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          data-testid="login-button"
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
};
