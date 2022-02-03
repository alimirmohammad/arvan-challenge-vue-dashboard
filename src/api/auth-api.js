import { API_ROUTES } from "../constants/api-routes";
import client from "../utils/client";

export async function authenticate({ isRegister, email, password, username }) {
  const url = isRegister ? API_ROUTES.REGISTER_ROUTE : API_ROUTES.LOGIN_ROUTE;
  const payload = isRegister
    ? { user: { email, password, username } }
    : { user: { email, password } };
  const res = await client(url, { method: "POST", data: payload });
  return { token: res.data.user.token, username: res.data.user.username };
}

export async function getCurrentUser() {
  const res = await client(API_ROUTES.CURRENT_USER_ROUTE);
  return res.data.user.username;
}
