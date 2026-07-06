import { Stack, Typography } from "@mui/material"
import { useNavigate } from "react-router-dom" // 🟢 Usando o hook de navegação do React Router
import Image from '../../images/layout/captura.png'
import Imag3 from '../../images/layout/captura.png'
import FetureImgLogo from '../../images/layout/feture.png'
import FetureImgLogo1 from '../../images/layout/feture.png'
import { Root } from "../../styles/Root/root_styles"
import * as Tag from './index.js'
export const LogoMainLayout = ({ image, text, black, logged, tenant }) => {
    const navigate = useNavigate() // 🟢 Função para redirecionar o usuário

    return (
        <Tag.BrandContainer logged={logged} onClick={() => navigate('/')}>
            {/* Texto substituto da imagem, alinhado e com gradiente */}
            <Tag.LogoText variant="h6">
                Stockify
            </Tag.LogoText>

            {/* Nome da empresa ativa vindo dinamicamente do seu contexto */}
            <Tag.CompanyText variant="subtitle2">
                {text && text}
            </Tag.CompanyText>
        </Tag.BrandContainer>
    )
}