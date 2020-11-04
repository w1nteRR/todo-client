import { makeStyles } from "@material-ui/core";

export default makeStyles({
    container: {
        display: 'flex',
        flexDirection: 'column',
        height: '90vh',
    },
    form: {
        display: 'inherit',
        flexDirection: 'column',
        justifyContent: 'space-around',
        height: '60%',
        marginTop: '20%'
    },
    inputs: {
        display: 'inherit',
        flexDirection: 'column',
        height: '65%',
    },
    input: {
        margin: '10px'
    }
})