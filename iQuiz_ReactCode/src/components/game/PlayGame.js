import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Grid, makeStyles, useTheme } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Typography from '@material-ui/core/Typography';
import {
  answerQuestion,
  finnishGame,
  nextQuestion,
  checkCanReport,
} from '../../actions/gameActions';
import Timer from '../game/components/Timer';
import Message from '../ui/Message';
import { reportCreate, reportCreateClean } from '../../actions/reportActions';

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    minHeight: '88vh',
    alignItems: 'center',
    marginTop: '1.5rem',
  },
  optionButton: {
    ...theme.typography.mainButton,
    display: 'inline-block',
    width: 'auto',
    height: 'auto',
    fontSize: '1.5rem',
    padding: '0.3em 0.3em',
    marginBottom: '1rem',
    borderRadius: '0.3rem',
    alignItems: 'center',
    color: '#8854c0',
    '&:hover': {
      cursor: 'pointer',
      transform: 'translateY(-0.1rem)',
      transition: 'transform 150ms',
      backgroundColor: '#d6c5ea',
    },
    [theme.breakpoints.down('md')]: {
      fontSize: '1.25rem',
    },
  },

  endButton: {
    ...theme.typography.mainButton,
    backgroundColor: '#ff8181',
    color: '#ffff',
    margin: '1em 1em',
    '&:hover': {
      backgroundColor: '#ff9a9a',
    },
  },
  reportButton: {
    ...theme.typography.mainButton,
    backgroundColor: '#ffb367',
    margin: '1em 1em',
    color: '#ffff',
    '&:hover': {
      backgroundColor: '#ffc080',
    },
  },
}));

export default function PlayGame() {
  const classes = useStyles();
  const theme = useTheme();
  const dispatch = useDispatch();
  let { id } = useParams();

  const matchesMD = useMediaQuery(theme.breakpoints.down('md'));

  const game = useSelector((state) => state.game);
  const { questions, currentQuestionIndex } = game;

  const checkPlay = useSelector((state) => state.checkPlay);
  const { canReport } = checkPlay;
  const gameReport = useSelector((state) => state.gameReport);
  const { success, msg } = gameReport;

  const quizDetails = useSelector((state) => state.quizDetails);
  const { quiz } = quizDetails;

  const [options, setOptions] = useState([]);
  const [question, setQuestion] = useState('');
  const [timeLeft, setTimeLeft] = useState(quiz.time);

  const total_lenght = questions.length;

  useEffect(() => {
    if (currentQuestionIndex + 1 > total_lenght) {
      dispatch(finnishGame());
    } else {
      setQuestion(questions[currentQuestionIndex].theQuestion);
      getOptions(questions[currentQuestionIndex], setOptions);
    }
  }, [dispatch, currentQuestionIndex, questions]);

  if (timeLeft < 0) {
    setTimeLeft((prev) => (prev = quiz.time));
    dispatch(checkCanReport(id));
    dispatch(nextQuestion());
  }
  const getOptions = (question, setOptions) => {
    const options = [];
    const questionsCopy = JSON.parse(JSON.stringify(question));
    delete questionsCopy.theQuestion;
    delete questionsCopy.correct;

    for (const [i, opt] of Object.entries(questionsCopy)) {
      options.push(opt[0]);
    }

    setOptions(options);
  };

  const handleAnswerClick = (option) => {
    dispatch(checkCanReport(id));
    dispatch(answerQuestion(option));
    setTimeLeft(quiz.time);
  };

  const endGameHandler = () => {
    dispatch(finnishGame());
  };

  const reportGameHandler = () => {
    dispatch(reportCreate({ quiz_id: quiz.id, question: question[0] }));
    setTimeout(() => {
      setTimeout(() => {
        dispatch(reportCreateClean());
      }, 1000);
    });
  };

  return (
    <Grid
      container
      direction='column'
      className={classes.mainContainer}
      spacing={3}
    >
      {success && msg && (
        <Grid item container justify='center' style={{ marginBottom: '1em' }}>
          <Message severity='success'>{msg}</Message>
        </Grid>
      )}

      <Grid item container xs={12} sm={11} md={9} justify='center'>
        <Grid
          item
          container
          direction='row'
          justify='space-between'
          style={{ marginBottom: '1em' }}
        >
          {<Timer timeLeft={timeLeft} setTimeLeft={setTimeLeft} />}

          <Typography variant='subtitle1' style={{ color: '#ee6600' }}>
            Question: {currentQuestionIndex + 1} / {total_lenght}
          </Typography>
        </Grid>
        <Typography variant={matchesMD ? 'h4' : 'h3'} style={{ color: '#fff' }}>
          <div
            dangerouslySetInnerHTML={{
              __html: `${question}`,
            }}
          ></div>
        </Typography>
      </Grid>
      <Grid
        item
        container
        xs={12}
        sm={10}
        md={8}
        justify='center'
        style={{ color: '#ee6600', margin: '1em 0em' }}
      >
        <Grid
          item
          container
          className={classes.fixedHeightPaper}
          justify='center'
          direction='column'
        >
          {options.map((option, i) => (
            <Button
              key={i}
              variant='contained'
              className={classes.optionButton}
              onClick={() => {
                handleAnswerClick(option);
              }}
            >
              <div>{option}</div>
            </Button>
          ))}
        </Grid>
      </Grid>
      <Grid
        item
        container
        justify={matchesMD ? 'center' : 'space-around'}
        sm={12}
        md={10}
        lg={12}
      >
        {canReport && (
          <Button
            variant='contained'
            className={classes.reportButton}
            onClick={reportGameHandler}
          >
            Αναφορά
          </Button>
        )}
        <Button
          variant='contained'
          className={classes.endButton}
          onClick={endGameHandler}
        >
          Τερματισμός Κουίζ
        </Button>
      </Grid>
    </Grid>
  );
}
