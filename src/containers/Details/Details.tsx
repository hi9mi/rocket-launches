import styles from './Details.module.css';

import { useLocation, useNavigate } from 'react-router-dom';

type LocationState = {
  missionName: string;
  rocketName: string;
  details: string;
};

const Details = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { missionName, rocketName, details } = location.state as LocationState;

  const goToHomeHandler = () => {
    navigate('/');
  };

  return (
    <div>
      <div className={styles.wrapper}>
        <button className={styles.button} onClick={goToHomeHandler}>
          Back
        </button>
        <h2>{missionName} flight details page</h2>
      </div>
      <p>Rocket: {rocketName}</p>
      <p>Details: {details ? details : 'no details'}</p>
    </div>
  );
};

export { Details };
