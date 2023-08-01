import React from 'react';
import { useTranslation } from 'react-i18next';
import { ButtonToggle } from '@ska-telescope/ska-gui-components';
import { Telescope, TelescopeList } from '../../services/types/telescope';
import { storageObject } from '../../services/stateStorage';

export const TelescopeToggle = () => {
  const { t } = useTranslation();
  const { telescope, updateTelescope } = storageObject.useStore();

  const telescopeChange = (_event: React.MouseEvent<HTMLElement>, newTelescope: Telescope) => {
    if (newTelescope) {
      updateTelescope(newTelescope);
    }
  };

  const getOptions = (
    inList: {
      code: string;
      name: string;
      location: string;
      position: {
        lat: number;
        lon: number;
      };
      image: string;
    }[]
  ) => {
    const results: { id: string; label: string; value: Telescope }[] = [];
    inList.forEach((el: Telescope): void => {
      results.push({ id: el.code, label: el.name, value: el });
    });
    return results;
  };

  return (
    <ButtonToggle
      current={telescope.code}
      label={t('label.button.telescopeToggle')}
      options={getOptions(TelescopeList)}
      setValue={telescopeChange}
      toolTip={t('toolTip.button.telescopeToggle')}
      value={telescope}
    />
  );
};

export default TelescopeToggle;
