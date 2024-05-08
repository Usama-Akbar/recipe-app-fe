import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from '../pages/Home'
import Login from '../pages/Login'
import Register from '../pages/Register'
import CardDetails from '../components/CardDetails/CardDetails'
import UpdateForm from '../pages/UpdateForm'

function Routers() {
  return <Routes>
    <Route path='/home' element={< Home/>} />
    <Route path='/' element={<Login/>} />
    <Route path='/detail/:id' element={<CardDetails/>} />
    <Route path='/register' element={<Register/>} />
    <Route path='/updateform/:id' element={<UpdateForm/>} />
  </Routes>
}

export default Routers
