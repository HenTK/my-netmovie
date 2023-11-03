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
import { useMovieList } from 'hooks/useMovieList';

export default function MovieForm() {
    const [componentSize, setComponentSize] = useState('default');
    const onFormLayoutChange = ({ size }) => {
      setComponentSize(size);
    };

    const movieList = useMovieList();

    const handleFinish = (values) => {
      //chỉ có những đối tượng như ngày khởi chiếu mới .format lại được
      values.ngayKhoiChieu = values.ngayKhoiChieu.format("DD/MM/YYYY");
      console.log(values, "form values");
      console.log(movieList.length, "movieList length");
      //lưu ý
      //id bắt đầu từ 1-9, phần tử thì vẫn từ 0 đến 8
      const maPhim = (+movieList[movieList.length-1].maPhim)+1+"";
      const id = (+movieList[movieList.length-1].id)+1+"";
      const biDanh = values.tenPhim;
      const data = {
        biDanh: biDanh,
        dangChieu: values.dangChieu,
        danhGia: values.danhGia,
        hinhAnh: values.hinhAnh,
        hot: values.hot,
        maNhom: "GP02",
        maPhim: maPhim,
        ngayKhoiChieu: values.ngayKhoiChieu,
        sapChieu: values.sapChieu,
        tenPhim: values.tenPhim,
        trailer: values.trailer,
        moTa: values.moTa,
        id: id,
      }
      console.log(data);
    }

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
          //default Value
          tenPhim: "",
          trailer: "",
          moTa: "",
          maNhom: "GP02",
          ngayKhoiChieu: "",
          sapChieu: true,
          dangChieu: true,
          hot: true,
          danhGia: "10",
        }}
        //giống onSubmit của form
        onFinish={handleFinish}
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
        <Form.Item label="Tên phim" name="tenPhim">
          <Input />
        </Form.Item>
        <Form.Item label="Trailer" name="trailer">
          <Input />
        </Form.Item>
        <Form.Item label="Mô tả" name="moTa">
          <Input />
        </Form.Item>
        <Form.Item label="Ngày khởi chiếu: " name="ngayKhoiChieu">
          <DatePicker />
        </Form.Item>
        <Form.Item label="Đang chiếu" valuePropName="checked" name="dangChieu">
          <Switch />
        </Form.Item>
        <Form.Item label="Sắp chiếu" valuePropName="checked" name="sapChieu">
          <Switch />
        </Form.Item>
        <Form.Item label="Hot" valuePropName="checked" name="hot">
          <Switch />
        </Form.Item>
        <Form.Item label="Đánh giá" name="danhGia">
          <InputNumber />
        </Form.Item>
        {/* <Form.Item label="Hình ảnh">
            <Input type='file'></Input>
        </Form.Item> */}
        <Form.Item label="Link hình ảnh" name="hinhAnh">
          <Input />
        </Form.Item>
        <Form.Item label="Tác vụ">
          <Button htmlType='submit'>SAVE</Button>
        </Form.Item>
      </Form>
    );
}
