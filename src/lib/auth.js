const STORAGE_KEY = "consultoriaPharmaSession";

export function setSession(session) {
  if (!session) {
    localStorage.removeItem(STORAGE_KEY);
    return;
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
}

export function getSession() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY));
  } catch (error) {
    return null;
  }
}

export function getToken() {
  return getSession()?.token || null;
}

export function getUser() {
  return getSession();
}

export function isAuthenticated() {
  return Boolean(getToken());
}

export function logout() {
  localStorage.removeItem(STORAGE_KEY);
}
