import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { dispatchMovieList } from '../../../../store/actions/movieAction';
import "./index.scss" 

export default function MovieList() {
    const dispatch = useDispatch();
    const hookState = useSelector((state)=>state.movieReducer);
    const navigate = useNavigate();
    const [movieList, setMovieList] = useState([]);

    useEffect(()=>{
        getMovieList();
    }, []);

    const getMovieList = async () => {
        if(hookState.movieList.length == 0){
            const result = await dispatch(dispatchMovieList());
        }
        setMovieList(hookState.movieList);

    }

    const renderMovieList = () => {
        return movieList.map((ele)=>{
            if(ele.dangChieu){
                return (
                    <>
                        {/* <div className="card col-3" key = {ele.maPhim}>
                            <div className="card movie-card" 
                            style={{marginBottom: 20, height: 500}}
                            >
                                <img 
                                className="card-img-top" 
                                style={{height: 300, objectFit: "cover"}} 
                                src={ele.hinhAnh} 
                                alt = "#" 
                                />
                                <div className="card-body">
                                    <h4 className="card-title">{ele.tenPhim}</h4>
                                    <button 
                                    className='btn btn-success' 
                                    onClick={()=>navigate(`/movie-detail/${ele.maPhim}`)}>
                                        XEM CHI TIẾT
                                    </button>
                                </div>
                            </div>
                        </div> */}
                        <div 
                        className="Mini-card-item" 
                        style={{backgroundImage: `url(${ele.hinhAnh})`}} 
                        key = {ele.maPhim}
                        onClick={
                            (event)=>{
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
                                        navigate(`/movie-detail/${ele.maPhim}`)
                                    }}
                                    >
                                    DETAIL
                                    </button>
                                </div>     
                            </div>
                        </div>
                    </>
                )
            }
        })
    }

//   return (
//         <div className="MovieList">
//             <div className="MovieListContainer">
//                 <div className="MovieListContainer-bg">
//                     <div className="row mt-3 mx-auto w-75">
//                         {renderMovieList()}
//                     </div>
//                 </div>
//             </div>
//         </div>
//   )
    return (
        <div className='Article'>
            <div className="ArticleContainer">
                <div className="ArticleContainer-bg">
                    <div className="ArticleWrapper">
                        <div className="Article-header">
                            <div className="Popular-header">
                                <h2 className="Header-card-title">NOW SHOWING</h2>
                            </div>
                        </div>
                        <div className="Article-card">
                            {renderMovieList()}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
