import React, { SetStateAction } from "react";

export interface InputPassword {
    state: string,
    setState: React.Dispatch<SetStateAction<string>>,
    isShow: boolean,
    c_placeholder: string
}