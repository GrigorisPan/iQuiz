import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import { Grid, FormControl } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CardMedia from '@material-ui/core/CardMedia';
import Card from '@material-ui/core/Card';
import Message from '../../../ui/Message';
import Loader from '../../../ui/Loader';

const useStyles = makeStyles((theme) => ({
  formControl: {
    minWidth: '100%',
    [theme.breakpoints.down('sm')]: {
      marginTop: '0em',
    },
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    ...theme.typography.secondaryButton,
    marginTop: theme.spacing(5),
    marginLeft: theme.spacing(1),
  },
  dateTime: {
    display: 'flex',
    flexWrap: 'wrap',
    width: 250,
    [theme.breakpoints.down('xs')]: {
      width: 185,
    },
  },
  textField: {
    [theme.breakpoints.down('xs')]: {
      fontSize: '0.7em',
    },
    fontSize: '1em',
  },
  mainContainer: {
    width: '100%',
    flexDirection: 'column',
    display: 'flex',
  },
  continueButton: {
    ...theme.typography.secondaryButton,
    borderColor: theme.palette.common.blue,
    color: theme.palette.common.blue,
    height: 40,
    width: '100%',
    marginTop: '1em',
    marginLeft: '1em',
  },
  secondContainer: {
    width: '100%',
    flexDirection: 'column',
    display: 'flex',
  },
  imagePreview: {
    width: '300px',
    height: '300px',
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
}));

export default function DataFormAdmin({
  id,
  title,
  repeat,
  setRepeat,
  setTitle,
  time,
  photo,
  photoName,
  previewImage,
  previewImageName,
  setTime,
  description,
  setDescription,
  status,
  setStatus,
  setPhoto,
  setPhotoName,
  setPreviewImage,
  setPreviewImageName,
  previewShow,
  setPreviewShow,
}) {
  const classes = useStyles();

  const [currentFile, setCurrentFile] = useState(undefined);
  const [uploading, setUploading] = useState(false);
  const [uploadMsg, setUploadMsg] = useState('');

  const authLogin = useSelector((state) => state.authLogin);
  const { userInfo } = authLogin;

  const quizCreate = useSelector((state) => state.quizCreate);
  const { loading, error, newQuiz } = quizCreate;

  useEffect(() => {
    if (previewImage && previewImageName) {
      setPhoto(`${previewImage.data.data}`);
      setPhotoName(`${previewImageName}`);
    }
  }, [previewImageName, setPhoto, setPhotoName, previewImage]);

  // Select Image
  const selectFile = async (e) => {
    setPreviewShow(false);
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('file', file);
    setUploading(true);

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.put(
        `${process.env.REACT_APP_URL_API}/api/v1/quizzes/${id}/photo`,
        formData,
        config
      );

      setPreviewImage(data);
      setPreviewImageName(e.target.files[0].name);

      setTimeout(() => {
        setCurrentFile(e.target.files[0]);
        setUploadMsg('Επιτυχές Ανέβασμα!');
        setUploading(false);
      }, 1500);
    } catch (error) {
      const msg =
        error.response && error.response.data.error
          ? error.response.data.error
          : error.error;
      setUploadMsg(msg);
      setUploading(true);
    }
  };
  return (
    <>
      {error && (
        <Grid item container justify='center' style={{ marginBottom: '1em' }}>
          <Message severity='error'>{error}</Message>
        </Grid>
      )}
      {loading && <Loader />}
      {newQuiz && (
        <Grid item container justify='center' style={{ marginBottom: '1em' }}>
          <Message severity='success'>Επιτυχής!</Message>
        </Grid>
      )}
      <Grid
        container
        justify='center'
        alignContent='center'
        className={classes.mainContainer}
      >
        {!newQuiz && (
          <Grid
            item
            container
            direction='column'
            spacing={2}
            xs={12}
            sm={10}
            md={9}
            lg={6}
          >
            <Grid item>
              <TextField
                required={true}
                label='Τίτλος'
                id='title'
                autoComplete='false'
                fullWidth
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Grid>
            <Grid item>
              <TextField
                required
                label='Επανάληψη'
                id='repeat'
                autoComplete='false'
                fullWidth
                value={repeat}
                helperText='Για άπειρες επαναλήψεις εισάγετε - 0 - '
                onChange={(e) => setRepeat(e.target.value)}
              />
            </Grid>
            <Grid item>
              <FormControl className={classes.formControl}>
                <InputLabel id='type-user-select-label' required>
                  Χρόνος/Ερώτηση
                </InputLabel>
                <Select
                  labelId='quiz-time-select-label'
                  id='time-select'
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                >
                  <MenuItem value={10}>10</MenuItem>
                  <MenuItem value={15}>15</MenuItem>
                  <MenuItem value={20}>20</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item>
              <TextField
                label='Περιγραφή'
                id='description'
                multiline
                rows={4}
                fullWidth
                variant='filled'
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Grid>
            <Grid item>
              <FormControl className={classes.formControl}>
                <InputLabel id='status-quiz-select-label' required>
                  Κατάσταση
                </InputLabel>
                <Select
                  labelId='status-quiz-select-label'
                  id='status-select'
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <MenuItem value={'private'}>Ιδιωτικό</MenuItem>
                  <MenuItem value={'public'}>Δημόσιο</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            {previewShow && photo && photoName && (
              <Grid item className={classes.imagePreview}>
                <Card className={classes.card}>
                  <CardMedia
                    component='img'
                    className={classes.cardMedia}
                    src={`${process.env.REACT_APP_URL_API}/uploads/${photo}`}
                    title={`${photoName}`}
                  />
                </Card>
              </Grid>
            )}
            {id && (
              <Grid item>
                {uploadMsg && (
                  <Grid container>
                    <Typography variant='body2'>{uploadMsg}</Typography>
                  </Grid>
                )}
                {uploading ? (
                  <Loader />
                ) : (
                  <div className='file-name'>
                    {currentFile ? currentFile.name : undefined}
                  </div>
                )}

                <label htmlFor='btn-upload'>
                  <input
                    id='btn-upload'
                    name='btn-upload'
                    style={{ display: 'none' }}
                    type='file'
                    accept='image/*'
                    onChange={selectFile}
                  />
                  <Button
                    variant='outlined'
                    component='span'
                    className={classes.continueButton}
                  >
                    Εισαγωγή Εικόνας
                  </Button>
                </label>
              </Grid>
            )}
          </Grid>
        )}
      </Grid>
    </>
  );
}
