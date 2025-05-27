import { Route, Routes } from "react-router-dom";
import { NavBar } from "./pages/NavBar";
import { ProfileEdit } from "./pages/profile/ProfileEdit";

const AllRoutes = [
  {
    url: "/chat",
    element: <div className="h-screen bg-orange-800">Chat Page</div>,
  },
  {
    url: "/discover",
    element: <div className="h-screen bg-green-800">Discover Page</div>,
  },
  { url: "/profile", element: <ProfileEdit /> },
];

function App() {
  return (
    <div className="flex">
      <NavBar />
      <div>
        <Routes>
          {AllRoutes.map((onePage, i) => {
            return (
              <Route key={i} path={onePage.url} element={onePage.element} />
            );
          })}
        </Routes>
      </div>
    </div>
  );
}

export default App;
