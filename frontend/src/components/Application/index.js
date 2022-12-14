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
import {
    getPreApprovalFormsRequest,
    getCourseApprovalRequestsRequest,
    deletePreApprovalFormRequest,
    deleteCourseApprovalRequestRequest,
    createCourseApprovalRequestRequest,
    createPreApprovalFormRequest,
    getCoursesByDepartment,
} from "../../actions";


const Application = ({
    deleteCourseApprovalRequestRequest,
    deletePreApprovalFormRequest,
    getCourseApprovalRequestsRequest, 
    getPreApprovalFormsRequest,
    courseRequests,
    preApprovalForms,
    hostCourses,
    approvedCourses,
    userId,
    createCourseApprovalRequestRequest,
    createPreApprovalFormRequest,
    getCoursesByDepartment,
    
}) => {
    const status = "WAITINGG";
  useEffect(() => {
    if (status !==  "WAITING") {
        getPreApprovalFormsRequest(userId);
        getCourseApprovalRequestsRequest(userId);
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
                    {status === "WAITING" ? (
                        <TabList onChange={handleChange}>
                            <Tab label="Application" value={"0"} />
                        </TabList>
                    ) : (
                        <TabList onChange={handleChange}>
                            <Tab label="Application" value={"0"} />
                            <Tab label="PreApproval Forms" value={"1"} />
                            <Tab label="Course Requests" value={"2"} />
                        </TabList>
                    )}
                </Box>
                    <TabPanel value="0" index={0}>
                        <Box sx={{ flexGrow: 1 }}>
                            <ProfileApplicationPage />
                        </Box>
                    </TabPanel>
                    <TabPanel value="1" index={1}>
                        <Box sx={{ flexGrow: 1 }}>
                            <PreApprovalForms
                                createPreApprovalFormRequest={createPreApprovalFormRequest}
                                deletePreApprovalFormRequest={deletePreApprovalFormRequest}
                                preApprovalForms={preApprovalForms}
                                hostCourses={hostCourses}
                                approvedCourses={approvedCourses}
                                getCoursesByDepartment={getCoursesByDepartment}
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
                            />
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
    const hostCourses = state.courses.hostCourses;
    const approvedCourses = state.courses.approvedCourses;
    const userId = state.user.user.id;
    return {
        courseRequests,
        preApprovalForms,
        hostCourses,
        approvedCourses,
        userId,
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
};

Application.propTypes = {
    courseRequests: PropTypes.array,
    preApprovalForms: PropTypes.array,
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

};
  
Application.defaultProps = {
    courseRequests: [],
    preApprovalForms: [],
};

export default connect(mapStateToProps, mapActionsToProps)(Application);

