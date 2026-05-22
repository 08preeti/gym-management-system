/*
// /api/* → http://localhost:5000/api/* in development automatically.
// In production, set REACT_APP_API_URL to your deployed server origin.
const BASE_URL = process.env.REACT_APP_API_URL
  ? `${process.env.REACT_APP_API_URL}/api`
  : '/api';

async function request(method, endpoint, body = null) {
  const options = {
    method,
    headers: { 'Content-Type': 'application/json' },
  };
  if (body) options.body = JSON.stringify(body);

  const res  = await fetch(`${BASE_URL}${endpoint}`, options);
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || `API error: ${res.status}`);
  }
  return data;
}

const get  = (endpoint)       => request('GET',    endpoint);
const post = (endpoint, body) => request('POST',   endpoint, body);
const put  = (endpoint, body) => request('PUT',    endpoint, body);
const del  = (endpoint)       => request('DELETE', endpoint);


export const authAPI = {
  login: (email, password, role) => post('/auth/login', { email, password, role }),
};


export const statsAPI = {
  getDashboard: () => get('/stats'),
};


export const membersAPI = {
  getAll:  (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return get(`/members${query ? '?' + query : ''}`);
  },
  getById: (id)         => get(`/members/${id}`),
  create:  (data)       => post('/members', data),
  update:  (id, data)   => put(`/members/${id}`, data),
  delete:  (id)         => del(`/members/${id}`),
  checkIn: (id)         => post(`/members/${id}/checkin`),
};


export const billsAPI = {
  getAll:  (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return get(`/bills${query ? '?' + query : ''}`);
  },
  getById: (id)         => get(`/bills/${id}`),
  create:  (data)       => post('/bills', data),
  update:  (id, data)   => put(`/bills/${id}`, data),
  delete:  (id)         => del(`/bills/${id}`),
};


export const notificationsAPI = {
  getAll:      ()     => get('/notifications'),
  send:        (data) => post('/notifications', data),
  markRead:    (id)   => put(`/notifications/${id}/read`),
  markAllRead: ()     => put('/notifications/read-all'),
  delete:      (id)   => del(`/notifications/${id}`),
};


export const productsAPI = {
  getAll:  (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return get(`/products${query ? '?' + query : ''}`);
  },
  getById: (id)         => get(`/products/${id}`),
  create:  (data)       => post('/products', data),
  update:  (id, data)   => put(`/products/${id}`, data),
  delete:  (id)         => del(`/products/${id}`),
};
*/




const BASE_URL = process.env.REACT_APP_API_URL
  ? `${process.env.REACT_APP_API_URL}/api`
  : '/api';

async function request(method, endpoint, body = null) {
  const options = { method, headers: { 'Content-Type': 'application/json' } };
  if (body) options.body = JSON.stringify(body);
  const res  = await fetch(`${BASE_URL}${endpoint}`, options);
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || `API error: ${res.status}`);
  return data;
}

const get  = (endpoint)       => request('GET',    endpoint);
const post = (endpoint, body) => request('POST',   endpoint, body);
const put  = (endpoint, body) => request('PUT',    endpoint, body);
const del  = (endpoint)       => request('DELETE', endpoint);

export const authAPI = {
  login: (email, password, role) => post('/auth/login', { email, password, role }),
};

export const statsAPI = {
  getDashboard: () => get('/stats'),
};

export const membersAPI = {
  getAll:  (params = {}) => { const q = new URLSearchParams(params).toString(); return get(`/members${q ? '?' + q : ''}`); },
  getById: (id)         => get(`/members/${id}`),
  create:  (data)       => post('/members', data),
  update:  (id, data)   => put(`/members/${id}`, data),
  delete:  (id)         => del(`/members/${id}`),
  checkIn: (id)         => post(`/members/${id}/checkin`),
};

export const billsAPI = {
  getAll:  (params = {}) => { const q = new URLSearchParams(params).toString(); return get(`/bills${q ? '?' + q : ''}`); },
  getById: (id)         => get(`/bills/${id}`),
  create:  (data)       => post('/bills', data),
  update:  (id, data)   => put(`/bills/${id}`, data),
  delete:  (id)         => del(`/bills/${id}`),
};

export const notificationsAPI = {
  getAll:      ()     => get('/notifications'),
  send:        (data) => post('/notifications', data),
  markRead:    (id)   => put(`/notifications/${id}/read`),
  markAllRead: ()     => put('/notifications/read-all'),
  delete:      (id)   => del(`/notifications/${id}`),
};

export const productsAPI = {
  getAll:  (params = {}) => { const q = new URLSearchParams(params).toString(); return get(`/products${q ? '?' + q : ''}`); },
  getById: (id)         => get(`/products/${id}`),
  create:  (data)       => post('/products', data),
  update:  (id, data)   => put(`/products/${id}`, data),
  delete:  (id)         => del(`/products/${id}`),
};

// NEW: Diet Plans API
export const dietAPI = {
  getAll:  ()           => get('/diet'),
  create:  (data)       => post('/diet', data),
  update:  (id, data)   => put(`/diet/${id}`, data),
  delete:  (id)         => del(`/diet/${id}`),
};

// NEW: Exercises API
export const exercisesAPI = {
  getAll: () => get('/exercises'),
};

// NEW: Analytics API
export const analyticsAPI = {
  get: () => get('/analytics'),
};