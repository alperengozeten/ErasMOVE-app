import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import SwipeableViews from "react-swipeable-views";
import { Typography, Button, Container } from "@mui/material";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { AccountProfile } from "./table/user/AccountProfile";
import { AccountProfileDetails } from "./table/user/AccountProfileDetails";
import { AccountProfilePasswordCard } from "./table/user/AccountProfilePasswordCard";

export default function UserProfile() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = index => {
    setValue(index);
  };

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      sx={{ width: "100%", height: "100%" }}
    >
      <Box
        sx={{ width: "80%", height: "95%" }}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleChange}>
              <Tab label="General" value={0} />
              <Tab label="Account" value={1} />
            </TabList>
          </Box>
          <SwipeableViews index={value} onChangeIndex={handleChangeIndex}>
            <TabPanel value={value} index={0}>
              <Box
                component="main"
                sx={{
                  flexGrow: 1,
                  py: 3,
                }}
              >
                <Container maxWidth="lg">
                  <Grid container spacing={3}>
                    <Grid item lg={4} md={6} xs={12}>
                      <AccountProfile />
                    </Grid>
                    <Grid item lg={8} md={6} xs={12}>
                      <AccountProfileDetails />
                    </Grid>
                  </Grid>
                </Container>
              </Box>
            </TabPanel>
            <TabPanel value={value} index={0}>
              <Box
                component="main"
                sx={{
                  flexGrow: 1,
                  py: 3,
                }}
              >
                <Container maxWidth="lg">
                  <Grid container spacing={3}>
                    <Grid item lg={12} md={6} xs={12}>
                      <AccountProfilePasswordCard />
                    </Grid>
                  </Grid>
                </Container>
              </Box>
            </TabPanel>
          </SwipeableViews>
        </TabContext>
      </Box>
    </Grid>
  );
}
