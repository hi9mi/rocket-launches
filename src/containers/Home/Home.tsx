import styles from './Home.module.css';

import { useEffect } from 'react';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';

import { Launch } from '../../components/Launch';
import { LaunchesList } from '../../components/LaunchesList';
import { LaunchSkeleton } from '../../components/LaunchSkeleton';

import {
  useGetPastLaunchesQuery,
  useGetUpcomingLaunchesQuery,
} from '../..//services/launches';
import { setUpcomingLaunches } from '../../store/reducers/upcomingLaunchesSlice';
import { useAppDispatch, useAppSelector } from '../../store/store';

const Home = () => {
  const dispatch = useAppDispatch();
  const {
    data: pastLaunchesData,
    isError: isLastError,
    isFetching: isLastFeching,
  } = useGetPastLaunchesQuery();
  const {
    data: upcomingLaunchesData,
    isError: isUpcomingError,
    isFetching: isUpcomingFetching,
  } = useGetUpcomingLaunchesQuery();
  const upcomingLaunches = useAppSelector(
    (state) => state.upcomingLaunches.launches
  );
  const myLaunches = useAppSelector((state) => state.myLaunches.launches);

  useEffect(() => {
    if (
      !isUpcomingError &&
      !isUpcomingFetching &&
      upcomingLaunchesData &&
      !upcomingLaunches
    ) {
      dispatch(setUpcomingLaunches(upcomingLaunchesData));
    }
  }, [
    isUpcomingError,
    isUpcomingFetching,
    upcomingLaunchesData,
    dispatch,
    upcomingLaunches,
  ]);

  const launchesIsNotReady =
    isLastError || isUpcomingError || isLastFeching || isUpcomingFetching;

  return (
    <div className={styles.container}>
      <DndProvider backend={HTML5Backend}>
        <LaunchesList title="Past Launches" accept="past-launches" forbidDrop>
          {launchesIsNotReady
            ? Array.from({ length: 3 }).map((_, index) => (
                <LaunchSkeleton key={index} />
              ))
            : pastLaunchesData?.map((launch) => (
                <Launch
                  key={launch.missionName}
                  missionName={launch.missionName}
                  rocketName={launch.rocketName}
                  details={launch.details}
                  type="past-launches"
                  forbidDrag
                />
              ))}
        </LaunchesList>
        <LaunchesList title="Launches" accept="my-launches">
          {launchesIsNotReady
            ? Array.from({ length: 3 }).map((_, index) => (
                <LaunchSkeleton key={index} />
              ))
            : upcomingLaunches?.map((launch) => (
                <Launch
                  key={launch.missionName}
                  missionName={launch.missionName}
                  rocketName={launch.rocketName}
                  details={launch.details}
                  type="launches"
                />
              ))}
        </LaunchesList>
        <LaunchesList title="My Launches" accept="launches">
          {myLaunches?.map((launch) => (
            <Launch
              key={launch.missionName}
              missionName={launch.missionName}
              rocketName={launch.rocketName}
              details={launch.details}
              type="my-launches"
            />
          ))}
        </LaunchesList>
      </DndProvider>
    </div>
  );
};

export { Home };
