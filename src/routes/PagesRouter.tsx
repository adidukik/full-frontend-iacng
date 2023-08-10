import React from "react";
import { Route, Routes } from "react-router-dom";

import LoginPage from "../components/LoginPage/LoginPage";
import PanelPage from "../components/PanelPage/PanelPage";

export const PagesRouter = (): JSX.Element => {
  return (
    <Routes>
      <Route path="/" element={<PanelPage />} />
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  );
};
