import React, { SetStateAction } from "react"
export interface InputText {
    c_placeholder: string,
    c_icon?: React.FC,
    state: string,
    setState: React.Dispatch<SetStateAction<string>>
}