import React from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "../../pages/Dashboard";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="" element={<Dashboard />}></Route>
      <Route path="*" element={<h1>error</h1>}></Route>
    </Routes>
  );
};

export default AppRouter;