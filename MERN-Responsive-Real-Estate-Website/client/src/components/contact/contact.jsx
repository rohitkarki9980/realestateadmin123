import React from 'react';
import   "./contact.css"
import imgOne from '../../assets/high-angle-pie-chart-with-cities.jpg'
import { MdCall } from "react-icons/md";
import { BsFillChatDotsFill,BsFillCameraVideoFill } from "react-icons/bs";
import {HiChatBubbleBottomCenter} from 'react-icons/hi2'
const contact = () => {
  return (
    <div className="wrapper">
      <div className="titles">
      <span className="orangeText">Contact Us</span>
          <span className="pText">Easy to contact us</span>
          <span className="sOneText">
            We always ready to help by providing the best services for you.We
            <span>believe a good place to live can make your life better{" "}</span>
          </span>
      </div>
      <div className='wholeBox'>
         <div className='left'>
          <div className="leftOne">
          <div className="callBox"> 
            <div className='onlyIconAndNo'>
              <div className='icons'><BsFillCameraVideoFill style={{color:"#476bff"}} size={25} /></div>
               <div className="callAndPhoneNo">
               <span className="primaryText">Video Call</span>
                    <span className="secondaryText">021 123 145 14</span>
            </div>
            </div>
            <div className='buttons'>Call me</div>
            </div>
            <div className="callBox"> 
            <div className='onlyIconAndNo'>
              <div className='icons'>  <MdCall style={{color:"#476bff"}} size={25} /></div>
               <div className="callAndPhoneNo">
               <span className="primaryText">Call</span>
                    <span className="secondaryText">021 123 145 14</span>
            </div>
            </div>
            <div className='buttons'>Call me</div>
            </div>
          </div>
          <div className="leftTwo">
           
          <div className="callBox"> 
            <div className='onlyIconAndNo'>
              <div className='icons'>  <BsFillChatDotsFill style={{color:"#476bff"}} size={25} /></div>
               <div className="callAndPhoneNo">
               <span className="primaryText">Chat us</span>
                    <span className="secondaryText">021 123 145 14</span>
            </div>
            </div>
            
           
            <div className='buttons'>Call me</div>
            </div>
            <div className="callBox"> 
            <div className='onlyIconAndNo'>
              <div className='icons'><HiChatBubbleBottomCenter style={{color:"#476bff"}} size={25} /></div>
               <div className="callAndPhoneNo">
               <span className="primaryText">Whatsapp</span>
                    <span className="secondaryText">021 123 145 14</span>
            </div>
            </div>
           
           
            <div className='buttons'>Call me</div>
            </div>
          </div>
         </div>
         <div className='right'>
          <div className="imageCo">
            <img src={imgOne} alt=''/>
            </div>
         </div>
      </div>
    </div>
  );
}

export default contact;
