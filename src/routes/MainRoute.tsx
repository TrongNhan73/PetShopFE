import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router'
import Home from '../pages/client/Home'
import Auth from '../layouts/Auth'
import path from '../const/path'
import Register from '../pages/auth/Register'
import Login from '../pages/auth/Login'
import NotFound from '../pages/NotFound'
import * as localService from '../services/localStorage';
import keyname from '../const/key'
import { useAppDispatch, useAppSelector } from '../hooks/reduxHook'
import customAxios from '../config/axios'
import { sendApiGetAccesstoken } from '../api/authApi'
import { toast } from 'react-toastify'
import decodeAcessToken from '../services/jwt'
import { setUser } from '../store/userSlice'
import Dashboard from '../layouts/Dashboard'
import Overview from '../pages/admin/Overview'


export default function MainRoute() {
  const AppDispath = useAppDispatch();
  const accesstoken = useAppSelector(state => state.user.access_token);
  const isAuthenticated = localService.getData(keyname.isAuthenticated);
  const checkAuth = async () => {
    if (isAuthenticated) {
      if (!accesstoken) {
        let res = await sendApiGetAccesstoken();
        if (+res.code === 1) {
          console.log('Update access token');
          if (res.data?.accessToken) {
            const jwtinfo = decodeAcessToken(res.data?.accessToken);
            AppDispath(
              setUser({
                email: jwtinfo.email,
                phone: jwtinfo.phone,
                address: jwtinfo.address,
                access_token: res.data.accessToken,
                user_name: jwtinfo.user_name,
                role_id: jwtinfo.role_id,
              })
            );
          }
        } else if (+res.code !== -1) {
          toast.warning('Your login session has expired, please log in again')
        }

      }
    }
  }
  useEffect(() => {
    checkAuth();
  }, [])
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route element={<Auth />}>
        <Route path={path.login} element={<Login />} />
        <Route path={path.register} element={<Register />} />
      </Route>
      <Route element={<Dashboard />}>
        <Route path={path.admin_overview} element={<Overview />} />
      </Route>
      <Route path={path.others} element={<NotFound />} />
    </Routes>
  )
}
