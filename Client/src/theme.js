import {createMuiTheme} from '@material-ui/core/styles';

const theme = createMuiTheme({
    typography: {
        useNextVariants: true,
    },
    palette: {
        primary: {
            light: '#3889bb',
            main: '#285c7e',
            dark: '#19384b',
            contrastText: '#fff',
        },
    },
});

export default theme;
