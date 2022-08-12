import React from 'react';

import { Grid, makeStyles } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles((theme) => ({
  continuousButton: {
    ...theme.typography.mainButton,
    backgroundColor: '#4caf50',
    color: '#ffff',
    '&:hover': {
      backgroundColor: '#6fbf73',
    },
  },
  button: {
    ...theme.typography.secondaryButton,
    color: theme.palette.common.blue,
    fontSize: '1.2em',
  },
  textRules: {
    fontSize: '1.15em',
  },
  specialText: {
    fontWeight: '500',
  },
}));

export default function RulesModalLiveGame({
  open,
  handleClose,
  startHandler,
  gameCategory,
  gameTime,
  feadbackChecked,
  failQuotaChecked,
}) {
  const classes = useStyles();
  const theme = useTheme();

  const matchesXS = useMediaQuery(theme.breakpoints.down('xs'));
  let gameType;
  let correctScore;
  let falseScore;

  if (gameCategory === 1) {
    gameType = 'Point System';
    correctScore = ' μέγιστο 100 πόντους - εξαρτάται από τον χρόνο απάντησης';
    falseScore = ' - 1/4 x σωστών πόντων ';
  } else if (gameCategory === 2) {
    gameType = 'Point System - No Penalty';
    correctScore = ' μέγιστο 100 πόντους - εξαρτάται από τον χρόνο απάντησης';
    falseScore = ' δεν υπάρχει αρνητική βαθμολογία ';
  } else if (gameCategory === 3) {
    gameType = 'Simple Game';
    correctScore = ' +1 πόντος ';
    falseScore = ' -1 πόντος ';
  } else if (gameCategory === 4) {
    gameType = 'Simple Game - No Penalty';
    correctScore = ' +1 πόντος ';
    falseScore = ' δεν υπάρχει αρνητική βαθμολογία ';
  } else if (gameCategory === 5) {
    gameType = 'Buzzer Mode';
    correctScore =
      ' +1 πόντος - βαθμολογείται μόνη η πρώτη απάντηση που φτάνει στον διακομιστή ';
    falseScore = ' δεν υπάρχει αρνητική βαθμολογία ';
  }

  return (
    <Grid container direction='column' spacing={3}>
      <Dialog
        disableEscapeKeyDown
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            paddingTop: matchesXS ? '1em' : '2em',
            paddingBottom: matchesXS ? '1em' : '2em',
            paddingLeft: matchesXS ? '1em' : '3em',
            paddingRight: matchesXS ? '1em' : '3em',
          },
        }}
      >
        <DialogTitle disableTypography>
          <Typography gutterBottom variant={matchesXS ? 'h5' : 'h4'}>
            {'Κανόνες Παιχνιδιού'}{' '}
          </Typography>
        </DialogTitle>
        <Divider style={{ marginBottom: '0.8em' }} />
        <DialogContent id='game-rules-dialog-description'>
          <Grid container direction='column'>
            <Typography
              gutterBottom
              component='div'
              variant='body2'
              className={classes.textRules}
            >
              1. Σε περίπτωση αλλαγής σελίδας το παιχνίδι{' '}
              <span className={classes.specialText}>τερματίζεται </span>{' '}
              αυτόματα.
            </Typography>
            <Typography
              component='div'
              gutterBottom
              variant='body2'
              className={classes.textRules}
            >
              2. Σε περίπτωση ανανέωσης της σελίδας το παιχνίδι{' '}
              <span className={classes.specialText}>τερματίζεται </span>
              αυτόματα.
            </Typography>
            <Typography
              component='div'
              variant='body2'
              gutterBottom
              className={classes.textRules}
            >
              3. Η κατηγορία παιχνιδιού που έχει οριστεί είναι{' '}
              <span className={classes.specialText}>{gameType}</span>.
            </Typography>
            <Typography
              component='div'
              gutterBottom
              variant='body2'
              className={classes.textRules}
            >
              4. Η χρονική διάρκεια κάθε ερώτησης που έχει οριστεί είναι{' '}
              <span className={classes.specialText}>{gameTime}s</span>.
            </Typography>
            <Typography
              component='div'
              gutterBottom
              variant='body2'
              className={classes.textRules}
            >
              5. Βαθμολόγηση:
            </Typography>
            <Typography
              component='div'
              gutterBottom
              variant='body2'
              className={classes.textRules}
            >
              - <span className={classes.specialText}>Σωστή απάντηση:</span> (
              {correctScore}).
            </Typography>
            <Typography
              component='div'
              gutterBottom
              variant='body2'
              className={classes.textRules}
            >
              - <span className={classes.specialText}>Λάθος απάντηση:</span> (
              {falseScore}).
            </Typography>
            <Typography
              component='div'
              gutterBottom
              variant='body2'
              className={classes.textRules}
            >
              6. Η επιλογή feedback είναι{' '}
              <span className={classes.specialText}>
                {feadbackChecked ? 'ενεργή' : 'ανενεργή'}
              </span>
              .
            </Typography>
            {gameCategory !== 1 && gameCategory !== 2 && (
              <Typography
                component='div'
                gutterBottom
                variant='body2'
                className={classes.textRules}
              >
                7. Η επιλογή failQuota είναι{' '}
                <span className={classes.specialText}>
                  {failQuotaChecked ? 'ενεργή' : 'ανενεργή'}
                </span>
                .
              </Typography>
            )}
          </Grid>
        </DialogContent>
        <DialogActions>
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
              <Button
                onClick={() => {
                  handleClose();
                }}
                className={classes.button}
              >
                Πίσω
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant='contained'
                className={classes.continuousButton}
                onClick={() => {
                  startHandler();
                }}
              >
                Συνέχεια
              </Button>
            </Grid>
          </Grid>
        </DialogActions>
      </Dialog>
    </Grid>
  );
}
