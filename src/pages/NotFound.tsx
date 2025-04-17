import React from 'react'
import { Link } from 'react-router'
import path from '../const/path'

export default function NotFound() {
    return (
        <>
            <div>NotFound</div>

            <div>Go to <Link to={path.index}>home</Link> or <Link to={path.login}>Login</Link></div>
        </>
    )
}
