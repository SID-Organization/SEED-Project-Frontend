import React, {useState} from 'react'

import { Outlet } from 'react-router';

import Header from '../Header'
import Sidebar from '../Sidebar'

export default function Layout() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <>
        <Header setIsSidebarOpen={setIsSidebarOpen}/>
        <Sidebar isSidebarOpen={isSidebarOpen}/>
        <div className="screen-content">
            <Outlet />
        </div>
    </>
  )
}
