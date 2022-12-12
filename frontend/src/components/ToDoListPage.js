import { Grid, Stack, Typography } from '@mui/material';
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ToDoListTable from './table/ToDoListTable';

const ToDoListPage = ({toDoLists}) => {
    return (
        <Stack spacing={2}>
            <Typography gutterBottom variant="h1" textAlign={ "center" } component="div">
                To Do List
            </Typography>
            <Grid container justifyContent={'center'}>
                <Grid item xs={12}>
                    <ToDoListTable toDoLists = {toDoLists} />
                </Grid>
            </Grid>
        </Stack>
    );
};
const mapStateToProps = state => {
    const toDoLists = state.toDoLists.toDoLists;
    return {
        toDoLists,
    };
};

ToDoListPage.propTypes = {
    toDoLists: PropTypes.array,
};
  
ToDoListPage.defaultProps = {
    toDoLists: [],
};

export default connect(mapStateToProps, {})(ToDoListPage);