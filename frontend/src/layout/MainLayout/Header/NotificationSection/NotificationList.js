// material-ui
import React from "react";
import { useTheme, styled } from "@mui/material/styles";
import {
  List,
  Grid,
  Typography,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  Chip,
  Avatar,
} from "@mui/material";

import { connect } from "react-redux";
import PropTypes from "prop-types";

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

const NotificationList = ({ notifications }) => {
  // console.log(notifications);
  const theme = useTheme();

  const chipSX = {
    height: 24,
    padding: "0 6px",
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
      {notifications.map(row => {
        const { id, from, date, isUnread, isNew, notification } = row;

        return (
          <ListItemWrapper key={id}>
            <ListItem alignItems="center">
              <ListItemAvatar>
                <Avatar alt="John Doe" />
              </ListItemAvatar>
              <ListItemText primary={from} />
              <ListItemSecondaryAction>
                <Grid container justifyContent="flex-end">
                  <Grid item xs={12}>
                    <Typography variant="caption" display="block" gutterBottom>
                      {date}
                    </Typography>
                  </Grid>
                </Grid>
              </ListItemSecondaryAction>
            </ListItem>
            <Grid container direction="column" className="list-container">
              <Grid item xs={12} sx={{ pb: 2 }}>
                <Typography variant="subtitle2">{notification}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Grid container spacing={2}>
                  <Grid item>
                    {isUnread ? (
                      <Chip label="Unread" sx={chipWarningSX} />
                    ) : (
                      null
                    )}
                  </Grid>
                  <Grid item>
                    {isNew ? (
                      <Chip label="New" sx={chipSuccessSX} />
                    ) : (
                      null
                    )}
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </ListItemWrapper>
        );
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
