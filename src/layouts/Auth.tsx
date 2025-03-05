import React from 'react'
import { background_auth } from '../assets/video'
import style from '../styles/pages/auth.module.scss'
import { Outlet } from 'react-router'

export default function Auth() {
    return (
        <div className={style.container}>
            <video
                src={background_auth}
                muted
                autoPlay
                loop />
            <Outlet />
        </div>
    )
}
