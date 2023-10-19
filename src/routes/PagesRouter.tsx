import React from "react";
import { Route, Routes } from "react-router-dom";

import LoginPage from "../components/LoginPage/LoginPage";
import PanelPage from "../components/PanelPage/PanelPage";
import AuthenticatedRoute from "../components/LoginPage/AuthenticatedRoute";

export const PagesRouter = (): JSX.Element => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      {/* <Route element={<AuthenticatedRoute />}>
        <Route path="/" element={<PanelPage />} />
      </Route> */}
      <Route path="/" element={<PanelPage />} />
    </Routes>
  );
};
