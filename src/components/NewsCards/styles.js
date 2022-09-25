import { makeStyles } from "@material-ui/core";

const styles = makeStyles({ // creates a hook
    container: {
        padding: '0 5%',
        width: '100%',
        margin: 0,
    },
    card: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        height: '45vh',
        padding: '10%',
        borderRadius: 10,
        color: 'black',
      },
      infoCard: {
        display: 'flex', flexDirection: 'column', textAlign: 'center',
      }
})

export default styles;