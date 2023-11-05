import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { registerApi } from '../../services/user';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import ModalSign from '../../components/modalSign/ModalSign';
import Poster from '../../components/poster/Poster';
import { LoadingContext } from '../../contexts/loading/LoadingContext';
import { message, notification } from 'antd';
import "./index.scss";

export default function Register() {
    const navigate = useNavigate();
    const [state, setState] = useState({
        taiKhoan: "",
        matKhau: "",

    });
    const [errorState, setStateError] = useState({
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
        // console.log(state);
    };

    const handleSubmit = async event => {
      //kéo về đầu trang
      window.scrollTo(0,0);
      //chặn trình duyệt load trang
      event.preventDefault();
      //load lại trang
      setLoadingState({
        isLoading: true,
      });
      const data = await {...state, quanTri: "nguoiDung"};
      const isValid = event.target.checkValidity();
        

        if(!isValid){
          setLoadingState({
            isLoading: false,
          });
          notification.error({
            message: "Form is InValid!"
          });
          return;
        }
        
        const result = registerApi(data);

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

    const handleBlur = (event) => {
      let message = "";

      const {validationMessage, name, validity, title, minLength, maxLength} = event.target;
      const {valueMissing, tooShort, tooLong, patternMismatch} = validity;
      
      if(valueMissing){
        message = `${title} is required`;
      }
      if(tooShort||tooLong){
        message = `${title} from ${minLength} - ${maxLength} characters`;
      }
      if(patternMismatch){
        message = `${title} must contain at least one  number and one uppercase and lowercase letter, and at least 8 or more characters`;
      }

      setStateError({
        ...errorState,
        [name]: message
      })
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
          handleBlur = {handleBlur}
          errorState = {errorState}
          />
      </div>
      <Footer/>
    </div>
    </>
  )
}
