import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, StyledEngineProvider } from '@mui/material';

import Routes from './routes/mainRouter';
import themes from '../themes';
// import NavigationScroll from '../layout/NavigationScroll';

const App = () => {
    const customization = useSelector(state => state.customization);

    return (
        <StyledEngineProvider injectFirst>
            <ThemeProvider theme={ themes(customization) }>
              <CssBaseline />
              <Router>
                <Routes />
              </Router>
            </ThemeProvider>
        </StyledEngineProvider>
    );
};

export default App;
