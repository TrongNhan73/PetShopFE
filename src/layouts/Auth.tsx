import React from 'react'
import { background_auth } from '../assets/video'
import style from '../styles/pages/auth.module.scss'
import { Outlet } from 'react-router'
import { auth_background } from '../assets/image'

export default function Auth() {
    return (
        <div className={style.container}>
            <video
                src={background_auth}
                poster={auth_background}
                muted
                autoPlay
                loop />
            <Outlet />
        </div>
    )
}
