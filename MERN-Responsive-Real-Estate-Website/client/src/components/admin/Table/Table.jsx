import React, { useEffect, useState } from 'react';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useSelector } from 'react-redux'
import { request } from "../../../util/fetchAPI";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";

const TableBox = () => {
  const [unVerified, setUnVerified] = useState([]);
  const { user, token } = useSelector((state) => state.auth);
  useEffect(() => {
    const fetchUnVerifiedProperties = async () => {
      try {
        const options = {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
        const properties = await request(`/property/unVerifiedProperties`, "GET", options);
    
        setUnVerified(properties);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUnVerifiedProperties();
  }, [token]);
  
 

  const handleVerify = async (propertyId) => {
    try {
      const options = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }

      // Send a PUT request to verify the property with the given propertyId
      await request(`/property/${propertyId}/verified`, 'PUT', options, { isVerified: true });
      // After verification, remove the property from the unverified list
      setUnVerified((prevUnVerified) => prevUnVerified.filter((property) => property._id !== propertyId));
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <div className="Table">
      <h3>Recently Added Properties</h3>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>SN</TableCell>
              <TableCell>Property ID</TableCell>
              <TableCell>Created Time</TableCell>
              <TableCell>Property Title</TableCell>
              <TableCell></TableCell>
              <TableCell>Owner's Photo</TableCell>
              
              <TableCell>Actions</TableCell>
              
            </TableRow>
          </TableHead>
          <TableBody>
            {unVerified.map((property, index) => (
              <TableRow key={property._id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{property._id.slice(0, 10)}</TableCell>
                <TableCell>{new Date(property.createdAt).toLocaleString()}</TableCell>
                <TableCell>{property.title}</TableCell>
                <TableCell>{property.currentOwner?.username}</TableCell>
                <TableCell>
                  <Avatar src={`http://localhost:5000/images/${property?.currentOwner?.profileImg}`} alt="Owner" />
                </TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleVerify(property._id)} // Pass the property ID to handleVerify
                  >
                    Verify
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default TableBox;
