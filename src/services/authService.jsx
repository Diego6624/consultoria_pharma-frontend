import api from "./apiClient2.jsx";
import { setSession, logout as clearSession, getSession } from "../lib/auth";

export async function login(credentials) {
  const res = await api.post("/api/auth/login", credentials);
  setSession(res);
  return res;
}

export function logout() {
  clearSession();
}

export function getUser() {
  return getSession();
}

export function isAuthenticated() {
  return Boolean(getSession()?.token);
}
