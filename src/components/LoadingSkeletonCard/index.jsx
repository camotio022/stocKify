import * as React from 'react';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';

export const LoadingTable = () => {
    const sx = {
        borderRadius: '0px',
        height: '36px'
    }
    return (
        <Box sx={{ width: '100%' }}>
            <Skeleton sx={sx} />
            <Skeleton sx={sx} animation="wave" />
            <Skeleton sx={sx} animation={false} />
        </Box>
    );
}