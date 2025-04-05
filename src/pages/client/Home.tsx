import React from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHook'
import { useNavigate } from 'react-router';
import path from '../../const/path';
import { logout } from '../../utils/other';
import { logOut } from '../../store/userSlice';

export default function Home() {


    const navigate = useNavigate()
    const appDispatch = useAppDispatch();
    const handleLogOut = async () => {
        const status = await logout();
        if (status) {
            navigate(path.login);
            appDispatch(logOut());
        }
    }
    const userInfo = useAppSelector(state => state.user);
    return (
        <div>
            Welcome {JSON.stringify(userInfo)}
            {userInfo.access_token ? <button onClick={handleLogOut}>Logout</button> : <button onClick={() => { navigate(path.login) }}>Login</button>}
        </div>
    )
}
