import express from 'express';
import { createTodo, deleteTodo, getTodoById, listTodos, updateTodo } from '../services/todoStore.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const todos = await listTodos();
    res.json(todos);
  } catch (error) {
    res.status(500).json({ message: 'Failed to load todos' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const todo = await getTodoById(req.params.id);

    if (!todo) {
      res.status(404).json({ message: 'Todo not found' });
      return;
    }

    res.json(todo);
  } catch (error) {
    res.status(500).json({ message: 'Failed to load todo' });
  }
});

router.post('/', async (req, res) => {
  try {
    const todo = await createTodo(req.body);
    res.status(201).json(todo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const todo = await updateTodo(req.params.id, req.body);

    if (!todo) {
      res.status(404).json({ message: 'Todo not found' });
      return;
    }

    res.json(todo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const removed = await deleteTodo(req.params.id);

    if (!removed) {
      res.status(404).json({ message: 'Todo not found' });
      return;
    }

    res.json({ message: 'Todo deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete todo' });
  }
});

export default router;