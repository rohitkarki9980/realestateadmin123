import React from "react";
import "./propertyList.css";
import PropertyCard from "../../AllPropertyFiles/propertyCard/PropertyCard";
import {useState,useEffect} from "react"
import { request } from "../../../util/fetchAPI";
import {ImSad2} from 'react-icons/im'

const PropertyList = ({ property }) => {
  const [allProperty, setAllProperty] = useState([]);
  

  // TODO here or somewhere home(fetching properties)

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const data = await request("/property/find/featured", "GET");
        setAllProperty(data);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchFeatured();
  }, []);
  
  return (
    <div className="wrapper">
      <div className="container">
        <div className="titlesOne">
          <h5 className="hText">Properties You may like </h5>
        </div>
        <div  className="featuredProperties">
        
            <div  className="propertyContainer">
             {allProperty?.length > 0
                        ? allProperty.map((property) => (
                            <PropertyCard property={property} key={property._id} />
                        ))
                        : <div className="warning"><h2>No property currently on sale. <ImSad2 color="red"/> </h2></div>
                    }
            </div>
          
        </div>
      </div>
    </div>
  );
};

export default PropertyList;
