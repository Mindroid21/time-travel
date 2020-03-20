import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
      searchBar: {
        borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
      },
      searchInput: {
        fontSize: theme.typography.fontSize,
      },
      block: {
        display: 'block',
      },
      addUser: {
        marginRight: theme.spacing(1),
      },
      contentWrapper: {
        margin: '40px 16px',
      },
      activeLink: {
        color: '#4fc3f7',
        textDecoration: 'none',
        cursor: 'pointer',
        '&:hover': {
          textDecoration: 'underline',
        }
      },
      highlightText: {
        color: '#FF5CB0'
      }
}));