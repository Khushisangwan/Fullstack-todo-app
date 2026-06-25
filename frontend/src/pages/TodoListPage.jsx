import { useEffect, useMemo, useState } from 'react';
import Layout from '../components/Layout';
import TodoForm, { emptyTodoForm } from '../components/TodoForm';
import TodoItem from '../components/TodoItem';
import { createTodo, deleteTodo, getTodos, updateTodo } from '../api/todos';

const priorityWeight = {
  high: 0,
  medium: 1,
  low: 2
};

function getDateValue(value) {
  if (!value) return Number.POSITIVE_INFINITY;
  const date = new Date(`${value}T00:00:00`);
  return Number.isNaN(date.getTime()) ? Number.POSITIVE_INFINITY : date.getTime();
}

function TodoListPage() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  useEffect(() => {
    const loadTodos = async () => {
      try {
        setLoading(true);
        setError('');
        const data = await getTodos();
        setTodos(data);
      } catch (err) {
        setError(err.message || 'Failed to load todos');
      } finally {
        setLoading(false);
      }
    };

    loadTodos();
  }, []);

  const stats = useMemo(() => {
    const completed = todos.filter((todo) => todo.completed).length;
    const pending = todos.length - completed;
    const overdue = todos.filter((todo) => todo.dueDate && !todo.completed && new Date(`${todo.dueDate}T23:59:59`) < new Date()).length;

    return {
      total: todos.length,
      completed,
      pending,
      overdue
    };
  }, [todos]);

  const filteredTodos = useMemo(() => {
    const query = search.trim().toLowerCase();

    return [...todos]
      .filter((todo) => {
        const searchableText = `${todo.title} ${todo.description}`.toLowerCase();
        const matchesSearch = !query || searchableText.includes(query);
        const matchesStatus =
          statusFilter === 'all' ||
          (statusFilter === 'completed' ? todo.completed : !todo.completed);

        return matchesSearch && matchesStatus;
      })
      .sort((a, b) => {
        if (sortBy === 'title') {
          return a.title.localeCompare(b.title);
        }

        if (sortBy === 'priority') {
          return (priorityWeight[a.priority] ?? 99) - (priorityWeight[b.priority] ?? 99) || getDateValue(b.createdAt) - getDateValue(a.createdAt);
        }

        if (sortBy === 'dueDate') {
          return getDateValue(a.dueDate) - getDateValue(b.dueDate) || getDateValue(b.createdAt) - getDateValue(a.createdAt);
        }

        if (sortBy === 'oldest') {
          return getDateValue(a.createdAt) - getDateValue(b.createdAt);
        }

        return getDateValue(b.createdAt) - getDateValue(a.createdAt);
      });
  }, [todos, search, statusFilter, sortBy]);

  const handleCreate = async (formData) => {
    const created = await createTodo(formData);
    setTodos((current) => [created, ...current]);
    setMessage('Todo created successfully');
  };

  const handleToggleComplete = async (todo) => {
    const updated = await updateTodo(todo.id, {
      completed: !todo.completed
    });

    setTodos((current) => current.map((item) => (item.id === updated.id ? updated : item)));
    setMessage('Todo updated successfully');
  };

  const handleDelete = async (todo) => {
    const confirmed = window.confirm(`Delete "${todo.title}"?`);
    if (!confirmed) return;

    await deleteTodo(todo.id);
    setTodos((current) => current.filter((item) => item.id !== todo.id));
    setMessage('Todo deleted successfully');
  };

  return (
    <Layout>
      <section className="hero">
        <div className="hero-copy">
          <span className="eyebrow">Task studio</span>
          <h1>Todo List</h1>
          <p className="hero-text">
            Organize your tasks in a polished workspace with search, filters, sorting, and a focused task card layout.
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="#create">
              Create task
            </a>
            <a className="button button-soft" href="#tasks">
              View tasks
            </a>
          </div>
        </div>

        <div className="hero-panel">
          <div className="hero-metric">
            <span>Total</span>
            <strong>{stats.total}</strong>
          </div>
          <div className="hero-metric">
            <span>Pending</span>
            <strong>{stats.pending}</strong>
          </div>
          <div className="hero-metric">
            <span>Completed</span>
            <strong>{stats.completed}</strong>
          </div>
          <div className="hero-metric">
            <span>Overdue</span>
            <strong>{stats.overdue}</strong>
          </div>
        </div>
      </section>

      {message ? <div className="notice notice-success">{message}</div> : null}
      {error ? <div className="notice notice-error">{error}</div> : null}

      <section className="stats-grid">
        <article className="section-card stat-card">
          <span className="stat-label">Total tasks</span>
          <strong className="stat-value">{stats.total}</strong>
          <span className="stat-note">All tasks in your workspace</span>
        </article>
        <article className="section-card stat-card">
          <span className="stat-label">Pending</span>
          <strong className="stat-value">{stats.pending}</strong>
          <span className="stat-note">Tasks that need attention</span>
        </article>
        <article className="section-card stat-card">
          <span className="stat-label">Completed</span>
          <strong className="stat-value">{stats.completed}</strong>
          <span className="stat-note">Finished work items</span>
        </article>
        <article className="section-card stat-card">
          <span className="stat-label">Overdue</span>
          <strong className="stat-value">{stats.overdue}</strong>
          <span className="stat-note">Tasks past due date</span>
        </article>
      </section>

      <section className="section-card filter-card">
        <div className="filters-grid">
          <div className="field">
            <label htmlFor="search">Search</label>
            <input
              id="search"
              type="text"
              value={search}
              placeholder="Search by title or description"
              onChange={(event) => setSearch(event.target.value)}
            />
          </div>

          <div className="field">
            <label htmlFor="statusFilter">Status</label>
            <select id="statusFilter" value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)}>
              <option value="all">All</option>
              <option value="active">Active</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          <div className="field">
            <label htmlFor="sortBy">Sort</label>
            <select id="sortBy" value={sortBy} onChange={(event) => setSortBy(event.target.value)}>
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
              <option value="dueDate">Due Date</option>
              <option value="priority">Priority</option>
              <option value="title">Title</option>
            </select>
          </div>
        </div>
      </section>

      <div id="create">
        <TodoForm initialValues={emptyTodoForm} submitLabel="Add Todo" onSubmit={handleCreate} resetOnSubmit={true} />
      </div>

      <section id="tasks" className="task-section">
        <div className="section-head section-head-spread">
          <div>
            <p className="eyebrow">Task feed</p>
            <h2>My tasks</h2>
            <p className="section-lead">Each item is designed to feel more like a focused workspace card than a plain row.</p>
          </div>
          <div className="task-count">{filteredTodos.length} items</div>
        </div>

        {loading ? (
          <div className="section-card empty-state">Loading todos...</div>
        ) : filteredTodos.length === 0 ? (
          <div className="section-card empty-state">
            <strong>No todos found</strong>
            <p>Try clearing filters or create a new task to begin.</p>
          </div>
        ) : (
          <div className="task-grid">
            {filteredTodos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggleComplete={handleToggleComplete}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </section>
    </Layout>
  );
}

export default TodoListPage;