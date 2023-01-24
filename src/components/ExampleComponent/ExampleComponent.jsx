import React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { useTranslation } from 'react-i18next';

// eslint-disable-next-line react/prop-types
const ExampleComponent = inValues => {
  const { t } = useTranslation();

  // eslint-disable-next-line react/destructuring-assignment
  const telescope = inValues.telescope ? inValues.telescope : { name: 'LOCAL TELESCOPE' };
  // eslint-disable-next-line react/destructuring-assignment
  const user = inValues.user ? inValues.user : { username: 'LOCAL USER' };

  return (
    <div id="loginId" data-testid="dataloginId">
      <Paper color="transparent" elevation={0} sx={{ height: '100%', width: '100%' }}>
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justifyContent="center"
          style={{ minHeight: '100vh' }}
        >
          <Grid item xs={3}>
            <Box>
              <Card variant="outlined">
                <p>{t('language')}</p>
                <p>{t('date_format_one', { date: new Date() })}</p>
                <p>{t('date_format_two', { date: new Date() })}</p>
                <p>{t('intlNumber', { val: 2000 })}</p>
                <p>{telescope.name}</p>
                <p>{user.username}</p>
                <p>{t('dummy')}</p>
              </Card>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

export default ExampleComponent;
