import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import SwipeableViews from "react-swipeable-views";
import { Typography, Button } from "@mui/material";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Skeleton from "@mui/material/Skeleton";
import Chip from "@mui/material/Chip";

export default function Announcements() {
  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      borderColor={"white"}
      sx={{ width: "100%", height: "100%" }}
    >
      <Typography
        gutterBottom
        variant="h2"
        textAlign={"center"}
        component="div"
      >
        Announcements
      </Typography>
      <Box
        sx={{ width: "95%", height: "90%" }}
        backgroundColor={"white"}
        borderRadius={4}
        borderColor={"black"}
      >
        <Grid
          container
          direction={"row"}
          justifyItems={"center"}
          alignItems={"center"}
          padding={4}
          margin={2}
          sx={{ width: "100%" }}
        >
          <Grid
            container
            justifyItems={"center"}
            alignItems={"center"}
            direction={"column"}
            xs={2}
          >
            <Chip label="07.12.2022" />
          </Grid>
          <Grid container direction={"column"} xs={10}>
            <Grid item mt={2}>
              <Chip label="You have uploaded the document for the student" />
            </Grid>
            <Grid item mt={2}>
              <Chip label="You have uploaded the document for the student" />
            </Grid>
            <Grid item mt={2}>
              <Chip label="You have uploaded the document for the student" />
            </Grid>
            <Grid item mt={2}>
              <Chip label="You have uploaded the document for the student" />
            </Grid>
            <Grid item mt={2}>
              <Chip label="You have uploaded the document for the student" />
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Grid>
  );
}
