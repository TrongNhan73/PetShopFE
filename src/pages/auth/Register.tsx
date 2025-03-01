import React from 'react'
import Loading from '../../components/Loading'
import InputText from '../../components/InputText'
import { icon_email } from '../../assets/image'
export default function Register() {
    return (
        <div className='conainer'>
            <div className="register--form">
                <div className="title">Register</div>
                <form action="" className="form">
                    <InputText c_placeholder='Email' c_icon={icon_email} />
                </form>
            </div>
        </div>
    )
}
