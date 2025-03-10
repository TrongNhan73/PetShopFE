import React, { SetStateAction } from "react";
interface c_stateInput {
    content: string,
    err: number
}
export interface InputPassword {
    state: c_stateInput,
    setState: React.Dispatch<SetStateAction<c_stateInput>>,
    isShow: boolean,
    c_placeholder: string,
    message_err: string
}