import { Navigate, useLocation } from "react-router";
import useAuth from "../context/AuthContext/AuthContext";

const PrivateRoutes = ({ children }) => {
  const { user, loading } = useAuth();

  const location = useLocation();

  if (loading) {
    return (
      <h1 className="text-center mt-20 text-3xl font-bold">loading....</h1>
    );
  }

  if (!user) {
    return <Navigate state={location?.pathname} to="/login"></Navigate>;
  }

  return children;
};

export default PrivateRoutes;
