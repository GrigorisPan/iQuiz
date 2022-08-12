import React from 'react';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

export default function Copyright() {
  return (
    <Typography
      variant='subtitle2'
      color='textSecondary'
      align='center'
      style={{ fontWeight: 'bold' }}
    >
      {`Copyright  ${new Date().getFullYear()} © Developed by Grigoris Panagiotopoulos. Supervised by `}
      <Link color='inherit' href='https://arch.icte.uowm.gr/'>
        Dr. Minas Dasygenis.
      </Link>{' '}
    </Typography>
  );
}
