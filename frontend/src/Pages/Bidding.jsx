import React, { useState, useEffect } from "react";
import { Layout, Card, Typography, Row, Col, Button, Modal } from "antd";
import BiddingTable from "../components/biddingTable";
import BiddingForm from "../components/biddingForm";
import NavBar from "../components/navbar";

const { Content } = Layout;
const { Title, Text } = Typography;

const Bidding = () => {
  const [companyData, setCompanyData] = useState({
    companyName: "Company A",
    carbonBalance: 100,
    cashBalance: 500,
  });
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingRecord, setEditingRecord] = useState(null);

  const handleEdit = (record) => {
    setIsEditing(true);
    setEditingRecord(record);
    setIsModalVisible(true);
  };

  useEffect(() => {
    const fetchCompanyData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("No token found");
          return;
        }

        const response = await fetch("/api/company/balance", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch company data");
        }

        const data = await response.json();
        setCompanyData({
          companyName: data.companyName,
          carbonBalance: data.carbonBalance,
          cashBalance: data.cashBalance,
        });
      } catch (error) {
        console.error("Error fetching company data:", error);
      }
    };

    fetchCompanyData();
  }, []);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setIsModalVisible(false);
  };

  const handleSubmit = async (values) => {
    try {
      await fetch("/api/requests", {
        method: "POST",
        headers: {},
        body: JSON.stringify(values),
      });
      setIsModalVisible(false);
    } catch (error) {
      console.error("Error creating request:", error);
    }
  };

  return (
    <Layout>
      <NavBar />
      <Content style={{ padding: "24px" }}>
        <Card
          style={{
            marginBottom: "24px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          }}
        >
          <Title level={3}>{companyData.companyName}</Title>
          <Row gutter={[24, 24]}>
            <Col xs={24} sm={12}>
              <Card type='inner' title='Carbon Credits'>
                <Text strong style={{ fontSize: "18px" }}>
                  {companyData.carbonBalance.toLocaleString()} tonnes
                </Text>
              </Card>
            </Col>
            <Col xs={24} sm={12}>
              <Card type='inner' title='Cash Balance'>
                <Text strong style={{ fontSize: "18px" }}>
                  SGD {companyData.cashBalance.toLocaleString()}
                </Text>
              </Card>
            </Col>
          </Row>
        </Card>

        <Card
          title={
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span>Outstanding Bids</span>
              <Button type='primary' onClick={showModal}>
                Create Bid
              </Button>
            </div>
          }
          style={{
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          }}
        >
          <Modal
            title={isEditing ? "Edit Request" : "Create New Request"}
            open={isModalVisible}
            onCancel={handleCancel}
            footer={null}
          >
            <BiddingForm onSubmit={handleSubmit} onCancel={handleCancel} />
          </Modal>
          <BiddingTable onEdit={handleEdit} />
        </Card>
      </Content>
    </Layout>
  );
};

export default Bidding;
