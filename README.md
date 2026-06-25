# Todo Application

## Overview

This repository contains a full stack Todo application built with React, Node.js, Express.js, and file-based JSON storage.  
The frontend is a multi-page React application with separate pages for the todo list and the single todo details page.

## Pages

- `index.html` → Todo list page
- `todo.html?id=<todoId>` → Single todo details page

## Tech Stack

Frontend:
- React
- Vite
- CSS

Backend:
- Node.js
- Express.js

Storage:
- JSON file stored at `backend/data/todos.json`

## Features

- Add todo
- View todo list
- Search todos
- Filter todos by status
- Sort todos by newest, oldest, due date, priority, and title
- Mark todo as completed
- Open single todo page using query parameter
- Edit todo
- Delete todo
- File-based persistence
- Responsive design

## Setup Instructions

### Backend

```bash
cd backend
npm install
npm start