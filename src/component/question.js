import React,{FC,ReactElement, useState} from "react";
import { Form, Input, Button, Radio ,Cascader,List} from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import axios  from "axios";
import '../App.css'



const Question = (props)=> {
    const options = [
        {
          value: '云计算与大数据',
          label: '云计算与大数据',
          children: [
            {
              value: '并行与分布式计算',
              label: '并行与分布式计算',
              
            },
            {
                value: '大数据分析与处理',
                label: '大数据分析与处理',
            },
            {
                value: '商务智能',
                label: '商务智能',
            }
            ]
        },
        {
            value: '系统仿真',
            label: '系统仿真',
            children: [
              {
                value: '软件仿真技术',
                label: '软件仿真技术',
                
              },
              {
                  value: '虚拟现实与增强现实',
                  label: '虚拟现实与增强现实',
              },
              {
                  value: '计算机图形学基础',
                  label: '计算机图形学基础',
              },
              {
                value: '数字图像处理及应用',
                label: '数字图像处理及应用',
            }
            ]
          },
          {
            value: '智能化软件',
            label: '智能化软件',
            children: [
              {
                value: '认知计算',
                label: '认知计算',
                
              },
              {
                  value: '知识工程',
                  label: '知识工程',
              },
              {
                  value: '智能计算',
                  label: '智能计算',
              },
              {
                value: '机器学习与模式识别',
                label: '机器学习与模式识别',
            }
            ]
          },
          {
            value: '软件服务工程',
            label: '软件服务工程',
            children: [
              {
                value: '服务计算原理及应用',
                label: '服务计算原理及应用',
                
              },
              {
                  value: '软件项目管理',
                  label: '软件项目管理',
              },
              {
                  value: 'Web 设计与社交平台开发',
                  label: 'Web 设计与社交平台开发',
              },
              {
                value: '软件工程经济学',
                label: '软件工程经济学',
            }
            ]
          },
          {
            value: '嵌入式软件',
            label: '嵌入式软件',
            children: [
              {
                value: 'EDA 技术',
                label: 'EDA 技术',
                
              },
              {
                  value: '嵌入式软件设计',
                  label: '嵌入式软件设计',
              },
            ]
          },
          {
            value: '大数据',
            label: '大数据',
            children: [
              {
                value: '大数据分析与处理',
                label: '大数据分析与处理',
                
              },
              {
                  value: '大数据计算架构',
                  label: '大数据计算架构',
              },
              {
                  value: '数据采集与物联网',
                  label: '数据采集与物联网',
              },
              {
                value: '数据科学导论',
                label: '数据科学导论',
            }
            ]
          },
          {
            value: '计算机体系结构',
            label: '计算机体系结构',
            children: [
              {
                value: '量子计算',
                label: '量子计算',
                
              },
              {
                  value: '并行与分布式计算',
                  label: '并行与分布式计算',
              },
              {
                  value: '存储技术',
                  label: '存储技术',
              },
              {
                value: '云计算技术',
                label: '云计算技术',
            }
            ]
          },
          {
            value: '软件工程',
            label: '软件工程',
            children: [
              {
                value: '软件测试',
                label: '软件测试',
                
              },
              {
                  value: '软件计划与管理',
                  label: '软件计划与管理',
              },
              {
                  value: '软件体系结构',
                  label: '软件体系结构',
              },
              {
                value: '面向对象软件工程',
                label: '面向对象软件工程',
            }
            ]
          },
          {
            value: '媒体计算',
            label: '媒体计算',
            children: [
              {
                value: '虚拟现实技术',
                label: '虚拟现实技术',
                
              },
              {
                  value: '数字图像处理',
                  label: '数字图像处理',
              },
              {
                  value: '多媒体技术',
                  label: '多媒体技术',
              },
              {
                value: '计算机图形学',
                label: '计算机图形学',
            }
            ]
          },
          {
            value: '计算机网络',
            label: '计算机网络',
            children: [
              {
                value: '网络工程与应用',
                label: '网络工程与应用',
                
              },
              {
                  value: '网络管理',
                  label: '网络管理',
              },
              {
                  value: '网络程序设计',
                  label: '网络程序设计',
              },
            ]
          },
          {
            value: '人工智能',
            label: '人工智能',
            children: [
              {
                value: '计算机视觉',
                label: '计算机视觉',
                
              },
              {
                  value: '自然语言处理',
                  label: '自然语言处理',
              },
            ]
          },
          {
            value: '大类专业选修',
            label: '大类专业选修',
            children: [
              {
                value: '设计思维',
                label: '设计思维',
                
              },
              {
                  value: '组织行为学',
                  label: '组织行为学',
              },
              {
                value: '工程伦理',
                label: '工程伦理',
                
              },
              {
                  value: '网络空间安全',
                  label: '网络空间安全',
              },
              {
                value: '程序设计语言理论',
                label: '程序设计语言理论',
                
              },
              {
                  value: '数字信号处理',
                  label: '数字信号处理',
              },
              {
                value: '软件质量保障与测试',
                label: '软件质量保障与测试',
                
              },
              {
                  value: '软件设计与体系结构',
                  label: '软件设计与体系结构',
              },
              {
                value: '编译技术及应用',
                label: '编译技术及应用',
                
              },
              {
                  value: 'Linux 原理与应用',
                  label: 'Linux 原理与应用',
              },
              {
                value: 'Windows 原理与应用',
                label: 'Windows 原理与应用',
                
              },
              {
                  value: '移动编程技术',
                  label: '移动编程技术',
              },
              {
                value: '软件构造基础',
                label: '软件构造基础',
                
              },
              {
                  value: '计算机接口与通信',
                  label: '计算机接口与通信',
              },
              {
                value: '组合数学',
                label: '组合数学',
                
              },
              {
                  value: '认知过程的信息处理',
                  label: '认知过程的信息处理',
              },
              {
                value: '软件技术基础',
                label: '软件技术基础',
                
              },
              {
                  value: '物联网导论',
                  label: '物联网导论',
              },
              {
                value: '电路与电子学基础',
                label: '电路与电子学基础',
                
              },
            ]
          },
       
      ];
  
      const [suggestLesson, setSuggestLesson] = useState([])

      const questionClick = async (data) =>{
        axios.post('//localhost:5000/recom',{
            mode: 'no-cors',
            body: data
        })
        .then(res=> {
          data = res.data.data
          setSuggestLesson(data)
        })}

      
    return(
    <div>
      <div className="question_area">
        <Cascader className="question" options={options} onChange={questionClick} placeholder="Please select" />
      </div>
      <div className="suggest_aree">
        <List className="suggest_list"
      size="small"
      header={<h2>推荐課程</h2>}
      bordered
      dataSource={suggestLesson}
      renderItem={item => <List.Item>{item}</List.Item>}
    />
    </div>
    </div>
    )
}

export default Question