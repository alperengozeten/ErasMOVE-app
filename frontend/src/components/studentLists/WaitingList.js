import { Stack, Typography } from '@mui/material';
import React from 'react';
import UserTable from '../table';

const WaitingList = () => {
    return (
        <Stack spacing={2}>
            <Typography gutterBottom variant="h1" textAlign={ "center" } component="div">
                Waiting List
            </Typography>
            <UserTable />
        </Stack>
    );
};

export default WaitingList;