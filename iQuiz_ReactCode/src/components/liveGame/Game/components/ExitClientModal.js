import { makeStyles, useTheme } from '@material-ui/core/styles';

import useMediaQuery from '@material-ui/core/useMediaQuery';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import { Grid } from '@material-ui/core';

import Typography from '@material-ui/core/Typography';

import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  specialText: {
    color: theme.palette.common.orange,
  },
  exitButton: {
    ...theme.typography.mainButton,
    backgroundColor: '#ff1744',
    color: '#ffff',
    '&:hover': {
      backgroundColor: '#ff4569',
    },
  },
  button: {
    ...theme.typography.secondaryButton,
    color: theme.palette.common.blue,
  },
}));

export default function ExitClientModal({
  open,
  setOpen,
  handleClose,
  exitGameHandler
}) {
  const classes = useStyles();
  const theme = useTheme();
  const matchesXS = useMediaQuery(theme.breakpoints.down('xs'));

  const handleBack = () => {
    setOpen(false);
  };

  return (
    <Grid container direction='column' spacing={3}>
      <Dialog
        disableEscapeKeyDown
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            paddingTop: matchesXS ? '1em' : '3em',
            paddingBottom: matchesXS ? '1em' : '3em',
            paddingLeft: matchesXS ? '0em' : '5em',
            paddingRight: matchesXS ? '0em' : '5em',
          },
        }}
      >
        <DialogContent>
          <Grid container direction='column'>
            <Typography
              gutterBottom
              variant={matchesXS ? 'h4' : 'h3'}
              style={{
                marginBottom: '1em',
              }}
            >
              Έξοδος από το <span className={classes.specialText}>κουίζ</span>;
            </Typography>
            <Grid
              item
              container
              justify='center'
              alignItems='center'
              direction='column'
              spacing={5}
            ></Grid>
            <Grid
              item
              container
              alignItems='center'
              justify='space-around'
              direction='row'
              style={{
                marginTop: '2em',
              }}
            >
              <Grid item>
                <Button onClick={handleBack} className={classes.button}>
                  Άκυρο
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant='contained'
                  className={classes.exitButton}
                  onClick={() => exitGameHandler()}
                >
                  Έξοδος
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </Grid>
  );
}
