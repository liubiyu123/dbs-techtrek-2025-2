import React, { useState } from "react";
import { Form, Input, Button, message, Layout, Card } from "antd";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook
import "../App.css";

const { Header, Content } = Layout;

function Login() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Create navigate instance

  const onFinish = (values) => {
    setLoading(true);

    // Simulating an API call to check login credentials
    setTimeout(() => {
      setLoading(false);

      if (values.username === "admin" && values.password === "password") {
        console.log(values.username);
        console.log(values.password);
        message.success("Login successful!");
        navigate("/Landing");
      } else {
        message.error("Invalid username or password");
      }
    }, 1000);
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header className='header'>
        <div className='logo' />
        Carbon Credit Trading Platform
      </Header>
      <Content style={{ padding: "50px" }}>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Card>
            <Form name='loginForm' onFinish={onFinish}>
              <Form.Item
                label='Username'
                name='username'
                rules={[
                  {
                    required: true,
                    message: "Please input your username!",
                  },
                ]}
              >
                <Input placeholder='Enter your username' />
              </Form.Item>

              <Form.Item
                label='Password'
                name='password'
                rules={[
                  {
                    required: true,
                    message: "Please input your password!",
                  },
                ]}
              >
                <Input.Password placeholder='Enter your password' />
              </Form.Item>

              <Form.Item>
                <Button
                  type='primary'
                  htmlType='submit'
                  block
                  loading={loading}
                >
                  Log in
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </div>
      </Content>
    </Layout>
  );
}

export default Login;
