import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import TodoForm, { emptyTodoForm } from '../components/TodoForm';
import { deleteTodo, getTodo, updateTodo } from '../api/todos';

function formatDateTime(value) {
  if (!value) return 'Not set';
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? value : date.toLocaleString();
}

function formatDate(value) {
  if (!value) return 'Not set';
  const date = new Date(`${value}T00:00:00`);
  return Number.isNaN(date.getTime()) ? value : date.toLocaleDateString();
}

function TodoDetailPage() {
  const todoId = new URLSearchParams(window.location.search).get('id') || '';
  const [todo, setTodo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const loadTodo = async () => {
      if (!todoId) {
        setLoading(false);
        setError('Todo id is missing from the URL');
        return;
      }

      try {
        setLoading(true);
        setError('');
        const data = await getTodo(todoId);
        setTodo(data);
      } catch (err) {
        setError(err.message || 'Failed to load todo');
      } finally {
        setLoading(false);
      }
    };

    loadTodo();
  }, [todoId]);

  const handleUpdate = async (formData) => {
    const updated = await updateTodo(todoId, formData);
    setTodo(updated);
    setMessage('Todo updated successfully');
  };

  const handleDelete = async () => {
    const confirmed = window.confirm('Delete this todo?');
    if (!confirmed) return;

    await deleteTodo(todoId);
    window.location.href = '/';
  };

  const statusClass = todo?.completed ? 'chip-done' : 'chip-pending';

  return (
    <Layout>
      <section className="hero detail-hero">
        <div className="hero-copy">
          <span className="eyebrow">Single task view</span>
          <h1>Todo Details</h1>
          <p className="hero-text">
            Review the selected task, edit its details, and keep the task history in one focused view.
          </p>
        </div>

        <a className="button button-soft" href="/">
          Back to list
        </a>
      </section>

      {loading ? <div className="section-card empty-state">Loading todo...</div> : null}
      {error ? <div className="notice notice-error">{error}</div> : null}
      {message ? <div className="notice notice-success">{message}</div> : null}

      {!loading && !error && todo ? (
        <div className="detail-grid">
          <article className="section-card detail-summary">
            <div className="chip-row">
              <span className={`chip ${statusClass}`}>{todo.completed ? 'Completed' : 'Pending'}</span>
              <span className={`chip chip-${todo.priority}`}>{todo.priority}</span>
            </div>

            <h2>{todo.title}</h2>
            <p className="detail-description">{todo.description || 'No description added for this task.'}</p>

            <div className="detail-meta-grid">
              <div>
                <span className="meta-label">Todo ID</span>
                <strong>{todo.id}</strong>
              </div>
              <div>
                <span className="meta-label">Due Date</span>
                <strong>{formatDate(todo.dueDate)}</strong>
              </div>
              <div>
                <span className="meta-label">Created</span>
                <strong>{formatDateTime(todo.createdAt)}</strong>
              </div>
              <div>
                <span className="meta-label">Updated</span>
                <strong>{formatDateTime(todo.updatedAt)}</strong>
              </div>
            </div>
          </article>

          <aside className="section-card detail-aside">
            <span className="aside-label">Task status</span>
            <strong className="aside-value">{todo.completed ? 'Completed' : 'In progress'}</strong>
            <p className="section-lead">
              {todo.completed ? 'This task has been marked as done.' : 'This task is still open and can be updated below.'}
            </p>

            <div className="aside-stack">
              <div>
                <span className="meta-label">Priority</span>
                <strong>{todo.priority}</strong>
              </div>
              <div>
                <span className="meta-label">Schedule</span>
                <strong>{todo.dueDate ? formatDate(todo.dueDate) : 'No due date set'}</strong>
              </div>
            </div>
          </aside>
        </div>
      ) : null}

      {!loading && !error && todo ? (
        <TodoForm initialValues={todo || emptyTodoForm} submitLabel="Save Changes" onSubmit={handleUpdate} />
      ) : null}

      {!loading && !error && todo ? (
        <section className="section-card danger-panel">
          <div>
            <p className="eyebrow">Danger zone</p>
            <h2>Delete this task</h2>
            <p className="section-lead">This removes the todo permanently from the JSON store.</p>
          </div>
          <button className="button button-danger" type="button" onClick={handleDelete}>
            Delete Todo
          </button>
        </section>
      ) : null}
    </Layout>
  );
}

export default TodoDetailPage;