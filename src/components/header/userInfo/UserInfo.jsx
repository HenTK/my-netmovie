import React from 'react'
import "./index.scss"
export default function UserInfo(props) {
  return (
        <div className="user-info">
          <div className="bg-img"></div>
          <div className='margin'></div>
          <div className='user-card'>
            <p className='user-card-img'>{props?.taiKhoan[0]}</p>
          </div>
            <div className="card-body user-card-body">
                <h4 className="card-title">UserName</h4>
                <p className="card-text">{props?.taiKhoan}</p>
                <button className='card-body-button' onClick={(event)=>{props.handleLogOut(event)}}>Log Out</button>
            </div>
        </div>
  )
}
