import React from "react";
import classes from "./navbar.module.css";
import { useSelector } from "react-redux";
import {Link} from 'react-router-dom'
import { useState } from "react";

const AdminTop = () => {
  const { user, token } = useSelector((state) => state.auth);
  const [isScrolled, setIsScrolled] = useState(false);
  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  };
  return (
    <div className={`${classes.container} ${isScrolled && classes.scrolled}`}>
      <div className={classes.wrapper}>
        <Link to='/'> 
        <div className={classes.logo}>
          <span>
            Nep<span>alHo</span>mes
          </span>
        </div>
        </Link>
       
        <Link to='/admin'>
        
       <div className={classes.adminProfile}> 
        <span className={classes.userProfilePhoto}>
           <img
          alt=""
          src={`http://localhost:5000/images/${user?.profileImg}`}
         
        />
        </span>
        <span className={classes.name}>{user.username.toUpperCase()}!</span>
        </div>
        </Link>
      </div>
    </div>
  );
};

export default AdminTop;
