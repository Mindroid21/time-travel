import {createMuiTheme , ThemeOptions} from '@material-ui/core/styles';
import { pink } from "@material-ui/core/colors";

export const getThemeOptions = (themePalette: any) : ThemeOptions => {
    return createMuiTheme ( {
        typography : {
            fontFamily : [ '"PT Sans Caption"' , 'sans-serif'  ].join ( ',' ),
            fontSize : 16
        },
        palette : {
            primary : {
                main : pink[ 800 ] },
                type : themePalette
        }
    } )
};


