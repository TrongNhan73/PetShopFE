import React from 'react'
import { useAppSelector } from '../../hooks/reduxHook'

export default function Home() {
    const userInfo = useAppSelector(state => state.user);
    return (
        <div>
            Welcome {JSON.stringify(userInfo)}
        </div>
    )
}
