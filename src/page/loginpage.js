import React from "react";
import { Form, Input, Button, Checkbox, Image } from "antd";
import httpClient from "../httpClient";

const LoginPage = () => {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const onFinish = async () => {
    try {
      const resp = await httpClient.post("//localhost:5000/login", {
        username,
        password,
      });

      window.location.href = "/";
    } catch (error) {
      if (error.response.status === 401) {
        alert("密碼錯誤");
      }
    }
  };

  const onFinishFailed = (errorInfo) => {
    alert.log("Failed:", errorInfo);
  };
  return (
    <div className="log_container">
      <div className="login">
        <Image
          className="img"
          width={100}
          height={100}
          src="https://upload.wikimedia.org/wikipedia/en/6/68/Wuhan_University_Logo.png"
        />
        <div className="form">
          <Form
            name="basic"
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 16,
            }}
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="學號"
              name="username"
              rules={[
                {
                  required: true,
                  message: "Please input your username!",
                },
              ]}
            >
              <Input onChange={(e) => setUsername(e.target.value)} />
            </Form.Item>

            <Form.Item
              label="密碼"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
            >
              <Input.Password onChange={(e) => setPassword(e.target.value)} />
            </Form.Item>

            <Form.Item
              name="remember"
              valuePropName="checked"
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Checkbox>記住</Checkbox>
            </Form.Item>

            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Button type="primary" htmlType="submit">
                登錄
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
