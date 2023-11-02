import React from 'react'
import Detail from './components/detail/Detail'
import Showtimes from './components/showtimes/Showtimes'
import Header from '../../components/header/Header'
import Footer from '../../components/footer/Footer'
import Poster from '../../components/poster/Poster'
import "./index.scss"

export default function MovieDetail() {
  return (
    <div className = "MovieDetail">
      <div className="MovieDetailContainer">
        <div className="MovieDetailbg">
          <div className="MovieDetailWrapper">
            <div className="MovieDetailContent">
              <Header/>
              <div className="MovieDetailBody">
                  <div className="MovieDetailBody-container">
                      <div className="row">
                          <Detail/>
                          <Showtimes/>
                      </div>
                  </div>
              </div>
              <Footer/>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
