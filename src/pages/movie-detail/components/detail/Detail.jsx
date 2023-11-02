import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { dispatchMovieDetail } from '../../../../store/actions/movieAction';
import "./index.scss";
import moment from 'moment/moment';
import { formatDate } from '../../../../utils';

export default function Detail() {
  const dispatch = useDispatch();
  const movieState = useSelector((state)=>state.movieReducer);
  const params = useParams();
  const [movieDetail, setMovieDetail] = useState({});

  useEffect(()=>{
    getMovieDetail();
  },[]);

  const getMovieDetail = async () => {
    const result = await dispatch(dispatchMovieDetail(params.id));
    setMovieDetail(movieState.movieDetail[0]);
    // console.log(movieState.movieDetail[0].trailer);
  }

  return (
    <div className="col-12 Detail">
    <div className="row DetailContainer" >
        <div className="col-4 DetailContainer-Header">
            <img className='' src = {movieDetail?.hinhAnh} alt = "#"/>
        </div>
        <div className="col-8 DetailContainer-content">
          <div className="content">
            <h4>{movieDetail?.tenPhim}</h4>
            <p>{movieDetail?.moTa}</p>
            <p>{formatDate(movieDetail?.ngayKhoiChieu)}</p>
          </div>
          <div className="trailer">
            {/* <button className='btn button-outline'>TRAILER</button> */}
            {/* <iframe width="1015" height="571" src="https://www.youtube.com/embed/hXzcyx9V0xw" title="Elemental | Official Trailer" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe> */}
            {/* ifram need embedded link, not video link */}
            <div className="trailer-video">
              <iframe src={movieDetail?.trailer} frameborder="0"></iframe>
            </div>
          </div>
        </div>
    </div>
</div> 
  )
}
