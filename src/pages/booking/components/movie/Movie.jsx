import React, { useEffect, useState } from 'react'
import "./index.scss"
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom';
import { dispatchBookingState } from '../../../../store/actions/bookingAction';
import { postTicketDetailApi, updateTicketDetailApi } from '../../../../services/ticket';
import { notification } from 'antd';
import * as _ from "lodash"

export default function Movie(props) {
  //thấy thông tin user
  const loginUserState = useSelector((state)=>state.loginReducer);
  //lấy thông tin ghế để post lên api người dùng đã đặt
  const bookingListState = useSelector((state)=>state.bookingReducer);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const params = useParams();
  useEffect(()=>{
    getLoginUserDetail();
  },[]);

  const getLoginUserDetail = () => {
        console.log(loginUserState?.userDetail?.length);
  };

  const handleBooking = async () => {
    //scoll về đầu trang để load không bị thừa
    window.scrollTo(0,0);
    
    console.log(props.selectedSeatList, "props.selectedSeatList");
    // console.log(params.id);
    dispatch(dispatchBookingState({
      id: params.id,
      booking: true,
      selectedSeatList: props.selectedSeatList,
    }));
    //set state loading true
    props.setLoadingState({
      isLoading: true,
    });;
    
    if(loginUserState.userDetail.id === ""){
      await setTimeout(()=>{
        navigate("/login");
      },2000);
      return;
    }else{
      const data = [...bookingListState.bookingList];
      const idx = data.findIndex(ele=>ele.ma === params.id);
      if(idx === -1){
        alert("Phim này chưa công chiếu");
        return;
      }
      // console.log(data[idx].danhSachGhe, "data copy store");
      console.log(props.selectedSeatList, "selectedSeatList");
      // console.log(bookingListState.bookingList, "bookingListState");
      for(let i = 0; i<data[idx].danhSachGhe.length; i++){
        for(let j = 0; j<props.selectedSeatList.length; j++){
          if(data[idx].danhSachGhe[i].maGhe === props.selectedSeatList[j].maGhe){
            console.log(data[idx].danhSachGhe[i].maGhe, "maGhe");
            data[idx].danhSachGhe[i].daDat = true;
            data[idx].danhSachGhe[i].taiKhoanNguoiDat = loginUserState.userDetail.taiKhoan;
          }
        }
      }
      // console.log(data);
      //bị dính tham chiếu do spread operator chỉ copy bên ngoài [...] còn tham chiếu bên trong chưa mất
      //có thể để nguyên và post lên api mà không cần dùng JSON.parse(JSON.stringify(...)) để bỏ tham chiếu
      // console.log(bookingListState.bookingList);
      //đẩy giá trị update lại api đặt vé

      //logout cần reset toàn bộ store
      // xu ly xong va 2s sau post len store
      // console.log(bookingListState.bookingList, "post data to api");
      const indexDataUpdateApiTicketDetail = bookingListState.bookingList.findIndex(ele=>ele.ma === params.id);
      console.log(bookingListState.bookingList[indexDataUpdateApiTicketDetail], "dataUpdateApiTicketDetail");
      updateTicketDetailApi(bookingListState.bookingList[indexDataUpdateApiTicketDetail], bookingListState.bookingList[indexDataUpdateApiTicketDetail].id);
      // await updateTicketDetailApi(bookingListState.bookingList);
      // await updateTicketDetailApi(bookingListState.bookingList);
      //set state loading ve false
      await setTimeout(()=>{
        notification.success({
          message: "Đặt vé thành công."
        })
        props.setLoadingState({
          isLoading: false,
        });
      },2000);
      
    };
  }

  return (
      <div className="col-4 movie" style={{textAlign: 'center'}}>
        <img
            src={props.ticketDetail?.thongTinPhim?.hinhAnh}
            alt="#"
        />
        <h4 className="mb-0">{props.ticketDetail?.thongTinPhim?.tenPhim}</h4>
        <h5 className="mb-0" >
            Number of seats:
            <div className="">
            {props.renderSelectedSeatList()}
            </div>
        </h5>
        <h5>Total: {_.sumBy(props.selectedSeatList, "giaVe").toLocaleString()} vnđ</h5>
        <button className="btn button-outline" onClick = {()=>{handleBooking()}}>BOOK</button>
    </div>
  )
}
