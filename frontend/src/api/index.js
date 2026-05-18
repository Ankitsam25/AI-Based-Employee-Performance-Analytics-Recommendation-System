import api from './axiosInstance';

// Auth APIs
export const signup = (data) => api.post('/api/auth/signup', data);
export const login = (data) => api.post('/api/auth/login', data);
export const getMe = () => api.get('/api/auth/me');

// Employee APIs
export const addEmployee = (data) => api.post('/api/employees', data);
export const getAllEmployees = () => api.get('/api/employees');
export const getEmployeeById = (id) => api.get(`/api/employees/${id}`);
export const searchEmployees = (params) => api.get('/api/employees/search', { params });
export const updateEmployee = (id, data) => api.put(`/api/employees/${id}`, data);
export const deleteEmployee = (id) => api.delete(`/api/employees/${id}`);

// AI APIs
export const getRecommendation = (data) => api.post('/api/ai/recommend', data);
export const getRankings = () => api.get('/api/ai/rankings');
