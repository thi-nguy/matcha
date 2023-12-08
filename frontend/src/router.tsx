import { createBrowserRouter } from 'react-router-dom';

import App from './App';
import InboxPage from './pages/inbox';
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
    path: '/app/inbox',
    element: <InboxPage/>
  },
  {
    path: '/signup',
    element: <SignupPage/>
  }
]);

export default router;
