import SaveForm from "../components/form/form";
import { Outlet } from "react-router-dom";
import { useState } from "react";
const Main = () => {
  return (
    <div className="flex flex-col lg:flex-row md:flex-col">
      <SaveForm></SaveForm>
      <Outlet></Outlet>
    </div>
  );
};

export default Main;
