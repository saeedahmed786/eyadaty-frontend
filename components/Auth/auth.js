import { Cookies } from "react-cookie";

export const isAuthenticated = () => {
    const cookie = new Cookies;
    const user = cookie.get("user");
    const token = cookie.get("token");

    if (user) {
        user.token = token

        return user;
    } else {
        return false;
    }
}


export const logout = () => {
    const cookie = new Cookies;
    cookie.remove("user");
    cookie.remove("token");

}