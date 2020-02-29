import {createMuiTheme , ThemeOptions} from '@material-ui/core/styles';

export const getThemeOptions = () : ThemeOptions => {

    // default material theme configuration

    let theme = createMuiTheme({
        palette: {
          primary: {
            light: '#00897b',
            main: '#00796b',
            dark: '#006064',
          },
        },
        typography: {
          fontFamily: ['"Montserrat"' , 'sans-serif'].join(','), 
          fontSize: 16,
          h5: {
            fontWeight: 500,
            fontSize: 26,
            letterSpacing: 0.5,
          },
        },
        shape: {
          borderRadius: 8,
        },
        props: {
          MuiTab: {
            disableRipple: true,
          },
        },
        mixins: {
          toolbar: {
            minHeight: 48,
          },
        },
      });
      
      // Overrides, specific to application - Paperbase

      theme = {
        ...theme,
        overrides: {
          MuiDrawer: {
            paper: {
              backgroundColor: '#18202c',
            },
          },
          MuiButton: {
            label: {
              textTransform: 'none',
            },
            contained: {
              boxShadow: 'none',
              '&:active': {
                boxShadow: 'none',
              },
            },
          },
          MuiTabs: {
            root: {
              marginLeft: theme.spacing(1),
            },
            indicator: {
              height: 3,
              borderTopLeftRadius: 3,
              borderTopRightRadius: 3,
              backgroundColor: theme.palette.common.white,
            },
          },
          MuiTab: {
            root: {
              textTransform: 'none',
              margin: '0 16px',
              minWidth: 0,
              padding: 0,
              [theme.breakpoints.up('md')]: {
                padding: 0,
                minWidth: 0,
              },
            },
          },
          MuiIconButton: {
            root: {
              padding: theme.spacing(1),
            },
          },
          MuiTooltip: {
            tooltip: {
              borderRadius: 4,
            },
          },
          MuiDivider: {
            root: {
              backgroundColor: '#404854',
            },
          },
          MuiListItemText: {
            primary: {
              fontWeight: theme.typography.fontWeightMedium,
            },
          },
          MuiListItemIcon: {
            root: {
              color: 'inherit',
              marginRight: 0,
              '& svg': {
                fontSize: 20,
              },
            },
          },
          MuiAvatar: {
            root: {
              width: 32,
              height: 32,
            },
          },
        },
      };
    return theme;    
};


