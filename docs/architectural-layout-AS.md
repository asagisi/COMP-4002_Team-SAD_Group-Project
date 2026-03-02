# Architecture Document - Sprint 3

## Component: WatchProgress

- What:
Buissness-logic component manages watch progress state.
Retrieves data, updates state, and calls service methods for CRUD operations.
- Why:
Separates presentation logic from UI rendering.
- Where:
Used by WatchProgressPage to provide data and handler functions.

## Page: WatchProgressPage

- What:
Presentation-logic component that renders the watch progress list.
Provides inputs to add, edit and delete shows.
- Why:
Keeps UI rendering separate from state management and business logic.
Improves readability and maintainability by following separation of concerns.
- Where:
Routed in App.tsx and displayed at the /watchlist route.

## Hook: useFormInput

- What:
Manages form input state and validation.
Returns the input value, an onChange handler, validation function, and error messages.
- Why:
Handles presentation logic for forms, making inputs reusable.
Keeps form state and validation out of components.
- Where:
Used in WatchProgressPage (or any other page) for the “Add Show” and other form inputs.

## Service: WatchProgressService

- What:
Handles business logic for watch progress.
Validates watch progress data.
Calls repository methods to create, update, or delete progress.
- Why:
Keeps validation and business rules separate from presentation.
Provides a consistent API for hooks or components.
- Where:
Called by WatchProgress for all CRUD operations.

## Repository: WatchProgressRepo

- What:
Provides CRUD methods for watch progress data.
Uses test data array to simulate a website use.
- Why:
Separates data access from business logic.
Acts as the single source of truth for watch progress.
- Where:
Called by WatchProgressService to read and modify watch progress data.
