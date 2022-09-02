import React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { useTranslation } from 'react-i18next';

const ExampleComponent = () => {
  const { t } = useTranslation();

  return (
    <div id="loginId">
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
