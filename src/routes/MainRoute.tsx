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
import AdminProduct from '../pages/admin/AdminProduct'
import AdminOrderNew from '../pages/admin/AdminOrderNew'
import AdminOrderPending from '../pages/admin/AdminOrderPending'
import AdminOrderCompleted from '../pages/admin/AdminOrderCompleted'
import AdminChat from '../pages/admin/AdminChat'
import AdminUser from '../pages/admin/AdminUser'
import AdminCoupon from '../pages/admin/AdminCoupon'


export default function MainRoute() {
  const AppDispath = useAppDispatch();
  const accesstoken = useAppSelector(state => state.user.access_token);
  const isAuthenticated = localService.getData(keyname.isAuthenticated);
  const checkAuth = async () => {
    if (isAuthenticated) {
      if (!accesstoken) {
        try {
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
                  img_url: jwtinfo.img_url
                })
              );
            }
          } else {
            toast.warning('Your login session has expired, please log in again');
            localService.deleteData(keyname.isAuthenticated)
          }
        } catch (err) {
          console.log(err);
          toast.error('Some error when get access token')
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
        <Route path={path.admin_product} element={<AdminProduct />} />
        <Route path={path.admin_order_new} element={<AdminOrderNew />} />
        <Route path={path.admin_order_pending} element={<AdminOrderPending />} />
        <Route path={path.admin_order_completed} element={<AdminOrderCompleted />} />
        <Route path={path.admin_chat} element={<AdminChat />} />
        <Route path={path.admin_user} element={<AdminUser />} />
        <Route path={path.admin_coupon} element={<AdminCoupon />} />
      </Route>
      <Route path={path.others} element={<NotFound />} />
    </Routes>
  )
}
