// material-ui
import React from "react";
import { useTheme, styled } from "@mui/material/styles";
import {
  List,
} from "@mui/material";

import { connect } from "react-redux";
import PropTypes from "prop-types";
import NotificationCard from "../../../../components/table/notification/NotificationCard";


const NotificationList = ({ notifications }) => {
  const theme = useTheme();

  return (
    <List
      sx={{
        width: "100%",
        maxWidth: 350,
        py: 0,
        borderRadius: "10px",
        [theme.breakpoints.down("md")]: {
          maxWidth: 300,
        },
        "& .MuiListItemSecondaryAction-root": {
          top: 22,
        },
        "& .MuiDivider-root": {
          my: 0,
        },
        "& .list-container": {
          pl: 7,
        },
      }}
    >
      {notifications.map((row, index) => {
        const { from, date, isUnread, isNew, notification } = row;

        // return <NotificationCard key={index} notificationInfo={row} />;
      })}
    </List>
  );
};

const mapStateToProps = state => {
  const notifications = state.notifications.notifications;
  return {
    notifications,
  };
};

NotificationList.propTypes = {
  notifications: PropTypes.array,
};

NotificationList.defaultProps = {
  notifications: [],
};

export default connect(mapStateToProps, {})(NotificationList);
