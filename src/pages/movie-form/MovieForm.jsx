import React, { useState } from 'react';
import {
  Button,
  Cascader,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  Select,
  Switch,
  TreeSelect,
} from 'antd';

export default function MovieForm() {
    const [componentSize, setComponentSize] = useState('default');
    const onFormLayoutChange = ({ size }) => {
      setComponentSize(size);
    };
    return (
      <Form
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 14,
        }}
        layout="horizontal"
        initialValues={{
          size: componentSize,
        }}
        onValuesChange={onFormLayoutChange}
        size={componentSize}
        style={{
          maxWidth: 600,
        }}
      >
        <Form.Item label="Form Size" name="size">
          <Radio.Group>
            <Radio.Button value="small">Small</Radio.Button>
            <Radio.Button value="default">Default</Radio.Button>
            <Radio.Button value="large">Large</Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="Tên phim">
          <Input />
        </Form.Item>
        <Form.Item label="Trailer">
          <Input />
        </Form.Item>
        <Form.Item label="Mô tả">
          <Input />
        </Form.Item>
        <Form.Item label="Ngày khởi chiếu: ">
          <DatePicker />
        </Form.Item>
        <Form.Item label="Đang chiếu" valuePropName="checked">
          <Switch />
        </Form.Item>
        <Form.Item label="Sắp chiếu" valuePropName="checked">
          <Switch />
        </Form.Item>
        <Form.Item label="Hot" valuePropName="checked">
          <Switch />
        </Form.Item>
        <Form.Item label="Đánh giá">
          <InputNumber />
        </Form.Item>
        <Form.Item label="Hình ảnh">
            <Input type='file'></Input>
        </Form.Item>
        <Form.Item label="Tác vụ">
          <Button>SAVE</Button>
        </Form.Item>
      </Form>
    );
}
