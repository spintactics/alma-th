export function isAuthenticated(): boolean {
  return !!localStorage.getItem("authToken");
}

export function login(username: string, password: string): boolean {
  if (username === "admin" && password === "password") {
    localStorage.setItem("authToken", "12345");
    return true;
  }
  return false;
}

export function logout(): void {
  localStorage.removeItem("authToken");
}
