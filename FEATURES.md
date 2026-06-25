# Features and Functionalities

This document describes all the implemented features and functionalities of the TodoFlow Full Stack Todo Application.

---

# Frontend Features

## 1. Multi-Page React Application

The frontend is built as a multi-page React application instead of a Single Page Application (SPA).

### Pages

- Todo List Page
- Todo Details Page

The Todo Details page receives the Todo ID through the URL query parameter.

Example:

```
todo.html?id=<todo-id>
```

---

## 2. Responsive User Interface

The application is fully responsive and adapts to different screen sizes.

Supported Devices

- Desktop
- Laptop
- Tablet
- Mobile

---

## 3. Modern Dashboard

The home page includes a dashboard displaying:

- Total Todos
- Pending Todos
- Completed Todos
- Overdue Todos

These values update automatically whenever the todo list changes.

---

## 4. Modern Navigation Bar

The application contains a dedicated navigation bar.

Features:

- Application Branding
- Navigation Links
- Theme Toggle Button
- Sticky Navigation
- Responsive Layout

---

## 5. Footer

A dedicated footer is included with:

- Application Information
- Technology Stack Information
- Responsive Design

---

## 6. Light and Dark Mode

The application supports both Light and Dark themes.

Features

- Theme Toggle Button
- Automatic UI Updates
- Persistent Theme using Local Storage
- Modern Color Palette
- Smooth Theme Switching

---

## 7. Create Todo

Users can create a new todo with:

- Title
- Description
- Priority
- Due Date
- Completion Status

Validation

- Title is mandatory

---

## 8. View Todo List

Displays all available todos.

Each task card contains

- Status Badge
- Priority Badge
- Due Date
- Created Date
- Updated Date
- Task Description
- Open Button
- Delete Button
- Complete Toggle

---

## 9. Todo Details Page

Users can open an individual task.

Features

- View Full Information
- Update Todo
- Delete Todo
- View Creation Date
- View Last Updated Date
- View Priority
- View Completion Status

---

## 10. Update Todo

Users can modify

- Title
- Description
- Priority
- Due Date
- Completion Status

---

## 11. Delete Todo

Users can permanently delete a todo.

Deletion is confirmed before removing the record.

---

## 12. Mark Todo as Completed

Users can

- Complete a task
- Undo completion

The UI updates instantly.

---

## 13. Search Todos

Users can search todos using

- Title
- Description

Search updates dynamically while typing.

---

## 14. Filter Todos

Users can filter by

- All
- Active
- Completed

---

## 15. Sort Todos

Sorting options

- Newest
- Oldest
- Title
- Priority
- Due Date

---

## 16. Task Statistics

Every task displays

- Status
- Priority
- Due Date
- Creation Time
- Last Updated Time

---

## 17. Attractive Task Cards

Each Todo is displayed inside a modern card.

Card Features

- Glassmorphism Design
- Priority Indicator
- Status Badge
- Hover Effects
- Responsive Layout
- Gradient Accent Border
- Modern Typography

---

## 18. Smooth User Experience

The interface includes

- Modern Buttons
- Soft Shadows
- Rounded Components
- Glass Effect
- Smooth Hover Animations
- Responsive Layout

---

# Backend Features

## 1. REST API

The backend exposes RESTful APIs.

Implemented APIs

### Get All Todos

```
GET /api/todos
```

### Get Single Todo

```
GET /api/todos/:id
```

### Create Todo

```
POST /api/todos
```

### Update Todo

```
PUT /api/todos/:id
```

### Delete Todo

```
DELETE /api/todos/:id
```

---

## 2. File-Based Storage

Todo data is stored inside

```
backend/data/todos.json
```

No external database is required.

---

## 3. Persistent Storage

Todos remain available after restarting the server.

---

## 4. UUID Based IDs

Each todo is assigned a unique UUID.

---

## 5. Validation

Backend validates

- Required Title
- Priority Values
- Boolean Completion Status

---

## 6. Modular Backend Structure

Backend follows a modular architecture.

Folders

```
routes/
services/
data/
```

---

# Todo Data Model

Each Todo contains

| Field | Description |
|--------|-------------|
| id | Unique Todo Identifier |
| title | Todo Title |
| description | Todo Description |
| completed | Completion Status |
| priority | Low, Medium or High |
| dueDate | Due Date |
| createdAt | Creation Timestamp |
| updatedAt | Last Updated Timestamp |

---

# Technologies Used

## Frontend

- React
- Vite
- JavaScript
- CSS3

---

## Backend

- Node.js
- Express.js

---

## Storage

- JSON File Storage

---

# Additional Highlights

- Modern Responsive UI
- Light/Dark Theme
- Sticky Navigation Bar
- Footer Section
- Premium Card Design
- Glassmorphism Effects
- Gradient UI
- Query Parameter Based Navigation
- File-Based Data Persistence
- RESTful API Architecture
- Modular Code Structure
- Clean User Experience
- Mobile Friendly Design

---

# Assignment Requirements Covered

✔ Multi-page React Application

✔ Separate Todo Details Page

✔ Query Parameter Based Navigation

✔ CRUD Operations

✔ Express Backend

✔ File-Based Storage

✔ REST APIs

✔ Responsive UI

✔ Modern User Interface

✔ Light/Dark Theme

✔ Search Functionality

✔ Filter Functionality

✔ Sort Functionality

✔ Task Statistics Dashboard

✔ Complete Documentation

✔ GitHub Repository Ready