
---

## `FEATURES.md`

```md
# Documented Features and Functionalities

This file lists all the features implemented in the application. Any feature not listed here should not be assumed to exist.

## Frontend Features

1. Todo List Page
   - Displays all todos
   - Shows task status
   - Shows priority
   - Shows due date
   - Shows created time

2. Add Todo
   - Users can create a new todo from the list page
   - Title is required
   - Description, priority, due date, and completion status are supported

3. Search
   - Users can search todos by title or description

4. Filter
   - Users can filter todos by:
     - All
     - Active
     - Completed

5. Sort
   - Users can sort todos by:
     - Newest
     - Oldest
     - Due Date
     - Priority
     - Title

6. Mark as Completed
   - Users can mark a todo as completed or undo completion

7. Single Todo Details Page
   - Reads todo id from query parameter
   - Displays full todo details
   - Shows created time and updated time

8. Update Todo
   - Users can edit the selected todo from the detail page

9. Delete Todo
   - Users can delete a todo from list page or detail page

10. Responsive UI
   - The layout adjusts for different screen sizes

## Backend Features

1. CRUD APIs for todos
   - Create
   - Read all
   - Read one
   - Update
   - Delete

2. File-Based Storage
   - Todos are stored in `backend/data/todos.json`

3. Persistent Data
   - Data remains saved even after server restart

4. Validation
   - Title is required for creation and update

## Data Fields

Each todo stores:

- id
- title
- description
- completed
- priority
- dueDate
- createdAt
- updatedAt