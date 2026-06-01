import { useEffect, useRef } from "react";
import { TableContainer } from "@mui/material";
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
                overflowY: 'auto',
                overflowX: 'hidden',
                scrollbarGutter: 'stable',
                ...Root.scrollBar,
            }} 
        >
            {children}
        </TableContainer>
    );
};