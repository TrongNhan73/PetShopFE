import React, { useRef } from 'react'
import type { InputText } from '../types'
import style from '../styles/components/_inputtext.module.scss'

export default function InputText(props: InputText) {
    const title = useRef<HTMLInputElement>(null);
    return (
        <div className={style.container}>

            <input type="text" value={props.state.content} onChange={(e) => props.setState((previous) => { return { ...previous, content: e.target.value, err: 0 } })} ref={title} />
            <div className={props.state.content ? style.placeholder : `${style.placeholder} ${style.empty}`} onClick={() => title.current?.focus()}>{props.c_placeholder}</div>
            {props.c_icon && <props.c_icon />}
            <div className={`${style.err_message} ${props.state.err === 2 ? style.show : ''}`}>{props.message_err}</div>
            <div className={`${style.err_message} ${props.state.err === 1 ? style.show : ''}`}>{props.c_placeholder + ' is required'}</div>
        </div>
    )
}
