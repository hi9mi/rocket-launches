import styles from './Launch.module.css';

import clsx from 'clsx';
import { useDrag } from 'react-dnd';
import { useNavigate } from 'react-router-dom';

type LaunchProps = {
  missionName: string;
  rocketName: string;
  details: string;
  type: string;
  forbidDrag?: boolean;
};

const Launch = ({
  missionName,
  rocketName,
  details,
  forbidDrag,
  type,
}: LaunchProps) => {
  const navigate = useNavigate();
  const [{ isDragging }, drag] = useDrag(() => ({
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    item: {
      missionName,
      rocketName,
    },
    canDrag: !forbidDrag,
    type,
  }));

  const goToDetailsHandler = () => {
    navigate(`/details/${type}/${missionName}`, {
      state: { missionName, rocketName, details },
    });
  };

  return (
    <li
      className={clsx(styles.launch, {
        [styles.dragging]: isDragging,
      })}
      onClick={goToDetailsHandler}
      ref={drag}
    >
      <h3 className={styles.launch__name}>{missionName}</h3>
      <p className={styles.launch__rocket}>{rocketName}</p>
    </li>
  );
};

export { Launch };
