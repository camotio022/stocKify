import { ErrorOutline, PriorityHigh } from "@mui/icons-material";
import { Box, Button, Card, CardActions, CardContent, Typography, useMediaQuery } from "@mui/material"
import { Link } from "react-router-dom";
import { Root } from "../../styles/Root/root_styles";

// import { MyButton } from "../Global/Styles/styles";

export const NoTasksFromThisState = ({
    routeTasks
}) => {
    const jsx = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        color: Root.color_button
    }
    const mobile = useMediaQuery('(max-width:600px)');
    return (
        <Box sx={{
            width: mobile ? '90%' : '100%',
        }}>
            <Card variant="outlined" sx={{ border: 'none', }}>
                <CardContent sx={{ ...jsx, }}>
                    <PriorityHigh sx={{ border: `2px solid`, borderRadius: '50%', padding: 0.2 }} fontSize="large" />
                </CardContent>
                <CardContent sx={jsx} >
                    <Typography fontWeight={600} variant="h5" component="div">
                        Nenhum documento encontrado nas {routeTasks}
                    </Typography>
                    <Typography sx={{
                        ...jsx,
                        color: Root.color_button,
                        fontWeight: 500
                    }} color="text.secondary">
                        Ainda não há dados para exibir nos resultados!!
                    </Typography>
                </CardContent>
            </Card>
        </Box>
    )
}