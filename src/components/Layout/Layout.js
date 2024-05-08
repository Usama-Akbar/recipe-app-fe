import React from 'react'
import Header from '../Header/Header'
import Routers from '../../routes/Routers'
function Layout() {
  return (
    <>
      <Header/>
      <div className='py-20 lg:px-[140px] sm:px-[10px]'>
        <Routers/>
      </div>
    
    </>
  )
}

export default Layout
