export function logOut() {
    localStorage.removeItem("id")
    localStorage.removeItem("token")
    localStorage.removeItem("user_name")
}