/*
This component provides a working example of a custom shell from displaying the various parts of a standard
SKAO application using existing components as provided by SKAO libraries. If a standard layout is required, 
it is recommended to use the AuthWrapper that is provided via the ska-login-page library, which has an example
implementation available within App.tsx
*/

import React from 'react';
import { useTranslation } from 'react-i18next';
import { useMsal, MsalAuthenticationTemplate } from '@azure/msal-react';
import {
  ButtonColorTypes,
  CopyrightModal,
  Footer,
  Header,
  SPACER_VERTICAL,
  Spacer
} from '@ska-telescope/ska-gui-components';
import { storageObject } from '@ska-telescope/ska-gui-local-storage';
import {
  InteractionType,
  InteractionRequiredAuthError,
  InteractionStatus
} from '@azure/msal-browser';
import { Paper } from '@mui/material';
import { ButtonLogin, ButtonUser, ButtonUserMenu } from '@ska-telescope/ska-login-page';
import { getMsEntraProfilePicture } from '../../services/graph/graph';
import { SPACER_FOOTER, SPACER_HEADER, VERSION } from '../../utils/constants';
import User from '../User/User';

const USE_MENU = true; // DEtermines if the logout will be presented in a menu under the button or via a slide-out panel

function TheHeader(setOpenUser: {
  (newOpen: boolean): () => void;
  (arg0: boolean): React.MouseEventHandler<HTMLButtonElement> | undefined;
}): React.JSX.Element {
  const { t } = useTranslation('authentication');
  const skao = t('iconSKAO.toolTip', { ns: 'common' });
  const mode = t('iconTheme.toolTip', { ns: 'common' });
  const toolTip = { skao, mode };
  const getDocs = () => {
    const headerTip = t('iconDocs.toolTip', { ns: 'common' });
    const headerURL = t('iconDocs.url', { ns: 'common' });
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
    }, [instance, accounts, inProgress, photo]);
  }

  ProfileIcon();

  const signIn = () => (
      <>
        <MsalAuthenticationTemplate interactionType={InteractionType.None} />
        {username && !USE_MENU && (
          <ButtonUser
            label={username}
            onClick={() => setOpenUser(true)}
            photo={photo}
            toolTip={t('buttonUser.tooltip', { ns: 'authentication' })}
            showUsername
            color={ButtonColorTypes.Inherit}
          />
        )}
        {username && USE_MENU && (
                    <ButtonUserMenu
                    label={username}
                    photo={photo}
                    toolTip={t('buttonUser.tooltip', { ns: 'authentication' })}
                    showUsername
                    color={ButtonColorTypes.Inherit}
                  />
        )}
        {!username && <ButtonLogin color={ButtonColorTypes.Secondary} />}
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
      {[signIn()]}
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
      {TheFooter()}
    </Paper>
  );
}
