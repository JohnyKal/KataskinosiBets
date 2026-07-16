let memoryToken: string | null = null;

export function setToken(token: string) {
  try {
    localStorage.setItem("token", token);
    return "localStorage";
  } catch {
    memoryToken = token;
    return "memory";
  }
}

export function getToken() {
  try {
    return localStorage.getItem("token") || memoryToken;
  } catch {
    return memoryToken;
  }
}

export function removeToken() {
  try {
    localStorage.removeItem("token");
  } catch {}

  memoryToken = null;
}