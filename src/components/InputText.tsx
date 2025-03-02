import React from 'react'
import type { InputText } from '../types'
import '../styles/components/_inputtext.scss'

export default function InputText(props: InputText) {
    console.log(typeof (props.c_icon));
    return (
        <div className='container'>
            <input type="text" />
            <div className="placeholder">{props.c_placeholder}</div>
            {props.c_icon && <props.c_icon />}
        </div>
    )
}
