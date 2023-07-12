import React from 'react';
import { ToggleButton, ToggleButtonGroup, Tooltip } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Telescope, TelescopeList } from '../../services/types/telescope';
import { storageObject } from '../../services/stateStorage/store';

export const TelescopeToggle = () => {
  const { t } = useTranslation();
  const { telescope, updateTelescope } = storageObject.useStore();

  const telescopeChange = (
    _event: React.MouseEvent<HTMLElement>,
    newTelescope: Telescope,
  ) => {
    if (newTelescope) {
      updateTelescope(newTelescope);
    }
  };

  return (
    <Tooltip title={t('toolTip.button.telescopeToggle')} arrow>
      <ToggleButtonGroup
        color="secondary"
        value={telescope}
        exclusive
        onChange={telescopeChange}
        aria-label="TelescopeToggle"
      >
        {TelescopeList.map(
          (tel: Telescope, key: React.Key | null | undefined): JSX.Element => {
            return (
              <ToggleButton
                id={tel.name + ' ButtonId'}
                aria-label={tel.name + ' ButtonId'}
                key={key}
                selected={tel.code === telescope.code}
                value={tel}
                sx={{
                  '&.Mui-selected': {
                    color: 'primary.main',
                    backgroundColor: 'secondary.main',
                    fontWeight: 'bold',
                  },
                  '&.Mui-focusVisible': {
                    color: 'primary.main',
                    backgroundColor: 'secondary.dark',
                  },
                  ':hover': {
                    color: 'primary.main',
                    backgroundColor: 'secondary.dark',
                  },
                }}
              >
                {tel.name}
              </ToggleButton>
            );
          },
        )}
      </ToggleButtonGroup>
    </Tooltip>
  );
};

export default TelescopeToggle;
