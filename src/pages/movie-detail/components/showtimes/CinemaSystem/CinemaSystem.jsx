import React from 'react'
import "./index.scss"

export default function CinemaSystem(props) {
  return (
    <a 
    key={props.ele.maHeThongRap}
    className={`CinemaSystem nav-link text-capitalize ${props.idx === 0 ? 'active' : ''}`}
    data-toggle = "pill"
    href = {`#${props.ele.maHeThongRap}`}
    role='tab'
    aria-selected = "true"
    >
    {props.ele.tenHeThongRap}
    </a>
  )
}
