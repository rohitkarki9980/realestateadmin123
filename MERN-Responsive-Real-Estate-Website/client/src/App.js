import Footer from './components/footer/Footer';
import Hero from './components/hero/Hero';
import Navbar from './components/navbar/Navbar';
import Newsletter from './components/newsletter/Newsletter';
import PopularProperties from './components/AllPropertyFiles/popularProperties/PopularProperties';
import Signin from './components/signin/Signin';
import Signup from './components/signup/Signup';
import Properties from './components/AllPropertyFiles/properties/Properties';
import PropertyDetail from './components/AllPropertyFiles/propertyDetail/PropertyDetail';
import {useSelector} from 'react-redux'
import {Routes, Route, Navigate, useLocation} from 'react-router-dom'
import {useEffect} from 'react';
import CityTypes from './components/cityTypes/cityTypes';
import MountainTypes from './components/MountainTypes/MountainTypes';
import VillageTypes from './components/villageTypes/villageTypes';
import EditProperty from './components/editProperty/EditProperty'
import Yachts from './components/Flat/flats/Flats';
import YachtDetails from './components/Flat/flatDetails/FlatDetails';
import CreateYacht from './components/Flat/createFlat/CreateFlat';
import YachtEdit from './components/Flat/flatEdit/FlatEdit';
import Companies from './components/Companies/Companies';
import MyProfile from './components/myProfile/MyProfile';
import PropertyList from './components/AllPropertyFiles/propertyList/propertyList';
import UpdateProfile from './components/updateProfile/UpdateProfile';
import './App.css';
import NotFound from './components/notFound/NotFound';
import AdminPanel from './components/admin/adminPanel'
import Customer from './components/admin/Customers/Customers'
import Contact from './components/contact/contact';
import PropertiesAdmin from './components/admin/PropertiesAdmin/PropertiesAdmin';
import AboutPanel from './components/AboutUs/AboutPanel'
function App() {
    const {user} = useSelector((state) => state.auth)
    const isAdmin = user?.isAdmin
    const url = useLocation().pathname
    useEffect(() => {
        url && window.scrollTo(0, 0)
    }, [url])


    return (


        <div className='body'>

            <Routes>
                <Route path="/admin"
                    element={
                        user && isAdmin ? <AdminPanel/>: <Navigate to="/"/>
                    }/>
                <Route path="/admin/customers"
                    element={
                        user && isAdmin ? <Customer/>: <Navigate to="/"/>
                    }/>

                    <Route path="/admin/propertiesAdmin"
                    element={
                        user && isAdmin ? <PropertiesAdmin/>: <Navigate to="/"/>
                    }/>
                    <Route path='/aboutPanel' element={
                        <>
                        <Navbar/>
                        <AboutPanel/>
                        <Footer/>
                        </>
                    }/>
                    <Route path='/contact' element={
                        <>
                        <Navbar/>
                        <Contact/>
                        <Footer/>
                        </>
                    }/>

                <Route path='/'
                    element={
                        <><Navbar/><Hero/><PopularProperties/><Companies/><Contact/><Newsletter/><Footer/></>

                    }/>
                <Route path='/properties'
                    element={
                        <><Navbar/><Properties/><Newsletter/><Footer/></>
                    }/>
                <Route path='/CityTypes'
                    element={
                        <><Navbar/><CityTypes/><Newsletter/><Footer/></>
                    }/>
                <Route path='/VillageTypes'
                    element={
                        <><Navbar/><VillageTypes/><Newsletter/><Footer/></>
                    }/>

                <Route path='/MountainTypes'
                    element={
                        <><Navbar/><MountainTypes/><Newsletter/><Footer/></>
                    }/>


                <Route path='/allProperties'
                    element={
                        <><Navbar/><PropertyList/><Newsletter/><Footer/></>
                    }/>
                <Route path='/yachts'
                    element={
                        user ? <>
                            <Navbar/>
                            <Yachts/>
                            <Newsletter/>
                            <Footer/>
                        </> : <Navigate to='/signin'/>}/>
                   


                <Route path='/yacht/:id'
                    element={
                        user ? <>
                            <Navbar/>
                            <YachtDetails/>
                            <Newsletter/>
                            <Footer/>
                        </> : <Navigate to='/signin'/>}/>
                    

                <Route path='/create-yacht'
                    element={
                        user ? <>
                            <Navbar/>
                            <CreateYacht/>
                            <Newsletter/>
                            <Footer/>
                        </> : <Navigate to='/signin'/>}/>
                    

                <Route path='/yacht-edit/:id'
                    element={
                        user ? <>
                            <Navbar/>
                            <YachtEdit/>
                            <Footer/>
                        </> : <Navigate to='/signin'/>}/>
                    

                <Route path='/propertyDetail/:id'
                    element={
                        <><Navbar/><PropertyDetail/><Newsletter/><Footer/></>
                    }/>
                <Route path='/editproperty/:id'
                    element={
                        user ? <>
                            <Navbar/>
                            <EditProperty/>
                            <Footer/>
                        </> : <Navigate to='/signin'/>}/>
                   

                <Route path='/my-profile'
                    element={
                        user ? <>
                            <Navbar/>
                            <MyProfile/>
                            <Footer/>
                        </> : <Navigate to='/signin'/>}/>
                    

                <Route path='/update-profile'
                    element={
                        user ? <>
                            <Navbar/>
                            <UpdateProfile/>
                            <Footer/>
                        </> : <Navigate to='/signin'/>}/>
                    


                <Route path='/signup'
                    element={
                        !user ? <Signup/>: <Navigate to='/'/>}/>
                   

                <Route path='/signin'
                    element={
                        !user ? <Signin/>: <Navigate to='/'/>}/>
                  


                <Route path='*'
                    element={
                        <><Navbar/><NotFound/><Footer/></>
                    }/>
            </Routes>


        </div>

    );
}

export default App;
