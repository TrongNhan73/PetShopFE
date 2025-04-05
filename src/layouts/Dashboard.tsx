import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks/reduxHook'
import { Outlet, useNavigate } from 'react-router';
import path from '../const/path';
import { sendApiLogOut } from '../api/authApi';
import { logOut } from '../store/userSlice';
import { logout } from '../utils/other';




export default function Dashboard() {
    const roleId = useAppSelector(state => state.user.role_id);
    const adminId = import.meta.env.VITE_ID_ADMIN_ROLE;
    const navigate = useNavigate();
    const appDispatch = useAppDispatch()
    useEffect(() => {
        if (roleId !== adminId) {
            navigate(path.others);
        }
    }, []);


    const handleLogOut = async () => {
        const status = await logout();
        if (status) {
            navigate(path.login);
            appDispatch(logOut());
        }
    }



    return (

        <div>
            <div>Dashboard</div>
            <button onClick={handleLogOut}>Log out</button>
            <Outlet />
        </div>



    )
}
