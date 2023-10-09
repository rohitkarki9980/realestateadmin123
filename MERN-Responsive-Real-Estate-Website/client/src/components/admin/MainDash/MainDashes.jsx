import React from "react";
import Card from "../Card/Card";
import TableBox from "../Table/Table";
import "./MainDash.css";
const MainDash = () => {
  return (
    <div className="MainDash">
      <h1>Dashboard</h1>
      <Card />
      <TableBox />
    </div>
  );
};

export default MainDash;