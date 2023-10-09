import React, { useState, useEffect } from 'react';
import { FaBed, FaSquareFull } from 'react-icons/fa';
import person from '../../../assets/person.jpg';
import classes from './PropertyAdminCard.module.css';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from '@mui/material';
import { request } from '../../../util/fetchAPI';
import { useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';

const PropertyCardAdmin = () => {
  const [allProperties, setAllProperties] = useState([]);
  const { user, token } = useSelector((state) => state.auth);
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const properties = await request('/property/getAll', 'GET');
        setAllProperties(properties);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProperties();
  }, []);
 
  const handleDelete = async (propertyId) => {
    try {
      // Implement your delete logic here using an API request
      const options = {
        Authorization: `Bearer ${token}`,
      };
      await request(`/property/${propertyId}`, 'DELETE',options);
    
      // Remove the deleted property from the state
      setAllProperties((prevProperties) =>
        prevProperties.filter((property) => property._id !== propertyId)
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <TableContainer component={Paper} className={classes.bodyContainer}>
      <Table   className={classes.bodyTable} style={{borderRadius:"12px",padding:"5px"}}>
        <TableHead className={classes.bodyHead}>
          <TableRow className={classes.bodyRow}>
          <TableCell className={classes.bodyCell} style={{fontWeight:"bold",fontSize:"1.2rem"}}>Property Images</TableCell>
          <TableCell className={classes.bodyCell} style={{fontWeight:"bold",fontSize:"1.2rem"}}>Price</TableCell>
            <TableCell className={classes.bodyCell} style={{fontWeight:"bold",fontSize:"1.2rem"}}>Details</TableCell>
            <TableCell className={classes.bodyCell} style={{fontWeight:"bold",fontSize:"1.2rem"}}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody className={classes.bodyHead}>
          {allProperties.map((property) => (
            <TableRow key={property._id} className={classes.bodyRow} >
              <TableCell  className={`${classes.bodyCell} ${classes.Image} `}>
                {/* Render your property image here */}
                
                <img
                  src={`http://localhost:5000/images/${property.img}` }
                  alt=""
                />
               
              </TableCell>
              <TableCell className={`${classes.bodyCell} ${classes.Price} `}>Npr {property.price}</TableCell>
              <TableCell  className={`${classes.bodyCell} ${classes.details} `}>
                {property.beds} {property.beds > 1 ? ("Beds"):("Bed")}   | {' '}
                {property.sqmeters} square meters
              </TableCell>
              <TableCell className={`${classes.bodyCell} ${classes.detailsLink} `} >
                <Link
                  to={`/propertyDetail/${property._id}`}
                 
                >
                  View Details
                </Link>
                <Button
                  variant="outlined"
                  onClick={() => handleDelete(property._id)}
                >
                  Delete
                </Button>
                {/* Add your update button and logic here */}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default PropertyCardAdmin;
