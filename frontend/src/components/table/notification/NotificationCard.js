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

const [notificationInfo, setNotificationInfo] = React.useState({
    notification: "Notification Notification Notification Notification Notification Notification...",
    from: "Bilmemne Bilmemne Hoca",
    isUnread: true,
    date: "12.12.2022",
    isNew: true,
  });

const NotificationCard = props => {
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
    <ListItemWrapper>
      <ListItem alignItems="center">
        <ListItemAvatar>
          <Avatar alt="John Doe" src={User1} />
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
              {notificationInfo.isUnread ? <Chip label="Unread" sx={chipWarningSX} /> : {undefined}}
            </Grid>
            <Grid item>
              {notificationInfo.isNew ? <Chip label="New" sx={chipSuccessSX} /> : {undefined}}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </ListItemWrapper>
  );
};

export default NotificationCard;
