import React from 'react'
import type { InputText } from '../types'
import '../styles/components/_inputtext.scss'

export default function InputText(props: InputText) {

    return (
        <div className='container'>
            <input type="text" value={props.state} onChange={(e) => props.setState(e.target.value)} />
            <div className={props.state ? "placeholder" : "placeholder empty"}>{props.c_placeholder}</div>
            {props.c_icon && <props.c_icon />}
        </div>
    )
}
