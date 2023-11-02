import React, { Fragment, useContext, useEffect, useState } from "react";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import { useParams } from "react-router-dom";
import { fetchTicketDetailApi } from "../../services/ticket";
import { useDispatch, useSelector } from "react-redux";
import { dispatchBookingList } from "../../store/actions/bookingAction";
import Seat from "./components/seat/Seat";
import Poster from "../../components/poster/Poster";
import "./index.scss"
import Movie from "./components/movie/Movie";
import BookingBar from "./components/bookingBar/BookingBar";
import Loading from "../loading/Loading";
import { LoadingContext } from "../../contexts/loading/LoadingContext";

export default function Booking() {
    const ticketState = useSelector((state)=>state.bookingReducer);
    const params = useParams();
    const [ticketDetail, setTicketDetail] = useState({});
    const [selectedSeatList, setSelectedSeatList] = useState([]);
    const dispatch = useDispatch();
    // const [loadingState, setLoadingState] = useState(false);
    const [loadingState, setLoadingState] = useContext(LoadingContext);

    useEffect(()=>{
        getTicketDetail();
    },[selectedSeatList]);

    const getTicketDetail = async () => {
        setLoadingState({
            isLoading: true,
          });
        if(ticketState.bookingList.length === 0){
            const result = await fetchTicketDetailApi();
            await dispatch(dispatchBookingList(result.data));
            const data = await result.data.filter(ele => ele.ma === params.id);
            await setTicketDetail(data[0]);
        }
        else{
            const result = await ticketState.bookingList;
            const data = await result.filter(ele => ele.ma === params.id);
            await setTicketDetail(data[0]);
        }
        setLoadingState({
            isLoading: false,
          });

    }

    const renderSeat = () => {
        return ticketDetail?.danhSachGhe?.map((ele, idx)=>{
            return (
            <React.Fragment key={ele.maGhe}>
            <Seat ele = {ele} handleSelect = {handleSelect}/>
            {(idx+1)%5 === 0 && <br/>}
            </React.Fragment>
            )
        });
    };

    const handleSelect = (seat) => {
        const data = [...selectedSeatList];
        const idx = data.findIndex((ele)=>ele.maGhe === seat.maGhe);
        if(idx !== -1){
            data.splice(idx, 1);
        }
        else{
            data.push(seat);
        }
        //đây là hàm bất đồng bộ, phải xài useEffect
        setSelectedSeatList(data);
    }

    useEffect(()=>{
        // console.log(selectedSeatList);
    },[selectedSeatList]);

    const renderSelectedSeatList = () => {
        return selectedSeatList.length;
        // return selectedSeatList?.map(ele=>{
        //     return (
        //         <p key = {ele.maGhe} className="badge badge-success mr-2 mb-0">
        //             {ele.tenGhe}
        //         </p>
        //     )
        // })
    }

  return (
    <>
    <div className="Booking">
            {/* z-index = -1 -10 -20 -30 -40 -50 */}
            <div className="BookingPoster-bg">
                <Poster/>
            </div>
            {/* z-index = 50 */}
        <Header/>
            <div className="BookingContainer">
                <div className="BookingContainer-bg">
                    <div className="BookingWrapper">
                        <div className="py-5 BookingContent">
                            <div className="row BookingContent-inner">
                                <div className="col-8 Seat">
                                    <BookingBar/>
                                    <div style={{ width: "auto" }} className="SeatContent">
                                        <div className="SeatInner">
                                            {renderSeat()}
                                        </div>
                                    </div>
                                </div>
                                <Movie 
                                ticketDetail = {ticketDetail} 
                                renderSelectedSeatList = {renderSelectedSeatList}
                                selectedSeatList = {selectedSeatList}
                                loadingState = {loadingState}
                                setLoadingState = {setLoadingState}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* z-index none */}
        <Footer/>
    </div>
    </>
  );
}