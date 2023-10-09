import React from 'react';
import AdminTop from '../Navbar/adminTop';
import TableBox from '../Table/Table';
import classes from './propertyAdmin.css'
import {useState,useEffect} from "react"
import { request } from "../../../util/fetchAPI";
import Card from'../../admin/Card/compactCard'
import PropertyCardAdmin from '../Card/PropertyCardAdmin';
const PropertiesAdmin = () => {


  return (
    <div className={classes.container} >
      <AdminTop/>
      <div className={classes.adminCard} style={{width:"70%",margin:'auto',padding:"20px"}}>
        <Card/>
      </div>
      <div className={classes.tableProperty}>

      <div className={classes.lefter} style={{width:"70%",margin:"auto"}}>
      <TableBox/>
      </div>

      <div className={classes.right}>
        <h1>List of property</h1>
     
        <div  className={classes.propertyContainer}>
          <PropertyCardAdmin/>
        </div>
      
    </div>
        </div>
     </div>
  );
}

export default PropertiesAdmin;
