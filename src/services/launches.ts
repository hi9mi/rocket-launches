import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { TLaunch } from '../types';

import {
  PAST_LAUNCHES_QUERY,
  SPACEX_LAUNCHES_BASE_URL,
  UPCOMING_LAUNCHES_QUERY,
} from '../constants/api';

const transformResponse = (response: any[]) =>
  response.map((launch) => ({
    missionName: launch.mission_name,
    rocketName: launch.rocket.rocket_name,
    details: launch.details,
  }));

const launchesApi = createApi({
  reducerPath: 'launchesApi',
  baseQuery: fetchBaseQuery({ baseUrl: SPACEX_LAUNCHES_BASE_URL }),
  tagTypes: ['past', 'upcoming'],
  endpoints: (build) => ({
    getPastLaunches: build.query<TLaunch[], void>({
      query: () => ({
        url: PAST_LAUNCHES_QUERY,
      }),
      transformResponse,
      providesTags: ['past'],
    }),
    getUpcomingLaunches: build.query<TLaunch[], void>({
      query: () => ({
        url: UPCOMING_LAUNCHES_QUERY,
      }),
      transformResponse,
      providesTags: ['upcoming'],
    }),
  }),
});

export const { useGetPastLaunchesQuery, useGetUpcomingLaunchesQuery } =
  launchesApi;
export { launchesApi };
