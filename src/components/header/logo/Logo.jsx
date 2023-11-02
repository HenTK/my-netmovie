import React from 'react'
import { NavLink } from 'react-router-dom'
import "./index.scss"

export default function Logo() {
  return (
    <div className='Logo'>
        <NavLink to="/">
            <span>Netmovie</span>
        </NavLink>
    </div>
  )
}
