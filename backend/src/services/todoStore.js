import { promises as fs } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { randomUUID } from 'node:crypto';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const dataDir = resolve(__dirname, '../../data');
const dataFile = resolve(dataDir, 'todos.json');

async function ensureStore() {
  await fs.mkdir(dataDir, { recursive: true });
  try {
    await fs.access(dataFile);
  } catch {
    await fs.writeFile(dataFile, '[]', 'utf8');
  }
}

async function readTodos() {
  await ensureStore();
  const raw = await fs.readFile(dataFile, 'utf8');
  if (!raw.trim()) return [];
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

async function writeTodos(todos) {
  await ensureStore();
  await fs.writeFile(dataFile, JSON.stringify(todos, null, 2), 'utf8');
}

function cleanText(value) {
  return typeof value === 'string' ? value.trim() : '';
}

export async function listTodos() {
  const todos = await readTodos();
  return [...todos].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
}

export async function getTodoById(id) {
  const todos = await readTodos();
  return todos.find((todo) => todo.id === id) || null;
}

export async function createTodo(payload = {}) {
  const title = cleanText(payload.title);
  if (!title) {
    throw new Error('Title is required');
  }

  const now = new Date().toISOString();

  const todo = {
    id: randomUUID(),
    title,
    description: cleanText(payload.description),
    completed: Boolean(payload.completed),
    priority: ['low', 'medium', 'high'].includes(cleanText(payload.priority))
      ? cleanText(payload.priority)
      : 'medium',
    dueDate: cleanText(payload.dueDate),
    createdAt: now,
    updatedAt: now
  };

  const todos = await readTodos();
  todos.unshift(todo);
  await writeTodos(todos);
  return todo;
}

export async function updateTodo(id, payload = {}) {
  const todos = await readTodos();
  const index = todos.findIndex((todo) => todo.id === id);

  if (index === -1) {
    return null;
  }

  const current = todos[index];
  const next = { ...current };

  if (Object.prototype.hasOwnProperty.call(payload, 'title')) {
    const title = cleanText(payload.title);
    if (!title) {
      throw new Error('Title is required');
    }
    next.title = title;
  }

  if (Object.prototype.hasOwnProperty.call(payload, 'description')) {
    next.description = cleanText(payload.description);
  }

  if (Object.prototype.hasOwnProperty.call(payload, 'priority')) {
    const priority = cleanText(payload.priority);
    next.priority = ['low', 'medium', 'high'].includes(priority) ? priority : current.priority;
  }

  if (Object.prototype.hasOwnProperty.call(payload, 'dueDate')) {
    next.dueDate = cleanText(payload.dueDate);
  }

  if (Object.prototype.hasOwnProperty.call(payload, 'completed')) {
    next.completed = Boolean(payload.completed);
  }

  next.updatedAt = new Date().toISOString();
  todos[index] = next;
  await writeTodos(todos);
  return next;
}

export async function deleteTodo(id) {
  const todos = await readTodos();
  const nextTodos = todos.filter((todo) => todo.id !== id);

  if (nextTodos.length === todos.length) {
    return false;
  }

  await writeTodos(nextTodos);
  return true;
}