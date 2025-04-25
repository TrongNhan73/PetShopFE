import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks/reduxHook'
import { Outlet, useNavigate, NavLink } from 'react-router';
import path from '../const/path';
import { sendApiLogOut } from '../api/authApi';
import { logOut } from '../store/userSlice';
import { logout } from '../utils/other';
import style from '../styles/pages/_dashboard.module.scss';
import { logo_title, title } from '../assets/image';
import { Icon_chat, Icon_coupon, Icon_lock, Icon_logout, Icon_order, Icon_overview, Icon_pet, Icon_user } from '../assets/svg';


export default function Dashboard() {

    const [isOrderCollapse, setIsOrderCollapse] = useState(true);




    const roleId = useAppSelector(state => state.user.role_id);
    const name = useAppSelector(state => state.user.user_name);
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

        <div className={style.container}>
            <div className={style['left-navigation']}>
                <div className={style.title}>
                    <img src={title} alt="" />
                </div>
                <ul className={style.navigation__items}>
                    <li>
                        <Icon_overview />
                        <NavLink to={path.admin_overview}>Overview</NavLink>
                    </li>
                    <li>
                        <Icon_pet />
                        <NavLink to={path.admin_product}>Product</NavLink>
                    </li>
                    <li className={style.collapse__container} onClick={() => setIsOrderCollapse(!isOrderCollapse)}>
                        <div className={style["title__collapse"]}>
                            <Icon_order />
                            Order
                            <div className={style.arrow}><span>{'>'}</span></div>
                        </div>
                        <ul className={`${style.collapse__items} ${isOrderCollapse ? style.collapse : ''}`} onClick={(e) => e.stopPropagation()}>
                            <li>
                                <NavLink to={path.admin_order_new}>New</NavLink>
                            </li>
                            <li>
                                <NavLink to={path.admin_order_pending}>Pending</NavLink>
                            </li>
                            <li>
                                <NavLink to={path.admin_order_completed}>Completed</NavLink>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <Icon_chat />
                        <NavLink to={path.admin_chat}>Chat</NavLink>
                    </li>
                    <li >
                        <Icon_user />
                        <NavLink to={path.admin_user}>User</NavLink>
                    </li>
                    <li>
                        <Icon_coupon />
                        <NavLink to={path.admin_coupon}>Coupon</NavLink>
                    </li>
                </ul>

            </div>
            <div className={style.content}>
                <div className={style.header}>
                    <h1>Welcome! {name}</h1>

                    <div className={style['log-out-group']} onClick={handleLogOut}>
                        <Icon_logout />
                        <div className={style.label}>Log out</div>
                    </div>
                </div>
                <div className={style.main}>
                    <Outlet />
                </div>
            </div>
        </div>



    )
}
