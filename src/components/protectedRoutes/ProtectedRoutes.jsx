import { Navigate, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getItemFromLocalStorage } from 'utils/localStorageUtils';

const ProtectedRoutes = ({ children, allowedRoles }) => {
  const userDetails = getItemFromLocalStorage('userTypeIs');
  const token = localStorage.getItem('token');
  const location = useLocation();
  const userRole = userDetails?.userTypeName;
  const isTokenValid = !!token;
  const isRoleValid = userRole && allowedRoles.includes(userRole);

  if (isTokenValid) {
    if (isRoleValid) {
      return children;
    } else {
      switch (userDetails?.userTypeName) {
        case 'vendor':
          return <Navigate to={`/vendors/${userDetails?.vendorId}/upload`} />;
        default:
          return <Navigate to="/" />;
      }
    }
  } else {
    return <Navigate to="/login" state={{ from: location }} />;
  }
};

ProtectedRoutes.propTypes = {
  children: PropTypes.any,
  allowedRoles: PropTypes.array
};

export default ProtectedRoutes;
