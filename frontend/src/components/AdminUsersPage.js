import { Grid, Stack, Typography } from '@mui/material';
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import AdminUsersTable from './table/AdminUsersTable';

const AdminUsersPage = ({ allUsers }) => {
    return (
        <Stack spacing={2}>
            <Typography gutterBottom variant="h1" textAlign={ "center" } component="div">
                All Users
            </Typography>
            <Grid container justifyContent={'center'}>
                <Grid item xs={12}>
                    <AdminUsersTable allUsers={allUsers} />
                </Grid>
            </Grid>
        </Stack>
    );
};

const mapStateToProps = state => {
    const allUsers = state.allUsers.allUsers;
    return {
        allUsers,
    };
};

AdminUsersPage.propTypes = {
    allUsers: PropTypes.array,
};
  
AdminUsersPage.defaultProps = {
    allUsers: [],
};


export default connect(mapStateToProps, {})(AdminUsersPage);