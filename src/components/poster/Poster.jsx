import React from 'react'
import "./index.scss";
import posterImg from "../../assets/images/Poster/poster.png"

export default function Poster() {
  return (
    <div className='Poster'>
      <div className="filter-bg"></div>
      <div className="filter-bg-bottom-right"></div>
      <div className="filter-bg-top-left"></div>
      <img src={posterImg} alt="#" />
    </div>
  )
}
