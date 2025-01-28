import React from 'react';
import { IconButton, Tooltip } from '@mui/material';
import { Box } from '@mui/system';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Button, ButtonColorTypes, ButtonVariantTypes } from '@ska-telescope/ska-gui-components';

export interface ButtonUserProps {
  label?: string;
  onClick?: Function;
  photo?: undefined | null | string;
  toolTip: string;
  showName?: boolean;
}

export function ButtonUser({
  label = 'username',
  onClick,
  photo,
  showName = true,
  toolTip
}: ButtonUserProps): JSX.Element {
  return (
    <>
      {showName && (
        <Button
          icon={
            photo ? (
              <img
                src={photo}
                alt="Profile"
                style={{ borderRadius: '50%', width: '32px', height: '32px', objectFit: 'cover' }}
              />
            ) : (
              <AccountCircleIcon />
            )
          }
          aria-label={label}
          color={ButtonColorTypes.Secondary}
          label={label}
          onClick={onClick ? onClick() : null}
          testId="userName"
          toolTip={toolTip}
          variant={ButtonVariantTypes.Contained}
        />
      )}
      {!showName && (
        <Tooltip data-testid="usernameIcon" title={toolTip} arrow>
          <span>
            <IconButton
              aria-label={toolTip}
              onClick={onClick ? onClick() : null}
              style={{ cursor: 'pointer' }}
            >
              {photo ? (
                <Box
                  sx={{
                    border: 3,
                    borderColor: 'secondary.main',
                    borderRadius: '50%',
                    height: 42,
                    width: 44
                  }}
                >
                  <img
                    src={photo}
                    alt="Profile"
                    style={{ paddingTop: 3, borderRadius: '50%', width: '30px' }}
                  />
                </Box>
              ) : (
                <Box
                  sx={{
                    border: 3,
                    borderColor: 'secondary.main',
                    borderRadius: '50%',
                    height: 42,
                    width: 44
                  }}
                >
                  <AccountCircleIcon
                    fontSize="large"
                    color="secondary"
                    style={{ paddingTop: 3, borderColor: 'secondary' }}
                  />
                </Box>
              )}
            </IconButton>
          </span>
        </Tooltip>
      )}
    </>
  );
}
