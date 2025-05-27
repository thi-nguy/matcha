import { createBrowserRouter } from "react-router-dom";

import App from "./App";
import ConfirmCodePage from "./pages/ConfirmCode";
import InboxPage from "./pages/inbox";
import LoginPage from "./pages/login";
import SignupPage from "./pages/signup";
import RecoverPasswordPage from "./pages/recoverPassword";
import { ProfileEdit } from "./pages/profile/ProfileEdit";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/confirm-code",
    element: <ConfirmCodePage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/app/inbox",
    element: <InboxPage />,
  },
  {
    path: "/signup",
    element: <SignupPage />,
  },
  {
    path: "/recover-password",
    element: <RecoverPasswordPage />,
  },
  {
    path: "/app/profile/edit",
    element: <ProfileEdit />,
  },
]);

export default router;
