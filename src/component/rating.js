import { Table, Select } from "antd";
import httpClient from "../httpClient";
import React from "react";

const Rating = () => {
  const [ratingkey, setRatingkey] = React.useState([]);
  const [ratingvalue, setRatingValue] = React.useState([]);

  const { Column } = Table;
  const { Option } = Select;
  const handleChange = async (e, el) => {
    const lesson_id = parseInt(el.key);
    const rating = parseInt(el.value);
    const prik = Date.now();
    const resp = await httpClient.post("//localhost:5000/rating", {
      lesson_id,
      rating,
      prik,
    });
  };

  const [data, setData] = React.useState([]);

  async function getName() {
    const resp = await httpClient.get("//localhost:5000/lesson");
  }

  React.useEffect(() => {
    (async () => {
      getName();
      const resp = await httpClient.get("//localhost:5000/lesson");
      setData(resp.data.lessons);
    })();
  }, []);

  React.useEffect(() => {
    (async () => {
      const resp = await httpClient.get("//localhost:5000/get_rating");
      setRatingkey(resp.data.key);
      setRatingValue(resp.data.value);
    })();
  }, []);

  const val = [ratingkey, ratingvalue];

  function zip(arrays) {
    return arrays[0].map(function (_, i) {
      return arrays.map(function (array) {
        return array[i];
      });
    });
  }
  const rating = zip(val);

  const dataSource = data.map((value, index) => {
    const datavalue = {
      key: index + 1,
      lesson: value,
    };
    return datavalue;
  });

  return (
    <div>
      <div>
        <h1 className="mark">評分系統</h1>
        <Table dataSource={dataSource}>
          <Column title="編號" dataIndex="key" key="key" />
          <Column title="課程" dataIndex="lesson" key="lesson" />
          <Column
            title="評分"
            dataIndex="rating"
            key="rating"
            render={(text, record) => (
              <div>
                {rating.map((value, key) => {
                  if (value[0] == record.key) {
                    return <div className="rating_lab">歷史評分: {value[1]}</div>;
                  }
                })}
                <div className="rating_area">
                  <Select
                    style={{ width: 120 }}
                    onChange={handleChange}
                    key={record.key}
                    className="rating_select"
                  >
                    <Option key={record.key} value={1}>
                      1
                    </Option>
                    <Option key={record.key} value={2}>
                      2
                    </Option>
                    <Option key={record.key} value={3}>
                      3
                    </Option>
                    <Option key={record.key} value={4}>
                      4
                    </Option>
                    <Option key={record.key} value={5}>
                      5
                    </Option>
                  </Select>
                </div>
              </div>
            )}
          />
        </Table>
      </div>
      ,
    </div>
  );
};

export default Rating;
