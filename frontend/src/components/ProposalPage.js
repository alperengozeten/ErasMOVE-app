import { Grid, Stack, Typography } from '@mui/material';
import React, {useEffect} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import axios from 'axios';

import ProposalTable from './table/ProposalTable';

const ProposalPage = user => {
   const[proposals,setProposals] = React.useState([]);
   const baseURL = 'http://localhost:8080';

   console.log("userrr"+JSON.stringify(user.user.id));

   function getProposals(id) {
     axios.get(`${baseURL}/incomingStudent/courseProposal/administrativeStaff/${id}`).then(response => response.data)
     .then(result => {
       setProposals(result);
     });}

     useEffect(() => {
 getProposals(user.user.id);
        
       }, []);
    return (
        <Stack spacing={2}>
            <Typography gutterBottom variant="h1" textAlign={ "center" } component="div">
                Course Proposals
            </Typography>
            <Grid container justifyContent={'center'}>
                <Grid item xs={12}>
                    <ProposalTable userId={user.user.id} getProposals={getProposals} proposals = {proposals}/>
                </Grid>
            </Grid>
        </Stack>
    );
};
const mapStateToProps = state => {
    const courseRequests = state.requests.courseRequests;
    const user = state.user.user;
    const typeForReq = state.auth.authTypeForReq;
    return {
        courseRequests,
        user,
        typeForReq,
    };
};


ProposalPage.propTypes = {
    courseRequests: PropTypes.array,
    user: PropTypes.object,
    getCourseApprovalRequestsRequest: PropTypes.func,
    deleteCourseApprovalRequestRequest: PropTypes.func,
    typeForReq: PropTypes.string,
};
  
ProposalPage.defaultProps = {
    courseRequests: [],
};

export default connect(mapStateToProps)(ProposalPage);