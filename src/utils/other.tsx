import { sendApiLogOut } from "../api/authApi";
import { useAppDispatch } from "../hooks/reduxHook";
import { logOut } from "../store/userSlice";





const logout = async () => {
    const res = await sendApiLogOut();
    console.log(res);
    if (+res.code === 1) {

        return 1;
    }
    return 0;
}

export { logout }