import React from 'react'
import { useState } from 'react'
import { MdOutlineInsertPhoto } from 'react-icons/md'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { request } from '../../../util/fetchAPI'
import classes from './createFlat.module.css'

const CreateYacht = () => {
    const [title, setTitle] = useState(null)
    const [desc, setDesc] = useState(null)
    const [price, setPrice] = useState(null)
    const [BHK, setBHK] = useState(null)
    const [location, setLocation] = useState(null)
    const [metersLong, setMetersLong] = useState(null)
    const [photo, setPhoto] = useState(null)
    const [error, setError] = useState(false)
    const [emptyFields, setEmptyFields] = useState(false)
    const { token } = useSelector((state) => state.auth)
    const navigate = useNavigate()


    const handleCreate = async (e) => {
        e.preventDefault()

        try {
            let filename = null
            if (photo) {
                const formData = new FormData()
                filename = crypto.randomUUID() + photo.name
                formData.append('filename', filename)
                formData.append('image', photo)

                const options = {
                    "Authorization": `Bearer ${token}`,
                }

                await request("/upload/image", 'POST', options, formData, true)
            } else {
                setEmptyFields(true)
                setTimeout(() => {
                    setEmptyFields(false)
                }, 2500)
                return
            }

            if (title === '' || desc === '' || price === '' || BHK === '' || location === '' || metersLong === '') {
                setEmptyFields(true)
                setTimeout(() => {
                    setEmptyFields(false)
                }, 2500)
                return
            }

            const options = {
                "Authorization": `Bearer ${token}`,
                "Content-Type": 'application/json'
            }

            const body = {
                title,
                desc,
                price,
                BHK,
                location,
                metersLong
            }

            const newYacht = await request("/yacht", 'POST', options, { ...body, img: filename })

            navigate(`/yacht/${newYacht._id}`)
        } catch (error) {
            setError(true)
            setTimeout(() => {
                 setError(false)
            }, 2500);
        }
    }


    return (
        <div className={classes.container}>
            <div className={classes.wrapperFlat}>
                <div className={classes.title}><h3>Create Your Flat</h3></div>
                <form onSubmit={handleCreate}>
                    <div className={classes.inputBox}>
                        <label className={classes.labelBox} style={{marginRight:"6.7rem"}}>Title</label>
                        <input value={title} type="text" name="title" placeholder='Title'onChange={(e) => setTitle(e.target.value)} />
                    </div>
                    <div className={classes.inputBox}>
                        <label className={classes.labelBox} style={{marginRight:"6.5rem"}}>Desc</label>
                        <input value={desc} type="text" name="desc" placeholder='Desc'onChange={(e) => setDesc(e.target.value)} />
                    </div>
                    <div className={classes.inputBox}>
                        <label className={classes.labelBox} style={{marginRight:"6.2rem"}}>Price</label>
                        <input value={price} type="number" name="price" placeholder='Price' onChange={(e) => setPrice(e.target.value)} />
                    </div>
                    <div className={classes.inputBox}>
                        <label className={classes.labelBox} style={{marginRight:"6.8rem"}}>BHK</label>
                        <input value={BHK} type="number" name="bhk" placeholder='No of BHK' onChange={(e) => setBHK(e.target.value)} />
                    </div>
                    <div className={classes.inputBox}>
                        <label className={classes.labelBox} style={{marginRight:"4.7rem"}}>Location</label>
                        <input value={location} type="text" name="location" placeholder='Location' onChange={(e) => setLocation(e.target.value)} />
                    </div>
                    <div className={classes.inputBox}>
                        <label className={classes.labelBox} style={{marginRight:"2rem"}}> Square Meters</label>
                        <input value={metersLong} type="text" name="metersLong" placeholder='sq.meters'onChange={(e) => setMetersLong(e.target.value)} />
                    </div>
                    <div className={classes.inputBoxImage}>
                        <label htmlFor='image' className={classes.labelBoxPhoto}>Photo   <span> <MdOutlineInsertPhoto /></span></label>
                        <input type="file" id="image" style={{ display: 'none' }} onChange={(e) => setPhoto(e.target.files[0])} />
                        {photo && <div style={{ marginTop: '12px' }}>Photo name: {photo.name}</div>}
                    </div>
                    <div className={classes.buttons}>
                        
                         <button type="submit" className={classes.buttons}>Post</button>
                    
                     </div>
                   
                </form>
                {error && (
                    <div className={classes.error}>
                        There was an error creating a listing! Try again.
                    </div>
                )}
                {emptyFields && (
                    <div className={classes.error}>
                        All fields must be filled!
                    </div>
                )}
            </div>
        </div>
    )
}

export default CreateYacht