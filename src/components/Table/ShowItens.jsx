import { useEffect, useRef } from "react";
import { TableContainer } from "@mui/material"
import { Root } from "../../styles/Root/root_styles";

export const ContainerTableStock = ({ children }) => {
    const tableRef = useRef(null);
    return (
        <TableContainer
            ref={tableRef}
            sx={{
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
            {children}
        </TableContainer>
    )
}