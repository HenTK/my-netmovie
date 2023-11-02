import React, { useState } from 'react'
import { SeatType } from '../../../../enums';

export default function Seat(props) {
    const [isSelected, setIsSelected] = useState(false);

    const populateClassName = () => {
        if(props.ele.daDat === true)
        {
            return "btn-secondary";
        }

        if(isSelected){
            return "btn-primary";
        }

        if(props.ele.loaiGhe === SeatType.Vip){
            return "btn-warning";
        }

        return "btn-dark";
    };

    const handleSelectedSeat = () => {
        // console.log(isSelected, "handleSelectedSeat");
        setIsSelected(!isSelected);
        props.handleSelect(props.ele);
    }

  return (
    <button 
    onClick={handleSelectedSeat}
    disabled = {props.ele.daDat}
    style={{ width: 50, height: 50, padding: 0 }} 
    className={`mr-1 mb-1 btn ${populateClassName()}`}
    >
    {props.ele.tenGhe}
    </button>
  )
}
