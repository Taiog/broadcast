import { Routes, Route, Navigate } from "react-router-dom";
import { PublicRoute } from "./public-route";
import { Login } from "../pages/login";
import { Register } from "../pages/register";
import { PrivateRoute } from "./private-route";
import { BroadcastPage } from "../pages/broadcast-page";

export function AppRoutes() {
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