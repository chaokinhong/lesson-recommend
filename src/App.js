import { id } from 'ethers/lib/utils';
import React, { useState, useEffect } from 'react';
import './App.css';
import Navbar from './component/navbar';
import Question from './component/question';

const App=(props) => {
  const [currentPage, setCurrentPage] = useState(1);

  const navclick = (idx) =>{
      setCurrentPage(idx)
      
  }

  console.log(currentPage)

  return (
    <div className='layout'>
    <h2>Recommend System</h2>    
    <div className='nav_bar_area'>
      <Navbar navclick={navclick}/>
     
    </div>
    <div className='main_page_area'>
        { currentPage == 1 && <Question/>}
    </div>
  
  </div>
  );
}

export default App;


