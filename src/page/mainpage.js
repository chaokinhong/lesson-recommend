import React, { useState, useEffect } from "react";
import "../index.css";
import Navbar from "../component/navbar";
import Question from "../component/question";
import httpClient from "../httpClient";
import { Avatar, Button, Image } from "antd";
import { UserOutlined } from "@ant-design/icons";
import Welcome from "../component/welcome";
import Rating from "../component/rating";
import RatingRecom from "../component/rating_recom";


const MainPage = (props) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [user, setUser] = useState(null);

  const navclick = (idx) => {
    setCurrentPage(idx);
  };

  useEffect(() => {
    (async () => {
      try {
        const resp = await httpClient.get("//localhost:5000/@me");
        setUser(resp.data);
      } catch (error) {
        console.log("Haven't Login");
      }
    })();
  }, []);

  const logout = async () => {
    const resp = await httpClient.post("//localhost:5000/logout");
    window.location.href = "/";
  };

  return (
    <div>
      {user != null ? (
        <div>
          <div className="header">
            <div className="text">
              <div className="mimg">
                <Image
                  width={50}
                  height={50}
                  src="https://upload.wikimedia.org/wikipedia/en/6/68/Wuhan_University_Logo.png"
                />
              </div>
              <h2 className="recomm">武漢大學計算機課程推薦系統</h2>
            </div>
            <div className="profile">
              <div className="pic">
                <Avatar size="small" icon={<UserOutlined />} />
              </div>
              <p className="username">{user.username}</p>
              <div className="logout">
                <Button type="primary" onClick={logout}>
                  登出
                </Button>
              </div>
            </div>
          </div>
          <div className="layout">
            <div className="nav_bar_area">
              <Navbar navclick={navclick} />
            </div>
            <div className="main_page_area">
              {currentPage == 1 && <Question />}
              {currentPage == 3 && <Rating/>}
              {currentPage == 4 && <RatingRecom/>}
            </div>
          </div>
        </div>
      ) : (
        <Welcome />
      )}
    </div>
  );
};

export default MainPage;
