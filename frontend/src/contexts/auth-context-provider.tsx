import {createContext, useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router";

const initialValue = {
    isLogged: false,
    setIsLogged: (value: boolean) => {
        console.log(value)
    }
}

export const AuthContext = createContext(initialValue)

interface Props {
    children: React.ReactNode
}

export function AuthContextProvider({children}: Props) {
    const [isLogged, setIsLogged] = useState<boolean>(false)
    const location = useLocation()
    const navigate = useNavigate()

    useEffect(() => {
        if (location.pathname === "/login" || location.pathname === "/register") {
            if (isLogged) {
                navigate("/")
            }
        } else {
            if (!isLogged) {
                navigate("/login")
            }
        }
    }, [location.pathname])

    useEffect(() => {
        const token = localStorage.getItem("token");
        const id = localStorage.getItem("id")
        const username = localStorage.getItem("username")

        if (!token || !id || !username) return;

        fetch("http://127.0.0.1:3000/user", {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        })
            .then(res => {
                if (res.ok) {
                    setIsLogged(true)
                } else {
                    setIsLogged(false)
                }
            })

    }, [])

    return (
        <AuthContext.Provider value={{isLogged, setIsLogged}}>
            {children}
        </AuthContext.Provider>
    )
}