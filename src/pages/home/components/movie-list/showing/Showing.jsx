import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import "./index.scss" 
import { useMovieList } from '../../../../../hooks/useMovieList';

export default function MovieList() {
    const navigate = useNavigate();
    const movieList = useMovieList();

    const renderMovieList = () => {
        return movieList.map((ele)=>{
            if(ele.dangChieu){
                return (
                        <div 
                        className="Mini-card-item" 
                        style={{backgroundImage: `url(${ele.hinhAnh})`}} 
                        key = {ele.maPhim}
                        onClick={
                            (event)=>{
                                window.scrollTo(0,0);
                                event.preventDefault();
                                navigate(`/movie-detail/${ele.maPhim}`)
                            }}
                        >
                            <div className="item-content">
                                <h5>{ele.tenPhim}</h5>   
                                <div>
                                    <button 
                                    className="btn button-outline" 
                                    type="submit"
                                    onClick={
                                    (event)=>{
                                        event.preventDefault();
                                        navigate(`/movie-detail/${ele.maPhim}`);
                                        window.scrollTo(0,0);
                                    }}
                                    >
                                    DETAIL
                                    </button>
                                </div>     
                            </div>
                        </div>
                )
            }
        })
    }

    return (
        <div className='Showing' id='Showing'>
            <div className="ShowingContainer">
                <div className="ShowingContainer-bg">
                    <div className="ShowingWrapper">
                        <div className="Showing-header">
                            <div className="Popular-header">
                                <h2 className="Header-card-title">NOW SHOWING</h2>
                            </div>
                        </div>
                        <div className="Showing-card" id='BookingNow'>
                            {renderMovieList()}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
