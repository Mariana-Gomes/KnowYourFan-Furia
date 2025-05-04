import { Routes, Route } from "react-router-dom";

import { Timeline } from "../screens/timeline";
import { Profile } from "../screens/profile";
import { Creators } from "../screens/creators";
import { EditProfile } from "../screens/editProfile";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/timeline" element={<Timeline />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/editProfile" element={<EditProfile />} />
      <Route path="/creators" element={<Creators />} />
      <Route path="*" element={<Timeline />} />
    </Routes>
  );
}
