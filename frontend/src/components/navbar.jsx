import { NavLink, useNavigate } from "react-router-dom";

import { Button, Layout, Grid, Menu, Space, theme } from "antd";

const { Header, Content, Footer } = Layout;

const NavBar = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <nav>
      <Header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 1,
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          <Button
            type='primary'
            style={{
              marginRight: "16px",
            }}
          >
            <NavLink to='/Landing'>Landing Page</NavLink>
          </Button>

          <Button type='primary' style={{}}>
            <NavLink to='/Requests'>Received Requests</NavLink>
          </Button>

          <Button
            type='primary'
            style={{
              marginLeft: "16px",
            }}
          >
            <NavLink to='/Bidding'>Bidding Page</NavLink>
          </Button>
        </div>
        <div>
          <Button danger type='primary' onClick={handleLogout}>
            <NavLink to='/'>Logout</NavLink>
          </Button>
        </div>
      </Header>
    </nav>
  );
};

export default NavBar;
