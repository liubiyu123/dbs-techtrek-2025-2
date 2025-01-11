import React, { useState } from "react";
import { Table, Space, Button, Popconfirm } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

const BiddingTable = ({ onEdit, onDelete }) => {
  const [data, setData] = useState([
    {
      key: "1",
      bidDate: "2025-01-11",
      companyName: "Company A",
      carbonUnitPrice: 25.0,
      carbonQuantity: 100,
      auctionStyle: "Traditional",
      bidType: "Buy",
    },
  ]);

  const columns = [
    {
      title: "Bid Date",
      dataIndex: "bidDate",
      key: "bidDate",
      sorter: (a, b) => new Date(a.bidDate) - new Date(b.bidDate),
    },
    // {
    //   title: "Company Name",
    //   dataIndex: "companyName",
    //   key: "companyName",
    //   sorter: (a, b) => a.companyName.localeCompare(b.companyName),
    // },
    {
      title: "Carbon Price (SGD/Tonnes)",
      dataIndex: "carbonUnitPrice",
      key: "carbonUnitPrice",
      render: (price) => `SGD ${price.toFixed(2)}`,
      sorter: (a, b) => a.carbonUnitPrice - b.carbonUnitPrice,
    },
    {
      title: "Carbon Quantity",
      dataIndex: "carbonQuantity",
      key: "carbonQuantity",
      render: (quantity) => `${quantity.toLocaleString()} tonnes`,
      sorter: (a, b) => a.carbonQuantity - b.carbonQuantity,
    },
    {
      title: "Bid Type",
      dataIndex: "bidType",
      key: "BidType",
      filters: [
        { text: "Buy", value: "Buy" },
        { text: "Sell", value: "Sell" },
      ],
      onFilter: (value, record) => record.bidType === value,
    },
    {
      title: "Auction Style",
      dataIndex: "auctionStyle",
      key: "auctionType",
      filters: [
        { text: "Traditional", value: "Traditional" },
        { text: "Reverse", value: "Reverse" },
      ],
      onFilter: (value, record) => record.auctionStyle === value,
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space size='middle'>
          <Button
            type='primary'
            icon={<EditOutlined />}
            onClick={() => onEdit(record)}
          />
          <Popconfirm
            title='Delete this bid?'
            description='Are you sure you want to delete this bid?'
            onConfirm={() => handleDelete(record.key)}
            okText='Yes'
            cancelText='No'
          >
            <Button type='primary' danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const handleDelete = async (key) => {
    try {
      const token = localStorage.getItem("token");
      await fetch(`/api/requests/${key}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      setData(data.filter((item) => item.key !== key));
    } catch (error) {
      console.error("Error deleting bid:", error);
    }
  };

  return (
    <Table
      columns={columns}
      dataSource={data}
      pagination={{
        pageSize: 10,
        showSizeChanger: true,
        showTotal: (total) => `Total ${total} items`,
      }}
    />
  );
};

export default BiddingTable;
