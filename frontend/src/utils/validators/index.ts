// Validation rules
export const required = (value: string) => ({
  isValid: !!value.trim(),
  error: 'This field is required',
});

export const minLength = (length: number) => (value: string) => ({
  isValid: value.length >= length,
  error: `Must be at least ${length} characters`,
});

export const email = (value: string) => ({
  isValid: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
  error: 'Please enter a valid email address',
});

// Validation middleware type
type ValidationRule<T> = {
  validate: (value: string) => { isValid: boolean; error: string };
  field: keyof T;
};

// Validation result type
export type ValidationResult<T> = {
  isValid: boolean;
  errors: Partial<Record<keyof T, string>>;
  values: T;
};

// Validation middleware function
export const validateForm = <T extends Record<string, any>>(
  values: T,
  rules: ValidationRule<T>[]
): ValidationResult<T> => {
  const result: ValidationResult<T> = {
    isValid: true,
    errors: {},
    values: { ...values },
  };

  rules.forEach(({ validate, field }) => {
    const { isValid, error } = validate(String(values[field] || ''));
    if (!isValid) {
      result.isValid = false;
      result.errors[field] = error;
    }
  });

  return result;
};

// Specific validation schemas
export const loginSchema = {
  email: [required, email],
  password: [required, minLength(6)],
} as const;

export const validateLogin = (values: { email: string; password: string }) => {
  const rules: ValidationRule<typeof values>[] = [
    { validate: required, field: 'email' },
    { validate: email, field: 'email' },
    { validate: required, field: 'password' },
    { 
      validate: minLength(6), 
      field: 'password' 
    },
  ];

  return validateForm(values, rules);
};

// Type for form errors
export type FormErrors<T> = Partial<Record<keyof T, string>>;
