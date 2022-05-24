import styles from './LaunchesList.module.css';

import { PropsWithChildren } from 'react';
import { useDrop } from 'react-dnd';
import clsx from 'clsx';

import {
  setMyLaunch,
  removeMyLaunch,
} from '../../store/reducers/myLaunchesSlice';
import {
  removeUpcomingLaunch,
  setUpcomingLaunch,
} from '../../store/reducers/upcomingLaunchesSlice';
import { useAppDispatch } from '../../store/store';
import { TLaunch } from '../../types';

type LaunchesListProps = PropsWithChildren<{
  title: string;
  accept: string;
  forbidDrop?: boolean;
}>;

const LaunchesList = ({
  children,
  title,
  accept,
  forbidDrop,
}: LaunchesListProps) => {
  const dispatch = useAppDispatch();
  const [{ isOver }, drop] = useDrop(() => ({
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
    drop(item, monitor) {
      const didDrop = monitor.didDrop();
      if (accept === 'launches' && !didDrop) {
        dispatch(setMyLaunch(item as TLaunch));
        dispatch(removeUpcomingLaunch(item as TLaunch));
      }
      if (accept === 'my-launches' && !didDrop) {
        dispatch(setUpcomingLaunch(item as TLaunch));
        dispatch(removeMyLaunch(item as TLaunch));
      }
    },
    canDrop: () => !forbidDrop,
    accept,
  }));

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>{title}</h3>
      <ul ref={drop} className={clsx(styles.list, { [styles.isOver]: isOver })}>
        {children}
      </ul>
    </div>
  );
};

export { LaunchesList };
