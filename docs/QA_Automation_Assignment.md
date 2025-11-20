# QA Automation Testing Assignment: Playwright + Page Object Model

## Objective

Reinforce your understanding of Playwright basics, the Page Object Model
(POM), and progress into data‑driven testing, assertions, and end‑to‑end
workflow automation.

## Assignment Overview

You will design an automated test suite for a typical user workflow in a
web application, using Playwright and the Page Object Model.

## Requirements

### 1. **Create Page Object Model Classes**

Implement POM classes for: - **LoginPage** - **RegistrationPage** -
**DashboardPage** (or any page users reach after login) -
**ForgotPasswordPage** (optional but recommended)

Each class should include: - Locators - Page actions (e.g.,
`fillUsername()`, `clickRegisterButton()`)

------------------------------------------------------------------------

### 2. **End‑to‑End Workflow Tests**

Create tests that automate the following scenario:

#### **Scenario A --- User Registration → Login → Dashboard Validation**

1.  Navigate to the registration page\
2.  Register a new user (use randomized or timestamped emails to avoid
    conflicts)\
3.  Verify success state\
4.  Log in using the newly created account\
5.  Assert that the user is successfully redirected to the dashboard

------------------------------------------------------------------------

### 3. **Data‑Driven Testing**

Implement **parameterized** login tests using multiple data sets: -
Valid credentials\
- Invalid password\
- Nonexistent user\
- Empty fields

For each case, assert the correct success or error message.

------------------------------------------------------------------------

### 4. **Assertions**

Use Playwright test assertions to verify: - Error messages\
- Navigation changes\
- Presence or absence of UI elements\
- Successful login state

------------------------------------------------------------------------

### 5. **Test Reporting (Bonus)**

Integrate a reporting tool such as: - **Allure Reports**, or\
- Playwright's default **HTML report**

Run your tests and generate a visual report summary.

------------------------------------------------------------------------

## Deliverables

1.  POM class files\
2.  Test files\
3.  A README explaining:
    -   Your folder structure
    -   How to run tests
    -   Any assumptions made

------------------------------------------------------------------------

## Stretch Goals

-   Add retry logic or custom helpers\
-   Implement parallel test execution\
-   Add CI integration (GitHub Actions)

------------------------------------------------------------------------

## Purpose

This assignment solidifies: - Structuring tests for real-world QA
automation\
- Scaling with POM\
- Using data-driven techniques\
- Writing clean, maintainable test suites
