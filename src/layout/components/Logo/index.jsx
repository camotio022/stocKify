import { Stack } from "@mui/material"
import { Root } from "../../../styles/Root/root_styles"

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
            height: 'auto',

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