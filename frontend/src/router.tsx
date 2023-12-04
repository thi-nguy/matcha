import { createBrowserRouter } from 'react-router-dom';

import App from './App';
import LoginPage from './pages/login';
import SignupPage from './pages/signup';
import RecoverPasswordPage from './pages/recoverPassword';

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
  },
  {
    path: '/recover-password',
    element: <RecoverPasswordPage/>
  }
]);

export default router;
