import { Link, Stack } from "@mui/material"
import Image from '../../images/layout/captura.png'
import Imag3 from '../../images/layout/captura.png'
export const LogoMainLayout = ({ image, text, black, top }) => {
    return (
        <Stack sx={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            flexDirection: 'row',
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

                    }}
                    src={(black ? Imag3 : Image) || image}
                    alt="imagem da logo da junta mais!" />
            </Link>

        </Stack>
    )
}