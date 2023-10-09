import React from 'react';
import { useSelector } from 'react-redux';
import MainDash from './MainDash/MainDashes';
import RightSide from './RightSide/RightSide';
import Sidebar from './Sidebar/Sidebar';
import AdminTop from './Navbar/adminTop'

import './admin.css'

const AdminPanel = () => {
  const { user, token } = useSelector((state) => state.auth)
  const isAdmin =user?.isAdmin
  
  return (
    <>
    {isAdmin ? (
      <div className='appMain'>
        <div clasName='navThings'>
        <AdminTop/>
        </div>
          
         <div className="AppGlass">
        <Sidebar/>
        <MainDash/>
        <RightSide/>
      </div>
      </div>
    ) : (
      <p>You don't have access to the admin panel</p>
    )}
  </>
  )
}

export default AdminPanel;
