import { Link, Stack } from "@mui/material"
import Image from '../../images/layout/junta2.png'
export const LogoMainLayout = ({ image, text }) => {
    return (
        <Stack sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            marginTop: '12px',
            width: '80%',
            height: '10%',

        }}>
            <Link sx={{
                width: '100%',
                height: '90px'
            }} href={'/'}>
                <img
                    style={{
                        width: '100%',
                        height: '100%'
                    }}
                    src={Image || image}
                    alt="imagem da logo da junta mais!" />
            </Link>
            
        </Stack>
    )
}