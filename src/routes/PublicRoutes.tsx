import { Route, Routes } from "react-router-dom";
import PublicLayout from "@/layouts/PublicLayout";
import Home from "../pages/Home";
import OnBoard from "../pages/OnBoard";

const PublicRoutes = () => {
  return (
    <PublicLayout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/onboard" element={<OnBoard />} />
      </Routes>
    </PublicLayout>
  );
};

export default PublicRoutes;
