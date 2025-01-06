import { Navigate, Outlet } from "react-router-dom"

const ProtectedRoute = ({ IsAllowed, redirectTo = '/login', children }) => {
  if(!IsAllowed){
    return <Navigate to={redirectTo} replace />
  }
  return children ? children : <Outlet />
}

export default ProtectedRoute