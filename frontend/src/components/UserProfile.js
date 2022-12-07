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
      <Box sx={{ width: "80%", height: "95%" }} justifyContent={"center"} alignItems={"center"}>
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
            <TabPanel value={value} index={1}>
              <Box sx={{ flexGrow: 1 }}>
                <Grid
                  container
                  direction={"row"}
                  sx={{ width: "100%", height: "100%" }}
                >
                  <Grid container direction={"column"} xs={4} spacing={5}>
                    <Grid item>
                      <Typography variant="h4" mt={3}>
                        E-Mail:
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography variant="h4">Password:</Typography>
                    </Grid>
                  </Grid>
                  <Grid container direction={"column"} xs={4} spacing={3}>
                    <Grid item>
                      <TextField
                        fullWidth
                        disabled
                        defaultValue="igdirli_serseri@hotmail.com"
                        size="small"
                        InputProps={{
                          readOnly: true,
                        }}
                        variant="filled"
                      />
                    </Grid>
                    <Grid item>
                      <TextField
                        fullWidth
                        type="password"
                        defaultValue="password"
                        size="small"
                        InputProps={{
                          readOnly: true,
                        }}
                        variant="filled"
                      />
                    </Grid>
                    <Grid item>
                      <TextField
                        fullWidth
                        size="small"
                        label="New password"
                        variant="filled"
                      />
                    </Grid>
                    <Grid item>
                      <TextField
                        fullWidth
                        size="small"
                        label="Retype new password"
                        variant="filled"
                      />
                    </Grid>
                    <Grid item>
                      <Button variant="outlined">Change Password</Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Box>
            </TabPanel>
          </SwipeableViews>
        </TabContext>
      </Box>
    </Grid>
  );
}
