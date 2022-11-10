import { React, useState } from 'react';
import PropTypes from 'prop-types';
// import { useSelector } from 'react-redux';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
    Box,
    Button,
    Checkbox,
    FormControl,
    FormControlLabel,
    FormHelperText,
    Grid,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    Stack,
    Typography,
    // useMediaQuery,
} from '@mui/material';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project imports
import useScriptRef from '../../hooks/useScriptRef';
import AnimateButton from '../ui-component/extended/AnimateButton';

// assets
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useNavigate } from 'react-router-dom';

//   return (
//     <div className="login">
//       <div>ErasMOVE</div>
//         <input id="email" className='inp' placeholder='email' value={ email } onChange={ e => setEmail(e.target.value) }></input>
//         <input type={ "password" } id="password" className='inp' placeholder='password' value={ password } onChange={ e => setPassword(e.target.value) }></input>
//         <button className='login-btn' onClick={ () => logIn() }>Login</button> 
//         <p> Did you forgot your password? <Link to="/forgotPassword">Forgot Password</Link></p>
//     </div>
//   );
// };


const AuthLoginForm = ({ logInRequest }) => {
    const theme = useTheme();
    const scriptedRef = useScriptRef();

    const [checked, setChecked] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    
    const navigate = useNavigate();

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = event => {
        event.preventDefault();
    };

    const logIn = e => {
        e.preventDefault();
        const user = {
            email,
            password,
        };
        logInRequest(user, navigate);
    };

    return (
        <>
            <Grid container direction="column" justifyContent="center" spacing={ 2 }>
                <Grid item xs={ 12 } container alignItems="center" justifyContent="center">
                    <Box sx={ { mb: 2 } }>
                        <Typography variant="subtitle1">Sign in with Email address</Typography>
                    </Box>
                </Grid>
            </Grid>

            <Formik
                initialValues={ {
                    email: 'info@codedthemes.com',
                    password: '123456',
                    submit: null,
                } }
                validationSchema={ Yup.object().shape({
                    email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
                    password: Yup.string().max(255).required('Password is required'),
                }) }
                onSubmit={ async (values, { setErrors, setStatus, setSubmitting }) => {
                    try {
                        if (scriptedRef.current) {
                            setStatus({ success: true });
                            setSubmitting(false);
                        }
                    } catch (err) {
                        console.error(err);
                        if (scriptedRef.current) {
                            setStatus({ success: false });
                            setErrors({ submit: err.message });
                            setSubmitting(false);
                        }
                    }
                } }
            >
                {({ errors, handleBlur, isSubmitting, touched }) => (
                    <form noValidate onSubmit={ logIn }>
                        <FormControl fullWidth error={ Boolean(touched.email && errors.email) } sx={ { ...theme.typography.customInput } }>
                            <InputLabel htmlFor="outlined-adornment-email-login">Email Address / Username</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-email-login"
                                type="email"
                                value={ email }
                                name="email"
                                onBlur={ handleBlur }
                                onChange={ e => setEmail(e.target.value) }
                                label="Email Address / Username"
                                inputProps={ {} }
                            />
                            {touched.email && errors.email && (
                                <FormHelperText error id="standard-weight-helper-text-email-login">
                                    {errors.email}
                                </FormHelperText>
                            )}
                        </FormControl>

                        <FormControl
                            fullWidth
                            error={ Boolean(touched.password && errors.password) }
                            sx={ { ...theme.typography.customInput } }
                        >
                            <InputLabel htmlFor="outlined-adornment-password-login">Password</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password-login"
                                type={ showPassword ? 'text' : 'password' }
                                value={ password }
                                name="password"
                                onBlur={ handleBlur }
                                onChange={ e => setPassword(e.target.value) }
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={ handleClickShowPassword }
                                            onMouseDown={ handleMouseDownPassword }
                                            edge="end"
                                            size="large"
                                        >
                                            {showPassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label="Password"
                                inputProps={ {} }
                            />
                            {touched.password && errors.password && (
                                <FormHelperText error id="standard-weight-helper-text-password-login">
                                    {errors.password}
                                </FormHelperText>
                            )}
                        </FormControl>
                        <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={ 1 }>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={ checked }
                                        onChange={ event => setChecked(event.target.checked) }
                                        name="checked"
                                        color="primary"
                                    />
                                }
                                label="Remember me"
                            />
                            <Typography variant="subtitle1" color="secondary" sx={ { textDecoration: 'none', cursor: 'pointer' } }>
                                Forgot Password?
                            </Typography>
                        </Stack>
                        {errors.submit && (
                            <Box sx={ { mt: 3 } }>
                                <FormHelperText error>{errors.submit}</FormHelperText>
                            </Box>
                        )}

                        <Box sx={ { mt: 2 } }>
                            <AnimateButton>
                                <Button
                                    disableElevation
                                    disabled={ isSubmitting }
                                    fullWidth
                                    size="large"
                                    type="submit"
                                    variant="contained"
                                    color="secondary"
                                >
                                    Sign in
                                </Button>
                            </AnimateButton>
                        </Box>
                    </form>
                )}
            </Formik>
        </>
    );
};

AuthLoginForm.propTypes = {
  logInRequest: PropTypes.func.isRequired,
};

AuthLoginForm.defaultProps = {
  logInRequest: f => f,
};

export default AuthLoginForm;
