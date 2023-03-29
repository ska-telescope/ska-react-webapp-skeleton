import React from 'react';
import { Box, Card, Grid, Paper } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Status } from '@ska-telescope/ska-javascript-components';
import { AlertCard } from '@ska-telescope/ska-gui-components';

const ALERT_CARD_TITLE = 'AlertCard Title';
const ALERT_CARD_FILLED = false;
const ALERT_CARD_DATA = [
  { level: 0, title: 'Level 0', value: 1, hideValue: true },
  { level: 1, title: 'Level 1', value: 1, hideValue: false },
  { level: 2, title: 'Level 2', value: 1, hideValue: true },
  { level: 3, title: 'Level 3', value: 1, hideValue: false },
  { level: 4, title: 'Level 4', value: 1, hideValue: true },
  { level: 5, title: 'Level 5', value: 1, hideValue: false },
  { level: 6, title: 'Level 6', value: 1, hideValue: true }
];

const STATUS_LEVEL = 1;
const STATUS_SIZE = 50;

const ExampleComponent = inValues => {
  const { t } = useTranslation();

  const telescope = inValues.telescope ? inValues.telescope : { name: 'LOCAL TELESCOPE' };
  const user = inValues.user ? inValues.user : { username: 'LOCAL USER' };

  return (
    <div id="loginId" data-testid="dataLoginId">
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
                {false && <p>{t('date_format_one', { date: new Date() })}</p>}
                {false && <p>{t('date_format_two', { date: new Date() })}</p>}
                {false && <p>{t('intlNumber', { val: 2000 })}</p>}
                <Status level={STATUS_LEVEL} size={STATUS_SIZE} />
                <p>{telescope.name}</p>
                <p>{user.username}</p>
                <p>{t('dummy')}</p>
              </Card>
              <AlertCard
                title={ALERT_CARD_TITLE}
                array={ALERT_CARD_DATA}
                filled={ALERT_CARD_FILLED}
              />
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

export default ExampleComponent;
