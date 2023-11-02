import React from 'react';
import {Outlet} from "react-router-dom";
import "./index.scss";
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import Poster from '../../components/poster/Poster';

export default function HomeLayout() {
  return (
    // <section className='HomeLayout'>
    //     {/* z-index = -1 */}
    //     <div className="HomePoster-bg">
    //     {/* z-index = -50 */}
    //       <Poster/>
    //     </div>
    //     {/* z-index = 50 fixed */}
    //     <Header/>
    //     <div className="HomeContainer">
    //       <div className="HomeContainer-bg">
    //         <div className="HomeWrapper">
    //           <Outlet/>
    //         </div>
    //       </div>
    //     </div>
    //     <Footer/>
    // </section>
    <section className='HomeLayout'>
              <Outlet/>
    </section>
  )
}
