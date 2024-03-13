import { useContext, react } from "react"
import { AuthContext } from "../auth_context"
import { Route, Routes } from "react-router-dom"
import { Login } from "../auth/Login"
import { MainLayout } from "../layout"
import { Stock } from "../pages/Stock"
import { ExitsItems } from "../pages/ExitsItems"

export const MainRoutes = () => {
    const auth = useContext(AuthContext)
    if (auth?.isLoggedIn) {
        return (
            <MainLayout childrens={
                <>
                    <Routes>
                        <Route path="/" element={<Stock />} />
                        <Route path="/exits" element={<ExitsItems />} />
                    </Routes>
                </>
            } />
        )
    }
    return (
        <Routes>
            <Route path="/" element={<Login />} />
        </Routes>
    )
}