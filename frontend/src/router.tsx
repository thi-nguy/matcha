import { createBrowserRouter } from 'react-router-dom';

import App from './App';
import ConfirmCodePage from './pages/ConfirmCode';
import LoginPage from './pages/login';
import SignupPage from './pages/signup';
import RecoverPasswordPage from './pages/recoverPassword';
import ProfilEditPage from './pages/profile/edit';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App/>,
  },
  {
    path: '/confirm-code',
    element: <ConfirmCodePage/>
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
  },
  {
    path: '/app/profile/edit',
    element: <ProfilEditPage/>
  }
]);

export default router;
