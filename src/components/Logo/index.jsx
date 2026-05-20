import { Link, Stack, Typography } from "@mui/material"
import Image from '../../images/layout/captura.png'
import Imag3 from '../../images/layout/captura.png'
import { useContext } from "react"
import { Root } from "../../styles/Root/root_styles"
export const LogoMainLayout = ({ image, text, black, top }) => {

    return (
        <Stack sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            marginTop: top ? '0px' : '12px',
            width: '100%',
            maxWidth: '180px',
            height: 'auto',
        }}>
            <Link sx={{
                width: '90%',
                height: 'auto',
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
                        background: `linear-gradient(90deg, ${Root.cyan}, ${Root.color_button_secondary})`,
                        // Usa a própria imagem como máscara para revelar o degradê de fundo
                        WebkitMaskImage: `url(${(black ? Imag3 : Image) || image})`,
                        maskImage: `url(${(black ? Imag3 : Image) || image})`,
                        WebkitMaskSize: 'contain',
                        maskSize: 'contain',
                        WebkitMaskRepeat: 'no-repeat',
                        maskRepeat: 'no-repeat',
                    }}
                    src={(black ? Imag3 : Image) || image}
                    alt="imagem da logo da junta mais!" />
            </Link>
            <Typography sx={{
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