import * as React from "react";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
  Alert,
} from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import PropTypes from "prop-types";

export const AccountProfilePasswordCard = ({ user }) => {
  // const values = {
  //   password: "password hashed??",
  // };

  const [showPassword, setShowPassword] = React.useState(false);
  const [showNewPassword, setNewShowPassword] = React.useState(false);
  const [showAgainPassword, setAgainShowPassword] = React.useState(false);
  const [newPassword, setNewPassword] = React.useState("");
  const [oldPassword, setOldPassword] = React.useState("");
  const [againPassword, setAgainPassword] = React.useState("");
  const [errorText, setErrorText] = React.useState("");
  const [error, setError] = React.useState(false);

  const handleClickButton = () => {
    if(oldPassword === '' || newPassword === '' || againPassword === ''){
      setErrorText("Required places cannot be empty!");
      setError(true);
    }else if(oldPassword === newPassword){
      setErrorText("Your new password cannot be same with your old password!");
      setError(true);
    }else if(againPassword !== newPassword){
      setErrorText("Please retype the new password!");
      setError(true);
    }//else if(oldPassword yanlıssa){
    //   setErrorText("Password is wrong!");
    //   setError(true);
    // }
    else{
      setError(false);
    }
  };

  const handleNewPasswordChange = e => setNewPassword(e.target.value);

  const handleOldPasswordChange = e => setOldPassword(e.target.value);

  const handleAgainPasswordChange = e => setAgainPassword(e.target.value);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleClickShowNewPassword = () => {
    setNewShowPassword(!showNewPassword);
  };

  const handleClickShowAgainPassword = () => {
    setAgainShowPassword(!showAgainPassword);
  };

  return (
    <form autoComplete="off">
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
                value={user.email}
                variant="outlined"
              />
            </Grid>
            <Grid item md={12} xs={12}>
              <InputLabel htmlFor="outlined-adornment-password">
                Your Current Password*
              </InputLabel>
              <OutlinedInput
                fullWidth
                value={oldPassword}
                onChange={handleOldPasswordChange}
                id="outlined-adornment-password"
                type={showPassword ? "text" : "password"}
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
                label="Your Current Password*"
              />
            </Grid>
            <Grid item md={12} xs={12}>
              <InputLabel htmlFor="outlined-adornment-password">
                Your New Password*
              </InputLabel>
              <OutlinedInput
                fullWidth
                value={newPassword}
                onChange={handleNewPasswordChange}
                id="outlined-adornment-password"
                type={showNewPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowNewPassword}
                      edge="end"
                    >
                      {showNewPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
            </Grid>
            <Grid item md={12} xs={12}>
              <InputLabel htmlFor="outlined-adornment-password">
                Your New Password Again*
              </InputLabel>
              <OutlinedInput
                fullWidth
                value={againPassword}
                onChange={handleAgainPasswordChange}
                id="outlined-adornment-password"
                type={showAgainPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowAgainPassword}
                      edge="end"
                    >
                      {showAgainPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
            </Grid>
            <Grid
              item
              md={12}
              xs={12}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <Button onClick={handleClickButton} disabled={false} variant="outlined">
                Change Password
              </Button>
            </Grid>
            <Grid
              item
              md={12}
              xs={12}
              justifyContent={"center"}
              alignItems={"center"}
            >
              {error ? (
                <Alert severity="error">{errorText}</Alert>
              ) : null}
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
      </Card>
    </form>
  );
};

AccountProfilePasswordCard.propTypes = {
  user: PropTypes.object,
};
