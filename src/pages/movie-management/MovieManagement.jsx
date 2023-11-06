import { useMovieList } from 'hooks/useMovieList'
import React from 'react'
import { Button, Space, Table, Tag, notification } from 'antd';
import "./index.scss"
import { formatDate } from 'utils';
import { useNavigate } from 'react-router-dom';
import { event } from 'jquery';
import { deleteMovieDetailApi } from 'services/movie';

export default function MovieManagement() {
  const movieList =  useMovieList();
  const navigate = useNavigate();

  const columns = [
    {
      title: "Tên Phim",
      key: "1",
      dataIndex: "tenPhim",
    },
    {
      title: "Ngày khởi chiếu",
      key: "2",
      dataIndex: "ngayKhoiChieu",
      //render chỉ mang tính chất format text
      render: (text) => formatDate(text),
    },
    {
      title: "Hình ảnh",
      key: "3",
      dataIndex: "hinhAnh",
      render: (text)=> {
        return(
          <img src={text} alt='#' className='hinhAnh'/>
        )
      }
    },
    {
      title: "Đánh giá",
      key: "4",
      dataIndex: "danhGia",
    },
    {
      title: "Hành động",
      key: "5",
      render: (text)=>{
        //text render sẽ là movieList trả về
        return(
          <div>
            <Button 
            onClick={(event)=>{
              event.preventDefault();
              navigate(`/admin/movie-management/edit/${text.maPhim}`);
            }}>
              EDIT
            </Button>
            <Button
            onClick={(e)=>{
              e.preventDefault();
              //không xóa được phim đã có lịch chiếu, booking
              deleteMovieDetail(text);
            }}
            >
              DELETE
            </Button>
          </div>
        )
      }
    }

  ];
  const data = [];

  const deleteMovieDetail = async (data) => {
    //phim ở nhóm GP01 là những phim đang chiếu
    if(data?.maNhom === "GP01" && data?.dangChieu === true){
      notification.error({
        message: "Phim đang chiếu không thể xóa."
      });
      return;
    }
    if(data?.maNhom !== "GP01" && data?.dangChieu === false){
      await deleteMovieDetailApi(data.id);
      notification.success({
        message: "Xóa phim thành công."
      })
    }
    window.scrollTo(0,0);
    //chạy lại component để render lại giao diện
    //update lại store để chạy lại giao diện
    navigate("/admin/movie-management");
    return;

  }

  return (
    <div>
      <h1>QUẢN LÝ PHIM</h1>
      <Button
      className='mb-5'
      type='primary'
      onClick={(event)=>{
        event.preventDefault();
        navigate("/admin/movie-management/add")
      }}
      >
        THÊM PHIM
      </Button>
      <Table columns={columns} dataSource={movieList} />
    </div>
  )
}
