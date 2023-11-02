import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import UserInfo from './userInfo/UserInfo';
import { dispatchLogoutUserInfo } from '../../store/actions/loginAction';
import Logo from './logo/Logo';
import "./index.scss";

export default function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loginState = useSelector((state)=>state.loginReducer);
  const [userLoginState, setUserLoginState] = useState({
    id: "",
    taiKhoan: "",
  });
  const [userInfoState, setUserInfoState] = useState(false);

  useEffect(()=>{
    getLoginUserDetail();
  },[]);

  const getLoginUserDetail = () => {
    setUserLoginState(loginState.userDetail);
  }

  const renderColor = (data) => {
    // if(data === "A"|| data === "a"){
    //   return "#FFFFFF";
    // }
    // if(data === "B"|| data === "b"){
    //   return "#CCFFFF	";
    // }
    // if(data === "C"|| data === "c"){
    //   return "#FFCCFF";
    // }
    // if(data === "D"|| data === "d"){
    //   return "#00CCFF";
    // }
    // if(data === "E"|| data === "e"){
    //   return "#669933	";
    // }
    // if(data === "F"|| data === "f"){
    //   return "#996633";
    // }
    // if(data === "H"|| data === "h"){
    //   return "#993333";
    // }
    // if(data === "I"|| data === "i"){
    //   return "#990066";
    // }
    // if(data === "J"|| data === "j"){
    //   return "#66FF99";
    // }
    // if(data === "K"|| data === "k"){
    //   return "#99CC99";
    // }
    // if(data === "L"|| data === "l"){
    //   return "#6699FF";
    // }
    // if(data === "M"|| data === "m"){
    //   return "#6666FF";
    // }
    // if(data === "N"|| data === "n"){
    //   return "#FF9966";
    // }
    // if(data === "O"|| data === "o"){
    //   return "#6633FF	";
    // }
    // if(data === "P"|| data === "p"){
    //   return "#990000";
    // }
    // if(data === "Q"|| data === "q"){
    //   return "Yellow3";
    // }
    // if(data === "R"|| data === "r"){
    //   return "#66FF33";
    // }
    // if(data === "S"|| data === "s"){
    //   return "#66CC33";
    // }
    // if(data === "T"|| data === "t"){
    //   return "#669999";
    // }
    // if(data === "U"|| data === "u"){
    //   return "Burlywood3";
    // }
    // if(data === "V"|| data === "v"){
    //   return "#666699";
    // }
    // if(data === "W"|| data === "w"){
    //   return "Brown2";
    // }
    // if(data === "X"|| data === "x"){
    //   return "#663399";
    // }
    // if(data === "Y"|| data === "y"){
    //   return "#6600CC";
    // }
    // if(data === "Z"|| data === "z"){
    //   return "#33FF00";
    // }
    return "rgb(120, 5, 5)";

  }

  const handleLogOut = (event) => {
    event.preventDefault();
    // console.log("data");
    dispatch(dispatchLogoutUserInfo({}));
    setUserLoginState({id: "", taiKhoan: ""});
    navigate("/");
  }
  

  return (
    <>
      <nav className="navbar-expand-sm navbar-light header">
        <div className="header-inner">
          {/* <a className="navbar-brand " href="">Movie</a> */}
          <div className="collapse navbar-collapse header-wrapper" id="collapsibleNavId">
              <Logo/>
              <form className="my-2 my-lg-0 header-form">
              {
              !userLoginState?.taiKhoan===true ? 
                <>
                  <button 
                  className="btn button-outline my-2 my-sm-0 ml-2" 
                  type="submit"
                  onClick={
                    (event)=>{
                      event.preventDefault();
                      window.scrollTo(0,0);
                      navigate("/register");
                    }}
                  >
                    Register
                  </button>
                  <button 
                  className="btn button-outline my-2 my-sm-0 ml-2" 
                  type="submit"
                  onClick={(event)=>{
                    event.preventDefault();
                    window.scrollTo(0,0);
                    navigate("/login")
                  }}
                  >
                    Login
                  </button>
                  <button style={{
                      backgroundColor: '#e5dbff',
                      border: "none",
                      }}
                      className='user-img'
                      onClick={(event)=>{
                        event.preventDefault();
                      }}
                      >
                    <i class="fa-regular fa-user" style={{color: "gray", width: 20, height: 20}}></i>
                  </button>
                </>
                :
                <>
                  <button
                  className="btn button-outline my-2 my-sm-0 ml-2" 
                  type="submit"
                  onClick={
                    (event)=>{
                      event.preventDefault();
                      handleLogOut(event);
                    }}
                  >
                    Log Out
                  </button>
                  <div>
                    <button 
                    style={{
                      // backgroundColor: `${renderColor(userLoginState?.taiKhoan[0])}`
                      background: `linear-gradient(-45deg, ${renderColor(userLoginState?.taiKhoan[0])}, red 70%)`
                    }}
                    className='user-img'
                    onClick={(event)=>{
                      event.preventDefault();
                      setUserInfoState(!userInfoState);
                    }}
                    >
                      <span 
                      style={{
                        fontSize: 25,
                        color: "white", 
                        ustifyContent: "center", 
                        textShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(12, 0, 0, 0.19)",
                        border: "none"
                        }}
                      >{userLoginState?.taiKhoan[0]?.toUpperCase()}</span>
                    </button>
                    {
                      userInfoState === true ? 
                        <UserInfo 
                        taiKhoan = {userLoginState.taiKhoan} 
                        handleLogOut = {handleLogOut}
                        />
                        :<></>
                    }
                  </div>
                </>
              }
              </form>
          </div>
        </div>
      </nav>
    </>
  )

}
