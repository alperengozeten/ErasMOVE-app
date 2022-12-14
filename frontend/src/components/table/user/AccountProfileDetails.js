import * as React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
} from "@mui/material";
import PropTypes from 'prop-types';


export const AccountProfileDetails = ({ user }) => {
  const values = {
    firstName: "Kütür Kütür Şad",
    lastName: "BeautifulRock",
    email: "igdirli76serserii@hotmail.com",
    password: "0123456789",
    phone: "05313113131",
    department: "Computer Science",
    cgpa: "3.31",
    languages: ["English", "German", "Iğdırish"],
  };

  return (
    <form autoComplete="off">
      <Card>
        <CardHeader
          subheader="The information cannot be edited"
          title="Profile"
        />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                disabled
                label="First Name"
                name="firstName"
                value={user.name}
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
                value={user.email}
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
                value={user.department.departmentName}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                disabled
                label="CGPA"
                name="cgpa"
                value={user.cgpa}
                variant="outlined"
              />
            </Grid>
            <Grid item md={12} xs={12}>
              <TextField
                select
                fullWidth
                label="Languages Approved"
                defaulValue="Languages Approved"
                SelectProps={{
                  native: true,
                }}
              >
                {values.languages.map((option, index) => (
                  <option key={index}>
                    {option}
                  </option>
                ))}
              </TextField>
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
      </Card>
    </form>
  );
};

AccountProfileDetails.propTypes = {
  user: PropTypes.object,
};
