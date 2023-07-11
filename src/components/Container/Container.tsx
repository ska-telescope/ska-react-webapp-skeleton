import React from 'react';
import { useTranslation } from 'react-i18next';
import { storageObject } from '../../services/stateStorage/store';
import QuerySearch from '../QuerySearch/QuerySearch';

const Container = () => {
  const { t } = useTranslation();
  const { telescope, user } = storageObject.useStore();

  return (
    <>
      <QuerySearch />
    </>
  );
};

export default Container;
