import * as React from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
} from "@mui/material";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

export const AccountProfilePasswordCard = props => {

  const [values, setValues] = React.useState({
    firstName: "Kütür Kütür Şad",
    lastName: "BeautifulRock",
    email: "igdirli76serserii@hotmail.com",
    password: "0123456789",
    phone: "05313113131",
    department: "Computer Science",
    cgpa: "3.31",
    languages: ["English", "German", "Iğdırish"],
  });

  return (
    <form autoComplete="off" noValidate {...props}>
      <Card>
        <CardHeader subheader="You can change your password from here." title="Account Management" />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={12} xs={12}>
              <TextField
                fullWidth
                disabled
                label="E-Mail"
                name="firstName"
                value={values.email}
                variant="outlined"
              />
            </Grid>
            <Grid item md={12} xs={12}>
              <TextField
                fullWidth
                disabled
                label="Password"
                name="lastName"
                value={values.password}
                variant="outlined"
              />
            </Grid>
            <Grid item md={12} xs={12}>
              <TextField
                fullWidth
                label="New Password"
                name="new password"
                variant="outlined"
              />
            </Grid>
            <Grid item md={12} xs={12}>
              <TextField
                fullWidth
                label="New Password Again"
                name="new password again"
                variant="outlined"
              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
      </Card>
    </form>
  );
};
