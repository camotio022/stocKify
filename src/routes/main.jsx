import { useContext, react } from "react"
import { AuthContext } from "../auth_context"
import { Route, Routes } from "react-router-dom"
import { Login } from "../auth/Login"
import { MainLayout } from "../layout"
import { Stock } from "../pages/Stock"
import { ExitsItems } from "../pages/ExitsItems"
import { DetailsItems } from "../pages/details"
import { Entradas } from "../pages/Entradas"
import { ItemQrCode } from "../pages/Qr_Code"
import { Percepcoes } from "../pages/percepcoes"

export const MainRoutes = () => {
    const auth = useContext(AuthContext)
    if (auth?.isLoggedIn) {
        return (
            <MainLayout childrens={
                <>
                    <Routes>
                        <Route path="/" element={<Stock />} />
                        <Route path="/entradas" element={<Entradas />} />
                        <Route path="/exits" element={<ExitsItems />} />
                        <Route path="/details/:id" element={<DetailsItems />} />
                        <Route path="/detailsItem/:id" element={<ItemQrCode />} />
                        <Route path="/insights" element={<Percepcoes />} />
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