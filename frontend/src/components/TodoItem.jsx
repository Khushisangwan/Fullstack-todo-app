function formatDate(value) {
  if (!value) return 'Not set';
  const date = new Date(`${value}T00:00:00`);
  return Number.isNaN(date.getTime()) ? value : date.toLocaleDateString();
}

function formatDateTime(value) {
  if (!value) return 'Not set';
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? value : date.toLocaleString();
}

function TodoItem({ todo, onToggleComplete, onDelete }) {
  const overdue = todo.dueDate && !todo.completed && new Date(`${todo.dueDate}T23:59:59`) < new Date();

  return (
    <article className={`task-card priority-${todo.priority} ${todo.completed ? 'task-card-completed' : ''}`}>
      <div className="task-card-top">
        <div className="task-card-copy">
          <div className="chip-row">
            <span className={`chip ${todo.completed ? 'chip-done' : 'chip-pending'}`}>
              {todo.completed ? 'Completed' : 'Pending'}
            </span>
            <span className={`chip chip-${todo.priority}`}>{todo.priority}</span>
            {overdue ? <span className="chip chip-overdue">Overdue</span> : null}
          </div>

          <h3>{todo.title}</h3>
          <p>{todo.description || 'No description added for this task.'}</p>
        </div>

        <label className="switch switch-inline">
          <input type="checkbox" checked={todo.completed} onChange={() => onToggleComplete(todo)} />
          <span className="switch-track">
            <span className="switch-thumb" />
          </span>
          <span className="switch-text">{todo.completed ? 'Undo' : 'Complete'}</span>
        </label>
      </div>

      <div className="task-meta-grid">
        <div>
          <span className="meta-label">Due</span>
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

      <div className="task-actions">
        <a className="button button-soft" href={`/todo.html?id=${todo.id}`}>
          Open task
        </a>
        <button className="button button-danger" type="button" onClick={() => onDelete(todo)}>
          Delete
        </button>
      </div>
    </article>
  );
}

export default TodoItem;