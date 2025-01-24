import React from 'react';
import { useTranslation } from 'react-i18next';
import { useMsal, MsalAuthenticationTemplate } from '@azure/msal-react';
import {
  Button,
  ButtonColorTypes,
  ButtonLogin,
  ButtonVariantTypes,
  CopyrightModal,
  Footer,
  Header,
  SPACER_VERTICAL,
  Spacer
} from '@ska-telescope/ska-gui-components';
import { storageObject } from '@ska-telescope/ska-gui-local-storage';
import { InteractionType , InteractionRequiredAuthError, InteractionStatus } from '@azure/msal-browser';
import { Box, IconButton, Paper, Tooltip } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { getMsEntraProfilePicture } from '../../services/graph/graph';
import {
  ALLOW_MOCK_USER_PERMISSIONS,
  SPACER_FOOTER,
  SPACER_HEADER,
  VERSION
} from '../../utils/constants';
import MockPermissionsButton from '../Auth/MockAuth/MockPermissionsButton/MockPermissionsButton';
import MockPermissionsDialogs from '../Auth/MockAuth/MockPermissionsDialogs/MockPermissionsDialogs';
import User from '../User/User';

function TheHeader(setOpenUser: {
  (newOpen: boolean): () => void;
  (arg0: boolean): React.MouseEventHandler<HTMLButtonElement> | undefined;
}): React.JSX.Element {
  const { t } = useTranslation('authentication');
  const skao = t('toolTip.button.skao', { ns: 'authentication' });
  const mode = t('toolTip.button.mode', { ns: 'authentication' });
  const toolTip = { skao, mode };
  const getDocs = () => {
    const headerTip = t('toolTip.button.docs');
    const headerURL = t('toolTip.button.docsURL');
    return { tooltip: headerTip, url: headerURL };
  };
  const { help, helpToggle, themeMode, toggleTheme } = storageObject.useStore();
  const theStorage = {
    help,
    helpToggle,
    themeMode: themeMode.mode,
    toggleTheme
  };
  const { instance, inProgress, accounts } = useMsal();
  const username = accounts.length > 0 ? accounts[0].name : '';
  const [photo, setPhoto] = React.useState<string | null | undefined>(null);

  function ProfileIcon() {
    React.useEffect(() => {
      if (!photo && inProgress === InteractionStatus.None) {
        const accessTokenRequest = {
          scopes: ['user.read'],
          account: accounts[0]
        };
        instance
          .acquireTokenSilent(accessTokenRequest)
          .then((accessTokenResponse) => {
            const { accessToken } = accessTokenResponse;
            getMsEntraProfilePicture(accessToken).then((response) => {
              setPhoto(response);
            });
          })
          .catch((error) => {
            if (error instanceof InteractionRequiredAuthError) {
              instance.acquireTokenPopup(accessTokenRequest).then((accessTokenResponse) => {
                const { accessToken } = accessTokenResponse;
                getMsEntraProfilePicture(accessToken).then((response) => {
                  setPhoto(response);
                });
              });
            }
          });
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [instance, accounts, inProgress, photo]);
  }

  ProfileIcon();

  const signIn = () => (
    <>
      <MsalAuthenticationTemplate interactionType={InteractionType.None} />
      <MockPermissionsButton />
      {username && (
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
          aria-label={username}
          color={ButtonColorTypes.Secondary}
          label={username}
          onClick={setOpenUser(true)}
          testId="userName"
          toolTip={t('toolTip.button.user', { ns: 'authentication' })}
          variant={ButtonVariantTypes.Contained}
        />
      )}
      {username && (
        <Tooltip
          data-testid="usernameIcon"
          title={t('toolTip.button.user', { ns: 'authentication' })}
          arrow
        >
          <span>
            <IconButton
              aria-label={t('toolTip.button.user', { ns: 'authentication' })}
              onClick={setOpenUser(true)}
              style={{ cursor: 'pointer' }}
            >
              {true ? (
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
                    style={{ borderColor: 'secondary' }}
                  />
                </Box>
              )}
            </IconButton>
          </span>
        </Tooltip>
      )}
      {!username && (
        <ButtonLogin label={t('button.signIn')} variant={ButtonVariantTypes.Contained} />
      )}
    </>
  );

  return (
    <Header
      docs={getDocs()}
      title={t('application')}
      testId="skaHeader"
      toolTip={toolTip}
      storage={theStorage}
    >
      {signIn()}
    </Header>
  );
}

export function TheFooter(): React.JSX.Element {
  const [showCopyright, setShowCopyright] = React.useState(false);

  return (
    <>
      <CopyrightModal copyrightFunc={setShowCopyright} show={showCopyright} />
      <Footer copyrightFunc={setShowCopyright} testId="footerId" version={VERSION} />
    </>
  );
}

export interface LayoutProps {
  children: JSX.Element;
}

export function Shell({ children }: LayoutProps) {
  const [openUser, setOpenUser] = React.useState(false);
  const { accounts } = useMsal();
  const username = accounts.length > 0 ? accounts[0].name : '';

  React.useEffect(() => {
    if (username === '') {
      setOpenUser(false);
    }
  }, [username]);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpenUser(newOpen);
  };

  return (
    <Paper elevation={0} sx={{ height: '100%', backgroundColor: 'primary.main' }}>
      {TheHeader(toggleDrawer)}
      <User open={openUser} toggleDrawer={toggleDrawer} />
      <Paper
        elevation={0}
        sx={{
          backgroundColor: 'primary.main',
          width: '100vw',
          minHeight: '100vh'
        }}
      >
        <div>
          <Spacer size={SPACER_HEADER} axis={SPACER_VERTICAL} />
          <main>{children}</main>
          <Spacer size={SPACER_FOOTER} axis={SPACER_VERTICAL} />
        </div>
      </Paper>
      {ALLOW_MOCK_USER_PERMISSIONS ? <MockPermissionsDialogs /> : null}
      {TheFooter()}
    </Paper>
  );
}
