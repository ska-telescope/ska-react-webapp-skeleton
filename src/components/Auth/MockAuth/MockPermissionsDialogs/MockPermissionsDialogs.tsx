import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Checkbox,
  FormControlLabel,
  Grid,
  Typography
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import {
  Button,
  ButtonColorTypes,
  ButtonVariantTypes,
  DropDown
} from '@ska-telescope/ska-gui-components';
import DoNotDisturbAltOutlinedIcon from '@mui/icons-material/DoNotDisturbAltOutlined';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { storageObject } from '@ska-telescope/ska-gui-local-storage';
import { TELESCOPE_LOW, TELESCOPE_MID } from '@ska-telescope/ska-javascript-components';
import { ROLES, IS_DEV, ALLOW_MOCK_USER_PERMISSIONS } from '../../../../utils/constants';

// TODO : Once the Dummy users have been removed, maxWidth property should be removed from Dialog

// NOTE : HARD CODED COLOR IN CHECK BOXES AS THEY ARE ONLY TEMPORARY

const MSG = 'Buttons below simulate user permissions whilst we are in this development phase';

const MockPermissionsDialogs = () => {
  const { t } = useTranslation('authentication');
  const [selectedUserRole, setSelectedUserRole] = React.useState(''); // Username selected on modal

  const [open, setOpen] = React.useState(false);
  const [midChecked, setMidChecked] = React.useState(false);
  const [lowChecked, setLowChecked] = React.useState(false);
  const { application, updateAppContent2 } = storageObject.useStore();
  const { updateAccess } = storageObject.useStore();

  React.useEffect(() => {
    if (ALLOW_MOCK_USER_PERMISSIONS) {
      const newAccess = {
        telescopes: [lowChecked ? TELESCOPE_LOW.code : '', midChecked ? TELESCOPE_MID.code : ''],
        menu: {
          too: [{ title: 'Dummy Title', path: 'Dummy Path' }],
          top: [],
          dev: [],
          obs: [],
          res: [],
          def: [],
          lnk: []
        }
      };
      updateAccess(newAccess);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [midChecked, lowChecked, selectedUserRole]);

  const CancelFunction = () => {
    // eslint-disable-next-line no-empty
  };

  const handleClose = () => {
    updateAppContent2(false);
  };

  React.useEffect(() => {
    setOpen(application.content2 === true);
  }, [application.content2]);

  const cancelClicked = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    handleClose();
    CancelFunction();
  };

  return (
    <div id="loginId">
      <Dialog maxWidth="xl" open={open} onClose={handleClose}>
        <DialogContent>
          {IS_DEV && (
            <Grid container direction="row" justifyContent="space-evenly">
              <Grid>
                <Typography fontSize="h4">{MSG}</Typography>
              </Grid>
            </Grid>
          )}

          {IS_DEV && (
            <Grid container direction="row" justifyContent="space-evenly">
              <Grid item xs={3}>
                <DropDown
                  label="ROLE"
                  options={ROLES}
                  setValue={setSelectedUserRole}
                  testId="roleDropDown"
                  value={selectedUserRole}
                />
              </Grid>
              <Grid>
                <FormControlLabel
                  value="MID TELESCOPE"
                  control={
                    <Checkbox
                      checked={midChecked}
                      onChange={() => setMidChecked(!midChecked)}
                      sx={{
                        '&.Mui-checked': {
                          color: 'green'
                        }
                      }}
                    />
                  }
                  label="MID TELESCOPE"
                  labelPlacement="start"
                  sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }}
                />
              </Grid>
              <Grid>
                <FormControlLabel
                  value="LOW TELESCOPE"
                  control={
                    <Checkbox
                      checked={lowChecked}
                      onChange={() => setLowChecked(!lowChecked)}
                      sx={{
                        '&.Mui-checked': {
                          color: 'green'
                        }
                      }}
                    />
                  }
                  label="LOW TELESCOPE"
                  labelPlacement="start"
                  sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }}
                />
              </Grid>
            </Grid>
          )}
          <Box>
            <Card variant="outlined">
              <CardContent>
                <Box component="form" noValidate sx={{ mt: 1 }}>
                  <Grid container spacing={2} alignItems="center" justifyContent="flex-end">
                    <Grid item>
                      <Button
                        ariaDescription={t('button.confirm')}
                        color={ButtonColorTypes.Error}
                        icon={<DoNotDisturbAltOutlinedIcon />}
                        label={t('button.close')}
                        onClick={(e: { preventDefault: () => void }) => cancelClicked(e)}
                        testId="loginCancel"
                        variant={ButtonVariantTypes.Contained}
                      />
                    </Grid>
                  </Grid>
                </Box>
              </CardContent>
            </Card>
          </Box>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MockPermissionsDialogs;
