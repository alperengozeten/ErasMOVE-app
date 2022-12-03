import { Stack, Typography } from '@mui/material';
import React from 'react';
import UniversityTable from './universityTable';

const Universities = () => {
    return (
        <Stack spacing={2}>
            <Typography gutterBottom variant="h1" textAlign={ "center" } component="div">
                Universities
            </Typography>
            <UniversityTable />
        </Stack>
    );
};

export default Universities;