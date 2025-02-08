import { Route, Routes, Navigate } from "react-router-dom";
import SwipeBoard from "@/pages/SwipeBoard";
import PrivateLayout from "@/layouts/PrivateLayout";
import Transactions from "@/pages/Transactions";
import Portfolio from "@/pages/Portfolio";

const PrivateRoutes = () => {
  return (
    <PrivateLayout>
      <Routes>
        <Route path="/" element={<Navigate to="/swipe-board" />} />
        <Route path="/swipe-board" element={<SwipeBoard />} />
        <Route path="/transactions" element={<Transactions />} />
        <Route path="/portfolio" element={<Portfolio />} />
      </Routes>
    </PrivateLayout>
  );
};
export default PrivateRoutes;
