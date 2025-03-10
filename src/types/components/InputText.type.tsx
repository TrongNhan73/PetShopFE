import React, { SetStateAction } from "react"
interface c_stateInput {
    content: string,
    err: number
}
export interface InputText {
    c_placeholder: string,
    c_icon?: React.FC,
    state: c_stateInput,
    setState: React.Dispatch<SetStateAction<c_stateInput>>,
    message_err: string
}