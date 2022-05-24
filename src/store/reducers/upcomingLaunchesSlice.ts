import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { TLaunch } from '../../types';

export type UpcomingLaunchesSliceState = {
  launches: null | TLaunch[];
};

const initialState: UpcomingLaunchesSliceState = {
  launches: null,
};

const upcomingLaunchesSlice = createSlice({
  name: 'upcomingLaunches',
  initialState,
  reducers: {
    setUpcomingLaunches: (state, action: PayloadAction<TLaunch[]>) => {
      state.launches = action.payload;
    },
    setUpcomingLaunch: (state, action: PayloadAction<TLaunch>) => {
      state.launches
        ? state.launches.push(action.payload)
        : (state.launches = [action.payload]);
    },
    removeUpcomingLaunch: (state, action: PayloadAction<TLaunch>) => {
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

export const { setUpcomingLaunch, setUpcomingLaunches, removeUpcomingLaunch } =
  upcomingLaunchesSlice.actions;
export const upcomingLaunchesReducer = upcomingLaunchesSlice.reducer;
