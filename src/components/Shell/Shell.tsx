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
import {
  ALLOW_MOCK_USER_PERMISSIONS,
  SPACER_FOOTER,
  SPACER_HEADER,
  VERSION,
  MSENTRA_CLIENT_ID
} from '../../utils/constants';
import MockPermissionsButton from '../Auth/MockAuth/MockPermissionsButton/MockPermissionsButton';
import MockPermissionsDialogs from '../Auth/MockAuth/MockPermissionsDialogs/MockPermissionsDialogs';
import { InteractionType } from '@azure/msal-browser';
import { Paper } from '@mui/material';
import { loadUserPermissions } from '../../services/PermissionsApi/PermissionsApi';
import { TELESCOPE_LOW, TELESCOPE_MID } from '@ska-telescope/ska-javascript-components';
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
  const { accounts } = useMsal();
  const username = accounts.length > 0 ? accounts[0].name : '';

  const { updateAccess } = storageObject.useStore();

  React.useEffect(() => {
    if (!ALLOW_MOCK_USER_PERMISSIONS) {
      const tokens = sessionStorage.getItem(`msal.token.keys.${MSENTRA_CLIENT_ID}`);
      if (tokens) {
        const accessTokenName = JSON.parse(tokens).accessToken[0];
        const accessToken = sessionStorage.getItem(accessTokenName);
        if (accessToken) {
          (async () => {
            try {
              const permissions = await loadUserPermissions(JSON.parse(accessToken).secret);
              let lowChecked = false;
              let midChecked = false;
              const telescopePermissions = permissions.telescope;
              if (telescopePermissions.includes('low')) {
                lowChecked = true;
              } else if (telescopePermissions.includes('mid')) {
                midChecked = true;
              }

              const newAccess = {
                telescopes: [
                  lowChecked ? TELESCOPE_LOW.code : '',
                  midChecked ? TELESCOPE_MID.code : ''
                ],
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
            } catch (error) {
              console.error('Error fetching permissions:', error);
            }
          })();
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const signIn = () => (
    <>
      <MsalAuthenticationTemplate interactionType={InteractionType.None} />
      <MockPermissionsButton />
      {username && (
        <>
        <Button
          aria-label={username}
          color={ButtonColorTypes.Secondary}
          variant={ButtonVariantTypes.Contained}
          label={username}
          onClick={setOpenUser(true)}
          testId="userName"
          toolTip={t('toolTip.button.user', { ns: 'authentication' })}
        />
        </>
      )}
      {!username && (
        <ButtonLogin color={ButtonColorTypes.Secondary} label={t('button.signIn')} variant={ButtonVariantTypes.Contained} />
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
