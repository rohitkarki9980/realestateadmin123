import React from "react";
import classes from "./footer.module.css";
import { Link } from "react-router-dom";
import { AiFillInstagram, AiFillCopyrightCircle } from "react-icons/ai";
import { BsTwitter } from "react-icons/bs";
import { SlSocialLinkedin } from "react-icons/sl";
import { FiFacebook } from "react-icons/fi";
const Footer = () => {
  return (
    <>
      <div className={classes.footers}>
       
          <div className={classes.row}>
            <div className={classes.footerCol}>
              <h4>company</h4>
              <ul>
                <li>
                  <Link to="/">about us</Link>
                </li>
                <li>
                  <Link to="/">our services</Link>
                </li>
                <li>
                  <Link to="/">privacy policy</Link>
                </li>
                <li>
                  <Link to="/">affiliate program</Link>
                </li>
              </ul>
            </div>
            <div className={classes.footerCol}>
              <h4>get help</h4>
              <ul>
                <li>
                  <Link to="#">FAQ</Link>
                </li>
                <li>
                  <Link to="/allProperties">Properties</Link>
                </li>
                <li>
                  <Link to="#">returns</Link>
                </li>
                <li>
                  <Link to="/yachts">Flats</Link>
                </li>
                <li>
                  <Link to="#">payment options</Link>
                </li>
              </ul>
            </div>
         
            <div className={classes.footerCol}>
              <h4>follow us</h4>
              <div className={classes.socialLinks}>
                <Link to="#">
                  <FiFacebook />
                </Link>
                <Link to="#">
                  <BsTwitter />
                </Link>
                <Link to="#">
                  <AiFillInstagram />
                </Link>
                <Link to="#">
                  <SlSocialLinkedin />
                </Link>
              </div>
              <div className={classes.newsLetter}>
                <h4>NewsLetter</h4>
                <h5 style={{ fontSize: "0.9rem", color: "white" }}>
                  Thank you for visiting out website... <br />
                </h5>
                <input type="email" placeholder="Send your Email " />
                <p></p>
              </div>
            </div>
          </div>
           <div>

        <div className={classes.copyRight}>
        <span><AiFillCopyrightCircle size={"30px"} color="white" style={{width:"10%"}}/> All the trademark goes to Nepal Homes</span> 
        </div>
      </div>
        </div>

     
    </>
  );
};

export default Footer;
