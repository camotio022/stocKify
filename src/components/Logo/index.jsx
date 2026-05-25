import { Link, Stack, Typography } from "@mui/material"
import Image from '../../images/layout/captura.png'
import Imag3 from '../../images/layout/captura.png'
import FetureImgLogo from '../../images/layout/feture.png'
import FetureImgLogo1 from '../../images/layout/feture.png'
import { useContext } from "react"
import { Root } from "../../styles/Root/root_styles"
export const LogoMainLayout = ({ image, text, black, top }) => {

    return (
        <Stack sx={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'center',
            flexDirection: 'column',
            paddingLeft: '8px',
            marginTop: top ? '0px' : '20px',
            width: '100%',
            maxWidth: '180px',
            height: 'auto',
            borderLeft: '3px solid transparent', // 1. Define o tamanho e deixa a borda padrão transparente
            borderImage: `linear-gradient(90deg, ${Root.cyan}, ${Root.color_button_secondary}) 1`,
        }}>
            <Link sx={{
                width: '90%',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                '&:hover': {
                    transform: 'scale(1.05)',
                }
            }} href={'/'}>
                <img
                    style={{
                        width: '100%',
                        height: 'auto',
                        marginLeft: -20,
                        background: `linear-gradient(90deg, ${Root.cyan}, ${Root.color_button_secondary})`,
                        WebkitMaskImage: `url(${(black ? Imag3 : FetureImgLogo) || image})`,
                        maskImage: `url(${(black ? Imag3 : FetureImgLogo) || image})`,
                        WebkitMaskSize: 'contain',
                        maskSize: 'contain',
                        WebkitMaskRepeat: 'no-repeat',
                        maskRepeat: 'no-repeat',
                    }}
                    src={(black ? Imag3 : FetureImgLogo1) || image}
                    alt="imagem da logo da junta mais!" />
            </Link>
            <Typography sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                textTransform: 'uppercase',
                fontWeight: 800,
                fontFamily: Root.fontFamilySansSerif,
                background: `linear-gradient(90deg, ${Root.cyan}, ${Root.color_button_secondary})`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                filter: `drop-shadow(0px 0px 5px rgba(147, 45, 210, 0.3))`,
            }}>
                {text}
            </Typography>
        </Stack>
    )
}