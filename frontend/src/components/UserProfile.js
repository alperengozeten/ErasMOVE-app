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
import TextField from "@mui/material/TextField";

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
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      sx={{ width: "100%", height: "100%" }}
    >
      <Box sx={{ width: "80%", height: "80%" }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleChange}>
              <Tab label="General" value={0} />
              <Tab label="Account" value={1} />
            </TabList>
          </Box>
          <SwipeableViews index={value} onChangeIndex={handleChangeIndex}>
            <TabPanel value={value} index={0}>
              <Box sx={{ flexGrow: 1 }}>
                <Grid container direction={"row"}>
                  <Grid container direction={"column"} xs={4} spacing={5}>
                    <Grid item>
                      <Typography>Profile Picture</Typography>
                    </Grid>
                    <Grid item>
                      <Typography>Name</Typography>
                    </Grid>
                    <Grid item>
                      <Typography>Surname</Typography>
                    </Grid>
                    <Grid item>
                      <Typography>ID</Typography>
                    </Grid>
                    <Grid item>
                      <Typography>E-Mail</Typography>
                    </Grid>
                  </Grid>
                  <Grid container direction={"column"} xs={8} spacing={5}>
                    <Grid item>
                      <Typography>AVATAR</Typography>
                    </Grid>
                    <Grid item>
                      <Typography>Kütür Kütürşad</Typography>
                    </Grid>
                    <Grid item>
                      <Typography>Güzelkaya</Typography>
                    </Grid>
                    <Grid item>
                      <Typography>21901234</Typography>
                    </Grid>
                    <Grid item>
                      <Typography>igdirli_serseri@hotmail.com</Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Box>
            </TabPanel>
            <TabPanel value={value} index={1}>
              <Box sx={{ flexGrow: 1 }}>
                <Grid container direction={"row"}>
                  <Grid container direction={"column"} xs={4} spacing={5}>
                    <Grid item>
                      <Typography>E-Mail</Typography>
                    </Grid>
                    <Grid item>
                      <Typography>Password</Typography>
                    </Grid>
                    <Grid item>
                      <Typography></Typography>
                    </Grid>
                    <Grid item>
                      <Typography></Typography>
                    </Grid>
                    <Grid item>
                      <Typography></Typography>
                    </Grid>
                  </Grid>
                  <Grid container direction={"column"} xs={8} spacing={3}>
                    <Grid item>
                      <TextField
                        fullWidth
                        defaultValue="igdirli_serseri@hotmail.com"
                        InputProps={{
                          readOnly: true,
                        }}
                        variant="filled"
                      />
                    </Grid>
                    <Grid item>
                      <TextField
                        fullWidth
                        defaultValue="igdirli_serseri@hotmail.com"
                        InputProps={{
                          readOnly: true,
                        }}
                        variant="filled"
                      />
                    </Grid>
                    <Grid item>
                      <TextField
                        fullWidth
                        defaultValue="igdirli_serseri@hotmail.com"
                        InputProps={{
                          readOnly: true,
                        }}
                        variant="filled"
                      />
                    </Grid>
                    <Grid item>
                      <TextField
                        fullWidth
                        defaultValue="igdirli_serseri@hotmail.com"
                        InputProps={{
                          readOnly: true,
                        }}
                        variant="filled"
                      />
                    </Grid>  
                    <Grid item>
                      <TextField
                        fullWidth
                        defaultValue="igdirli_serseri@hotmail.com"
                        InputProps={{
                          readOnly: true,
                        }}
                        variant="filled"
                      />
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