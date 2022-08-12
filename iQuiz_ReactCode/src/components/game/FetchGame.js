import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { Grid } from '@material-ui/core';
import Message from '../ui/Message';
import Loader from '../ui/Loader';
import { playGame, startGame, saveGame } from '../../actions/gameActions';

export default function FetchGame() {
  const dispatch = useDispatch();

  let history = useHistory();

  const game = useSelector((state) => state.game);
  const { loading, error, questions } = game;

  const quizDetails = useSelector((state) => state.quizDetails);
  const { quiz } = quizDetails;

  useEffect(() => {
    if (error && !loading) {
      setTimeout(() => {
        dispatch(startGame());
      }, 1500);
    }
    if (questions.length !== 0) {
      dispatch(saveGame({ quiz_id: quiz.id }));
      dispatch(playGame());
    }
  }, [dispatch, history, error, questions, loading]);

  return (
    <>
      {loading && <Loader />}
      {error && (
        <Grid container justify='center'>
          <Message severity='error'>{error}</Message>
        </Grid>
      )}
    </>
  );
}
