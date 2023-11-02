import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useNewsList } from '../../../../hooks/useNewsList';
import NewList from './news-list/NewList'
import "./index.scss"

export default function News() {
  const navigate = useNavigate();
  const newsList = useNewsList();

  const renderNewsList = () => {
    return newsList.map((ele, idx)=>{
      return  <React.Fragment key={ele.id}>
                {
                  (idx+1)%2 === 1 ? <NewList ele = {ele} active = {true}/> : <NewList ele = {ele} active = {false}/>
                }      
              </React.Fragment>
    })
  }
  
  return (
    <div className='News'>
      <div className="NewsTitle">
        <h2>NEWS</h2>
      </div>
      <div className="NewsContainer">
        <div className="NewsContainer-bg">
          <div className="NewsWrapper">
            {renderNewsList()}
          </div>
        </div>
      </div>
    </div>
  )
}
