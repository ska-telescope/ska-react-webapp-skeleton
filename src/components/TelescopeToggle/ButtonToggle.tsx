import React from 'react';
import { ToggleButton, ToggleButtonGroup, Tooltip } from '@mui/material';

export interface ButtonToggleProps {
  // required
  current: string;
  label: string;
  options: { id: string; label: string; value: string }[];
  setValue?: Function;
  // optional
  toolTip?: string;
  value?: string | number;
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
  const fetchValue = (id: string) => options[options[0].id === id ? 0 : 1].value;

  const updateValue = (e: string | number, id: string) =>
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
          (option: { id: string; label: string; value: string | number }): JSX.Element => (
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
          )
        )}
      </ToggleButtonGroup>
    </Tooltip>
  );
}

// type="password"
// autoComplete="current-password"

ButtonToggle.defaultProps = {
  setValue: null,
  toolTip: '',
  value: null
};

export default ButtonToggle;
