import { createBrowserRouter } from 'react-router-dom';

import App from './App';
import ConfirmCodePage from './pages/ConfirmCode';
import LoginPage from './pages/login';
import SignupPage from './pages/signup';

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
  }
]);

export default router;
