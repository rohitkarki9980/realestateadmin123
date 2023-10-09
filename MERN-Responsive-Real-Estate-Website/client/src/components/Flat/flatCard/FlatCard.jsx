import React from 'react'
import classes from './flatCard.module.css'
import { Link } from 'react-router-dom'
import { BsFillPersonFill } from 'react-icons/bs'

const YachtCard = ({ yacht }) => {

    return (
        <Link to={`/yacht/${yacht._id}`} className={classes.container}>
            <div className={classes.wrapper}>
                <div className={classes.imgContainer}>
                    <img src={`http://localhost:5000/images/${yacht.img}`} alt='' />
                </div>
                <h3 className={classes.title}>Title:{yacht.title}</h3>
                <div className={classes.priceAndMaxPassengers}>
                    <span>रु {yacht.price}/per month</span>
                    <span className={classes.passengers}><BsFillPersonFill  size={"20px"}/>  {yacht.BHK}</span>
                </div>
            </div>
        </Link>
    )
}

export default YachtCard