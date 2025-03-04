import React, { useState } from 'react'
import Loading from '../../components/Loading'
import InputText from '../../components/InputText'
import { Icon_email, Icon_phone, Icon_user } from '../../assets/svg';
import InputPassword from '../../components/InputPassword';
import style from '../../styles/pages/register.module.scss'
import { logo_title } from '../../assets/image';
import bgVideo from '../../assets/background/video.mp4';
import bg from '../../assets/background/register.png';

export default function Register() {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [passwordComfirm, setPasswordComfirm] = useState('');
    const [isShow, setIsShow] = useState(false);
    return (
        <div className={style.container}>
            <video
                src={bgVideo}
                // poster={bg}
                muted
                autoPlay
                loop />
            <div className={style.register}>
                <div className={style.title}>Register</div>
                <form action="">
                    <InputText
                        c_placeholder='Email'
                        c_icon={Icon_email}
                        state={email}
                        setState={setEmail} />
                    <InputText
                        c_placeholder='User name'
                        c_icon={Icon_user}
                        state={username}
                        setState={setUsername} />
                    <InputText
                        c_placeholder='Phone'
                        c_icon={Icon_phone}
                        state={phone}
                        setState={setPhone} />
                    <InputPassword
                        c_placeholder='Password'
                        state={password}
                        setState={setPassword}
                        isShow={isShow} />
                    <InputPassword
                        c_placeholder='Password Comfirm'
                        state={passwordComfirm}
                        setState={setPasswordComfirm}
                        isShow={isShow} />
                    <button>Register</button>
                </form>
            </div>
        </div>
    )
}
