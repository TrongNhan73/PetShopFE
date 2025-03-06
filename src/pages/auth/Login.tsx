import React, { useEffect, useRef, useState } from 'react'
import style from '../../styles/pages/login.module.scss';
import { logo_title } from '../../assets/image';
import InputText from '../../components/InputText';
import { Icon_email, Icon_user } from '../../assets/svg';
import InputPassword from '../../components/InputPassword';
import { useLocation, useNavigate } from 'react-router';



export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isShow, setIsShow] = useState(false);
    const [isEnd, setIsEnd] = useState(false);
    let navigate = useNavigate();


    const handleGoToRegister = () => {
        setIsEnd(true);
        setTimeout(() => {
            navigate('/register');
        }, 800)

    }




    return (
        <div className={style.container}>
            <img src={logo_title} alt="logo" />
            <div className={`${style.login} ${isEnd ? style.end : ''} `}>
                <div className={style.title}>Login</div>
                <form action="">
                    <InputText
                        c_placeholder='Email'
                        c_icon={Icon_email}
                        state={email}
                        setState={setEmail} />

                    <InputPassword
                        c_placeholder='Password'
                        state={password}
                        setState={setPassword}
                        isShow={isShow} />

                    <div className={style.checkbox}>
                        <input type="checkbox" id="showpassword" defaultChecked={isShow} onChange={() => setIsShow(!isShow)} />
                        <label htmlFor="showpassword">{isShow ? "Hide password" : "Show password"}</label>
                    </div>
                    <div className={style.text}>Don't have account? <span onClick={handleGoToRegister}>Register now!</span></div>
                    <button>Login</button>
                </form>
            </div>
        </div>
    )
}
