import React from 'react'
import "./index.scss"
import { useNavigate } from 'react-router-dom'
import { event } from 'jquery';

export default function ModalSign(props) {
    const navigate = useNavigate();

  return (
    <div className="Modal">
      <div className="ModalContainer">
        <div className="bg-filter"></div>
        <form onSubmit={(event)=>{props.handleSubmit(event)}} className="Modal__inner">
          <h1 style={{marginBottom: 10}}>{props.title}</h1>
          <div className="form-group">
            <div className="EmailInput" style={{paddingBottom: 10}}>
              <label htmlFor="">Username</label>
              <span className="signUp">{props.userAction.label}<span style={{color: "orange", cursor: "pointer"}} onClick={()=>{navigate(`/${props.navigate}`)}}>{props.userAction.sign}</span></span>
            </div>
            <input 
            type="text"
            className="form-control" 
            name="taiKhoan"
            title='Tài khoản' 
            required
            minLength={3}
            maxLength={20}
            onChange={(event)=>{props.handleChangeState(event)}}
            onBlur={(event)=>{props.handleBlur(event)}}
            />
            <span className="text-danger">{props?.errorState?.taiKhoan}</span>
          </div>
          <div className="form-group">
            <label htmlFor="" style={{paddingBottom: 10}}>Password</label>
            <input 
            type="text" 
            className="form-control" 
            name="matKhau"
            title='Mật Khẩu' 
            required
            minLength={3}
            maxLength={20}
            //https://www.w3schools.com/TAGS/att_input_pattern.asp#:~:text=The%20pattern%20attribute%20specifies%20a%20regular%20expression%20that,to%20describe%20the%20pattern%20to%20help%20the%20user.
            //normal regx to react regx .source ???
            // pattern='(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}'
            onChange={(event)=>{props.handleChangeState(event)}}
            onBlur={(event)=>{props.handleBlur(event)}}
            />
            <span className="text-danger">{props?.errorState?.matKhau}</span>
          </div>
          <button className="buttonSubmit" style={{marginTop: 20}}>{props.title}</button>
        </form>
      </div>
    </div>
  )
}
