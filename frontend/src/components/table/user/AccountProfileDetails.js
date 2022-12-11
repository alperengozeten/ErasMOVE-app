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

export const AccountProfileDetails = props => {

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
        <CardHeader subheader="The information cannot be edited" title="Profile" />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                disabled
                label="First Name"
                name="firstName"
                value={values.firstName}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                disabled
                label="Last Name"
                name="lastName"
                value={values.lastName}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                disabled
                label="Email Address"
                name="email"
                value={values.email}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                disabled
                label="Phone Number"
                name="phone"
                type="number"
                value={values.phone}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                disabled
                label="Department"
                name="department"
                value={values.department}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                disabled
                label="CGPA"
                name="cgpa"
                value={values.cgpa}
                variant="outlined"
              />
            </Grid>
            <Grid item md={12} xs={12}>
              <FormControl disabled>
                <FormLabel id="demo-radio-buttons-group-label">
                  Languages Approved
                </FormLabel>
                <RadioGroup
                  name="radio-buttons-group"
                >
                  <FormControlLabel
                    value="english"
                    control={<Radio />}
                    label={values.languages[0]}
                  />
                  <FormControlLabel
                    value="german"
                    control={<Radio />}
                    label={values.languages[1]}
                  />
                  <FormControlLabel
                    value="ığdırish"
                    control={<Radio />}
                    label={values.languages[2]}
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
      </Card>
    </form>
  );
};
