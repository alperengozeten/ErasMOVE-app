// material-ui
import React from "react";
import { useTheme, styled } from "@mui/material/styles";
import {
  Avatar,
  Chip,
  Divider,
  Grid,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  Typography,
} from "@mui/material";
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

// ==============================|| NOTIFICATION LIST ITEM ||============================== //

const NotificationCard = ({ notificationInfo }) => {
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
    <ListItemWrapper>
      <ListItem alignItems="center">
        <ListItemAvatar>
          <Avatar alt="John Doe" />
        </ListItemAvatar>
        <ListItemText primary={notificationInfo.from} />
        <ListItemSecondaryAction>
          <Grid container justifyContent="flex-end">
            <Grid item xs={12}>
              <Typography variant="caption" display="block" gutterBottom>
                {notificationInfo.date}
              </Typography>
            </Grid>
          </Grid>
        </ListItemSecondaryAction>
      </ListItem>
      <Grid container direction="column" className="list-container">
        <Grid item xs={12} sx={{ pb: 2 }}>
          <Typography variant="subtitle2">
            {notificationInfo.notification}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Grid container>
            <Grid item>
              {notificationInfo.isUnread ? (
                <Chip label="Unread" sx={chipWarningSX} />
              ) : (
                { undefined }
              )}
            </Grid>
            <Grid item>
              {notificationInfo.isNew ? (
                <Chip label="New" sx={chipSuccessSX} />
              ) : (
                { undefined }
              )}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Divider/>
    </ListItemWrapper>
  );
};

NotificationCard.propTypes = {
  notificationInfo: PropTypes.object,
};

NotificationCard.defaultProps = {
  notificationInfo: {},
};

export default NotificationCard;
