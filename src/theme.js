import { red } from '@material-ui/core/colors';
import { createMuiTheme } from '@material-ui/core/styles';

// A custom theme for this app
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#63a6ed',
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#49366c',
        //light: '#71599f',
      light: '#',
    },
    action: {
      hover: '#9362e8',
    },
  },
  overrides: {
    MuiTextField: {
      root: {
        backgroundColor: '#abc2fc',
      },
    },
    MuiFormControl: {
      root: {
        backgroundColor: '#abc2fc',
      },
    },
  },
});

export default theme;
