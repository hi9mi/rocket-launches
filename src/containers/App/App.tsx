import styles from './App.module.css';

import { useRoutes } from 'react-router-dom';

import { Home } from '../Home';
import { Header } from '../../components/Header';

import { routesConfig } from '../../routes/routes';

const App = () => {
  const routes = useRoutes(routesConfig);

  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.wrapper}>{routes}</main>
    </div>
  );
};

export { App };
