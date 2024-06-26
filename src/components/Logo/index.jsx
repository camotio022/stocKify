import { Link, Stack } from "@mui/material"
import Image from '../../images/layout/junta2.png'
import Imag3 from '../../images/layout/junta3.png'
export const LogoMainLayout = ({ image, text, black, top }) => {
    return (
        <Stack sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            marginTop: top ? '0px' : '12px',
            width: '12vw',
            height: '80px',

        }}>
            <Link sx={{
                width: '90px',
                height: '80px'
            }} href={'/'}>
                <img
                    style={{
                        width: '100%',
                        height: '100%'
                    }}
                    src={(black ? Imag3 : Image) || image}
                    alt="imagem da logo da junta mais!" />
            </Link>

        </Stack>
    )
}