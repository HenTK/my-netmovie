import React from 'react';
import MovieList from './components/movie-list/MovieList';
import News from './components/news/News';
import "./index.scss"
import Intro from './components/intro/Intro';
import Showing from "../../pages/home/components/movie-list/showing/Showing"
import  ComingSoon from "../../pages/home/components/movie-list/coming-soon/ComingSoon"
import Poster from '../../components/poster/Poster';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
export default function HomePage() {
  return (
        <div className="HomePage">
          {/* z-index = -1 */}
          <div className="HomePage-bg">
            {/* z-index = -50 */}
            <Poster/>
          </div>
          {/* z-index = 50 fixed */}
          <Header/>
            <div className="HomePageContainer">
              <div className="HomePageContainer-bg">
                <div className="HomePageWrapper">        
                  <Intro/>
                  {/* z-index = 1 2 3 */}
                  {/* <MovieList/> */}
                  <Showing/>
                  <ComingSoon/>
                  <News/>
                </div>
              </div>
            </div>
          <Footer/>
        </div>
  )
}
