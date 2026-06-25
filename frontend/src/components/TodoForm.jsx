import { useEffect, useState } from 'react';

export const emptyTodoForm = {
  title: '',
  description: '',
  priority: 'medium',
  dueDate: '',
  completed: false
};

function TodoForm({ initialValues = emptyTodoForm, submitLabel, onSubmit, onCancel, resetOnSubmit = false }) {
  const [form, setForm] = useState({ ...emptyTodoForm });
  const [error, setError] = useState('');

  useEffect(() => {
    setForm({
      ...emptyTodoForm,
      ...initialValues
    });
  }, [initialValues]);

  const isEdit = submitLabel.toLowerCase().includes('save') || submitLabel.toLowerCase().includes('update');

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    setForm((current) => ({
      ...current,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const nextValues = {
      ...form,
      title: form.title.trim()
    };

    if (!nextValues.title) {
      setError('Title is required');
      return;
    }

    try {
      setError('');
      await onSubmit(nextValues);

      if (resetOnSubmit) {
        setForm({ ...emptyTodoForm });
      }
    } catch (err) {
      setError(err.message || 'Something went wrong');
    }
  };

  const handleReset = () => {
    const baseValues = {
      ...emptyTodoForm,
      ...initialValues
    };
    setForm(baseValues);
    setError('');

    if (onCancel) {
      onCancel();
    }
  };

  return (
    <form className="section-card todo-form" onSubmit={handleSubmit}>
      <div className="section-head">
        <div>
          <p className="eyebrow">{isEdit ? 'Edit task' : 'Create task'}</p>
          <h2>{isEdit ? 'Update the selected task' : 'Add a new task'}</h2>
          <p className="section-lead">
            {isEdit
              ? 'Refine the details and keep the task timeline current.'
              : 'Add something important, set a priority, and keep your day organized.'}
          </p>
        </div>
      </div>

      <div className="form-grid">
        <div className="field field-full">
          <label htmlFor="title">Title</label>
          <input id="title" name="title" value={form.title} onChange={handleChange} placeholder="Enter todo title" />
        </div>

        <div className="field field-full">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Add task details"
          />
        </div>

        <div className="field">
          <label htmlFor="priority">Priority</label>
          <select id="priority" name="priority" value={form.priority} onChange={handleChange}>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <div className="field">
          <label htmlFor="dueDate">Due Date</label>
          <input id="dueDate" type="date" name="dueDate" value={form.dueDate} onChange={handleChange} />
        </div>

        <div className="field field-full">
          <label className="switch">
            <input id="completed" type="checkbox" name="completed" checked={form.completed} onChange={handleChange} />
            <span className="switch-track">
              <span className="switch-thumb" />
            </span>
            <span className="switch-text">Mark as completed</span>
          </label>
        </div>
      </div>

      {error ? <div className="notice notice-error">{error}</div> : null}

      <div className="form-actions">
        <button className="button button-primary" type="submit">
          {submitLabel}
        </button>

        {onCancel ? (
          <button className="button button-secondary" type="button" onClick={handleReset}>
            Reset
          </button>
        ) : null}
      </div>
    </form>
  );
}

export default TodoForm;