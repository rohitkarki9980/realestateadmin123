import React from "react";
import classes from "./AboutUs.module.css";
const AboutUs = () => {
  return (
    <>
      <div
        className={`${classes.responsiveContainerBlock} ${classes.bigContainer}`}
      >
        <div
          className={`${classes.responsiveContainerBlock} ${classes.Container}`}
        >
          <p className={`${classes.textBlk}  ${classes.heading}`}>About Us</p>
          <p className={`${classes.textBlk} ${classes.subHeading}`}>
            At Nepal Homes, we're more than just real estate agents; we're your
            trusted partners on the journey to finding your dream home or
            selling your property at the best value. With a passion for real
            estate and a commitment to excellence, we've been helping our
            clients navigate the exciting world of real estate for 10 years.
          </p>
          <div className={classes.socialIconsContainer}>
            <a className={classes.socialIcon} href="/">
              <img
                alt=""
                className={`${classes.socialIcon} ${classes.imageBlock}`}
                src="https://workik-widget-assets.s3.amazonaws.com/widget-assets/images/bb33.png"
              />
            </a>
            <a className={classes.socialIcon} href="/">
              <img
                alt=""
                className={`${classes.socialIcon} ${classes.imageBlock} `}
                src="https://workik-widget-assets.s3.amazonaws.com/widget-assets/images/bb34.png"
              />
            </a>
            <a className={classes.socialIcon} href="/">
              <img
                alt=""
                className={`${classes.socialIcon} ${classes.imageBlock} `}
                src="https://workik-widget-assets.s3.amazonaws.com/widget-assets/images/bb35.png"
              />
            </a>
            <a className={classes.socialIcon} href="/">
              <img
                alt=""
                className={`${classes.socialIcon} ${classes.imageBlock} `}
                src="https://workik-widget-assets.s3.amazonaws.com/widget-assets/images/bb36.png"
              />
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutUs;
