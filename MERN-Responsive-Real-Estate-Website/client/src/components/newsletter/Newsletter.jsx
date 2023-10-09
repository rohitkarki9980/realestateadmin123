import React from 'react'
import './newsletter.css'


const Newsletter = () => {
  return (
    <div id="get-started" className="gWrapper">
      <div className="gContainer">  
      <span className="pTextNews">Get started with Us</span>
       <span className="secondaryText">
            Subscribe and find super attractive price quotes from us.
            <br />
            <div className='flexCenter'>Find your residence soon</div>
            <br/>
          </span>
        
        <div className='bttn'>
        <button className="buttons" >
            <a href="dhakalnona5@gmail.com" style={{color:'white',textDecoration:"none "}}>Get Started</a>
          </button>
          </div>
      </div>
    </div>
  )
}

export default Newsletter