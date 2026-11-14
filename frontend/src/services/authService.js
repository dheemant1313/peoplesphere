import api from './api';

export const authService = {
  /**
   * Authenticate user with work email and password.
   */
  async login(email, password) {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  },

  /**
   * Register a new organization and master administrator (4-step onboarding).
   */
  async register(registrationData) {
    const response = await api.post('/auth/register', registrationData);
    return response.data;
  },

  /**
   * Fetch current authenticated user's profile, role, and permissions.
   */
  async getCurrentUser() {
    const response = await api.get('/auth/me');
    return response.data;
  },

  /**
   * Rotate refresh token to obtain a fresh access token.
   */
  async refreshToken(refreshToken) {
    const response = await api.post('/auth/refresh', { refresh_token: refreshToken });
    return response.data;
  },

  /**
   * Revoke refresh token and log out.
   */
  async logout(refreshToken) {
    try {
      if (refreshToken) {
        await api.post('/auth/logout', { refresh_token: refreshToken });
      }
    } catch (err) {
      console.warn('Logout notification to backend failed:', err);
    }
  },

  /**
   * Request password reset token for given email.
   */
  async forgotPassword(email) {
    const response = await api.post('/auth/forgot-password', { email });
    return response.data;
  },

  /**
   * Reset password with valid reset token.
   */
  async resetPassword(token, newPassword) {
    const response = await api.post('/auth/reset-password', {
      token,
      new_password: newPassword,
    });
    return response.data;
  },

  /**
   * Validate invitation token and get invitation details.
   */
  async getInvitation(token) {
    const response = await api.get(`/auth/invitations/${token}`);
    return response.data;
  },

  /**
   * Accept user invitation and activate account.
   */
  async acceptInvitation(token, { firstName, lastName, password }) {
    const response = await api.post(`/auth/invitations/${token}/accept`, {
      first_name: firstName,
      last_name: lastName,
      password,
    });
    return response.data;
  },

  /**
   * Invite an employee to the organization (Admin / HR).
   */
  async createInvitation({ email, roleSlug }) {
    const response = await api.post('/auth/invitations', {
      email,
      role_slug: roleSlug,
    });
    return response.data;
  },
};

export default authService;
