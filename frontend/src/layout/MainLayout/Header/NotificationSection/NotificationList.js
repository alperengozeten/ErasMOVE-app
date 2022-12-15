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
  Button,
  Divider,
} from "@mui/material";

import { connect } from "react-redux";
import PropTypes from "prop-types";
import { IconBell } from '@tabler/icons';

// styles
const ListItemWrapper = styled("div")(({ theme }) => ({
  cursor: "pointer",
  padding: 16,
  "&:hover": {
    background: theme.palette.secondary.light,
  },
  "& .MuiListItem-root": {
    padding: 0,
  },
}));

const NotificationList = ({ notifications }) => {
  // console.log(notifications);
  const theme = useTheme();
  const noNotif = notifications.length == 0;

  const chipSX = {
    height: 36,
    padding: "0 4px",
  };

  const chipWarningSX = {
    ...chipSX,
    color: theme.palette.warning.dark,
    backgroundColor: theme.palette.warning.light,
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
      {noNotif ? (
        <ListItemWrapper>
          <ListItem alignItems="center">
            <ListItemText primary={"There are no notifications..."} />
          </ListItem>
        </ListItemWrapper>
      ) : null}

      {notifications.map(row => {
        const { id, date, read, content } = row;

        return (
          <>
            <ListItemWrapper key={id}>
              <ListItem alignItems="center">
                <ListItemAvatar>
                  <IconBell stroke={1.5} size="1.3rem" />
                </ListItemAvatar>
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
              <Grid container direction="column" className="list-container" spacing={2} paddingTop={2}>
                <Grid item xs={12} sx={{ pb: 2 }}>
                  <Typography variant="subtitle1">{content}</Typography>
                </Grid>
                <Grid item xs={12} flexDirection={'column'}>
                  <Grid container spacing={2}>
                    <Grid item alignContent={"center"}>
                      {!read ? <Chip label="Unread" sx={chipWarningSX} /> : null}
                    </Grid>
                    <Grid item alignContent={"center"}>
                      {!read ? <Button variant={"outlined"} color="info">Mark as read</Button> : null}
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </ListItemWrapper>
            <Divider/>
          </>
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
