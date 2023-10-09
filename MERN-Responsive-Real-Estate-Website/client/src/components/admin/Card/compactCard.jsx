import React from 'react';
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { request } from "../../../util/fetchAPI";
import "./Card.css";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

import { MdNorth, MdSouth } from "react-icons/md";

const CompactCard = ({setExpanded}) => {
    const [userCount, setUserCount] = useState(null);
  const { user, token } = useSelector((state) => state.auth);
  const [prevUserCount, setPrevUserCount] = useState(null);
  const [prevPropertyCount, setPrevPropertyCount] = useState(null);
  const [propertyCount, setPropertyCount] = useState(null);
  const [prevFlatCount, setPrevFlatCount] = useState(null);
  const [flatCount, setFlatCount] = useState(null);
 
  


  useEffect(() => {
    const userCounts = async () => {
      try {
        const options = {
          Authorization: `Bearer ${token}`,
        };
        const data = await request(`/user/userCount`, "GET", options);
        setUserCount(data.count);
        setPrevUserCount(userCount);

      } catch (error) {
        console.log(error);
      }
    };
    userCounts();
    
    const propertyCounts = async () => {
      try {
        const options = {
          Authorization: `Bearer ${token}`,
        };
        const data = await request(`/property/propertyCount`, "GET", options);
        setPropertyCount(data.count);
        setPrevPropertyCount(propertyCount);
       
      } catch (error) {
        console.log(error);
      }
    };
    propertyCounts();

    const flatCounts = async () => {
      try {
        const options = {
          Authorization: `Bearer ${token}`,
        };
        const data = await request(`/yacht/yachtCount`, "GET", options);
        setFlatCount(data.count);
        setPrevFlatCount(flatCount);
      
      } catch (error) {
        console.log(error);
      }
    };
    flatCounts();
}, [token]);
  return (
    <div className='cards'>
       <div
      className="CompactCard"
      style={{
        background: "linear-gradient(180deg, #bb67ff 0%, #c484f3 100%)",
        boxShadow: "0px 10px 20px 0px #e0c6f5",
      }}
      layoutId="expandableCard"
     
    >
      <div className="radialBar">
      <div className="onlyOne">
      <CircularProgressbar
          value={userCount}
          text={`${userCount}  Customer`}
        />
         <span>UserCount</span>
        </div>  

         {userCount >prevUserCount?(
          <MdSouth color={'red'} size={'30px'}/> 
         ):<MdNorth color={'green'} size={'30px'}/>
         }
        </div>
        <div className="stats">
       
        <div className="detail">
        
          <span>{userCount}</span>
         
         <span>Last 24 hours</span>
        </div>
      </div>
    </div>
    <div
      className="CompactCard"
      style={{
        background:
        "linear-gradient(rgb(248, 212, 154) -146.42%, rgb(255 202 113) -46.42%)",
      boxShadow: "0px 10px 20px 0px #F9D59B",
      }}
      layoutId="expandableCard"
    >
      <div className="radialBar">
      <div className="onlyOne">
      <CircularProgressbar
          value={propertyCount}
          text={`${propertyCount}  Properties`}
        />
         <span>Properties</span>
        </div>  

         {propertyCount >prevPropertyCount?(
          <MdSouth color={'red'} size={'30px'}/> 
         ):<MdNorth color={'green'} size={'30px'}/>
         }
        </div>
        <div className="stats">
       
        <div className="detail">
        
          <span>{propertyCount}</span>
         
         <span>Last 24 hours</span>
        </div>
      </div>
    </div>
    <div
      className="CompactCard"
      style={{
        background: "linear-gradient(180deg, #FF919D 0%, #FC929D 100%)",
      boxShadow: "0px 10px 20px 0px #FDC0C7",
      }}
      
    >
      <div className="radialBar">
      <div className="onlyOne">
      <CircularProgressbar
          value={flatCount}
          text={`${flatCount}  Flats`}
        />
         <span>Flats</span>
        </div>  

         {flatCount >prevFlatCount?(
          <MdSouth color={'red'} size={'30px'}/> 
         ):<MdNorth color={'green'} size={'30px'}/>
         }
        </div>
        <div className="stats">
       
        <div className="detail">
        
          <span>{flatCount}</span>
         
         <span>Last 24 hours</span>
        </div>
      </div>
    </div>
    
    </div>
  );
}

export default CompactCard;
