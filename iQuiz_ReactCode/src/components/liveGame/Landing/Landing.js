import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clientLiveGame } from '../../../actions/liveGameClientActions';
import {
  ENTRANCE_CLIENT_LIVE_GAME,
  WAITING_CLIENT_LIVE_GAME,
} from '../../../constants/liveGameConstants';

import Entrance from './Entrance';
import WaitRoomClient from './WaitRoomClient';

export default function Landing() {
  const dispatch = useDispatch();
  const liveGameClientState = useSelector((state) => state.liveGameClientState);
  const { state } = liveGameClientState;

  let displayedPage;

  useEffect(() => {
    dispatch(clientLiveGame());
  }, [dispatch]);

  switch (state) {
    case ENTRANCE_CLIENT_LIVE_GAME:
      displayedPage = <Entrance />;
      break;
    case WAITING_CLIENT_LIVE_GAME:
      displayedPage = <WaitRoomClient />;
      break;
    default:
      break;
  }

  return <>{displayedPage}</>;
}
