import React from 'react';
import { ToggleButton, ToggleButtonGroup, Tooltip } from '@mui/material';

export interface ButtonToggleProps {
  // required
  current: string;
  label: string;
  options: { id: string; label: string; value: any }[];
  setValue?: Function;
  // optional
  toolTip: string;
  value: any;
}

export function ButtonToggle({
  current,
  label,
  setValue,
  value,
  options,
  toolTip
}: ButtonToggleProps): JSX.Element {
  // MOTE: this will need to be changed should we want to extend to more than 2 options
  const fetchValue = (id: string) => {
    return options[options[0].id === id ? 0 : 1].value;
  };

  const updateValue = (e: any, id: string) =>
    typeof setValue !== 'undefined' ? setValue(e, fetchValue(id)) : null;

  return (
    <Tooltip title={toolTip} arrow>
      <ToggleButtonGroup
        color="secondary"
        value={value}
        exclusive
        onChange={updateValue}
        aria-label={label}
      >
        {options.map(
          (option: { id: string; label: string; value: any }): JSX.Element => {
            return (
              <ToggleButton
                id={option.id}
                aria-label={option.id}
                key={option.id}
                selected={option.id === current}
                value={option.id}
                sx={{
                  '&.Mui-selected': {
                    color: 'primary.main',
                    backgroundColor: 'secondary.main',
                    fontWeight: 'bold'
                  },
                  '&.Mui-focusVisible': {
                    color: 'primary.main',
                    backgroundColor: 'secondary.dark'
                  },
                  ':hover': {
                    color: 'primary.main',
                    backgroundColor: 'secondary.dark'
                  }
                }}
              >
                {option.label}
              </ToggleButton>
            );
          }
        )}
      </ToggleButtonGroup>
    </Tooltip>
  );
}

//type="password"
//autoComplete="current-password"

ButtonToggle.defaultProps = {
  toolTip: ''
};

export default ButtonToggle;
