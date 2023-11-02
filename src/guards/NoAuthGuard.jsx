import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Outlet, useNavigate } from 'react-router-dom'

export default function NoAuthGuard() {
    const userState = useSelector((state)=>state.loginReducer);
    const navigate = useNavigate();
    useEffect(()=>{
        if(userState.userDetail.id !== ""){
            navigate("/");
        }
    },[]);

  return (
    //khi đã đăng nhập thì không được vào trang đăng nhập nữa
    <Outlet/>
  )
}
