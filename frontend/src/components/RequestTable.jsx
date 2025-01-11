import React from 'react';
import { Table, Tag } from 'antd';

const RequestTable = () => {
  const columns = [
    {
      title: 'Request Date',
      dataIndex: 'requestDate',
      key: 'requestDate',
      sorter: (a, b) => new Date(a.requestDate) - new Date(b.requestDate),
    },
    {
      title: 'Company Name',
      dataIndex: 'companyName',
      key: 'companyName',
    },
    {
      title: 'Carbon Price (SGD/Tonnes)',
      dataIndex: 'carbonUnitPrice',
      key: 'carbonUnitPrice',
      render: (price) => `SGD ${price.toFixed(2)}`,
    },
    {
      title: 'Carbon Quantity',
      dataIndex: 'carbonQuantity',
      key: 'carbonQuantity',
      render: (quantity) => `${quantity.toLocaleString()} tonnes`,
    },
    {
      title: 'Requesting Reason',
      dataIndex: 'requestReason',
      key: 'requestReason',
    },
    {
      title: 'Request Type',
      dataIndex: 'requestType',
      key: 'requestType',
      render: (type) => (
        <Tag color={type === 'Buy' ? 'green' : 'red'}>
          {type}
        </Tag>
      ),
      filters: [
        { text: 'Buy', value: 'Buy' },
        { text: 'Sell', value: 'Sell' },
      ],
      onFilter: (value, record) => record.requestType === value,
    },
  ];

  const data = [
    {
      key: '1',
      requestDate: '2025-01-11',
      companyName: 'Company A',
      carbonUnitPrice: 25.00,
      carbonQuantity: 100,
      requestReason: 'Reason A',
      requestType: 'Buy',
    },
    {
      key: '2',
      requestDate: '2025-01-10',
      companyName: 'Company B',
      carbonUnitPrice: 30.00,
      carbonQuantity: 50,
      requestReason: 'Reason B',
      requestType: 'Sell',
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={data}
      pagination={{
        pageSize: 10,
        showSizeChanger: true,
        showTotal: (total) => `Total ${total} items`,
      }}
      scroll={{ x: true }}
    />
  );
};

export default RequestTable;
