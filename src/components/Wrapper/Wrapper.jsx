/* eslint-disable import/no-unresolved */
import React, { useEffect } from 'react';
import { mount } from 'angularSkeleton/angularSkeleton';

const Wrapper = () => {
  useEffect(() => {
    // TODO : Need to do some error handling to cover if the mount fails for any reason
    mount();
  }, []);
  return (
    <div>
      <app-root />
    </div>
  );
};

export default Wrapper;
