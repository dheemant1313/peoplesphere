import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/**
 * Guard route that requires specific roles or specific permissions.
 * @param {Array<string>|string} allowedRoles - Role slugs allowed (e.g. ['organization-admin', 'hr'])
 * @param {string} requiredPermission - Specific permission code required (e.g. 'payroll.process')
 */
export default function RoleRoute({ allowedRoles, requiredPermission, children }) {
  const { user, hasRole, hasPermission, isLoading } = useAuth();

  if (isLoading) {
    return null;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Check role requirement
  if (allowedRoles) {
    const rolesList = Array.isArray(allowedRoles) ? allowedRoles : [allowedRoles];
    const isAllowed = rolesList.some((role) => hasRole(role));
    if (!isAllowed) {
      return (
        <Navigate
          to="/unauthorized"
          state={{
            reason: `Access restricted to [${rolesList.join(', ')}]. Current role: ${user.role?.name || 'Unknown'}`,
          }}
          replace
        />
      );
    }
  }

  // Check permission requirement
  if (requiredPermission && !hasPermission(requiredPermission)) {
    return (
      <Navigate
        to="/unauthorized"
        state={{
          reason: `Missing required permission: ${requiredPermission}`,
        }}
        replace
      />
    );
  }

  return children ? children : <Outlet />;
}
