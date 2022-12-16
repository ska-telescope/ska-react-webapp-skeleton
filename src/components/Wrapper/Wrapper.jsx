/* eslint-disable import/no-unresolved */
import React, { useEffect } from 'react';
// import { mount } from 'leftSideBar/leftSideBar';
import { mount } from 'angularSkeleton/angularSkeleton';

const Wrapper = () => {
  useEffect(() => {
    mount();
  }, []);
  return (
    <div>
      <app-root />
    </div>
  );
};

export default Wrapper;
