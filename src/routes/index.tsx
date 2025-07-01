import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/login";
import PrivateRoute from "./private-route";
import PublicRoute from "./public-route";
import Register from "../pages/register";
import BroadcastPage from "../pages/broadcast-page";

function AppRoutes() {
  return (
    <Routes>
      <Route element={<PublicRoute />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

      <Route element={<PrivateRoute />}>
        <Route path="/broadcast" element={<BroadcastPage />} />
      </Route>

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

export default AppRoutes;
