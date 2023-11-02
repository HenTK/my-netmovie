import React from 'react'
import "./index.scss";

export default function NewList(props) {

  const renderItembg = (active) => {
    if(active){
      return "active NewsItem";
    }
    return "NewsItem";
  }

  return (
    <div className={renderItembg(props.active)} >
    <div className="NewsHeader">
      <img src={props.ele.hinhAnh} alt='#'/>
    </div>
    <div className="NewsContent">
      <a href={props.ele.nguon} className='title'>
      {props.ele.tieuDe}
      </a>
      <div className="content">
        <p>{props.ele.noiDung}</p>
      </div>
    </div>
  </div>
  )
}
