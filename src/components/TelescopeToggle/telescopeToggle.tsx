import React from 'react';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import { Telescope, TelescopeList } from '../../services/types/telescope';
import { storageObject } from '../../services/stateStorage/store';
import { Key } from 'react';

export const TelescopeToggle = () => {
  const { telescope, updateTelescope } = storageObject.useStore();

  const telescopeChange = (_event: React.MouseEvent<HTMLElement>, newTelescope: Telescope) => {
    if (newTelescope) {
      updateTelescope(newTelescope);
    }
  };

  return (
    <ToggleButtonGroup
      color="secondary"
      value={telescope}
      exclusive
      onChange={telescopeChange}
      aria-label="Platform"
    >
      {TelescopeList.map(
        (tel: Telescope, key: Key | null | undefined): JSX.Element => {
          return (
            <ToggleButton
              id={tel.name + ' ButtonId'}
              key={key}
              selected={tel.code === telescope.code}
              value={tel}
              sx={{
                '&.Mui-selected': {
                  backgroundColor: 'primary.dark'
                },
                '&.Mui-focusVisible': {
                  backgroundColor: 'primary.dark'
                },
                ':hover': {
                  backgroundColor: 'primary.main'
                }
              }}
            >
              {tel.name}
            </ToggleButton>
          );
        }
      )}
    </ToggleButtonGroup>
  );
};

export default TelescopeToggle;
