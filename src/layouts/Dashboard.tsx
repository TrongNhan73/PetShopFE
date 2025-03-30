import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks/reduxHook'
import { Outlet, useNavigate } from 'react-router';
import path from '../const/path';
import { sendApiLogOut } from '../api/authApi';
import { logOut } from '../store/userSlice';




export default function Dashboard() {
    const roleId = useAppSelector(state => state.user.role_id);
    const adminId = import.meta.env.VITE_ID_ADMIN_ROLE;
    const navigate = useNavigate();
    const appDispatch = useAppDispatch();

    useEffect(() => {
        if (roleId !== adminId) {
            navigate(path.others);
        }
    }, []);


    const logout = async () => {
        const res = await sendApiLogOut();
        console.log(res);
        if (+res.code === 1) {
            appDispatch(logOut());
            navigate(path.login);
        }
    }


    return (

        <div>
            <div>Dashboard</div>
            <button onClick={logout}>Log out</button>
            <Outlet />
        </div>



    )
}
