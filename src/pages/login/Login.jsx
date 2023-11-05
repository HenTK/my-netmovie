import React, { Fragment, useContext, useState } from "react";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import { loginApi } from "../../services/user";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { dispatchLoginUserInfo, dispatchLogoutUserInfo } from "../../store/actions/loginAction";
import ModalSign from "../../components/modalSign/ModalSign";
import Poster from "../../components/poster/Poster";
import { notification } from "antd";
import { LoadingContext } from "../../contexts/loading/LoadingContext";
import "./index.scss"

export default function Login() {
    //check login new acc and log out old acc
    const hookLoginState = useSelector((state)=>state.loginReducer)
    const params = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const bookingList = useSelector((state)=>state.bookingReducer);

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
    }

    const handleSubmit = async event => {
        console.log(params);
        event.preventDefault();
        setStateError({taiKhoan: "", matKhau: ""});
        const result = await loginApi();

        setLoadingState({
          isLoading: true,
        });

        const idx = result?.data?.findIndex((ele) => {
          return ((ele.taiKhoan === state.taiKhoan)&&(ele.matKhau === state.matKhau));
        });
        //check nhap sai taiKhoan va matKhau
        if(idx === -1){
          notification.error({
            message: "đăng nhập không thành công."
          })

          setLoadingState({
            isLoading: false,
          });

          setStateError({
            taiKhoan: "Tài Khoản hoặc mặt khẩu không đúng",
            matKhau: "Tài Khoản hoặc mặt khẩu không đúng"
          });
          return;
        }
        
        //check taiKhoan tren store va taiKhoan tren state (Login acc nay chuyen sang acc khac)
        const dataCheckNewAccount = result.data[idx];
        //gửi giá trị acc mới login lên localStorage để store lại khi reload:
        localStorage.setItem("USER_INFO_KEY", JSON.stringify(dataCheckNewAccount));
        // console.log(hookLoginState.userDetail, "before Login");
        // console.log(result.data[idx], "current Login");
        if((dataCheckNewAccount.taiKhoan !== hookLoginState.userDetail.taiKhoan 
          || dataCheckNewAccount.id !== hookLoginState.userDetail.id) 
          && hookLoginState.userDetail.taiKhoan !== "" 
          && hookLoginState.userDetail.id !== ""){
            //logout ra khoi system
            //xoa het data tren store
            console.log(hookLoginState.userDetail, "logout this acc");
            dispatch(dispatchLogoutUserInfo({}));
            //không cần reset BookingState vì BookingState chỉ dùng để navigate
            //không cần reset BookingList vì BookingList để hiện thị các tên người dùng và ghế đã đặt
            //sau khi reset sẽ load từ api xuống nên BookingList sẽ đc post lên api mỗi khi book
            // dispatch(dispatchLogoutBooking([]));
          }

        //khi đang booking mà chưa login thì chuyển về booking sau khi login xong
        //chức năng này đã bị chặn bởi đăng nhập, khi chưa đăng nhập không thể vào booking nên không cần nữa
        // if(bookingList.bookingState.length){
        //   console.log(bookingList.bookingState, "check booking state in Login");
        //   const data = [...bookingList.bookingState];
        //   const latestBookingData = data[data.length-1];
        //   await setTimeout(()=>{
        //     console.log(result.data[idx], "current data");
        //     console.log(state, "dispatch data");
        //     dispatch(dispatchLoginUserInfo({id: idx, taiKhoan: state.taiKhoan}));
        //     navigate(`/booking/${latestBookingData.id}`);
        //   },2000);
        //   return;
        // }

        //khi chưa book thì chuyển về home
        await setTimeout(()=>{
          setLoadingState({
            isLoading: false,
          });
          console.log(hookLoginState, "hookLoginState");
          // console.log(result.data[idx], "current data");
          notification.success({
            //hookLoginState hiện tại chưa có do chưa dispatch không được dùng
            message: `xin chào ${result.data[idx].taiKhoan}`
          })
          dispatch(dispatchLoginUserInfo({id: result.data[idx].id, taiKhoan: result.data[idx].taiKhoan, quanTri: result.data[idx].quanTri}));
          navigate("/");
        },2000);
    }

    const handleBlur = (event) => {
      //do nothing
    }

  return (
    <>
      {/* position = relative; none z-index (default is z-index = 0) */}
      <div className="Login">
        {/* z-index = -40 -30 -20 */}
        <Poster/>
        {/* none z-index */}
          <Header/>
        <div className="Login-inner">
            {/* z-index bg blur = -10 */}
            <ModalSign 
            title = {"Login"}
            userAction = {{label: "Need an account?", sign: " Sign up"}}
            handleChangeState = {handleChangeState}
            handleSubmit = {handleSubmit}
            errorState = {errorState}
            navigate = {"register"}
            handleBlur = {handleBlur}
            />
        </div>
          <Footer/>
      </div>
    </>
  );
}