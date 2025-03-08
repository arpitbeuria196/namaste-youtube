import React from 'react'
import Sidebar from './Sidebar'
import ButtonList from './ButtonList'
import MainContainer from './MainContainer'
import { Outlet } from 'react-router-dom'

const Body = () => {
  return (
    <div className='flex'>
      <Sidebar/> 
      <div className="flex-1 bg-gray-100 overflow-auto">
        <Outlet />
      </div>

      
    </div>
  )
}

export default Body
