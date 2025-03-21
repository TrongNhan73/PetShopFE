import React from 'react'
import { Route, Routes } from 'react-router'
import Home from '../pages/client/Home'
import Auth from '../layouts/Auth'
import path from '../const/path'
import Register from '../pages/auth/Register'
import Login from '../pages/auth/Login'
import NotFound from '../pages/NotFound'

export default function MainRoute() {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route element={<Auth />}>
        <Route path={path.login} element={<Login />} />
        <Route path={path.register} element={<Register />} />
      </Route>
      <Route path={path.others} element={<NotFound />} />
    </Routes>
  )
}
