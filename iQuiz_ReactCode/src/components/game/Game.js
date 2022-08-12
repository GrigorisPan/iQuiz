import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import MainGame from './MainGame';
import PlayGame from './PlayGame';
import FetchGame from './FetchGame';
import EndGame from './EndGame';
import {
  START_GAME,
  FETCHING_GAME,
  PLAY_GAME,
  END_GAME,
} from '../../constants/gameConstants';
import { startGame } from '../../actions/gameActions';

export default function Game() {
  const dispatch = useDispatch();
  const gameState = useSelector((state) => state.gameState);
  const { state } = gameState;

  let displayedPage;

  useEffect(() => {
    dispatch(startGame());
  }, [dispatch]);

  switch (state) {
    case START_GAME:
      displayedPage = <MainGame />;
      break;
    case FETCHING_GAME:
      displayedPage = <FetchGame />;
      break;
    case PLAY_GAME:
      displayedPage = <PlayGame />;
      break;
    case END_GAME:
      displayedPage = <EndGame />;
      break;
    default:
      break;
  }

  return <>{displayedPage}</>;
}
