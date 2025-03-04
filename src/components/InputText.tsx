import React, { useRef } from 'react'
import type { InputText } from '../types'
import style from '../styles/components/_inputtext.module.scss'

export default function InputText(props: InputText) {
    const title = useRef<HTMLInputElement>(null);
    return (
        <div className={style.container}>

            <input type="text" value={props.state} onChange={(e) => props.setState(e.target.value)} ref={title} />
            <div className={props.state ? style.placeholder : `${style.placeholder} ${style.empty}`} onClick={() => title.current?.focus()}>{props.c_placeholder}</div>
            {props.c_icon && <props.c_icon />}
        </div>
    )
}
