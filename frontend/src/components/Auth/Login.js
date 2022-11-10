import React from 'react';
import { func } from 'prop-types';
import { Link } from 'react-router-dom';


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

// const [password, setPassword] = useState('');
    // const [email, setEmail] = useState('');

    // const navigate = useNavigate();

    // const logIn = () => {
    //   const user = {
    //     email,
    //     password,
    //   };
    //   logInRequest(user, navigate);
    // };

// material-ui
import { useTheme } from '@mui/material/styles';
import { Divider, Grid, Stack, Typography, useMediaQuery } from '@mui/material';

// project imports
import AuthWrapper1 from './AuthWrapper1';
import AuthCardWrapper from './AuthCardWrapper';
import AuthLogin from './AuthLoginForm';
import AuthFooter from '../ui-component/cards/AuthFooter';

// assets

// ================================|| AUTH3 - LOGIN ||================================ //

const Login = () => {
    const theme = useTheme();
    const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));

    return (
        <AuthWrapper1>
            <Grid container direction="column" justifyContent="flex-end" sx={ { minHeight: '100vh' } }>
                <Grid item xs={ 12 }>
                    <Grid container justifyContent="center" alignItems="center" sx={ { minHeight: 'calc(100vh - 68px)' } }>
                        <Grid item sx={ { m: { xs: 1, sm: 3 }, mb: 0 } }>
                            <AuthCardWrapper>
                                <Grid container spacing={ 2 } alignItems="center" justifyContent="center">
                                    <Grid item sx={ { mb: 3 } }>
                                        <Link to="#">
                                          Logo
                                        </Link>
                                    </Grid>
                                    <Grid item xs={ 12 }>
                                        <Grid
                                            container
                                            direction={ matchDownSM ? 'column-reverse' : 'row' }
                                            alignItems="center"
                                            justifyContent="center"
                                        >
                                            <Grid item>
                                                <Stack alignItems="center" justifyContent="center" spacing={ 1 }>
                                                    <Typography
                                                        color={ theme.palette.secondary.main }
                                                        gutterBottom
                                                        variant={ matchDownSM ? 'h3' : 'h2' }
                                                    >
                                                        Hi, Welcome Back
                                                    </Typography>
                                                    <Typography
                                                        variant="caption"
                                                        fontSize="16px"
                                                        textAlign={ matchDownSM ? 'center' : 'inherit' }
                                                    >
                                                        Enter your credentials to continue
                                                    </Typography>
                                                </Stack>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={ 12 }>
                                        <AuthLogin />
                                    </Grid>
                                    <Grid item xs={ 12 }>
                                        <Divider />
                                    </Grid>
                                    <Grid item xs={ 12 }>
                                        <Grid item container direction="column" alignItems="center" xs={ 12 }>
                                            <Typography
                                                component={ Link }
                                                to="/pages/register/register3"
                                                variant="subtitle1"
                                                sx={ { textDecoration: 'none' } }
                                            >
                                                Don&apos;t have an account?
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </AuthCardWrapper>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={ 12 } sx={ { m: 3, mt: 1 } }>
                    <AuthFooter />
                </Grid>
            </Grid>
        </AuthWrapper1>
    );
};




Login.propTypes = {
  logInRequest: func.isRequired,
};


export default Login;