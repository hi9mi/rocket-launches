import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import { launchesApi } from '../services/launches';
import { myLaunchesReducer } from './reducers/myLaunchesSlice';
import { upcomingLaunchesReducer } from './reducers/upcomingLaunchesSlice';

const rootReducer = combineReducers({
  [launchesApi.reducerPath]: launchesApi.reducer,
  upcomingLaunches: upcomingLaunchesReducer,
  myLaunches: myLaunchesReducer,
});

const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(launchesApi.middleware),
  });
};

const store = setupStore();

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export { store };
