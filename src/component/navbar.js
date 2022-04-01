import React, { ReactElement, FC, useState, useEffect } from "react";
import { Layout, Menu } from "antd";
import "antd/dist/antd.css";
import {
  AppstoreOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  PieChartOutlined,
  DesktopOutlined,
  ContainerOutlined,
  MailOutlined,
} from "@ant-design/icons";
import "../index.css";

const Navbar = (props) => {
  const handleClick = (event) => {
    props.navclick(event.key);
  };

  return (
    <Menu
      defaultSelectedKeys={["1"]}
      defaultOpenKeys={["sub1"]}
      mode="inline"
      theme="light"
      className="meun"
    >
      <Menu.Item key="3" icon={<ContainerOutlined />} onClick={handleClick}>
        評分系統
      </Menu.Item>
      <Menu.Item key="1" icon={<PieChartOutlined />} onClick={handleClick}>
        基於單選課程推薦
      </Menu.Item>
      <Menu.Item key="4" icon={<DesktopOutlined />} onClick={handleClick}>
        基於對課程評分推薦
      </Menu.Item>
    </Menu>
  );
};

export default Navbar;
