import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams, Link } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Grid, Icon } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import TablePagination from '@material-ui/core/TablePagination';
import Button from '@material-ui/core/Button';

import { getLiveQuizStatistics } from '../../../actions/liveQuizActions';
import TableShowLeaderboard from './components/TableShowLeaderboard';
import Loader from '../../ui/Loader';

const useStyles = makeStyles((theme) => ({
  containerButtons: {
    display: 'flex',
    justifyContent: ' space-around',
    flexWrap: 'nowrap',
  },
  backButton: {
    ...theme.typography.mainButton,
    alignItems: 'center',
    color: theme.palette.common.blue,
    '&:hover': {
      color: theme.palette.primary.light,
    },
  },
}));

const columns = [
  { id: 'id', label: 'Id', minWidth: 20, align: 'center' },
  { id: 'game_id', label: 'Game Id', minWidth: 20, align: 'center' },
  { id: 'player_id', label: 'Player Id', minWidth: 50, align: 'center' },
  { id: 'rank', label: 'Rank', minWidth: 20, align: 'center' },
  {
    id: 'username',
    label: 'Username',
    minWidth: 100,
    align: 'left',
  },
  {
    id: 'score',
    label: 'Score',
    minWidth: 50,
    align: 'center',
  },
  {
    id: 'createdAt',
    label: 'CreatedAt',
    minWidth: 20,
    align: 'center',
  },
  {
    id: 'updatedAt',
    label: 'UpdatedAt',
    minWidth: 20,
    align: 'center',
  },
];

function createData(
  id,
  game_id,
  player_id,
  rank,
  username,
  score,
  createdAt,
  updatedAt,
  more
) {
  return {
    id,
    game_id,
    player_id,
    rank,
    username,
    score,
    createdAt,
    updatedAt,
    more,
  };
}


export default function LiveQuizStatisticsRanking() {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const dispatch = useDispatch();
  let history = useHistory();
  let { id } = useParams();

  const authLogin = useSelector((state) => state.authLogin);
  const { userInfo } = authLogin;

  const liveQuizStatistics = useSelector((state) => state.liveQuizStatistics);
  const { loading, liveQuizStat } = liveQuizStatistics;

  useEffect(() => {
    if (!userInfo) {
      history.push('/login');
    } else {
      dispatch(getLiveQuizStatistics(id));
    }
  }, [dispatch, history, userInfo, id]);

  let rows = [];

  liveQuizStat.forEach((player, i) => {

    let row = createData(
      player.id,
      player.game_id,
      player.player_id,
      i+1,
      player.username,
      player.score,
      player.createdAt,
      player.updatedAt
    );
    rows.push(row);
  });

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <>
      <Grid container style={{ paddingBottom: '2em' }}>
        <Grid container>
          <Button
            className={classes.backButton}
            variant='text'
            component={Link}
            to={`/admin/statistics/livequiz`}
          >
            <Icon>
              <span className='material-icons'>arrow_back</span>
            </Icon>
            Πίσω
          </Button>
        </Grid>
      </Grid>

      <Typography gutterBottom variant='h3'>
        Πίνακας Βαθμολογικής Κατάταξης
      </Typography>
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        {loading ? (
          <Loader />
        ) : (
          <TableShowLeaderboard
            columns={columns}
            rows={rows}
            rowsPerPage={rowsPerPage}
            page={page}
          />
        )}
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component='div'
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </>
  );
}
