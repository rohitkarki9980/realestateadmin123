import React from "react";
import CustomerReview from "../CustomerReview/CustomerReview";
import MongoDBChartsEmbed from "../Updates/Updates";
import "./RightSide.css";

const RightSide = () => {
  return (
    <div className="RightSide">
      <div>
        <h3>Comments</h3>
        <MongoDBChartsEmbed />
      </div>
      <div>
        <h3>Bookmark</h3>
        <CustomerReview />
      </div>
    </div>
  );
};

export default RightSide;