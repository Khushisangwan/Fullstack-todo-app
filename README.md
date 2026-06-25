# TodoFlow - Full Stack Todo Application

A modern full-stack Todo application built using **React**, **Node.js**, and **Express.js** with **file-based JSON storage**. The application provides a clean, responsive user interface with Light/Dark mode, task management features, and a dedicated page for viewing and editing individual tasks.

---

## Features

### Frontend

- Modern responsive UI
- Multi-page React application
- Light and Dark mode support
- Add new todos
- Edit existing todos
- Delete todos
- Mark todos as completed
- Search todos
- Filter todos by status
- Sort todos by:
  - Newest
  - Oldest
  - Priority
  - Due Date
  - Title
- Task statistics dashboard
- Dedicated page for viewing and editing a single todo
- Responsive design for desktop, tablet, and mobile

### Backend

- RESTful CRUD APIs
- Express.js server
- File-based JSON storage
- Persistent data without a database
- Input validation
- Modular project structure

---

# Tech Stack

## Frontend

- React
- Vite
- JavaScript
- CSS3

## Backend

- Node.js
- Express.js

## Data Storage

- JSON File

---

# Project Structure

```text
todo-app
│
├── backend
│   ├── data
│   │   └── todos.json
│   ├── src
│   │   ├── routes
│   │   └── services
│   ├── package.json
│   └── server.js
│
├── frontend
│   ├── public
│   ├── src
│   │   ├── api
│   │   ├── components
│   │   ├── pages
│   │   ├── styles.css
│   │   ├── main.jsx
│   │   └── todo.jsx
│   ├── index.html
│   ├── todo.html
│   ├── vite.config.js
│   └── package.json
│
├── FEATURES.md
├── README.md
└── .gitignore
```

---

# API Endpoints

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | `/api/todos` | Get all todos |
| GET | `/api/todos/:id` | Get a single todo |
| POST | `/api/todos` | Create a new todo |
| PUT | `/api/todos/:id` | Update a todo |
| DELETE | `/api/todos/:id` | Delete a todo |

---

# Todo Object

```json
{
  "id": "uuid",
  "title": "Complete Assignment",
  "description": "Finish the Todo application",
  "completed": false,
  "priority": "high",
  "dueDate": "2026-06-30",
  "createdAt": "2026-06-25T10:30:00.000Z",
  "updatedAt": "2026-06-25T10:30:00.000Z"
}
```

---

# Installation

## Clone Repository

```bash
git clone https://github.com/Khushisangwan/Fullstack-todo-app
```

```bash
cd todoflow
```

---

# Backend Setup

```bash
cd backend
```

Install dependencies

```bash
npm install
```

Start backend

```bash
npm start
```

Backend runs on

```
http://localhost:5000
```

---

# Frontend Setup

Open another terminal

```bash
cd frontend
```

Install dependencies

```bash
npm install
```

Run application

```bash
npm run dev
```

Frontend runs on

```
http://localhost:5173
```

---

# Application Workflow

1. User creates a new todo.
2. React sends a POST request to the Express server.
3. Express stores the todo in `todos.json`.
4. React fetches all todos using the GET API.
5. Users can:
   - Search
   - Filter
   - Sort
   - Update
   - Delete
   - Mark as completed
6. Clicking **Open Task** navigates to the Todo Details page using the todo ID as a query parameter.

---

# Implemented Features

- Multi-page React application
- RESTful Express backend
- File-based persistent storage
- Create Todo
- Read Todos
- Update Todo
- Delete Todo
- Search functionality
- Filter by status
- Sort by multiple options
- Priority management
- Due date support
- Task completion
- Individual Todo Details page
- Responsive UI
- Modern card-based interface
- Light/Dark mode
- Navbar
- Footer
- Dashboard statistics

---

# Future Improvements

- User Authentication
- Categories and Labels
- Drag and Drop Task Ordering
- Due Date Notifications
- Calendar View
- Cloud Database Integration
- User Profiles
- Recurring Tasks
- File Attachments

---

# Author

**Khushi Sangwan**

GitHub: https://github.com/Khushisangwan

LinkedIn: https://www.linkedin.com/in/khushi-sangwan/

---

# License

This project is developed for a Full Stack Developer assignment and is intended for educational and evaluation purposes.