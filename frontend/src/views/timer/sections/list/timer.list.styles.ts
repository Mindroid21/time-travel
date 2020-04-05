import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
    mainDiv: {
        border: '1px solid rgba(0, 0, 0, 0.12)',
    },
    listAnimation: {
        '& div': {
            animation: 'fadein  2s',
            'animation-delay': '3s'
        },
    },
    '@keyframes fadein': {
            'from': { opacity: 0 },
            'to': { opacity: 1 }
    },
    '@-webkit-keyframes fadein': {
        'from': { opacity: 0 },
        'to': { opacity: 1 },
    }
}));

