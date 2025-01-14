import NavBar from "../components/navbar";
import React, { useState, useEffect } from 'react';
import { Alert } from "antd";
import { Button, Tag, Table, Space, Popconfirm, Layout, Card, Typography} from "antd";
const { Title, Text } = Typography;


const Requests = () => {
    
    const [overdueCount, setOverdueCount] = useState(0);    
	
	useEffect(() => {
        checkOverdueRequests();
    }, []);

    const checkOverdueRequests = () => {
        const currentDate = new Date();
        const sevenDaysAgo = new Date(currentDate - 7 * 24 * 60 * 60 * 1000);
        
        const count = data.reduce((acc, request) => {
            const requestDate = new Date(request.requestDate);
            return requestDate < sevenDaysAgo ? acc + 1 : acc;
        }, 0);
        
        setOverdueCount(count);
    };
    const company_id = localStorage.getItem('token');
    console.log("requests for company: ", company_id)
    const data = [
        {
            key: '1',
            requestDate: '2023-01-11',
            companyName: 'Company A',
            carbonUnitPrice: 25.00,
            carbonQuantity: 100,
            requestReason: 'Reason A',
            requestType: 'Buy',
        },
        {
            key: '2',
            requestDate: '2024-01-10',
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

    const handleAccept = async () => {
        try {
            for (let i = 0; i < selectedRowKeys.length; i++) {
                console.log("accepting request:", data[selectedRowKeys[i]-1]) //TODO: change to match the key
                //TODO: Populate value with the correct request ID
                let values = {

                }
                await fetch('/api/incoming/update', {
                    method: 'PUT',
                    headers: {
                    },
                    body: JSON.stringify(values)
                });
            }
            
        } catch (error) {
          console.error('Error accepting requests:', error); 
        }
    };

    
    const handleReject = async () => {
        try {
            for (let i = 0; i < selectedRowKeys.length; i++) {
                console.log("rejecting request:", data[selectedRowKeys[i]-1]) //TODO: change to match the key
                //TODO: Populate value with the correct request ID
                let values = {

                }
                await fetch('/api/incoming/update', {
                    method: 'PUT',
                    headers: {
                    },
                    body: JSON.stringify(values)
                });
            }
        
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
        <Layout>
            <div className="container">
            <NavBar/>
            
            <Card 
                style={{ 
                    marginBottom: '24px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                }}
            >   
                {overdueCount > 0 && (
                <Alert
                    message="Outstanding Requests"
                    description={`There are ${overdueCount} request(s) that have been outstanding for more than 7 days. Please review them.`}
                    type="warning"
                    showIcon
                    style={{ marginBottom: 16 }}
                    closable
                />
                )}
                <Title level={3}>Received Requests</Title>

                <div className="banner-container">
                <Table rowSelection={rowSelection} columns={columns} dataSource ={data}/>
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
            </Card>
        </div>
        </Layout>
    );
};

export default Requests;