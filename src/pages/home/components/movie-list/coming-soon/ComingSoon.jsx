import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { dispatchMovieList } from '../../../../../store/actions/movieAction';
import "./index.scss" 
import { useMovieList } from '../../../../../hooks/useMovieList';

export default function MovieList() {
    const navigate = useNavigate();
    const movieList = useMovieList();

    const renderMovieList = () => {
        return movieList.map((ele)=>{
            if(ele.sapChieu){
                return (
                    <div 
                    className="Mini-card-item" 
                    key = {ele.maPhim}
                    onClick={
                        (event)=>{
                            event.preventDefault();
                            navigate(`/movie-detail/${ele.maPhim}`)
                        }}
                    >
                        <div 
                        className="item-content"
                        style={{backgroundImage: `url(${ele.hinhAnh})`}} 
                        >
                            <div className="item-content-inner">
                                <h5>{ele.tenPhim}</h5>   
                                <div>
                                    <button 
                                    className="btn button-outline" 
                                    type="submit"
                                    onClick={
                                    (event)=>{
                                        event.preventDefault();
                                        navigate(`/movie-detail/${ele.maPhim}`)
                                    }}
                                    >
                                    DETAIL
                                    </button>
                                </div>     
                            </div>
                        </div>
                    </div>
                )
            }
        })
    }

    return (
        <div className='ComingSoon'>
            <div className="ComingSoonContainer">
                <div className="ComingSoonContainer-bg">
                    <div className="ComingSoonWrapper">
                        <div className="ComingSoon-header">
                            <div className="Popular-header">
                                <h2 className="Header-card-title">COMING SOON</h2>
                            </div>
                        </div>
                        <div className="ComingSoon-card row mx-auto mt-3">
                            {renderMovieList()}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
