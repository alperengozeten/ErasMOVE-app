import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import { Typography } from "@mui/material";
import Grid from "@mui/material/Grid";

export default function UserProfile() {
  const [value, setValue] = React.useState(0);
  const theme = useTheme();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = index => {
    setValue(index);  
  };

  return (
    <Box sx={{ width: "80%", height: "100%" }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleChange}>
            <Tab label="General" value={0} />
            <Tab label="Account" value={1} />
            <Tab label="E-Mail" value={2} />
          </TabList>
        </Box>
        <SwipeableViews
          index={value}
          onChangeIndex={handleChangeIndex}
        >
        <TabPanel value={value} index={0} >
          <Box sx={{ flexGrow: 1 }}>
            <Grid container rowSpacing={6} spacing={5}>
              <Grid item xs={4}>
                <Typography>Profile Picture</Typography>
              </Grid>
              <Grid item xs={8}>
                <Typography>AVATAR</Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography>Name</Typography>
              </Grid>
              <Grid item xs={8}>
                <Typography> Kütür Kütürşad</Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography>Surname</Typography>
              </Grid>
              <Grid item xs={8}>
                <Typography>Güzelkaya</Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography>E-Mail</Typography>
              </Grid>
              <Grid item xs={8}>
                <Typography>igdirli_serseri@hotmail.com</Typography>
              </Grid>
            </Grid>
          </Box>
        </TabPanel>
        <TabPanel value={value} index={1}>Account</TabPanel>
        <TabPanel value={value} index={2}>E-Mail</TabPanel>
        </SwipeableViews>
      </TabContext>
    </Box>
  );
}
