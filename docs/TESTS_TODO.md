# Test Plan for Note Application

## Test Pyramid Overview

1. **Unit Tests (70% of tests)**

   - Test individual components/functions in isolation
   - Mock external dependencies
   - Fast feedback loop

2. **Integration Tests (20% of tests)**

   - Test component interactions
   - API integration tests
   - State management tests

3. **E2E Tests (10% of tests)**
   - Critical user journeys
   - Cross-browser testing
   - Full flow validations

## Authentication Flow Tests

### Unit Tests

1. **Login Component**

   - [x] Renders email and password fields
   - Shows validation errors for empty fields
   - Disables submit button when form is invalid
   - Shows loading state during submission

2. **Logout Button**

   - Renders correctly when user is authenticated
   - Calls logout function on click
   - Shows loading state during logout
   - Handles logout errors gracefully

3. **Auth Context**
   - Handles login success/failure
   - Manages user session
   - Provides proper auth state to components

### Integration Tests

1. **Login Flow**

   - Successful login redirects to notes list
   - Failed login shows appropriate error message
   - Form validation works as expected
   - Protected routes redirect unauthenticated users

2. **Logout Flow**
   - Clicking logout clears user session
   - Redirects to login page after logout
   - Notes are no longer accessible after logout

### E2E Tests

1. **Complete Auth Flow**
   - User can log in with valid credentials
   - User cannot access notes without authentication
   - User can log out successfully

## Note Management Tests

### Unit Tests

1. **Note Component**

   - Renders note title and content
   - Handles empty/missing data
   - Shows edit/delete buttons for note owner
   - Formats dates correctly

2. **Note List**
   - Displays list of notes
   - Shows empty state when no notes
   - Updates when notes are added/removed

### Integration Tests

1. **Note CRUD Operations**
   - Can create a new note
   - Can edit existing note
   - Can delete note
   - Shows loading states during operations
   - Handles API errors gracefully

### E2E Tests

1. **Complete Note Flow**
   - User can create a new note
   - User can edit their own notes
   - User can delete their notes
   - Changes persist after page refresh

## Edge Cases to Consider

1. **Network Conditions**

   - Slow network (test timeouts)
   - Offline mode
   - Server errors
   - Invalid API responses

2. **Data Validation**

   - Very long note titles/content
   - Special characters in inputs
   - XSS injection attempts

3. **Browser Specific**
   - Local storage limitations
   - Different screen sizes
   - Browser back/forward navigation
   - Session expiration

## Performance Testing

1. **Load Testing**

   - Handle many notes in the list
   - Large note content

2. **Memory Leaks**
   - Component unmounting
   - Event listener cleanup
   - API request cancellation

## Accessibility Tests

- Keyboard navigation
- Screen reader compatibility
- Color contrast
- ARIA labels

## Security Tests

- Authentication token handling

## Test Data Management

- Factory functions for test data
- Test data cleanup

## CI/CD Integration

- Run tests on pull requests
- Test coverage reporting

## Monitoring and Reporting

- Test failure reporting
- Flaky test detection
- Test execution time tracking

## Playwright Test Examples

```typescript
// Example test for login flow
test('successful login redirects to notes', async ({ page }) => {
  await page.goto('/login');
  await page.fill('input[name="email"]', 'test@example.com');
  await page.fill('input[name="password"]', 'password123');
  await page.click('button[type="submit"]');
  await page.waitForURL('/notes');
  expect(page.url()).toContain('/notes');
});

// Example test for note creation
test('can create a new note', async ({ page }) => {
  // Login first
  await login(page);

  await page.click('button:has-text("New Note")');
  await page.fill('input[name="title"]', 'Test Note');
  await page.fill('textarea[name="content"]', 'This is a test note');
  await page.click('button[type="submit"]');

  await expect(page.locator('h2:has-text("Test Note")')).toBeVisible();
});

// Example test for note deletion
test('can delete a note', async ({ page }) => {
  await login(page);
  await createTestNote(page, 'Note to delete', 'This note will be deleted');

  const noteCard = page
    .locator('.note-card', { hasText: 'Note to delete' })
    .first();
  await noteCard.hover();
  await noteCard.locator('button[aria-label="Delete note"]').click();

  await expect(noteCard).not.toBeVisible();
});
```

## Next Steps

1. Start with unit tests for core components (Login, Note, NoteList)
2. Add integration tests for authentication flow
3. Implement E2E tests for critical paths
4. Add more test cases for edge cases and error handling
