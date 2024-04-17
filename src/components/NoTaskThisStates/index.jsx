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
            width: mobile ? '90%' : 375,
        }}>
            <Card variant="outlined" sx={{border: 'none', }}>
                <CardContent sx={{...jsx, }}>
                    <PriorityHigh sx={{ border: `2px solid`, borderRadius: '50%', padding: 0.2}} fontSize="large" />
                </CardContent>
                <CardContent sx={jsx} >
                    <Typography fontWeight={600} variant="h5" component="div">
                        No {routeTasks} tasks
                    </Typography>
                    <Typography sx={{
                        ...jsx,
                        color: Root.color_button_opacity,
                        fontWeight: 500
                    }} color="text.secondary">
                        Still no data to show in the outputs!!
                    </Typography>
                </CardContent>
                {/* <Link to={'/createTask'}>
                    <CardActions sx={{mb:1}}>
                        <MyButton fullWidth={mobile} variant='contained' size="small">New Task</MyButton>
                    </CardActions>
                </Link> */}
            </Card>
        </Box>
    )
}