import { Navigate, Outlet } from "react-router-dom";
import { useAuthState } from 'react-firebase-hooks/auth'; // Import this
import { auth } from "../../firebase";

const useAuth = () => {
  const [user] = useAuthState(auth); // Use the Firebase auth state
  return !!user; // Return true if user is authenticated, false otherwise
};

const AuthenticatedRoute = () => {
  const isAuth = useAuth();
  return isAuth ? <Outlet /> : <Navigate to="/login" />;
};

export default AuthenticatedRoute;