import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { FaBed, FaSquareFull } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate,useParams } from 'react-router-dom'
import { request } from '../../util/fetchAPI'
import person from '../../assets/person.jpg'
import YachtCard from '../Flat/flatCard/FlatCard'
import classes from './myProfile.module.css'
import { logout } from '../../redux/authSlice'

const MyProfile = () => {
    const { user, token } = useSelector((state) => state.auth)
    const [listedProperties, setListedProperties] = useState([])
    const [listedYachts, setListedYachts] = useState([])
    const [bookmarkedProperties, setBookmarkedProperties] = useState([])
    const [bookmarkedYachts, setBookmarkedYachts] = useState([])
    const [activeBtn, setActiveBtn] = useState(0)
    const [deleteModal, setDeleteModal] = useState(false)
    const [error, setError] = useState(false)
    const dispatch = useDispatch()
    const {id} =useParams()
    const navigate = useNavigate()


    useEffect(() => {
        const fetchListedProperties = async () => {
            try {
                const options = {
                    Authorization: `Bearer ${token}`
                }
                const data = await request(`/property/find/my-properties`, 'GET', options)
                setListedProperties(data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchListedProperties()
    }, // eslint-disable-next-line react-hooks/exhaustive-deps
     [ ])
   
    useEffect(() => {
        const fetchListedYachts = async () => {
            try {
                const options = {
                    Authorization: `Bearer ${token}`
                }
                const data = await request(`/yacht/find/my-yachts`, 'GET', options)
                setListedYachts(data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchListedYachts()
    }, // eslint-disable-next-line react-hooks/exhaustive-deps
    [])

    useEffect(() => {
        const fetchBookmarkedProperties = async () => {
            try {
                const options = {
                    Authorization: `Bearer ${token}`
                }
                const data = await request(`/property/find/bookmarked-properties`, 'GET', options)
                setBookmarkedProperties(data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchBookmarkedProperties()
    }, // eslint-disable-next-line react-hooks/exhaustive-deps
    [ ])

    useEffect(() => {
        const fetchBookmarkedYachts = async () => {
            try {
                const options = {
                    Authorization: `Bearer ${token}`
                }
                const data = await request(`/yacht/find/bookmarked-yachts`, 'GET', options)
                setBookmarkedYachts(data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchBookmarkedYachts()
    },  // eslint-disable-next-line react-hooks/exhaustive-deps
    [ ])



    const handleDeleteProfile = async () => {
        try {
            const options = {
                Authorization: `Bearer ${token}`
            }
            const userId = user._id;

            await request(`/user/${userId}`, 'DELETE', options)
            await request(`/property/${id}`, "DELETE",)
            dispatch(logout())
            navigate('/signin')

        } catch (error) {
            setError(true)
            setTimeout(() => {
                setError(false)
            }, 2500)
        }
    }
    

    return (
        <div className={classes.container}>
            <div className={classes.wrapper}>   
            <div className={classes.upperSection}>
                <div className={classes.profile}>
                  
                   
                    <div className={classes.userData}>
                        <h2>ABOUT US</h2>
                        <h3>WE WELCOME <span>{user?.username && user.username.toUpperCase()} <br /></span>
                        FROM NEPAL HOMES...</h3>
                        <h4><span>Registered Email : </span>{user?.email}</h4>
                    </div>  
                    <img alt='' className={classes.userProfileImg} src={user?.profileImg ? `http://localhost:5000/images/${user?.profileImg}` : person} />
                    
                </div>
                <div className={classes.deleteUpdateThings} >
                     <div className={classes.updateDeleteControls}>
                        <Link className={classes.updateBtn} to={`/update-profile`}>Update Profile</Link>
                        {deleteModal && (
                            <div className={classes.deleteModal}>
                                <button onClick={handleDeleteProfile}>Yes</button>
                                <button onClick={() => setDeleteModal(prev => !prev)}>No</button>
                            </div>
                        )}
                        <button onClick={() => setDeleteModal(prev => !prev)} className={classes.deleteBtn}>Delete Profile</button>
                    </div>
                    <div className={classes.buttons}>
                    <button className={`${classes.button} ${activeBtn === 0 && classes.active}`} onClick={() => setActiveBtn(prev => 0)}>
                        Listed properties
                    </button>
                    <button className={`${classes.button} ${activeBtn === 2 && classes.active}`} onClick={() => setActiveBtn(prev => 2)}>
                        Bookmarked properties
                    </button>
                    <button className={`${classes.button} ${activeBtn === 1 && classes.active}`} onClick={() => setActiveBtn(prev => 1)}>
                        Listed Flats
                    </button>
                   
                    <button className={`${classes.button} ${activeBtn === 3 && classes.active}`} onClick={() => setActiveBtn(prev => 3)}>
                        Bookmarked Flats
                    </button>
                    </div>
                </div>
                </div> 
                <div className={classes.catalog}>
                    {activeBtn === 0 && (
                        <>
                            {listedProperties?.length > 0 && <h2 className={classes.titlePop}>Listed Properties</h2>}
                            <div className={classes.properties}>
                                {listedProperties?.length > 0 ? listedProperties?.map((listedProperty) => (
                                    <div key={listedProperty._id} className={classes.property}>
                                        <Link to={`/propertyDetail/${listedProperty._id}`} className={classes.imgContainer}>
                                            <img src={`http://localhost:5000/images/${listedProperty?.img}`} alt="" />
                                        </Link>
                                        <div className={classes.details}>
                                            <div className={classes.priceAndOwner}>
                                                <span className={classes.price}>NPR {listedProperty.price}</span>
                                                <img alt='' src={user?.profileImg ? `http://localhost:5000/images/${user?.profileImg}` : person} className={classes.owner} />
                                            </div>
                                            <div className={classes.moreDetails}>
                                                <span>{listedProperty?.beds} <FaBed className={classes.icon} /></span>
                                                <span>{listedProperty?.sqmeters} sq. meters<FaSquareFull className={classes.icon} /></span>
                                            </div>
                                            <div className={classes.desc}>
                                                {listedProperty?.decs}
                                            </div>
                                        </div>
                                    </div>
                                )) : <h2 className={classes.noListed}>You have no listed properties</h2>}
                            </div>
                        </>
                    )}
                    {activeBtn === 1 && (
                        <>
                            {listedYachts?.length > 0 && <h2 className={classes.titlePop}>Listed Flats</h2>}
                            {listedYachts?.length > 0 ? (
                                <div className={classes.yachts}>
                                    {listedYachts.map((yacht) => (
                                        <YachtCard yacht={yacht} key={yacht._id} />
                                    ))}
                                </div>
                            ) : <h2 className={classes.noListed}>You have no listed Flat</h2>}
                        </>
                    )}
                    {activeBtn === 2 && (
                        <>
                            {bookmarkedProperties?.length > 0 && <h2 className={classes.titlePop}>Bookmarked Properties</h2>}
                            <div className={classes.properties}>
                                {bookmarkedProperties?.length > 0 ? bookmarkedProperties?.map((bookmarkedProperty) => (
                                    <div key={bookmarkedProperty._id} className={classes.property}>
                                        <Link to={`/propertyDetail/${bookmarkedProperty._id}`} className={classes.imgContainer}>
                                            <img src={`http://localhost:5000/images/${bookmarkedProperty?.img}`} alt="" />
                                        </Link>
                                        <div className={classes.details}>
                                            <div className={classes.priceAndOwner}>
                                                <span className={classes.price}>$ {bookmarkedProperty.price}</span>
                                                <img src={person} className={classes.owner} alt='' />
                                            </div>
                                            <div className={classes.moreDetails}>
                                                <span>{bookmarkedProperty?.beds} <FaBed className={classes.icon} /></span>
                                                <span>{bookmarkedProperty?.sqmeters} sq. meters<FaSquareFull className={classes.icon} /></span>
                                            </div>
                                            <div className={classes.desc}>
                                                {bookmarkedProperty?.decs}
                                            </div>
                                        </div>
                                    </div>
                                )) : <h2 className={classes.noListed}>You have no bookmarked properties</h2>}
                            </div>
                        </>
                    )}
                    {activeBtn === 3 && (
                        <>
                            {bookmarkedYachts?.length > 0 && <h2 className={classes.titlePop}>Bookmarked Flats</h2>}
                            {bookmarkedYachts?.length > 0 ? (
                                <div className={classes.yachts}>
                                    {bookmarkedYachts.map((yacht) => (
                                        <YachtCard yacht={yacht} key={yacht._id} />
                                    ))}
                                </div>
                            ) : <h2 className={classes.noListed}>You have no bookmarked Flats</h2>}
                        </>
                    )}
                </div>
                {error && (
                    <div className={classes.error}>
                        There was an error!
                    </div>
                )}
            </div>
         
        </div>
    )
}

// 0 - Listed Properties
// 1 - Listed flat
// 2 - Bookmarked Properties
// 3 - Bookmarked flat

export default MyProfile