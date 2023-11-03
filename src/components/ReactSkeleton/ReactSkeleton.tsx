import React from 'react';
import { Box, Card, CardContent, Grid, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Alert, NumberEntry, TextEntry, Status, Spacer } from '@ska-telescope/ska-gui-components';

const STATUS_LEVEL = 1;
const STATUS_SIZE = 50;

/*
 *  Displaying information from the storage object
 *  ==============================================
 *
 *  import { storageObject } from '@ska-telescope/ska-gui-local-storage';
 *
 *  const { telescope, user } = storageObject.useStore();
 *
 *  <p data-testid="telescopeNameId">{telescope?.name}</p>
 *  <p data-testid="userNameId">{user?.username}</p>
 */

/*
 *  Displaying a number in an international format using i18n
 *  =========================================================
 *
 *  Specific formatting is done within the resource file for the specific language
 *
 *  <p>{t('intlNumber', { val: 2000 })}</p>
 */

/*
 *  Displaying a date in an international format using i18n
 *  ========================================================
 *
 *  Specific formatting is done within the resource file for the specific language
 *
 *  <p>{t('date_format_one', { date: new Date() })}</p>
 *  <p>{t('date_format_two', { date: new Date() })}</p>
 */

const ReactSkeleton = () => {
  const { t } = useTranslation('reactSkeleton');
  const [theNumber, setTheNumber] = React.useState(0);
  const [theText, setTheText] = React.useState('');

  return (
    <>
      <Grid container direction="row" alignItems="center" justifyContent="space-around">
        <Typography data-testid="titleId" variant="h5">
          Welcome
        </Typography>
      </Grid>

      <Spacer />

      <Grid container direction="row" alignItems="center" justifyContent="space-around">
        <Grid item xs={6}>
          <Alert
            ariaDescription="Sample description for screen readers"
            ariaTitle="Sample title for screen readers"
            severity={5}
            testId="alertTestId"
          >
            <Grid container direction="row" alignItems="center" justifyContent="space-around">
              <Grid item xs={2} />
              <Grid item xs={8}>
                <Typography data-testid="text1Id">
                  This is a simple implementation of a REACT Application
                </Typography>
              </Grid>
              <Grid item xs={2} />

              <Grid item xs={2} />
              <Grid item xs={8}>
                <Typography data-testid="text2Id">
                  It is hoped that this is used as a basis for new applications for the SKAO
                </Typography>
              </Grid>
              <Grid item xs={2} />

              <Grid item xs={2} />
              <Grid item xs={8}>
                <Typography data-testid="text3Id" m={2}>
                  A few basic components have been added as examples, as well as the MUI grid which
                  can be used for component layout
                </Typography>
              </Grid>
              <Grid item xs={2} />

              <Grid item xs={3} />
              <Grid item xs={6}>
                <Typography data-testid="text4Id" m={2}>
                  For information on the available gui-components, see the documentation available
                  at this link
                </Typography>
              </Grid>
              <Grid item xs={3} />

              <Grid item>
                <Typography data-testid="text5Id" m={2} variant="body2">
                  https://developer.skao.int/projects/ska-gui-components/en/latest/?badge=latest
                </Typography>
              </Grid>
            </Grid>
          </Alert>
        </Grid>
      </Grid>

      <Grid container direction="row" alignItems="center" justifyContent="space-evenly">
        <Grid data-testid="textLabel" item>
          <Box m={1}>
            <TextEntry
              label={t('label.text')}
              testId="textId"
              value={theText}
              setValue={setTheText}
            />
          </Box>
        </Grid>
        <Grid data-testid="NumberLabel" item>
          <Box m={1}>
            <NumberEntry
              label={t('label.number')}
              testId="numberId"
              value={theNumber}
              setValue={setTheNumber}
            />
          </Box>
        </Grid>
      </Grid>

      <Grid container direction="row" alignItems="center" justifyContent="space-around">
        <Grid item>
          <Card data-testid="cardId" variant="outlined">
            <CardContent>
              <p data-testid="languageId">{t('language')}</p>
              <Status level={STATUS_LEVEL} size={STATUS_SIZE} testId="statusId" />
              <p data-testid="dummyMessageId">{t('dummy')}</p>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default ReactSkeleton;
