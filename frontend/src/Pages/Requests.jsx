import NavBar from "../components/navbar";
import React, { useState } from 'react';
import { Button, Tag, Table, Space, Popconfirm } from "antd";
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';


const Requests = () => {
    
    
    
    //TODO: LOAD DATA AND SHOW POPUP IF ANY ARE OVERDUE
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
    
    
    //FUNCTIONS
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [loading, setLoading] = useState(false);
    const start = () => {
        setLoading(true);
        // ajax request after empty completing
        setTimeout(() => {
        setSelectedRowKeys([]);
        setLoading(false);
        }, 1000);
    };
    const onSelectChange = (newSelectedRowKeys) => {
        console.log('selectedRowKeys changed: ', newSelectedRowKeys);
        setSelectedRowKeys(newSelectedRowKeys);
    };
    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };

    const handleAccept = async (key) => {
        try {
            console.log("accepting:", selectedRowKeys)
        //   const token = localStorage.getItem('token');
        //   await fetch(`/api/requests/${key}`, {
        //     method: 'DELETE',
        //     headers: {
        //       'Authorization': `Bearer ${token}`,
        //       'Content-Type': 'application/json'
        //     }
        //   });
        //   setData(data.filter(item => item.key !== key));
        } catch (error) {
          console.error('Error accepting requests:', error);
        }
    };

    
    const handleReject = async (key) => {
        try {
            console.log("rejecting:", selectedRowKeys)
        //   const token = localStorage.getItem('token');
        //   await fetch(`/api/requests/${key}`, {
        //     method: 'DELETE',
        //     headers: {
        //       'Authorization': `Bearer ${token}`,
        //       'Content-Type': 'application/json'
        //     }
        //   });
        //   setData(data.filter(item => item.key !== key));
        } catch (error) {
          console.error('Error rejecting requests:', error);
        }
    };

    //DEFINE COLUMNS
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

    const hasSelected = selectedRowKeys.length > 0;
    return (
        <div className="container">
            <NavBar/>
            <div className="banner-container">
                <div className="banner">
                    <h2>Request page</h2>
                    <Table rowSelection={rowSelection} columns={columns} dataSource ={data}/>
                </div>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-around',
                }}> 
                    <Popconfirm
                        title="Accept selected requests"
                        description="Are you sure you want to accept your selected requests?"
                        onConfirm={() => handleAccept(selectedRowKeys)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button type="default" disabled={!hasSelected} loading={loading}>
                            Accept
                        </Button>
                    </Popconfirm>
                        
                    <Popconfirm
                        title="Reject selected requests"
                        description="Are you sure you want to reject your selected requests?"
                        onConfirm={() => handleReject(selectedRowKeys)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button danger type="default" disabled={!hasSelected} loading={loading}>
                        Reject
                    </Button>
                    </Popconfirm>                    
                    
                </div>
            </div>
        </div>
    );
};

export default Requests;