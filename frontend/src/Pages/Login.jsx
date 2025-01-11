import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Form, Input, Button, message, Layout, Card } from "antd";
import { useState } from "react";
import "../App.css";
import md5 from "md5";

const { Header, Content } = Layout;

function Login() {
  const [loading, setLoading] = useState(false);
  const [userID, setUserID] = useState(null);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    setLoading(true);

    try {
      // const response = await axios.post("https://your-api-url.com/login", {
      //   userID: values.userID,
      //   password: values.password,
      // });

      //   if (response.status === 200) {
      //     message.success("Login successful!");
      //     navigate("/Landing"); // Redirect to the Landing page
      //   } else {
      //     message.error("Invalid userID or password");
      //     alert("Invalid userID or password");
      //   }
      if (
        Number(values.userID) === 1 &&
        md5(values.password) === md5("password")
      ) {
        console.log(md5(values.password));
        message.success("Login successful!");
        const userID = Number(values.userID);
        localStorage.setItem("token", "demo-token");
        navigate("/landing", { state: { userID } });
      } else {
        message.error("Invalid userID or password");
        alert("Invalid userID or password");
      }
    } catch (error) {
      console.error("Login failed:", error);
      message.error("An error occurred while logging in. Please try again.");
    } finally {
      setLoading(false);
    }
    //   if (response.status === 200) {
    //     message.success("Login successful!");
    //     navigate("/Landing"); // Redirect to the Landing page
    //   } else {
    //     message.error("Invalid userID or password");
    //     alert("Invalid userID or password");
    //   }
    if (Number(values.userID) === 1 && values.password === "password") {
      message.success("Login successful!");
      const userID = Number(values.userID);
      localStorage.setItem("token", userID);
      navigate("/landing", { state: { userID } });
    } else {
      message.error("Invalid userID or password");
      alert("Invalid userID or password");
    }
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header className='header'>Carbon Credit Trading Platform</Header>
      <Content className='login' style={{ padding: "50px" }}>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Card style={{ Height: "200px" }}>
            <Form name='loginForm' onFinish={onFinish}>
              <Form.Item
                label='userID'
                name='userID'
                rules={[
                  {
                    required: true,
                    message: "Please input your userID!",
                  },
                ]}
              >
                <Input placeholder='Enter your userID' />
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
