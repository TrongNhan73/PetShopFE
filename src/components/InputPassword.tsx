import React, { useRef } from 'react'
import type { InputPassword } from '../types'
import { Icon_lock } from '../assets/svg'
import style from "../styles/components/_inputpassword.module.scss"
export default function InputPassword(props: InputPassword) {
    const title = useRef<HTMLInputElement>(null);

    return (
        <div className={style.container}>
            <input type={props.isShow ? "text" : "password"} value={props.state.content} onChange={(e) => props.setState((previous) => { return { ...previous, content: e.target.value, err: 0 } })} ref={title} />
            <div onClick={() => title.current?.focus()} className={props.state.content ? style.placeholder : `${style.placeholder} ${style.empty}`}>{props.c_placeholder}</div>
            <Icon_lock />
            <div className={`${style.err_message} ${props.state.err === 2 ? style.show : ''}`}>{props.message_err}</div>
            <div className={`${style.err_message} ${props.state.err === 3 ? style.show : ''}`}>Confirm Password is not match with Password</div>
            <div className={`${style.err_message} ${props.state.err === 1 ? style.show : ''}`}>{props.c_placeholder + ' is required'}</div>
        </div>
    )
}
