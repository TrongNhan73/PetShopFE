import React, { useRef } from 'react'
import type { InputPassword } from '../types'
import { Icon_lock } from '../assets/svg'
import style from "../styles/components/_inputpassword.module.scss"
export default function InputPassword(props: InputPassword) {
    const title = useRef<HTMLInputElement>(null);

    return (
        <div className={style.container}>
            <input type={props.isShow ? "text" : "password"} value={props.state} onChange={(e) => props.setState(e.target.value)} ref={title} />
            <div onClick={() => title.current?.focus()} className={props.state ? style.placeholder : `${style.placeholder} ${style.empty}`}>{props.c_placeholder}</div>
            <Icon_lock />
        </div>
    )
}
