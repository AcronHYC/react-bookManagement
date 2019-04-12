export function isAuthenticated(key) {
  return sessionStorage.getItem(key);
}

export function setSessionStorage(key, value) {
  return sessionStorage.setItem(key, value);
}

export function logout() {
  return sessionStorage.clear();
}
