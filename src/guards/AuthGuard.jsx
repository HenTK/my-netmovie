import { notification } from 'antd';
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';

export default function AuthGuard() {
    const userState = useSelector((state)=>state.loginReducer);
    const navigate = useNavigate();
    useEffect(()=>{
        if(userState.userDetail.id === ""){
          notification.warning({
            message: "Chưa đăng nhập, cần đăng nhập để thực hiện đặt vé"
          });
          navigate("/login");
        }
    },[]);

  return (
    //khi chưa đăng nhập thì vào đặt vé bắt phải đăng nhập
    <Outlet/>
  )
}
