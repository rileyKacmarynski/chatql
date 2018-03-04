import { AUTH_TOKEN } from "../constants";

export const isAuthenticated = () => localStorage.getItem(AUTH_TOKEN)