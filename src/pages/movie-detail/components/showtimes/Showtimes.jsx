import React, { useEffect, useState } from 'react'
import { fetchMovieShowtimesApi } from '../../../../services/cinema';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { dispatchCinemaList } from '../../../../store/actions/cinemaAction';
import "./index.scss";
import Content from './Content/Content';
import CinemaSystem from './CinemaSystem/CinemaSystem';

export default function Showtimes() {
  const params = useParams();
  //State in store
  const cinemaState = useSelector((state)=>state.cinemaReducer);
  const dispatch = useDispatch();
  //State in this component;
  const [cinemaShowtimes, setCinemaShowtimes] = useState({});

  useEffect(()=>{
    getMovieShowtimes();
  },[]);

    const findValue = (data) => {
      return data.filter(ele => ele.maPhim === params.id);
    }

   const getMovieShowtimes = async () => {
    if(cinemaState.cinemaList.length === 0){
      const result = await fetchMovieShowtimesApi();
      await dispatch(dispatchCinemaList(result.data));
      const data = await findValue(result.data);
      await setCinemaShowtimes(data[0]);
      return;
    }else{
      const result = JSON.parse(JSON.stringify(cinemaState.cinemaList));;
      const data = result.filter(ele=>ele.maPhim === params.id);
      setCinemaShowtimes(data[0]);
      return;
    }
   }

   const renderTabs = () => {
    //? nghĩa là nếu không có là null
      return cinemaShowtimes?.HeThongRapChieu?.map((ele, idx)=>{
        return (
          <CinemaSystem ele = {ele} idx = {idx}/>
        )
      })
   }

   const renderTabContents = () => {
      return cinemaShowtimes?.HeThongRapChieu?.map((ele, idx)=>{
        return(
        <div
        key={ele.maHeThongRap}
        className={`tab-pane fade show ${idx === 0 && "active"}`}
        id = {ele.maHeThongRap}
        role='tabpanel'
        >
          {ele?.cumRapChieu?.map(ele=>{
            return (          
                    <Content ele = {ele}/>
                    )
          })}
        </div>)
      })
   }

  return (
    <div className="col-12 mt-5">
      <div className="row">
        <div className="col-3">
          <div 
          className="nav flex-column nav-pills"
          id='v-pills-tab'
          role='tablist'
          aria-orientation='vertical'
          >
            {renderTabs()}
          </div>
        </div>
        <div className="col-9">
          <div className="tab-content" id='v-pills-tabContent'>
              {renderTabContents()}
          </div>
        </div>
      </div>
    </div>
  )
}
