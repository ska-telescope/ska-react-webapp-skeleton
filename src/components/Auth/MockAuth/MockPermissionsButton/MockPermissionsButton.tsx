import React from 'react';
import { Button, ButtonColorTypes, ButtonVariantTypes } from '@ska-telescope/ska-gui-components';
import GroupIcon from '@mui/icons-material/Group';
import { useTranslation } from 'react-i18next';
import { storageObject } from '@ska-telescope/ska-gui-local-storage';
import { ALLOW_MOCK_USER_PERMISSIONS } from '../../../../utils/constants';

export interface UserProps {
  loginClicked: Function;
}

const MockPermissionsButton = (): React.JSX.Element => {
  const { t } = useTranslation('authentication');
  const { updateAppContent2 } = storageObject.useStore();

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {ALLOW_MOCK_USER_PERMISSIONS ? (
        <Button
          ariaDescription={t('button.confirm')}
          color={ButtonColorTypes.Secondary}
          icon={<GroupIcon />}
          label={t('button.setUserPermissions')}
          onClick={() => updateAppContent2(true)}
          testId="setUserPermissionButton"
          variant={ButtonVariantTypes.Contained}
        />
      ) : null}
    </>
  );
};

export default MockPermissionsButton;
