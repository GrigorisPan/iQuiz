import { createMuiTheme } from '@material-ui/core/styles';

const iBlue = '#0B72b9';
const iOrange = '#ffa42d';
const iGrey = '#868686';

/* const font = "'Pacifico', cursive";
 */ const font1 = "'Roboto' , sans-serif";
const font2 = "'Raleway', sans-serif";
//const font3 = "'Roboto', sans-serif";

export default createMuiTheme({
  palette: {
    common: {
      blue: `${iBlue}`,
      orange: `${iOrange}`,
    },
    primary: {
      main: `${iBlue}`,
    },
    secondary: {
      main: `${iOrange}`,
    },
  },
  typography: {
    tab: {
      fontFamily: font2,
      textTransform: 'none',
      fontWeight: 700,
      fontSize: '1rem',
    },
    mainButton: {
      fontFamily: font1,
      fontSize: '1rem',
      textTransform: 'none',
      color: 'white',
    },
    secondaryButton: {
      borderWidth: '2px',
      textTransform: 'none',
      borderRadius: 50,
      fontFamily: font1,
      fontWeight: 'bold',
      fontSize: '0.9',
    },
    h2: {
      fontFamily: font2,
      fontSize: '2.3rem',
      fontWeight: '700',
      color: `${iBlue}`,
      lineHeight: 1.5,
    },
    h3: {
      fontFamily: font1,
      fontSize: '1.95rem',
      fontWeight: '700',
      color: iBlue,
    },
    h4: {
      fontFamily: font2,
      fontSize: '1.60rem',
      fontWeight: '700',
      color: `${iBlue}`,
      lineHeight: 1,
    },
    h5: {
      fontFamily: font2,
      fontSize: '1.25rem',
      fontWeight: '700',
      color: `${iBlue}`,
      lineHeight: 1,
    },
    subtitle1: {
      fontSize: '1.25rem',
      fontWeight: 300,
      color: `${iGrey}`,
    },
    subtitle2: {
      fontSize: '1rem',
      fontWeight: 300,
      color: `${iGrey}`,
    },
    body1: {
      fontSize: '1.25em',
      color: iOrange,
      fontWeight: 350,
    },
    body2: {
      fontSize: '1rem',
      fontFamily: 'Roboto',
      fontWeight: 400,
      lineHeight: 1.5,
      letterSpacing: '0.00938em',
    },
  },

  overrides: {
    MuiMenuItem: {
      root: {
        color: iGrey,
        fontSize: '1em',
      },
    },
    MuiTabs: {
      indicator: {
        backgroundColor: `${iBlue}`,
      },
    },
    MuiInputLabel: {
      root: {
        color: iBlue,
        fontSize: '1.1em',
      },
    },
    MuiInput: {
      root: {
        fontSize: '1.2em',
      },
      underline: {
        '&:before': {
          borderBottom: `1px solid ${iBlue}`,
        },
        '&:hover:not($disabled):not($focused):not($error):before': {
          borderBottom: `1px solid ${iBlue}`,
        },
      },
    },
    MuiFilledInput: {
      underline: {
        '&:before': {
          borderBottom: `1px solid ${iBlue}`,
        },
      },
    },
    /*    MuiStepper: {
      horizontal: { flexDirection: 'row' },
    }, */
    /*  MuiCardMedia: {
      root: {
        height: '100%',
      },
    }, */
  },
});
