import React, { useEffect, useRef, useState, FC } from 'react'
import Loading from '../../components/Loading'
import InputText from '../../components/InputText'
import { Icon_email, Icon_phone, Icon_user } from '../../assets/svg';
import InputPassword from '../../components/InputPassword';
import style from '../../styles/pages/register.module.scss'
import { logo_title } from '../../assets/image';
import { useNavigate } from 'react-router';
import { sendApiRegister } from '../../api/authApi';
import { validateEmail, validatePassword, validatePhone } from '../../utils/validate';
import LoadingSmall from '../../components/LoadingSmall';
import { toast } from 'react-toastify';
import path from '../../const/path';





const controlFunct = (condition: boolean, callback: () => void) => {
    if (condition) {
        callback();
    }
    return condition;
}






export default function Register() {
    const [email, setEmail] = useState({
        content: '',
        err: 0
    });
    const [username, setUsername] = useState({
        content: '',
        err: 0
    });
    const [phone, setPhone] = useState({
        content: '',
        err: 0
    });
    const [password, setPassword] = useState({
        content: '',
        err: 0
    });
    const [passwordConfirm, setPasswordConfirm] = useState({
        content: '',
        err: 0
    });
    const [isShow, setIsShow] = useState(false);
    const [isEnd, setIsEnd] = useState(false);
    const [isloading, setIsloading] = useState(false);

    let navigate = useNavigate();



    const handleGoToLogin = () => {
        setIsEnd(true);
        setTimeout(() => {
            navigate('/login');
        }, 800)

    }


    const resetStateErr = () => {
        setEmail({ ...email, err: 0 });
        setUsername({ ...username, err: 0 });
        setPhone({ ...phone, err: 0 });
        setPassword({ ...password, err: 0 });
        setPasswordConfirm({ ...passwordConfirm, err: 0 });
    }

    const resetState = () => {
        setEmail({ content: '', err: 0 });
        setUsername({ content: '', err: 0 });
        setPhone({ content: '', err: 0 });
        setPassword({ content: '', err: 0 });
        setPasswordConfirm({ content: '', err: 0 });
    }

    const handleRegister = async () => {
        resetStateErr();

        //check empty
        if (controlFunct(email.content.length === 0, () => setEmail({ ...email, err: 1 }))) return;
        if (controlFunct(username.content.length === 0, () => setUsername({ ...username, err: 1 }))) return;
        if (controlFunct(phone.content.length === 0, () => setPhone({ ...phone, err: 1 }))) return;
        if (controlFunct(password.content.length === 0, () => setPassword({ ...password, err: 1 }))) return;
        if (controlFunct(passwordConfirm.content.length === 0, () => setPasswordConfirm({ ...passwordConfirm, err: 1 }))) return;
        //check validate
        if (controlFunct(!validateEmail(email.content), () => setEmail({ ...email, err: 2 }))) return;
        if (controlFunct(!validatePhone(phone.content), () => setPhone({ ...phone, err: 2 }))) return;
        if (controlFunct(!validatePassword(password.content), () => setPassword({ ...password, err: 2 }))) return;
        if (controlFunct(!validatePassword(passwordConfirm.content), () => setPasswordConfirm({ ...passwordConfirm, err: 2 }))) return;
        //check password
        if (controlFunct(passwordConfirm.content !== password.content, () => setPasswordConfirm({ ...passwordConfirm, err: 3 }))) return;

        //send api
        try {
            setIsloading(true);
            let data = await sendApiRegister({
                email: email.content.trim(),
                username: username.content.trim(),
                phone: phone.content.trim(),
                password: password.content.trim()
            });
            setIsloading(false);
            if (+data.code === -1) {
                toast.error('The email is already exist!');
                setEmail({ ...email, err: 3 })
                return;
            }
            else if (+data.code === 1) {
                toast.success('Registration successful');
                navigate(path.login);
                return;

            } else if (+data.code === -2) {
                toast.error('The phone number is already exist!');
                setPhone({ ...phone, err: 3 })
                return;
            }
            toast.error('There are some issues from the server')
            console.log('>>>>>>>>register');
            console.log(data);
        }
        catch (e) {
            toast.error('Can\'t connect to server')
            setIsloading(false);
            console.log(e);
        }
    }

    return (
        <div className={style.container}>
            <img src={logo_title} alt="logo" />
            <div className={`${style.register} ${isEnd ? style.end : ''}`}>
                <div className={style.title}>Register</div>
                <form >
                    <InputText
                        c_placeholder='Email'
                        c_icon={Icon_email}
                        state={email}
                        setState={setEmail}
                        message_err='The email is invalid' />
                    <InputText
                        c_placeholder='User name'
                        c_icon={Icon_user}
                        state={username}
                        setState={setUsername}
                        message_err='' />
                    <InputText
                        c_placeholder='Phone'
                        c_icon={Icon_phone}
                        state={phone}
                        setState={setPhone}
                        message_err='Phone must between 10 and 11 number' />
                    <InputPassword
                        c_placeholder='Password'
                        state={password}
                        setState={setPassword}
                        isShow={isShow}
                        message_err='Password must have more 5 letter' />
                    <InputPassword
                        c_placeholder='Password Confirm'
                        state={passwordConfirm}
                        setState={setPasswordConfirm}
                        isShow={isShow}
                        message_err='ConfirmPassword must have more 5 letter' />
                    <div className={style.checkbox}>
                        <input type="checkbox" id="showpassword" defaultChecked={isShow} onChange={() => setIsShow(!isShow)} />
                        <label htmlFor="showpassword">{isShow ? "Hide password" : "Show password"}</label>
                    </div>
                    <div className={style.text}>Aldready have account? <span onClick={handleGoToLogin}>Login now!</span></div>
                    <button type='button' onClick={handleRegister} >{isloading ? <LoadingSmall /> : 'Register'}</button>
                </form>
            </div>
        </div>
    )
}
