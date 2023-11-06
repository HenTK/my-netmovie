import React, { useEffect, useState } from 'react';
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
import { addMovieListApi, editMovieDetailApi } from 'services/movie';
import { useNavigate, useParams } from 'react-router-dom';
import "./index.scss"
import { event } from 'jquery';
import { fectMovieDetailApi } from 'services/movie';
import { useForm } from 'antd/es/form/Form';
import moment from 'moment';

export default function MovieForm() {
    const [indexDataMatchParamsId, setIndexDataMatchParamsId] = useState(0);
    const [form] = useForm();
    const params = useParams();
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
    });
    const [imagePreview, setImagePreview] = useState("");

    const movieList = useMovieList();

    useEffect(()=>{
      //nếu trường hợp là edit
      if(params.id){
        //ở đây hệ thống thức thế sẽ fetch detail movie dựa trên params.id
        getMovieDetail();
      }

    },[params.id]);

    const getMovieDetail = async () => {
      const result = await fectMovieDetailApi();
      const idx = result?.data?.findIndex(ele=>ele.maPhim === params.id);
      setIndexDataMatchParamsId(idx);
      if(idx === -1){
        console.log("null");
        return;
      }
      console.log(result.data[idx], "result");
      form.setFieldsValue({
        tenPhim: result?.data[idx]?.tenPhim,
        moTa: result?.data[idx]?.moTa,
        ngayKhoiChieu: moment(result?.data[idx]?.ngayKhoiChieu),
        trailer: result?.data[idx]?.trailer,
        sapChieu: result?.data[idx]?.sapChieu,
        dangChieu: result?.data[idx]?.dangChieu,
        hot: result?.data[idx]?.hot,
        danhGia: result?.data[idx]?.danhGia,
        hinhAnh: result?.data[idx]?.hinhAnh,
      })
      //hiển thị ảnh
      setImagePreview(result?.data[idx]?.hinhAnh);
    }

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
      if(params.id){
        console.log(indexDataMatchParamsId, "indexDataMatchParamsId");
        const result = JSON.parse(JSON.stringify(movieList[indexDataMatchParamsId]));
        //những trường không thể đổi để có thể update
        data.maNhom = result.maNhom;
        data.maPhim = result.maPhim;
        data.id = result.id;
        await editMovieDetailApi(data, data.id);
        notification.success({
          message: "chỉnh sửa phim thành công",
        })
        navigate("/admin/movie-management");
        
        return;
      }

      await addMovieListApi(data);
      notification.success({
        message: "thêm phim thành công",
      })
      navigate("/admin/movie-management");
    }

    // const handleBlur = (event) => {
    //   console.log(event.target, "event");
    //   let message = "";
    //   if(event.target.value === ""){    
    //     message = `${event.target.id === "ngayKhoiChieu" ? "Ngày khởi chiếu" : event.target.title} không được để trống`;
    //   };

    //   if(event.target.id === "danhGia"){
    //     const isValid = checkNumber(event.target.value, 0, 10);
    //     if(!isValid){
    //       message = `${event.target.title} có giá trị từ 0 đến 10`;
    //     }
    //   }

    //   if(event.target.id === "moTa"){
    //     const isValid = checkLength(event.target.value.length, 0, 999);
    //     if(!isValid){
    //       message = `${event.target.title} chỉ được nhập giá trị từ 0 đến 999, bao gồm cả khoảng trắng`;
    //     }
    //   }

    //   SetFormState({
    //     ...formState,
    //     [event.target.id]: message
    //   });
    // }

    const handleChange = (data) => {
      setImagePreview(data);
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
        <h5>THÊM PHIM MỚI</h5>
        <Form
          form={form}
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

          <Form.Item 
          label="Tên phim" 
          name="tenPhim" 
          rules={[
            {required: true, message: "Tên phim không được để trống"},
            {min: 5, message: "Tên phim phải lớn hơn 5 ký tự"},
            {max: 50, message: "Tên phim phải nhỏ hơn 50 ký tự"},
            //pattern
          ]}
          >
            {/* <Input onBlur={(e)=>{handleBlur(e)}} title='Tên phim'/> */}
            <Input/>
          </Form.Item>
          {/* <span className="text-danger error-notification">{formState.tenPhim}</span> */}
          <Form.Item 
          label="Trailer" 
          name="trailer"
          rules={[
            {required: true, message: "Trailer không được để trống"},
            {min: 5, message: "Trailer phải lớn hơn 5 ký tự"},
            {max: 500, message: "Trailer phải nhỏ hơn 500 ký tự"},
          ]}
          >
            <Input/>
          </Form.Item>
          <Form.Item 
          label="Mô tả" 
          name="moTa"
          rules={[
            {required: true, message: "Mô tả không được để trống"},
            {min: 5, message: "Mô tả phải lớn hơn 5 ký tự"},
            {max: 999, message: "Mô tả phải nhỏ hơn 999 ký tự"},
          ]}
          >
            <Input/>
          </Form.Item>
          <Form.Item 
          label="Ngày khởi chiếu: " 
          name="ngayKhoiChieu"
          rules={[
            {required: true, message: "Ngày khởi chiếu không được để trống"},
          ]}
          >
            <DatePicker/>
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
          <Form.Item 
          label="Đánh giá" 
          name="danhGia"
          rules={[
            {required: true, message: "Trailer không được để trống"},
            {min: 1, message: "Trailer phải lớn hơn 1 ký tự"},
            {max: 2, message: "Trailer phải nhỏ hơn 2 ký tự"},
          ]}
          >
            <InputNumber/>
          </Form.Item>
          {/* <Form.Item label="Hình ảnh">
              <Input type='file'></Input>
          </Form.Item> */}
          <Form.Item 
          label="Link hình ảnh" 
          name="hinhAnh"
          rules={[
            {required: true, message: "Link hình ảnh không được để trống"},
            {min: 5, message: "Link hình ảnh phải lớn hơn 5 ký tự"},
            {max: 500, message: "Link hình ảnh phải nhỏ hơn 500 ký tự"},
          ]}
          >
            <Input onChange={(e)=>handleChange(e.target.value)}/>
          </Form.Item>
          <img src={imagePreview} alt="#" className='imagePreview'/>
          <Form.Item label="Tác vụ">
            <Button htmlType='submit'>SAVE</Button>
          </Form.Item>
        </Form>
      </>
    );
}
