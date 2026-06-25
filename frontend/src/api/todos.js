const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {})
    },
    ...options
  });

  const contentType = response.headers.get('content-type') || '';
  const data = contentType.includes('application/json') ? await response.json() : null;

  if (!response.ok) {
    throw new Error(data?.message || 'Request failed');
  }

  return data;
}

export function getTodos() {
  return request('/todos');
}

export function getTodo(id) {
  return request(`/todos/${id}`);
}

export function createTodo(payload) {
  return request('/todos', {
    method: 'POST',
    body: JSON.stringify(payload)
  });
}

export function updateTodo(id, payload) {
  return request(`/todos/${id}`, {
    method: 'PUT',
    body: JSON.stringify(payload)
  });
}

export function deleteTodo(id) {
  return request(`/todos/${id}`, {
    method: 'DELETE'
  });
}