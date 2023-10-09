import React from "react";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import classes from "./hero.module.css";
import imgOne from "../../assets/mobile.png";
import CountUp from "react-countup";
import { request } from "../../util/fetchAPI";
const Hero = () => {
  const [type, setType] = useState("city");
  const [continent, setContinent] = useState("0");
  const [priceRange, setPriceRange] = useState("0");
  const navigate = useNavigate();

  const [userCount, setUserCount] = useState(null);
  const { user, token } = useSelector((state) => state.auth);

  // TODO here or somewhere home(fetching properties)

  const handleSearch = () => {
    // navigating to properties
    navigate(
      `/properties?type=${type}&continent=${continent}&priceRange=${priceRange}`
    );
  };
  useEffect(() => {

    const userCounts = async () => {
      try {
        const options = {
          Authorization: `Bearer ${token}`,
        };
        const data = await request(`/user/userCount`, "GET", options);
        setUserCount(data.count);
      } catch (error) {
        console.log(error);
      }
    };
    userCounts();
  }, [token]);

  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
         <div className={classes.orangeCircleOne} />
        <div className={classes.fLeft}>
         
          <img
            src={imgOne}
            style={{ width: "630px", height: "38rem" }}
            alt=""
          />
        </div>

        <div className={classes.titleAndSelect}>
          <div className={classes.title}>
            <div className={classes.orangeCircle} />

            <h2>
              Let us find your dream 
              <div className={classes.Remain}>
                place right now...</div>
            </h2>
            <h5>Search the best selection of luxury real estate</h5>
          </div>

          <div className={classes.options}>
            <select onChange={(e) => setType(e.target.value)}>
              <option disabled  style={{color:"black",background:"red",height:"5rem"}}>Select type</option>
              <option value="city">
                <span> City </span>
              </option>
              <option value="mountain">
                <span>Mountain</span>
              </option>
              <option value="village">
                <span>Village</span>
              </option>
            </select>
            <select onChange={(e) => setPriceRange(e.target.value)}>
              <option disabled  style={{color:"black",background:"red",height:"5rem"}}>Select Price Range</option>
              <option value="0">
                <span>0-100,000</span>
              </option>
              <option value="1">
                <span>100,000-200,000</span>
              </option>
              <option value="2">
                <span>200,000-300,000</span>
              </option>
              <option value="3">
                <span>300,000-400,000</span>
              </option>
              <option value="4">
                <span>400,000-500,000</span>
              </option>
            </select>
            <select onChange={(e) => setContinent(e.target.value)}>
              <option disabled  style={{color:"black",background:"red",height:"5rem"}}>Select Continent</option>
              <option value="0">
                <span>Europe</span>
              </option>
              <option value="1">
                <span>Asia</span>
              </option>
              <option value="2">
                <span>Africa</span>
              </option>
              <option value="3">
                <span>South America</span>
              </option>
              <option value="4">
                <span>North America</span>
              </option>
              <option value="5">
                <span>Oceania</span>
              </option>
            </select>
            <AiOutlineSearch
              className={classes.searchIcon}
              onClick={handleSearch}
            />
          </div>
          
          <div className={classes.allCounter}>
       <div style={{ color: "white" }} className={classes.Counter}>
        <div className={classes.numberAndPlus}>
          <div className={classes.number}><CountUp start={userCount} end={userCount + 1} duration={3} /></div>
          <span  className={classes.plus}>+</span>
        </div>
        <div className={classes.Name}>
        Our Customer
        </div>
        

       </div>
       <div style={{ color: "white" }} className={classes.Counter}>
        <div className={classes.numberAndPlus}>
          <div className={classes.number}><CountUp start={1000} end={3000} duration={3} /></div>
          <span  className={classes.plus}>+</span>
        </div>
        <div className={classes.Name}>
          Awards
        </div>


       </div>
       <div style={{ color: "white" }} className={classes.Counter}>
        <div className={classes.numberAndPlus}>
          <div className={classes.number}><CountUp start={7} end={24} duration={3} /></div>
          <span  className={classes.plus}>+</span>
        </div>
        <div className={classes.Name}>
         Awards
        </div>


       </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
