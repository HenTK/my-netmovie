import React from 'react'
import "./index.scss"
import { Link, useNavigate } from 'react-router-dom'
import moment from 'moment/moment'
import { formatDate } from '../../../../../utils'

export default function Content(props) {
  const navigate = useNavigate();

  return (
    <div className="Content">
        <div className="row mb-5 Content-wrapper" key={props.ele.maCumRap}>
          <div className="col-3 Content-Header">
            <img className='img-fluid rounded '
            src={props.ele.hinhAnh}
            />
          </div>
          <div className="col-9 pl-0 mt-0 Content-inner">
            <h5>{props.ele.tenCumRap}</h5>
            <span className='text-muted'>{props.ele.diaChi}</span>
            <div>
                <span>Ngày giờ chiếu</span>
                <div className='row'>
                  {props?.ele?.lichChieuPhim?.map(ele=>{
                    return (
                    <div 
                    className='col-4 Content-Booking'
                    key={ele.maLichChieu}
                    >
                        <p>
                          {formatDate(ele.ngayChieuGioChieu)}
                        </p>
                        {/* <Link 
                        to = {`/booking/${ele.maLichChieu}`} 
                        >
                          {formatDate(ele.ngayChieuGioChieu)}
                        </Link> */}
                        <button 
                        className='btn button-outline'
                        onClick={
                          (event)=>{
                            event.preventDefault();
                            window.scrollTo(0, 0);
                            navigate(`/booking/${ele.maLichChieu}`);
                          }
                        }
                        >
                          <h4>
                            Booking Now
                          </h4>
                        </button>
                    </div>)
                  })}
                </div>
            </div>
          </div>
        </div>  
    </div>
  )
}
