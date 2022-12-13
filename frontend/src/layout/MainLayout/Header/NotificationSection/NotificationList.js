// material-ui
import React from "react";
import { useTheme, styled } from "@mui/material/styles";
import {
  Avatar,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";

import { connect } from "react-redux";
import PropTypes from "prop-types";
import NotificationCard from "../../../../components/table/notification/NotificationCard";

// assets
import {
  IconBrandTelegram,
  IconBuildingStore,
  IconMailbox,
  IconPhoto,
} from "@tabler/icons";
import User1 from "../../../../assets/images/users/user-round.svg";

// styles
const ListItemWrapper = styled("div")(({ theme }) => ({
  cursor: "pointer",
  padding: 16,
  "&:hover": {
    background: theme.palette.primary.light,
  },
  "& .MuiListItem-root": {
    padding: 0,
  },
}));

// ==============================|| NOTIFICATION LIST ITEM ||============================== //

const NotificationList = ({ notifications }) => {
  const theme = useTheme();

  const chipSX = {
    height: 24,
    padding: "0 6px",
  };
  const chipErrorSX = {
    ...chipSX,
    color: theme.palette.orange.dark,
    backgroundColor: theme.palette.orange.light,
    marginRight: "5px",
  };

  const chipWarningSX = {
    ...chipSX,
    color: theme.palette.warning.dark,
    backgroundColor: theme.palette.warning.light,
  };

  const chipSuccessSX = {
    ...chipSX,
    color: theme.palette.success.dark,
    backgroundColor: theme.palette.success.light,
    height: 28,
  };

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
