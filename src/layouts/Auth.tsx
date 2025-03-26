import React, { useEffect } from 'react'
import { background_auth } from '../assets/video'
import style from '../styles/pages/auth.module.scss'
import { Outlet, useNavigate } from 'react-router'
import { auth_background } from '../assets/image'
import { useAppSelector } from '../hooks/reduxHook'
import path from '../const/path'

export default function Auth() {
    const AppSelector = useAppSelector(state => state);
    const navigate = useNavigate();
    useEffect(() => {
        if (AppSelector.user.access_token) {
            navigate(path.index);
        }
    }, [AppSelector.user]);
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
