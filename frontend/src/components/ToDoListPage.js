import { Grid, Stack, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ToDoListTable from './table/ToDoListTable';
import { getCourseApprovalRequestsRequest, getPreApprovalFormsRequest, getFileRequestsRequest } from '../actions';

const ToDoListPage = ({ userId, typeForReq, getFileRequestsRequest, getCourseApprovalRequestsRequest, getPreApprovalFormsRequest, requests}) => {
    useEffect(() => {
        if ( typeForReq === 'departmentCoordinator') {
            getPreApprovalFormsRequest(userId, typeForReq);
            getCourseApprovalRequestsRequest(userId, typeForReq);
        } else if (typeForReq === 'courseCoordinator') {
            getCourseApprovalRequestsRequest(userId, typeForReq);
        } else {
            getFileRequestsRequest(userId, typeForReq);
        }
    }, [getFileRequestsRequest, getCourseApprovalRequestsRequest, getPreApprovalFormsRequest, typeForReq, userId]);

    let toDoLists = [];
    if ( typeForReq === 'departmentCoordinator') {
        toDoLists = [
            {
                id: 1,
                toDo: `You have ${requests.preApprovalForms.filter(form => form.status === "WAITING").length} waiting Pre-Approval Form requests.`,
              },
              {
                id: 2,
                toDo:  `You have ${requests.courseRequests.filter(form => form.status === "WAITING").length} waiting Elective Course Approval requests.`,
              },
        ];
    } else if (typeForReq === 'courseCoordinator') {
        toDoLists = [
              {
                id: 1,
                toDo:  `You have ${requests.courseRequests.filter(form => form.status === "WAITING").length} waiting Mandatory Course Approval requests.`,
              },
        ];
    } else {
        toDoLists = [
            {
              id: 1,
              toDo:  `You have ${requests.fileRequests.filter(form => form.status === "WAITING").length} waiting Document Upload requests.`,
            },
        ];
    }
    
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
    const requests = state.requests;
    const typeForReq = state.auth.authTypeForReq;
    const userId = state.auth.userId;
    return {
        toDoLists,
        typeForReq,
        userId,
        requests,
    };
};

const mapActionsToProps = {
    getFileRequestsRequest, 
    getCourseApprovalRequestsRequest, 
    getPreApprovalFormsRequest,
};

ToDoListPage.propTypes = {
    toDoLists: PropTypes.array,
    typeForReq: PropTypes.string,
    userId: PropTypes.string,
    getFileRequestsRequest: PropTypes.func, 
    getCourseApprovalRequestsRequest: PropTypes.func, 
    getPreApprovalFormsRequest: PropTypes.func,
    requests: PropTypes.object,
};
  
ToDoListPage.defaultProps = {
    toDoLists: [],
};

export default connect(mapStateToProps, mapActionsToProps)(ToDoListPage);