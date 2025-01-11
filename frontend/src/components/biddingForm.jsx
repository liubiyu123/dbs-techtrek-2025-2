import React from "react";
import { Form, Input, InputNumber, Select, Button, DatePicker } from "antd";

const { Option } = Select;

const BiddingForm = ({ onCancel, onSubmit }) => {
  const [form] = Form.useForm();

  const handleFormSubmit = async () => {
    try {
      const values = await form.validateFields();
      onSubmit(values);
      form.resetFields();
    } catch (error) {
      console.error("Form validation failed:", error);
    }
  };

  return (
    <Form form={form} layout='vertical'>
      <Form.Item
        name='bidDate'
        label='Bid Date'
        rules={[{ required: true, message: "Please select a date" }]}
      >
        <DatePicker style={{ width: "100%" }} />
      </Form.Item>

      <Form.Item
        name='companyId'
        label='Company ID'
        rules={[{ required: true, message: "Please enter company ID" }]}
      >
        <Input style={{ width: "100%" }} />
      </Form.Item>

      <Form.Item
        name='carbonUnitPrice'
        label='Carbon Price (SGD/Tonnes)'
        rules={[{ required: true, message: "Please enter carbon price" }]}
      >
        <InputNumber
          min={0}
          step={0.01}
          prefix='SGD'
          style={{ width: "100%" }}
        />
      </Form.Item>

      <Form.Item
        name='carbonQuantity'
        label='Carbon Quantity (Tonnes)'
        rules={[{ required: true, message: "Please enter quantity" }]}
      >
        <InputNumber min={1} style={{ width: "100%" }} />
      </Form.Item>

      <Form.Item
        name='bidType'
        label='Bid Type'
        rules={[{ required: true, message: "Please select bid type" }]}
      >
        <Select>
          <Option value='Buy'>Buy</Option>
          <Option value='Sell'>Sell</Option>
        </Select>
      </Form.Item>

      <Form.Item
        name='auctionStyle'
        label='Auction Style'
        rules={[{ required: true, message: "Please select auction style" }]}
      >
        <Select>
          <Option value='Traditional'>Traditional</Option>
          <Option value='Reverse'>Reverse</Option>
        </Select>
      </Form.Item>

      <Form.Item>
        <div
          style={{ display: "flex", justifyContent: "flex-end", gap: "8px" }}
        >
          <Button onClick={onCancel}>Cancel</Button>
          <Button type='primary' onClick={handleFormSubmit}>
            Submit
          </Button>
        </div>
      </Form.Item>
    </Form>
  );
};

export default BiddingForm;
