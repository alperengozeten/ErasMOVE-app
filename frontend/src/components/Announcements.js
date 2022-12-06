import * as React from "react";
import { Typography, Stack } from "@mui/material";
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
      <AnnouncementTable announcements={announcements} />
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
