import { Navigate, useLocation } from "react-router";
import useAuth from "../context/AuthContext/AuthContext";

const PrivateRoutes = ({ children }) => {
  const { user, loading } = useAuth();

  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-amber-500/30 border-t-amber-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-700 text-xl">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate state={location?.pathname} to="/login"></Navigate>;
  }

  return children;
};

export default PrivateRoutes;
