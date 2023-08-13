import { makeStyles } from "@mui/material";

const useStyles = makeStyles((theme)=>({
    container: {
        backgroundColor: theme.palette.backgroundColor.paper,
        padding: theme.spacing(8,0,6),
    },
    icon: {
        marginRight: '20px'
    },
    buttons: {
        marginTop: '40px'
    },
    cardGrid: {
        padding: '20px 0'
    },
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column'
    },
    cardMedia: {
        paddingTop: '54.25%'  //16: 9
    },
    cardcontent: {
        flexGrow: 1
    },
}));

export default useStyles;