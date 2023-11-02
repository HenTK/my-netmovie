import React from 'react'
import "./index.scss"

export default function Footer() {
  return (
    <div className="Footer text-center">
      <div className="FooterContainer">
        <div className="FooterWrapper">
          <div className="FooterContent">
            <h1>
              Contact
            </h1>
            <ul>
              <li>
                <a href='#'>
                <i class="fa-brands fa-tiktok"></i>
                </a>
              </li>
              <li>
                <a href='#'>
                <i class="fa-brands fa-facebook-f"></i>                </a>
              </li>
              <li>
                <a href='#'>
                <i class="fa-brands fa-youtube"></i>                </a>
              </li>
              <li>
                <a href='#'>
                <i class="fa-brands fa-x-twitter"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
