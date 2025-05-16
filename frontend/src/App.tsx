import { Route, Routes } from "react-router-dom";
import { NavBar } from "./pages/NavBar";
import ProfilEditPage from "./pages/profile/edit";

const AllRoutes = [
  { url: "/chat", element: <div className="h-screen bg-orange-800">Chat Page</div> },
  { url: "/discover", element: <div className="h-screen bg-green-800">Discover Page</div> },
  { url: "/profile", element: <ProfilEditPage /> }
]

function App() {

  return (
    <div>
      <NavBar />
      <Routes>
        {AllRoutes.map((onePage, i) => {
          return (<Route key={i} path={onePage.url} element={onePage.element} />)
        })}
      </Routes>
    </div>
  );
}

export default App;
