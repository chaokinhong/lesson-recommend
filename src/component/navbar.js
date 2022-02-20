import React,{ReactElement,FC, useState,useEffect} from 'react';
import { Layout,Menu } from 'antd';
import 'antd/dist/antd.css';
import {
  AppstoreOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  PieChartOutlined,
  DesktopOutlined,
  ContainerOutlined,
  MailOutlined,
} from '@ant-design/icons';
import '../App.css'




const Navbar=(props)=> {

  const handleClick = (event) =>{
      props.navclick(event.key)
  }


  return(
    <Menu 
    defaultSelectedKeys={['1']}
    defaultOpenKeys={['sub1']}
    mode="inline"
    theme="light"
    className='meun'
   
  >
      <Menu.Item key="1" icon={<PieChartOutlined />} onClick={handleClick}>
        課程資料
      </Menu.Item>
      <Menu.Item key="2" icon={<DesktopOutlined />} onClick={handleClick}>
        Option 2
      </Menu.Item>
      <Menu.Item key="3" icon={<ContainerOutlined />} onClick={handleClick}>
        Option 3
      </Menu.Item>
  </Menu>
  )
}

export default Navbar