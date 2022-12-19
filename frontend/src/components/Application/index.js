import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { Typography, Stack } from "@mui/material";
import Grid from "@mui/material/Grid";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import CourseRequests from "./CourseRequests";
import PreApprovalForms from "./PreAprovalForms";
import ProfileApplicationPage from "../ProfileApplicationPage";
import { WaitingReplacementOffer } from "./WaitingReplacementOffer";
import {
    getPreApprovalFormsRequest,
    getCourseApprovalRequestsRequest,
    deletePreApprovalFormRequest,
    deleteCourseApprovalRequestRequest,
    createCourseApprovalRequestRequest,
    createPreApprovalFormRequest,
    getCoursesByDepartment,
    getDepartments,
    deleteFileRequestRequest,
    createFileRequestRequest,
    getFileRequestsRequest,
    getReplacementRequests,
} from "../../actions";
import FileRequestsForStudent from "./FileRequestForStudent";


const Application = ({
    deleteCourseApprovalRequestRequest,
    deletePreApprovalFormRequest,
    getCourseApprovalRequestsRequest, 
    getPreApprovalFormsRequest,
    courseRequests,
    preApprovalForms,
    replacementOffers,
    approvedCourses,
    userId,
    createCourseApprovalRequestRequest,
    createPreApprovalFormRequest,
    getCoursesByDepartment,
    application,
    getDepartments,
    hostUniDepartments,
    typeForReq,
    fileRequests,
    deleteFileRequestRequest,
    createFileRequestRequest,
    getFileRequestsRequest,
    getReplacementRequests,
}) => {

  useEffect(() => {
    if (application.admittedStatus !==  "NOT ADMITTED") {
        getPreApprovalFormsRequest(userId, typeForReq);
        getCourseApprovalRequestsRequest(userId, typeForReq);
        getFileRequestsRequest(userId, typeForReq);
        getDepartments();
    } else {
        getReplacementRequests(userId, typeForReq, application.outgoingStudent.isErasmus);
    }
  }, [getPreApprovalFormsRequest, getCourseApprovalRequestsRequest, userId]);

  const [value, setValue] = useState("0");

  const handleChange = (event, newValue) => {
    setValue(`${newValue}`);
  };
  return (
    <Stack spacing={2}>
        <Typography gutterBottom variant="h1" textAlign={ "center" } component="div">
            Application
        </Typography>
        <Grid
            container
            justifyContent="center"
            alignItems="center"
            sx={{ width: "100%", height: "100%" }}
        >
            <Box sx={{ width: "90%", height: "90%" }}>
                <TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                        {(application.admittedStatus ===  "NOT ADMITTED") ? (
                            <TabList onChange={handleChange}>
                                <Tab label="Application" value={"0"} />
                                <Tab label="Waiting Replacement Offer" value={"4"} />
                            </TabList>
                        ) : (
                            <TabList onChange={handleChange}>
                                <Tab label="Application" value={"0"} />
                                <Tab label="PreApproval Forms" value={"1"} />
                                <Tab label="Course Requests" value={"2"} />
                                <Tab label="File Requests" value={"3"} />
                            </TabList>
                        )}
                    </Box>
                    <TabPanel value="0" index={0}>
                        <Box sx={{ flexGrow: 1 }}>
                            <ProfileApplicationPage application={application} />
                        </Box>
                    </TabPanel>
                    <TabPanel value="1" index={1}>
                        <Box sx={{ flexGrow: 1 }}>
                            <PreApprovalForms
                                createPreApprovalFormRequest={createPreApprovalFormRequest}
                                deletePreApprovalFormRequest={deletePreApprovalFormRequest}
                                preApprovalForms={preApprovalForms}
                                hostDepartment={application.outgoingStudent.department}
                                approvedCourses={approvedCourses}
                                getCoursesByDepartment={getCoursesByDepartment}
                                userId={userId}
                                acceptedUniDepartment={application.acceptedDepartment}
                            />
                        </Box>
                    </TabPanel>
                    <TabPanel value="2" index={2}>
                        <Box sx={{ flexGrow: 1 }}>
                            <CourseRequests
                                createCourseApprovalRequestRequest={createCourseApprovalRequestRequest}
                                deleteCourseApprovalRequestRequest={deleteCourseApprovalRequestRequest}
                                courseRequests={courseRequests}
                                getCoursesByDepartment={getCoursesByDepartment}
                                hostUniDepartments={hostUniDepartments}
                                userId={userId}
                            />
                        </Box>
                    </TabPanel>
                    <TabPanel value="3" index={3}>
                        <Box sx={{ flexGrow: 1 }}>
                            <FileRequestsForStudent userId={userId} fileRequests={fileRequests} createFileRequestRequest={createFileRequestRequest} deleteFileRequestRequest={deleteFileRequestRequest} />
                        </Box>
                    </TabPanel>
                    <TabPanel value="4" index={3}>
                        <Box sx={{ flexGrow: 1 }}>
                            <WaitingReplacementOffer offer={replacementOffers}/>
                        </Box>
                    </TabPanel>
                </TabContext>
            </Box>  
        </Grid>
    </Stack>
    
  );
};

