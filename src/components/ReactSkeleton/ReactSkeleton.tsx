import React from 'react';
import { Box, Card, Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { storageObject } from '../../services/stateStorage/store';
import { AlertCard, Status } from '@ska-telescope/ska-gui-components';

const ALERT_CARD_1_TITLE = 'Alert Card ( Not filled, with contents not filled / values suppressed )';
const ALERT_CARD_1_FILLED = false;
const ALERT_CARD_1_DATA = [
  { level: 0, title: 'Level 0', value: 1, filled: false, hideValue: true },
  { level: 1, title: 'Level 1', value: 1, filled: false, hideValue: true },
  { level: 2, title: 'Level 2', value: 1, filled: false, hideValue: true },
  { level: 3, title: 'Level 3', value: 1, filled: false, hideValue: true },
  { level: 4, title: 'Level 4', value: 1, filled: false, hideValue: true },
  { level: 5, title: 'Level 5', value: 1, filled: false, hideValue: true },
  { level: 6, title: 'Level 6', value: 1, filled: false, hideValue: true }
];

const ALERT_CARD_2_TITLE = 'Alert Card ( Not filled, content variations displayed )';
const ALERT_CARD_2_FILLED = false;
const ALERT_CARD_2_DATA = [
  { level: 1, title: 'Level 1', value: 1, filled: true, hideValue: false },
  { level: 1, title: 'Level 1', value: 1, filled: true, hideValue: true },
  { level: 1, title: 'Level 1', value: 1, filled: false, hideValue: false },
  { level: 1, title: 'Level 1', value: 1, filled: false, hideValue: true }
];

const ALERT_CARD_3_TITLE = 'Alert Card ( Border colored to most significant warning level. )';
const ALERT_CARD_3_FILLED = false;
const ALERT_CARD_3_DATA = [
  { level: 2, title: 'Level 2', value: 1, filled: true, hideValue: false },
  { level: 3, title: 'Level 3', value: 1, filled: true, hideValue: true },
  { level: 4, title: 'Level 4', value: 1, filled: false, hideValue: false },
  { level: 5, title: 'Level 5', value: 1, filled: false, hideValue: true }
];

const ALERT_CARD_4_TITLE = 'Alert Card ( Not filled, with contents filled / values shown.  Levels 2 - 4 coloured as Warnings )';
const ALERT_CARD_4_FILLED = false;
const ALERT_CARD_4_DATA = [
  { level: 0, title: 'Level 0', value: 1, filled: true, hideValue: false },
  { level: 1, title: 'Level 1', value: 1, filled: true, hideValue: false },
  { level: 2, title: 'Level 2', value: 1, filled: true, hideValue: false },
  { level: 3, title: 'Level 3', value: 1, filled: true, hideValue: false },
  { level: 4, title: 'Level 4', value: 1, filled: true, hideValue: false },
  { level: 5, title: 'Level 5', value: 1, filled: true, hideValue: false },
  { level: 6, title: 'Level 6', value: 1, filled: true, hideValue: false }
];

const STATUS_LEVEL = 1;
const STATUS_SIZE = 50;

const ReactSkeleton = () => {
  const { t } = useTranslation();
  const { telescope, user } = storageObject.useStore();

  return (
    <>
      <AlertCard title={ALERT_CARD_1_TITLE} array={ALERT_CARD_1_DATA} filled={ALERT_CARD_1_FILLED} />
      <Grid
        container
        spacing={0}
        direction="row"
        alignItems="center"
        justifyContent="space-between"
      >
        <Grid item>
          <AlertCard title={ALERT_CARD_2_TITLE} array={ALERT_CARD_2_DATA} filled={ALERT_CARD_2_FILLED} />
        </Grid>

        <Grid item>
          <Box>
            <Card variant="outlined">
              <p>{t('language')}</p>
              {false && <p>{t('date_format_one', { date: new Date() })}</p>}
              {false && <p>{t('date_format_two', { date: new Date() })}</p>}
              {false && <p>{t('intlNumber', { val: 2000 })}</p>}
              <Status level={STATUS_LEVEL} size={STATUS_SIZE} />
              <p>{telescope?.name}</p>
              <p>{user?.username}</p>
              <p>{t('dummy')}</p>
            </Card>
          </Box>
        </Grid>
        <Grid item>
          <AlertCard title={ALERT_CARD_3_TITLE} array={ALERT_CARD_3_DATA} filled={ALERT_CARD_3_FILLED} />
        </Grid>
      </Grid>
      <AlertCard title={ALERT_CARD_4_TITLE} array={ALERT_CARD_4_DATA} filled={ALERT_CARD_4_FILLED} />
    </>
  );
};

export default ReactSkeleton;
