const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

const getHeaders = (isFormData = false) => {
  const headers = {};
  const access = localStorage.getItem('access');
  if (access) {
    headers['Authorization'] = `JWT ${access}`;
  }
  if (!isFormData) {
    headers['Content-Type'] = 'application/json';
  }
  return headers;
};

export const apiGet = (endpoint) =>
  fetch(`${API_URL}${endpoint}`, { headers: getHeaders() });

export const apiPost = (endpoint, data) =>
  fetch(`${API_URL}${endpoint}`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(data),
  });

export const apiPut = (endpoint, data) =>
  fetch(`${API_URL}${endpoint}`, {
    method: 'PUT',
    headers: getHeaders(),
    body: JSON.stringify(data),
  });

export const apiPatch = (endpoint, data) =>
  fetch(`${API_URL}${endpoint}`, {
    method: 'PATCH',
    headers: getHeaders(),
    body: JSON.stringify(data),
  });

export const apiDelete = (endpoint) =>
  fetch(`${API_URL}${endpoint}`, {
    method: 'DELETE',
    headers: getHeaders(),
  });

export const apiPostFormData = (endpoint, formData) =>
  fetch(`${API_URL}${endpoint}`, {
    method: 'POST',
    headers: getHeaders(true),
    body: formData,
  });

export const apiPutFormData = (endpoint, formData) =>
  fetch(`${API_URL}${endpoint}`, {
    method: 'PUT',
    headers: getHeaders(true),
    body: formData,
  });
