import React from 'react';
import { useSelector } from 'react-redux';

import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, StyledEngineProvider } from '@mui/material';

// routing
import Routes from './routes/mainRouter';

// defaultTheme
import themes from '../themes';

// project imports
import NavigationScroll from '../layout/NavigationScroll';

// ==============================|| APP ||============================== //

const App = () => {
    const customization = useSelector(state => state.customization);

    return (
        <StyledEngineProvider injectFirst>
            <ThemeProvider theme={ themes(customization) }>
              <CssBaseline />
              <Routes />
            </ThemeProvider>
        </StyledEngineProvider>
    );
};

export default App;
