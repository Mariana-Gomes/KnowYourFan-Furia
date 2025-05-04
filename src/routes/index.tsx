import { Loading } from "../components/Loading";
import { useAuth } from "../hooks/useAuth";

import { AppRoutes } from "./appRoutes";
import { AuthRoutes } from "./authRoutes";

export const Routes = () => {
  const { user, loading } = useAuth();

  if (loading) return <Loading />;

  return user?.uid ? <AppRoutes /> : <AuthRoutes />;
};