const mapStateToProps = state => {
    const courseRequests = state.requests.courseRequests;
    const preApprovalForms = state.requests.preApprovalForms;
    const replacementOffers = state.requests.replacementOffer;
    const hostCourses = state.courses.hostCourses;
    const approvedCourses = state.courses.approvedCourses;
    const userId = state.user.user.id;
    const application = state.user.application;
    const hostUniDepartments = state.universities.hostUniDepartments;
    const contractedUniDepartments = [...state.universities.erasmusDepartments, ...state.universities.exchangeDepartments];
    const typeForReq = state.auth.authTypeForReq;
    const fileRequests = state.requests.fileRequests;
    return {
        courseRequests,
        preApprovalForms,
        replacementOffers,
        hostCourses,
        approvedCourses,
        userId,
        application,
        hostUniDepartments,
        typeForReq,
        contractedUniDepartments,
        fileRequests,
    };
};

const mapActionsToProps = {
    getPreApprovalFormsRequest,
    getCourseApprovalRequestsRequest,
    deletePreApprovalFormRequest,
    deleteCourseApprovalRequestRequest,
    createCourseApprovalRequestRequest,
    createPreApprovalFormRequest,
    getCoursesByDepartment,
    getDepartments,
    deleteFileRequestRequest,
    createFileRequestRequest,
    getFileRequestsRequest,
    getReplacementRequests,
};

Application.propTypes = {
    courseRequests: PropTypes.array,
    preApprovalForms: PropTypes.array,
    replacementOffers: PropTypes.array,
    hostCourses: PropTypes.array,
    approvedCourses: PropTypes.array,
    getPreApprovalFormsRequest: PropTypes.func,
    getCourseApprovalRequestsRequest: PropTypes.func,
    deletePreApprovalFormRequest: PropTypes.func,
    deleteCourseApprovalRequestRequest: PropTypes.func,
    createCourseApprovalRequestRequest: PropTypes.func,
    createPreApprovalFormRequest: PropTypes.func,
    getCoursesByDepartment: PropTypes.func,
    userId: PropTypes.number,
    application: PropTypes.object,
    getDepartments: PropTypes.func,
    hostUniDepartments: PropTypes.array,
    typeForReq: PropTypes.string,
    contractedUniDepartments: PropTypes.array,
    fileRequests: PropTypes.array,
    deleteFileRequestRequest: PropTypes.func,
    createFileRequestRequest: PropTypes.func,
    getFileRequestsRequest: PropTypes.func,
    getReplacementRequests: PropTypes.func,
};
  
Application.defaultProps = {
    courseRequests: [],
    preApprovalForms: [],
    replacementOffers: []
};

export default connect(mapStateToProps, mapActionsToProps)(Application);

