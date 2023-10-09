import React, { useState } from "react";
import "./Sidebar.css";
import {
  UilEstate,
  UilClipboardAlt,
  UilUsersAlt,
  UilPackage,
  UilChart,
  UilSignOutAlt,
} from "@iconscout/react-unicons";


import { SidebarData } from "../Data/Data";
import { UilBars } from "@iconscout/react-unicons";
import { motion } from "framer-motion";
import { logout } from "../../../redux/authSlice";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const [selected, setSelected] = useState(0);

  const [expanded, setExpanded] = useState(true)
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const sidebarVariants = {
    true: {
      left : '0'
    },
    false:{
      left : '-60%'
    }
  }

  const handleLogout = () => {
    dispatch(logout());
    navigate("/signin");
  };
  return (
    <>
      <div className="bars" style={expanded?{left: '40%',top:"0%",zIndex:'9999'}:{left: '0%',top:'0%'}} onClick={()=>setExpanded(!expanded)}>
        <UilBars />
      </div>
    <motion.div className='sidebar'
    variants={sidebarVariants}
    animate={window.innerWidth<=760?`${expanded}`:''}
    >
      {/* logo */}
      <div className="menu">
      
         
        <Link>
      <div  className="menuItem">
         <div className="menuIcons">  <UilEstate /></div> 
         <div className="menuNames">Dashboard</div>
        </div>
      </Link>
       <Link>
      <div  className="menuItem">
         <div className="menuIcons">  <UilChart /></div> 
         <div className="menuNames">Analytics</div>
        </div>
      </Link> 
       <Link to='/admin/customers'>
      <div  className="menuItem">
         <div className="menuIcons">  <UilUsersAlt /></div> 
         <div className="menuNames">Customers</div>
        </div>
      </Link> 
       <Link to='/admin/propertiesAdmin'>
      <div  className="menuItem">
         <div className="menuIcons">  <UilClipboardAlt /></div> 
         <div className="menuNames">Properties</div>
        </div>
      </Link>

       <Link>
      <div  className="menuItem">
         <div className="menuIcons">  <UilPackage /></div> 
         <div className="menuNames">Flats</div>
        </div>
      </Link>
      
      <Link>
      <div onClick={handleLogout} className="menuItem">
         <div className="menuIcons">  <UilSignOutAlt color={'red'} /></div> 
         <div className="menuNames">Logout</div>
        </div>
      </Link>
       
      </div>
    </motion.div>
    </>
  );
};

export default Sidebar;