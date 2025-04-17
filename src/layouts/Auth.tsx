import React, { useEffect } from 'react'
import { background_auth } from '../assets/video'
import style from '../styles/pages/auth.module.scss'
import { Outlet, useNavigate } from 'react-router'
import { auth_background } from '../assets/image'
import { useAppSelector } from '../hooks/reduxHook'
import path from '../const/path'

export default function Auth() {
    const user = useAppSelector(state => state.user);
    const navigate = useNavigate();
    useEffect(() => {
        if (user.access_token) {
            if (user.role_id === import.meta.env.VITE_ID_ADMIN_ROLE) {
                navigate(path.admin_overview);

            }
            else {
                navigate(path.index);
            }
        }
    }, [user]);
    return (
        <div className={style.container}>

            {/* <video
                src={background_auth}
                poster={auth_background}
                muted
                autoPlay
                loop /> */}
            <Outlet />
        </div>
    )
}
