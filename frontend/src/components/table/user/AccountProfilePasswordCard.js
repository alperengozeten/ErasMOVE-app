import * as React from "react";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
} from "@mui/material";
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

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

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => {
      setShowPassword(!showPassword);
  };

  return (
    <form autoComplete="off" noValidate {...props}>
      <Card>
        <CardHeader
          subheader="You can change your password from here."
          title="Account Management"
        />
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
              <InputLabel htmlFor="outlined-adornment-password">
                Password
              </InputLabel>
              <OutlinedInput
                fullWidth
                disabled
                id="outlined-adornment-password"
                type={showPassword ? "text" : "password"}
                value={values.password}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
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
            <Grid
              item
              md={12}
              xs={12}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <Button disabled={false} variant="outlined">Change Password</Button>
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
      </Card>
    </form>
  );
};
