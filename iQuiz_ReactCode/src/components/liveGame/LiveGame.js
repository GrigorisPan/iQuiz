import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Host from './Host/Host';
import WaitRoom from './Host/WaitRoom';
import HostGame from './Game/HostGame';

import {
  CONFIG_LIVE_GAME,
  WAITING_LIVE_GAME,
  END_LIVE_GAME,
  PLAY_LIVE_GAME,
} from '../../constants/liveGameConstants';
import { hostLiveGame, startPageGame } from '../../actions/liveGameActions';
import LiveGameLayout from '../ui/LiveGameLayout';
import EndGame from './Host/EndGame';

export default function LiveGame() {
  const dispatch = useDispatch();
  const liveGameState = useSelector((state) => state.liveGameState);
  const { state } = liveGameState;

  let displayedPage;

  useEffect(() => {
    dispatch(hostLiveGame());
  }, [dispatch]);

  useEffect(() => {
    return () => {
      dispatch(startPageGame());
    };
  }, [dispatch]);

  switch (state) {
    case CONFIG_LIVE_GAME:
      displayedPage = <Host />;
      break;
    case WAITING_LIVE_GAME:
      displayedPage = <WaitRoom />;
      break;
    case PLAY_LIVE_GAME:
      displayedPage = (
        <LiveGameLayout>
          <HostGame />
        </LiveGameLayout>
      );
      break;
    case END_LIVE_GAME:
      displayedPage = <EndGame />;
      break;
    default:
      break;
  }

  return <>{displayedPage}</>;
}
