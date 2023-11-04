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
  notification,
} from 'antd';
import { useMovieList } from 'hooks/useMovieList';
import { addMovieListApi } from 'services/movie';
import { useNavigate } from 'react-router-dom';
import "./index.scss"

export default function MovieForm() {
    const [componentSize, setComponentSize] = useState('default');
    const onFormLayoutChange = ({ size }) => {
      setComponentSize(size);
    };
    const navigate = useNavigate();
    const [formState, SetFormState] = useState({
        tenPhim: "",
        trailer: "",
        moTa: "",
        maNhom: "GP02",
        ngayKhoiChieu: "",
        sapChieu: true,
        dangChieu: true,
        hot: true,
        danhGia: "",
        hinhAnh: "",
    })

    const movieList = useMovieList();

    const handleFinish = async (values) => {
      let isValid = true;

      isValid &= required(values.danhGia);
      isValid &= required(values.hinhAnh);
      isValid &= required(values.hot);
      isValid &= required(values.ngayKhoiChieu);
      isValid &= required(values.tenPhim);
      isValid &= required(values.trailer);
      isValid &= required(values.moTa);
      if(!isValid){
        // console.log(values);
        notification.warning({
          message: "Form nhập thiếu thông tin, nhập thêm."
        });
        return;
      }

      //chỉ có những đối tượng như ngày khởi chiếu mới .format lại được
      values.ngayKhoiChieu = values?.ngayKhoiChieu?.format("DD/MM/YYYY");
      isValid &= checkNumber(values.danhGia, 0, 10);
      if(!isValid){
        notification.warning({
          message: "Đánh giá chỉ nhập từ 0 đến 10."
        });
        return;
      }

      isValid &= checkLength(values.moTa.length, 0, 999)
      if(!isValid){
        notification.warning({
          message: "Mô tả chỉ nhập từ 0 đến 999 ký tự, bao gồm cả khoảng trắng"
        });
        return;
      }

      isValid &= checkMovieState(values.dangChieu, values.sapChieu);
      if(!isValid){
        notification.warning({
          message: "Đang chiếu và sắp chiếu không thể nhập cùng giá trị, nhập lại."
        });
        return;
      }

      //lưu ý
      //id bắt đầu từ 1-9, phần tử thì vẫn từ 0 đến 8
      const maPhim = (+movieList[movieList.length-1].maPhim)+1+"";
      const id = (+movieList[movieList.length-1].id)+1+"";
      const biDanh = values.tenPhim;
      isValid &= required(maPhim);
      isValid &= required(id);
      isValid &= required(biDanh);
      if(!isValid){
        notification.warning({
          //không call được api nên không có data
          message: `Form đang lỗi, thử lại sau.`
        });
        return;
      }

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
      addMovieListApi(data);

      notification.success({
        message: "thêm phim thành công",
      })
      navigate("/admin/movie-management");
    }

    const handleBlur = (event) => {
      console.log(event.target, "event");
      let message = "";
      if(event.target.value === ""){    
        message = `${event.target.id === "ngayKhoiChieu" ? "Ngày khởi chiếu" : event.target.title} không được để trống`;
      };

      if(event.target.id === "danhGia"){
        const isValid = checkNumber(event.target.value, 0, 10);
        if(!isValid){
          message = `${event.target.title} có giá trị từ 0 đến 10`;
        }
      }

      if(event.target.id === "moTa"){
        const isValid = checkLength(event.target.value.length, 0, 999);
        if(!isValid){
          message = `${event.target.title} chỉ được nhập giá trị từ 0 đến 999, bao gồm cả khoảng trắng`;
        }
      }

      SetFormState({
        ...formState,
        [event.target.id]: message
      });
    }

    const required = (data) => {
      if(!data){
        return false;
      }
      return true;
    }

    const checkNumber = (data, min, max) => {
      if(data<min || data>max){
        return false;
      }
      return true;
    }

    const checkLength = (data, min, max) => {
      if(data<min || data>max){
        return false;
      }
      return true;
    }

    const checkMovieState = (dangChieu, sapChieu) => {
      if((dangChieu === false && sapChieu === false) ||
      (dangChieu === true && sapChieu === true)){
        return false;
      }
      return true
    }

    return (
      <>
        {/* <h1>THÊM PHIM MỚI</h1> */}
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
            hinhAnh: "",
          }}
          //giống onSubmit của form
          onFinish={handleFinish}
          onValuesChange={onFormLayoutChange}
          size={componentSize}
          style={{
            maxWidth: 600,
          }}
          className='MovieForm'
        >
          <Form.Item label="Form Size" name="size">
            <Radio.Group>
              <Radio.Button value="small">Small</Radio.Button>
              <Radio.Button value="default">Default</Radio.Button>
              <Radio.Button value="large">Large</Radio.Button>
            </Radio.Group>
          </Form.Item>

          <Form.Item label="Tên phim" name="tenPhim">
            <Input onBlur={(e)=>{handleBlur(e)}} title='Tên phim'/>
          </Form.Item>
          <span className="text-danger error-notification">{formState.tenPhim}</span>

          <Form.Item label="Trailer" name="trailer">
            <Input onBlur={(e)=>{handleBlur(e)}} title = "Trailer"/>
          </Form.Item>
            <span className="text-danger error-notification">{formState.trailer}</span>

          <Form.Item label="Mô tả" name="moTa">
            <Input onBlur={(e)=>{handleBlur(e)}} title='Mô tả'/>
          </Form.Item>
            <span className="text-danger error-notification">{formState.moTa}</span>

          <Form.Item label="Ngày khởi chiếu: " name="ngayKhoiChieu">
            <DatePicker onBlur={(e)=>{handleBlur(e)}} title = "Ngày khởi chiếu"/>
          </Form.Item>
            <span className="text-danger error-notification">{formState.ngayKhoiChieu}</span>

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
            <InputNumber onBlur={(e)=>{handleBlur(e)}} title = "Đánh giá"/>
          </Form.Item>
          <span className="text-danger error-notification">{formState.danhGia}</span>
          {/* <Form.Item label="Hình ảnh">
              <Input type='file'></Input>
          </Form.Item> */}
          <Form.Item label="Link hình ảnh" name="hinhAnh">
            <Input onBlur={(e)=>{handleBlur(e)}} title = "Hình ảnh"/>
          </Form.Item>
          <span className="text-danger error-notification">{formState.hinhAnh}</span>
          <Form.Item label="Tác vụ">
            <Button htmlType='submit'>SAVE</Button>
          </Form.Item>
        </Form>
      </>
    );
}
