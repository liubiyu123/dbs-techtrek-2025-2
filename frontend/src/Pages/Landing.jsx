import React, { useState, useEffect } from 'react';
import { Layout, Card, Typography, Row, Col, Button, Modal } from 'antd';
import RequestTable from '../components/RequestTable';
import RequestForm from '../components/RequestForm';

const { Content } = Layout;
const { Title, Text } = Typography;

const LandingPage = () => {
  const [companyData, setCompanyData] = useState({
    companyName: 'Company A',
    carbonBalance: 100,
    cashBalance: 500
  });
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    const fetchCompanyData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('/api/company/balance', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const data = await response.json();
        setCompanyData(data);
      } catch (error) {
        console.error('Error fetching company data:', error);
      }
    };

    fetchCompanyData();
  }, []);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleSubmit = async (values) => {
    try {
      const token = localStorage.getItem('token');
      await fetch('/api/requests', {
        method: 'POST',
        headers: {
        },
        body: JSON.stringify(values)
      });
      setIsModalVisible(false);
      // You might want to refresh your RequestTable data here
    } catch (error) {
      console.error('Error creating request:', error);
    }
  };

  return (
    <Layout>
      <Content style={{ padding: '24px' }}>
        <Card 
          style={{ 
            marginBottom: '24px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
          }}
        >
          <Title level={3}>{companyData.companyName}</Title>
          <Row gutter={[24, 24]}>
            <Col xs={24} sm={12}>
              <Card type="inner" title="Carbon Credits">
                <Text strong style={{ fontSize: '18px' }}>
                  {companyData.carbonBalance.toLocaleString()} tonnes
                </Text>
              </Card>
            </Col>
            <Col xs={24} sm={12}>
              <Card type="inner" title="Cash Balance">
                <Text strong style={{ fontSize: '18px' }}>
                  SGD {companyData.cashBalance.toLocaleString()}
                </Text>
              </Card>
            </Col>
          </Row>
        </Card>

        <Card 
			title={
				<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
				<span>Outstanding Requests</span>
				<Button 
					type="primary" 
					onClick={showModal}
				>
					Create Request
				</Button>
				</div>
			}
			style={{ 
				boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
			}}
		>     
			<Modal
			title="Create New Request"
			open={isModalVisible}
			onCancel={handleCancel}
			footer={null}
			>
				<RequestForm onSubmit={handleSubmit} onCancel={handleCancel} />
			</Modal>
          <RequestTable />
        </Card>
      </Content>
    </Layout>
  );
};

export default LandingPage;
