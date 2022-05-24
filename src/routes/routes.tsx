import { Details } from '../containers/Details';
import { Home } from '../containers/Home';

const routesConfig = [
  { path: '/', element: <Home /> },
  { path: '/details/:type/:missionName', element: <Details /> },
];

export { routesConfig };
