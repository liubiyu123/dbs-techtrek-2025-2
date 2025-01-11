import React, { useState, useEffect } from 'react';
import { Table, Tag, Button, Layout, Typography, Modal, Alert } from 'antd';
import NavBar from '../components/navbar';

const { Content } = Layout;
const { Title } = Typography;

const BiddingWindow = () => {
const [bids, setBids] = useState([
    {
        key: '1',
        bidDeadline: '2025-01-11 23:59:59',
        companyName: 'Company B',
        carbonBidUnitPrice: 28.50,
        carbonBidQuantity: 150,
        bidStatus: 'Open',
        bidType: 'Buy',
        auctionStyle: 'Reverse'
    },
    {
        key: '2',
        bidDeadline: '2025-01-11 23:59:59',
        companyName: 'Company c',
        carbonBidUnitPrice: 25.75,
        carbonBidQuantity: 200,
        bidStatus: 'Open',
        bidType: 'Sell',
        auctionStyle: 'Reverse'
    },
    {
        key: '3',
        bidDeadline: '2025-01-11 23:59:59',
        companyName: 'Company D',
        carbonBidUnitPrice: 30.00,
        carbonBidQuantity: 75,
        bidStatus: 'Closed',
        bidType: 'Buy',
        auctionStyle: 'Reverse'
    },

  ]);
  const [loading, setLoading] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(null);

  useEffect(() => {
    fetchBids();
    startCountdown();
  }, []);

  const startCountdown = () => {
    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);
    
    const timer = setInterval(() => {
      const now = new Date();
      const difference = endOfDay - now;
      
      if (difference <= 0) {
        clearInterval(timer);
        setTimeRemaining('Bidding window closed');
      } else {
        const hours = Math.floor(difference / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        setTimeRemaining(`${hours}h ${minutes}m ${seconds}s`);
      }
    }, 1000);

    return () => clearInterval(timer);
  };

  const fetchBids = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/bids', {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      setBids(data);
    } catch (error) {
      console.error('Error fetching bids:', error);
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      title: 'Bidding Window (Deadline)',
      dataIndex: 'bidDeadline',
      key: 'bidDeadline',
    },
    {
      title: 'Bidding Company Name',
      dataIndex: 'companyName',
      key: 'companyName',
    },
    {
      title: 'Carbon Price (SGD/Tonnes)',
      dataIndex: 'carbonBidUnitPrice',
      key: 'carbonBidUnitPrice',
      render: (price) => `SGD ${price.toFixed(2)}`,
    },
    {
      title: 'Carbon Quantity',
      dataIndex: 'carbonBidQuantity',
      key: 'carbonBidQuantity',
      render: (quantity) => `${quantity.toLocaleString()} tonnes`,
    },
    {
      title: 'Bid Status',
      dataIndex: 'bidStatus',
      key: 'bidStatus',
      render: (status) => (
        <Tag color={status === 'Open' ? 'green' : 'red'}>{status}</Tag>
      ),
      filters: [
        { text: 'Open', value: 'Open' },
        { text: 'Closed', value: 'Closed' },
      ],
    },
    {
      title: 'Bid Type',
      dataIndex: 'bidType',
      key: 'bidType',
      render: (type) => (
        <Tag color={type === 'Buy' ? 'blue' : 'orange'}>{type}</Tag>
      ),
      filters: [
        { text: 'Buy', value: 'Buy' },
        { text: 'Sell', value: 'Sell' },
      ],
    },
    {
      title: 'Auction Style',
      dataIndex: 'auctionStyle',
      key: 'auctionStyle',
    },
  ];

  const handleBidProposal = (record) => {
    Modal.confirm({
      title: 'Propose New Price',
      content: 'Feature coming soon...',
      okText: 'Submit',
      cancelText: 'Cancel',
    });
  };

  return (
    <Layout>
      <NavBar />
      <Content style={{ padding: '24px' }}>
        <Title level={2}>Bidding Window</Title>
        
        <Alert
          message="Current Bidding Window"
          description={`Time Remaining: ${timeRemaining}`}
          type="info"
          showIcon
          style={{ marginBottom: '16px' }}
        />

        <Table 
          columns={columns} 
          dataSource={bids} 
          rowKey="key"
          loading={loading}
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showTotal: (total) => `Total ${total} items`,
          }}
        />
      </Content>
    </Layout>
  );
};

export default BiddingWindow;
