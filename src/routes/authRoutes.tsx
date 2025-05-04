import { Routes, Route } from "react-router-dom";

import { Login } from "../screens/login";
import { Register } from "../screens/register";

export function AuthRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="*" element={<Login />} />
    </Routes>
  );
}
