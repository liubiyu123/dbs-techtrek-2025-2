import React, { useState } from 'react';
import { Table, Space, Button, Popconfirm } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

const RequestTable = ({ onEdit, onDelete }) => {
  const [data, setData] = useState([
    {
      key: '1',
      requestDate: '2025-01-11',
      companyName: 'Company A',
      carbonUnitPrice: 25.00,
      carbonQuantity: 100,
      requestReason: 'Offset Q1 2025',
      requestType: 'Buy'
    }
  ]);

  const columns = [
    {
      title: 'Request Date',
      dataIndex: 'requestDate',
      key: 'requestDate',
      sorter: (a, b) => new Date(a.requestDate) - new Date(b.requestDate)
    },
    {
      title: 'Company Name',
      dataIndex: 'companyName',
      key: 'companyName',
      sorter: (a, b) => a.companyName.localeCompare(b.companyName)
    },
    {
      title: 'Carbon Price (SGD/Tonnes)',
      dataIndex: 'carbonUnitPrice',
      key: 'carbonUnitPrice',
      render: (price) => `SGD ${price.toFixed(2)}`,
      sorter: (a, b) => a.carbonUnitPrice - b.carbonUnitPrice
    },
    {
      title: 'Carbon Quantity',
      dataIndex: 'carbonQuantity',
      key: 'carbonQuantity',
      render: (quantity) => `${quantity.toLocaleString()} tonnes`,
      sorter: (a, b) => a.carbonQuantity - b.carbonQuantity
    },
    {
      title: 'Requesting Reason',
      dataIndex: 'requestReason',
      key: 'requestReason'
    },
    {
      title: 'Request Type',
      dataIndex: 'requestType',
      key: 'requestType',
      filters: [
        { text: 'Buy', value: 'Buy' },
        { text: 'Sell', value: 'Sell' }
      ],
      onFilter: (value, record) => record.requestType === value
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space size="middle">
          <Button 
            type="primary" 
            icon={<EditOutlined />}
            onClick={() => onEdit(record)}
          />
          <Popconfirm
            title="Delete this request?"
            description="Are you sure you want to delete this request?"
            onConfirm={() => handleDelete(record.key)}
            okText="Yes"
            cancelText="No"
          >
            <Button 
              type="primary" 
              danger 
              icon={<DeleteOutlined />}
            />
          </Popconfirm>
        </Space>
      )
    }
  ];

  const handleDelete = async (key) => {
    try {
      const token = localStorage.getItem('token');
      await fetch(`/api/requests/${key}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      setData(data.filter(item => item.key !== key));
    } catch (error) {
      console.error('Error deleting request:', error);
    }
  };

  return (
    <Table 
      columns={columns} 
      dataSource={data}
      pagination={{
        pageSize: 10,
        showSizeChanger: true,
        showTotal: (total) => `Total ${total} items`
      }}
    />
  );
};

export default RequestTable;
