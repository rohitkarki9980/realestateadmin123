import React, { useState, useEffect } from "react";
import AdminTop from '../Navbar/adminTop';
import { request } from '../../../util/fetchAPI';
import { useSelector } from 'react-redux';
import {
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Avatar,
} from '@mui/material';
import classes from './customers.module.css'
import Cards from '../Cards/Cards'
import Footer from "../../footer/Footer"
const UsersTable = () => {
  const [users, setUsers] = useState([]);
  const { user, token } = useSelector((state) => state.auth);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 20;

  useEffect(() => {
    const getAllUsers = async () => {
      try {
        const options = {
          Authorization: `Bearer ${token}`,
        };
        const data = await request(`/user/allUser`, 'GET', options);
        setUsers(data);
      } catch (error) {
        console.log(error);
      }
    };

    getAllUsers();
  }, [token]);
  
  const handleDeleteUser = async (userId) => {
    try {
      const options = {
        Authorization: `Bearer ${token}`,
      };

      // Send a DELETE request to delete the user by ID
      await request(`/user/${userId}`, 'DELETE', options);

      // Update the user list by filtering out the deleted user
      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
    } catch (error) {
      console.log(error);
    }
  };

  // Calculate the indexes of the users to display based on the current page
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  // Function to handle pagination
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className={classes.backGround}>
      <AdminTop />
      <div className={classes.card}>
        <Cards/>
      </div>
      <div className={classes.wrapper}>
        <h2>User List</h2>
        <TableContainer className={classes.bodyContainer}>
          <Table className={classes.bodyTable} style={{borderRadius:"12px",padding:"5px"}}>
            <TableHead  className={classes.bodyHead}>
              <TableRow className={classes.bodyRow} >
                <TableCell className={classes.bodyCell} style={{fontWeight:"bold",fontSize:"1.2rem"}}>S.N</TableCell>
                <TableCell className={classes.bodyCell} style={{fontWeight:"bold",fontSize:"1.2rem"}}>Photo</TableCell>
                <TableCell className={classes.bodyCell} style={{fontWeight:"bold",fontSize:"1.2rem"}}>Username</TableCell>
                <TableCell className={classes.bodyCell} style={{fontWeight:"bold",fontSize:"1.2rem"}}>Email</TableCell>
                <TableCell className={classes.bodyCell} style={{fontWeight:"bold",fontSize:"1.2rem"}}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody className={classes.bodyHead}>
              {currentUsers.map((user, index) => (
                <TableRow className={classes.bodyRow} key={user._id}>
                  <TableCell className={classes.bodyCell}>{index + 1}</TableCell>
                  <TableCell className={classes.bodyCell}>
                    <Avatar src={`http://localhost:5000/images/${user.profileImg}`} />
                  </TableCell>
                  <TableCell className={classes.bodyCell}>{user.username}</TableCell>
                  <TableCell className={classes.bodyCell}>{user.email}</TableCell>
                  <TableCell className={classes.bodyCell}>
                    <Button variant="contained" color="error" onClick={() => handleDeleteUser(user._id)}>
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <div>
         
        </div>
      </div>
     
    </div>
  );
};

export default UsersTable;
