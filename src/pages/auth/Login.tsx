import React, { useEffect, useRef, useState } from 'react'
import style from '../../styles/pages/login.module.scss';
import { logo_title } from '../../assets/image';
import InputText from '../../components/InputText';
import { Icon_email, Icon_user } from '../../assets/svg';
import InputPassword from '../../components/InputPassword';
import { Link, NavLink, useNavigate } from 'react-router';
import { useGoogleLogin, GoogleLogin } from '@react-oauth/google';
import { sendApiLogin, sendApiLogInWithGoogle } from '../../api/authApi';
import { validateEmail, validatePassword } from '../../utils/validate';
import { toast } from 'react-toastify';
import LoadingSmall from '../../components/LoadingSmall';
import path from '../../const/path';
import decodeAcessToken from '../../services/jwt';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHook';
import { setUser } from '../../store/userSlice';
import { jwtDecode } from 'jwt-decode';
import *as localService from '../../services/localStorage';
import keyname from '../../const/key';



const controlFunct = (condition: boolean, callback: () => void) => {
    if (condition) {
        callback();
    }
    return condition;
}

export default function Login() {
    const AppDispath = useAppDispatch();

    const [email, setEmail] = useState({
        content: '',
        err: 0
    });
    const [password, setPassword] = useState({
        content: '',
        err: 0
    });
    const [isShow, setIsShow] = useState(false);
    const [isEnd, setIsEnd] = useState(false);
    const [isloading, setIsloading] = useState(false);
    let navigate = useNavigate();




    const resetStateErr = () => {
        setEmail({ ...email, err: 0 });
        setPassword({ ...password, err: 0 });
    }


    const handleGoToRegister = () => {
        setIsEnd(true);
        setTimeout(() => {
            navigate('/register');
        }, 800)

    }

    const handleLoginWithGGAccessToken = async (response: string) => {
        try {


            const data = await sendApiLogInWithGoogle(response);

            if (+data.code === 0) {
                toast.error("There are some issue from the server");
                return;
            }
            if (+data.code === 1) {
                toast.success("Login successfully");
                const accesstoken = data.data?.accessToken;
                if (accesstoken) {
                    const jwtinfo = decodeAcessToken(accesstoken);
                    console.log(jwtinfo);
                    console.log('>>>>>>>>>>><>');
                    console.log(jwtinfo);
                    localService.saveData(keyname.isAuthenticated, 'true');
                    AppDispath(
                        setUser({
                            email: jwtinfo.email,
                            phone: jwtinfo.phone,
                            address: jwtinfo.address,
                            access_token: accesstoken,
                            user_name: jwtinfo.user_name,
                            role_id: jwtinfo.role_id,
                            img_url: jwtinfo.img_url,
                        })
                    );


                }
                return;
            }



        } catch (err) {
            console.log(err);
            toast.error('Login failed!')
        }
    }
    const handlGoogleLogin = useGoogleLogin({
        onSuccess: response => {
            console.log("Google login success:", response);
            if (response.access_token) {
                handleLoginWithGGAccessToken(response.access_token);
            }
        },
        onError: error => console.error("Login Failed:", error),
    });

    const handleLogin = async () => {


        resetStateErr();

        //check empty
        if (controlFunct(email.content.length === 0, () => setEmail({ ...email, err: 1 }))) return;
        if (controlFunct(password.content.length === 0, () => setPassword({ ...password, err: 1 }))) return;

        //check validate
        if (controlFunct(!validateEmail(email.content), () => setEmail({ ...email, err: 2 }))) return;
        if (controlFunct(!validatePassword(password.content), () => setPassword({ ...password, err: 2 }))) return;



        try {
            setIsloading(true);
            let data = await sendApiLogin({ email: email.content.trim(), password: password.content.trim() });
            setIsloading(false);
            if (+data.code === 0) {
                toast.error("There are some issue from the server");
                return;
            }
            if (+data.code === -4) {
                toast.error("The email or password is incorrect");
                return;
            }
            if (+data.code === 1) {
                toast.success("Login successfully");
                const accesstoken = data.data?.accessToken;
                if (accesstoken) {
                    const jwtinfo = decodeAcessToken(accesstoken);
                    console.log('>>>>>>>>>>><>');
                    console.log(jwtinfo);
                    localService.saveData(keyname.isAuthenticated, 'true');
                    AppDispath(
                        setUser({
                            email: jwtinfo.email,
                            phone: jwtinfo.phone,
                            address: jwtinfo.address,
                            access_token: accesstoken,
                            user_name: jwtinfo.user_name,
                            role_id: jwtinfo.role_id,
                            img_url: jwtinfo.img_url,
                        })
                    );


                }
                return;
            }

        } catch (e) {
            setIsloading(false);
            toast.error('Can\'t connect to server')
            console.log(e);
        }
    }

    return (
        <div className={style.container}>
            <img src={logo_title} alt="logo" />
            <div className={`${style.login} ${isEnd ? style.end : ''} `}>
                <div className={style.title}>Login</div>
                <form action="">
                    <InputText
                        c_placeholder='Email'
                        message_err='The email is invalid'
                        c_icon={Icon_email}
                        state={email}
                        setState={setEmail} />

                    <InputPassword
                        c_placeholder='Password'
                        state={password}
                        setState={setPassword}
                        message_err='Password must have more 5 letter'
                        isShow={isShow} />

                    <div className={style.checkbox}>
                        <input type="checkbox" id="showpassword" defaultChecked={isShow} onChange={() => setIsShow(!isShow)} />
                        <label htmlFor="showpassword">{isShow ? "Hide password" : "Show password"}</label>
                    </div>
                    <div className={style.text}>Don't have account? <span onClick={handleGoToRegister}>Register now!</span></div>
                    <Link to={path.index}>Continue as Guest</Link>

                    <button type='button' onClick={handleLogin}>{isloading ? <LoadingSmall /> : 'Login'}</button>
                    <button type='button' onClick={() => handlGoogleLogin()} disabled={isloading}>Login with Google</button>
                </form>
            </div>
        </div>
    )
}
