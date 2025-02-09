import { Route, Routes } from "react-router-dom";
import PublicLayout from "@/layouts/PublicLayout";
import OnBoard from "../pages/OnBoard";

const PublicRoutes = () => {


  return (
    <PublicLayout>
      <Routes>
        <Route path="/" element={<OnBoard />} />
      </Routes>
    </PublicLayout>
  );
};

export default PublicRoutes;
