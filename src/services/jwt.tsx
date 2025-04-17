import { jwtDecode } from "jwt-decode";

interface userinfo {
    email: string,
    user_name: string,
    role_id: string,
    address: string,
    phone: string,
    img_url: string,
    iat: number,
    exp: number
}
const decodeAcessToken = (token: string) => {
    return jwtDecode<userinfo>(token)
}
export default decodeAcessToken 