import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { TLaunch } from '../../types';

export type MyLaunchesSliceState = {
  launches: null | TLaunch[];
};

const initialState: MyLaunchesSliceState = {
  launches: null,
};

const myLaunchesSlice = createSlice({
  name: 'myLaunches',
  initialState,
  reducers: {
    setMyLaunch: (state, action: PayloadAction<TLaunch>) => {
      state.launches
        ? state.launches.push(action.payload)
        : (state.launches = [action.payload]);
    },
    removeMyLaunch: (state, action: PayloadAction<TLaunch>) => {
      if (state.launches) {
        const index = state.launches.findIndex(
          (launch) => launch.missionName === action.payload.missionName
        );
        if (index > -1) {
          state.launches.splice(index, 1);
        }
      }
    },
  },
});

export const { setMyLaunch, removeMyLaunch } = myLaunchesSlice.actions;
export const myLaunchesReducer = myLaunchesSlice.reducer;
