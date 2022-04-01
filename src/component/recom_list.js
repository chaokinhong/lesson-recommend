import React from "react";
import { Divider,List } from "antd";
import httpClient from "../httpClient";

const RecomList = (props) => {
  const [lessons, setLessons] = React.useState([]);
  React.useEffect(() => {
    (async () => {
      const resp = await httpClient.get("//localhost:5000/recom_by_user");
      setLessons(resp.data.lessons);
    })();
  }, []);
  return (
    <div>
      <Divider orientation="left">根據你對課程的評分推薦您的課程</Divider>
      <List
      size="small"
      bordered
      dataSource={lessons}
      renderItem={item => <List.Item>{item}</List.Item>}
    />
    </div>
  );
};

export default RecomList;
