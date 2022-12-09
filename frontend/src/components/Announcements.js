import * as React from "react";
import { Typography, Stack, Grid } from "@mui/material";
import AnnouncementTable from "./table/AnnouncementTable";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const Announcements = ({ announcements }) => {
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
          <AnnouncementTable announcements={announcements} />
        </Grid>
      </Grid>
    </Stack>
  );
};

const mapStateToProps = state => {
  const announcements = state.announcements.announcements;
  return {
    announcements,
  };
};

Announcements.propTypes = {
  announcements: PropTypes.array,
};

Announcements.defaultProps = {
  announcements: [],
};

export default connect(mapStateToProps, {})(Announcements);
