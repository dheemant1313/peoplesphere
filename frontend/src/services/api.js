import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://127.0.0.1:8001/api/v1',
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

// Request interceptor attaches authorization header
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('peoplesphere_token');
    if (token && !config.headers.Authorization) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor handles automatic token rotation and session expiration
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Skip retry on auth endpoints to prevent infinite loops
    if (
      error.response &&
      error.response.status === 401 &&
      originalRequest &&
      !originalRequest._retry &&
      !originalRequest.url.includes('/auth/login') &&
      !originalRequest.url.includes('/auth/refresh')
    ) {
      const refreshToken = localStorage.getItem('peoplesphere_refresh_token');

      if (!refreshToken) {
        localStorage.removeItem('peoplesphere_token');
        localStorage.removeItem('peoplesphere_refresh_token');
        localStorage.removeItem('peoplesphere_user');
        window.dispatchEvent(new CustomEvent('peoplesphere:session-expired'));
        return Promise.reject(error);
      }

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return api(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const refreshResponse = await axios.post(
          `${api.defaults.baseURL}/auth/refresh`,
          { refresh_token: refreshToken },
          { headers: { 'Content-Type': 'application/json' } }
        );

        const { access_token, refresh_token } = refreshResponse.data;
        localStorage.setItem('peoplesphere_token', access_token);
        if (refresh_token) {
          localStorage.setItem('peoplesphere_refresh_token', refresh_token);
        }

        api.defaults.headers.common.Authorization = `Bearer ${access_token}`;
        originalRequest.headers.Authorization = `Bearer ${access_token}`;

        processQueue(null, access_token);
        return api(originalRequest);
      } catch (refreshErr) {
        processQueue(refreshErr, null);
        localStorage.removeItem('peoplesphere_token');
        localStorage.removeItem('peoplesphere_refresh_token');
        localStorage.removeItem('peoplesphere_user');
        window.dispatchEvent(new CustomEvent('peoplesphere:session-expired'));
        return Promise.reject(refreshErr);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export const getHealthCheck = async () => {
  const response = await api.get('/health');
  return response.data;
};

export default api;
