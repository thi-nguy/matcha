import { createBrowserRouter } from 'react-router-dom';

import App from './App';
import LoginPage from './pages/login';
import SignupPage from './pages/signup';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App/>,
  },
  {
    path: '/login',
    element: <LoginPage/>
  },
  {
    path: '/signup',
    element: <SignupPage/>
  }
]);

export default router;
