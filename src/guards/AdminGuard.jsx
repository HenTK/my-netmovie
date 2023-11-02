import { notification } from 'antd';
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Outlet, useNavigate } from 'react-router-dom'
import { UserTypeCodeInfo } from '../enums';

export default function AdminGuard() {
    const userState = useSelector((state)=>state.loginReducer);
    const navigate = useNavigate();
    useEffect(()=>{
      if(userState.userDetail.id === ""){
          notification.warning({
            message: "Chưa đăng nhập không thể truy cập."
          })
          navigate("/");
      }else{
        //chỉ user thuộc tính quanTri có giá trị admin mới được vào
        if(userState.userDetail.quanTri === UserTypeCodeInfo.customer){
          notification.warning({
            message: "Người dùng không có quyền quản trị không thể truy cập."
          })
          navigate("/");
        }
        
      }
    })
  return (
    <Outlet/>
  )
}
