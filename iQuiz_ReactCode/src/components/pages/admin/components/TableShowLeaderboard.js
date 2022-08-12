import React, { useState } from 'react';

import {  useTheme } from '@material-ui/core/styles';
import { Grid, TextField } from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';


export default function TableShow({
  columns,
  rows,
  rowsPerPage,
  page
}) {
  const theme = useTheme();

  const matchesXS = useMediaQuery(theme.breakpoints.down('xs'));

  const [rowData, setRowData] = useState(rows);
  const [scoreOrderDirection, setScoreOrderDirection] = useState('desc');
  const [query, setQuery] = useState('');
  const [columnToQuery, setColumnToQuery] = useState(`${columns[0].id}`);

  const displayDate = (timestamp) => {
    const todate = new Date(timestamp).getDate();
    const tomonth = new Date(timestamp).getMonth() + 1;
    const toyear = new Date(timestamp).getFullYear();
    const original_date = todate + '/' + tomonth + '/' + toyear;
    return original_date;
  };

  const handleChange = (event) => {
    setColumnToQuery(event.target.value);
  };

  const lowerCaseQuery = query.toLowerCase();

  //Sort
  const sortArray = (arr, orderBy) => {
    switch (orderBy) {
      case 'asc':
      default:
        return arr.sort((a, b) =>
          a.score > b.score ? 1 : b.score > a.score ? -1 : 0
        );
      case 'desc':
        return arr.sort((a, b) =>
          a.score < b.score ? 1 : b.score < a.score ? -1 : 0
        );
    }
  };
  const handleSortRequest = (column) => {
    setRowData(sortArray(rows, scoreOrderDirection, column));
    setScoreOrderDirection(scoreOrderDirection === 'asc' ? 'desc' : 'asc');
  };

  return (
    <>
      <Grid
        item
        container
        direction='row'
        justify={matchesXS ? 'center' : 'space-between'}
        style={{ padding: '1em 1em' }}
      >
        
        <Grid item style={{ width: '10em', margin: '0.5em 0.5em' }}>
          <TextField
            label='Αναζήτηση'
            id='search'
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoComplete='false'
          />
        </Grid>
        <Grid item style={{  margin: '0.5em 0.5em' }}>
      </Grid>
        <Grid item style={{ margin: '0.5em 0.5em' }}>
          <FormControl variant='standard' sx={{ m: 1, maxWidth: 120 }}>
            <InputLabel
              id='simple-select-standard-label'
              style={{ width: '100%' }}
            >
              Επίλεξε στήλη
            </InputLabel>
            <Select
              labelId='simple-select-standard-label'
              id='simple-select-standard'
              value={columnToQuery}
              onChange={handleChange}
              style={{ width: '8rem' }}
              label='Επίλεξε στήλη'
            >
              {columns.map((column) => (
                <MenuItem key={column.id} value={column.id}>
                  {column.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <TableContainer sx={{ maxHeight: 440, maxWidth: '100%' }}>
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                   {column.id === 'score' ? (
                    <TableSortLabel
                      onClick={handleSortRequest.bind(this, 'score')}
                      active={true}
                      direction={scoreOrderDirection}
                    >
                      {column.label}
                    </TableSortLabel>
                  ) : (
                    column.label
                  )}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rowData
              .filter((row) =>
                row[`${columnToQuery}`]
                  .toString()
                  .toLowerCase()
                  .includes(`${lowerCaseQuery}`)
              )
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                //console.log(row);
                return (
                  <TableRow hover role='checkbox' tabIndex={-1} key={row.id}>
                    {columns.map((column) => {
                      const value = row[column.id];

                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.id === 'createdAt' ||  column.id === 'updatedAt' ? (
                            displayDate(value) ) 
                            :   column.format && typeof value === 'number' ? (
                            column.format(value)
                          ) : (
                            value
                          )}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
