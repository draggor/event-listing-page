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
      default: '#1c3a93',
      light: '#abc2fc',
    },
    action: {
      hover: '#dfd1f9',
    },
  },
});

export default theme;
