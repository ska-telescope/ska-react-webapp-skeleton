import React from 'react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { save, load } from 'redux-localstorage-simple';
import dynamicMiddlewares from 'redux-dynamic-middlewares';
import createSagaMiddleware from 'redux-saga';
import { TELESCOPE_LOW, THEME_DARK } from '@ska-telescope/ska-gui-components';
import {
  telescopeSliceActions,
  telescopeSliceReducer
} from '../redux-telescope/slices/telescopeSlice';
import { themeSliceActions, themeSliceReducer } from '../redux-theme/slices/themeSlice';
import { userSliceActions, userSliceReducer } from '../redux-user/slices/userSlice';

import { Telescope } from '../types/telescope';
import { User } from '../types/user';

const rootReducer = {
  telescope: telescopeSliceReducer,
  themeMode: themeSliceReducer,
  user: userSliceReducer
};
const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware, save(), dynamicMiddlewares];
const preLoadedState = load();

const storage = configureStore({
  reducer: rootReducer,
  middleware,
  preloadedState: preLoadedState
});

function initStore() {
  return storage;
}

interface StoreProviderProps {
  children?: React.ReactNode;
}

export function StoreProvider({ children }: StoreProviderProps) {
  const store = initStore();
  return <Provider store={store}>{children}</Provider>;
}

export type RootState = ReturnType<typeof storage.getState>;

export const storageObject = {
  useStore() {
    const telescope = useSelector((state: RootState) =>
      state?.telescope?.telescope ? state.telescope.telescope : TELESCOPE_LOW
    );
    const themeMode = useSelector((state: RootState) => state.themeMode);
    const user = useSelector((state: RootState) => state.user?.user);

    const darkMode = themeMode?.mode === THEME_DARK;
    const dispatch = useDispatch();
    return {
      telescope,
      updateTelescope: (inValue: Telescope) => dispatch(telescopeSliceActions.change(inValue)),
      //
      themeMode,
      darkMode,
      toggleTheme: () => dispatch(themeSliceActions.toggle()),
      //
      user,
      clearUser: () => dispatch(userSliceActions.clear()),
      updateUser: (inValue: User) => dispatch(userSliceActions.update(inValue))
    };
  }
};

StoreProvider.defaultProps = {
  children: null
};
