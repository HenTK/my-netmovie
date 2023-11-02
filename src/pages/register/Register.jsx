import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { registerApi } from '../../services/user';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import Loading from '../loading/Loading';
import "./index.scss";
import ModalSign from '../../components/modalSign/ModalSign';
import Poster from '../../components/poster/Poster';
import { LoadingContext } from '../../contexts/loading/LoadingContext';
import { notification } from 'antd';

export default function Register() {
    const navigate = useNavigate();
    const [state, setState] = useState({
        taiKhoan: "",
        matKhau: "",
    });
    const [loadingState, setLoadingState] = useContext(LoadingContext);

    const handleChangeState = (event) => {
        const {name, value} = event.target;
        setState({
          ...state,
          [name]: value,
        });
        console.log(state);
    };

    const handleSubmit = async event => {
        window.scrollTo(0,0);

        event.preventDefault();
        const result = registerApi(state);

        setLoadingState({
          isLoading: true,
        });
        
        setTimeout(() => {
          // alert("Register success");
          notification.success({
            message: "Đăng kí thành công. Đăng nhập lại."
          });
          navigate("/login");
          setLoadingState({
            isLoading: false,
          });
        }, 2000);
    }

  return (
    <>
    <div className="Register">
      <Poster/>
      <Header/>
      <div className="Register-inner">
          <ModalSign 
          title = {"Register"}
          userAction = {{label: "Already have a account?", sign: " Sign In"}}
          handleChangeState = {handleChangeState}
          handleSubmit = {handleSubmit}
          navigate = {"login"}
          />
      </div>
      <Footer/>
    </div>
    </>
  )
}
