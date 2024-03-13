import { Stack } from "@mui/material"
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
            <img
                style={{
                    width: '100%',
                    height: '90px'
                }}
                src={image}
                alt="imagem da logo da junta mais!" />

        </Stack>
    )
}