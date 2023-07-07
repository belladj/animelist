import './App.css';
import AnimeList from './pages/AnimeList';
import AnimeDetails from './pages/AnimeDetails';
import { Link, createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Collections from './pages/Collections';
import CollectionDetails from './pages/CollectionDetails';
import Header from './components/Header';

const HeaderLayout = () => (
  <>
    <header>
      <Header />
    </header>
    <Outlet />
  </>
);

const router = createBrowserRouter([
  { element: <HeaderLayout />,
    children: [
    {
      path: "/",
      element: <AnimeList/>,
    },
    {
      path: "/anime/:id",
      element: <AnimeDetails />,
    },
    {
      path: "/collection",
      element: <Collections />,
    },
    {
      path: "/collection/:id",
      element: <CollectionDetails/>
    }]
  }
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
