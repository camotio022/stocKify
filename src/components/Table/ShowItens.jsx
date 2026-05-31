import { TableContainer } from "@mui/material/node"

export const ContainerTable = ({ childs }) => {
    return (
        <TableContainer sx={{
            position: 'relative',
            width: '100%',
            height: '100%',
            overflow: 'scroll',
            backgroundColor: Root.containTask,
            borderRadius: '8px',
            boxShadow: `0 0 3px ${Root.color_button_secondary}`,
            overflowX: 'hidden', // Esconde a barra horizontal

            ...Root.scrollBar,
            color: Root.color_button,
        }} >
            {childs}
        </TableContainer>
    )
}