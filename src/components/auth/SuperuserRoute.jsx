import React from 'react';
import { connect } from 'react-redux';
import { Navigate } from 'react-router-dom';

const SuperuserRoute = ({ children, isAuthenticated, user, isLoading }) => {
  if (isLoading || isAuthenticated === null) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600" />
      </div>
    );
  }
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (!user?.is_superuser) return <Navigate to="/" replace />;
  return children;
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
  isLoading: state.auth.loading,
});

export default connect(mapStateToProps)(SuperuserRoute);
