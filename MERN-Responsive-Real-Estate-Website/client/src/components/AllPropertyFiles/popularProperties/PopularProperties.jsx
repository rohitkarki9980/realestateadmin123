import React from 'react'
import { Link } from 'react-router-dom'
import classes from './popularProperties.module.css'
import img1 from '../../../assets/realestatebeach.jpg'
import img2 from '../../../assets/realestatemountain.jpg'
import img3 from '../../../assets/realestatecountryside.jpg'
import { useState } from 'react'
import { useEffect } from 'react'
import { request } from '../../../util/fetchAPI'

const PopularProperties = () => {
  const [cityProperties, setCityProperties] = useState(0)
  const [mountainProperties, setMountainProperties] = useState(0)
  const [villageProperties, setVillageProperties] = useState(0)
  useEffect(() => {
    const fetchPropertiesNumber = async() => {
      try {
         const data = await request('/property/find/types', 'GET')

         setCityProperties(data.city)
         setMountainProperties(data.mountain)
         setVillageProperties(data.village)
         
      } catch (error) {
        
        console.error(error)
      }
    }
    fetchPropertiesNumber()
  }, [])
  

  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <div className={classes.titles}>
        <h2>Properties</h2>
          <h5 className={classes.primaryText}>Best type of properties for you</h5>
          
        </div>
        <div className={classes.properties}>
          <Link to={`/cityTypes`} className={classes.property}>
            <img src={img1} alt=''/>
            <div className={classes.quantity}>{cityProperties} properties</div>
            <h5>City properties</h5>
          </Link>
          <Link to={`/MountainTypes`} className={classes.property}>
            <img src={img2} alt='' />
            <div className={classes.quantity}>{mountainProperties} properties</div>
            <h5>Mountain properties</h5>
          </Link>
          <Link to={`/VillageTypes`} className={classes.property}>
            <img src={img3} alt='' />
            <div className={classes.quantity}>{villageProperties} properties</div>
            <h5>Village properties</h5>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default PopularProperties