import api from './api';

export const dashboardService = {
  /**
   * Fetch Executive / Admin dashboard metrics and analytics
   */
  async getAdminDashboard(params = {}) {
    const response = await api.get('/dashboard/admin', { params });
    return response.data;
  },

  /**
   * Fetch HR workforce dashboard metrics
   */
  async getHrDashboard() {
    const response = await api.get('/dashboard/hr');
    return response.data;
  },

  /**
   * Fetch Department Manager team dashboard
   */
  async getManagerDashboard() {
    const response = await api.get('/dashboard/manager');
    return response.data;
  },

  /**
   * Fetch Employee self-service dashboard
   */
  async getEmployeeDashboard() {
    const response = await api.get('/dashboard/employee');
    return response.data;
  },

  /**
   * Execute real clock-in for authenticated employee
   */
  async clockIn() {
    const response = await api.post('/dashboard/employee/clock-in');
    return response.data;
  },

  /**
   * Execute real clock-out for authenticated employee
   */
  async clockOut() {
    const response = await api.post('/dashboard/employee/clock-out');
    return response.data;
  },

  /**
   * Approve or reject a leave request
   */
  async actionLeaveRequest(leaveRequestId, action, comments = '') {
    const response = await api.post(`/dashboard/leave-approvals/${leaveRequestId}/action`, {
      action,
      comments,
    });
    return response.data;
  },
};

export default dashboardService;
