import * as React from "react";
import { Typography, Stack, Grid } from "@mui/material";
import AnnouncementTable from "./table/AnnouncementTable";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getAnnouncementRequest, createAnnouncementRequest } from "../actions/announcementActions";

const Announcements = ({ announcements, getAnnouncementRequest, createAnnouncementRequest, authType, userId }) => {
  React.useEffect(() => {
    getAnnouncementRequest();
  }, []);

  return (
    <Stack spacing={2}>
      <Typography
        gutterBottom
        variant="h1"
        textAlign={"center"}
        component="div"
      >
        Announcements
      </Typography>
      <Grid container justifyContent={'center'}>
        <Grid item xs={12}>
          <AnnouncementTable authType={authType} userId={userId} createAnnouncementRequest={createAnnouncementRequest} announcements={announcements} />
        </Grid>
      </Grid>
    </Stack>
  );
};

const mapStateToProps = state => {
  const announcements = state.announcements.announcements;
  const authType = state.auth.authType;
  const userId = state.auth.userId;
  return {
    announcements,
    authType,
    userId,
  };
};

const mapActionsToProps = {
  getAnnouncementRequest,
  createAnnouncementRequest,
};

Announcements.propTypes = {
  announcements: PropTypes.array,
  getAnnouncementRequest: PropTypes.func,
  createAnnouncementRequest: PropTypes.func,
  authType: PropTypes.string,
  userId: PropTypes.string,
};

Announcements.defaultProps = {
  announcements: [],
};

export default connect(mapStateToProps, mapActionsToProps)(Announcements);
