import React from "react";
import { Switch } from "antd";
import "../index.css";
import RecomList from "./recom_list";

const RatingRecom = () => {
  const [showstate, setShowstate] = React.useState(false);
  const show = (e) => {
    setShowstate(e);
  };
  return (
    <div className="areaa">
      <h2 className="rr_title">個性化推薦</h2>
      <div className="rr_switch">
        <Switch onChange={show} />
      </div>
      {showstate && <RecomList nowstate={showstate} />}
    </div>
  );
};

export default RatingRecom;
