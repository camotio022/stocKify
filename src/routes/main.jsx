import { useContext, react } from "react"
import { AuthContext } from "../auth_context"
import { Route, Routes } from "react-router-dom"
import { Login } from "../auth/Login"

export const MainRoutes = () => {
    const auth = useContext(AuthContext)
    if (auth?.isLoggedIn) {
        return (
            <>
                opas
            </>
        )
    }
    return (
        <Routes>
            <Route path="/" element={<Login />} />
        </Routes>
    )
}