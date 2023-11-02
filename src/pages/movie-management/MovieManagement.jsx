import { useMovieList } from 'hooks/useMovieList'
import React from 'react'
import { Button, Space, Table, Tag } from 'antd';
import "./index.scss"
import { formatDate } from 'utils';
import { useNavigate } from 'react-router-dom';

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
      title: "Mô tả",
      key: "3",
      dataIndex: "moTa",
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
        return(
          <div>
            <Button>EDIT</Button>
            <Button>DELETE</Button>
          </div>
        )
      }
    }

  ];
  const data = [];

  console.log(movieList);

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
