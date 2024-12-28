
import { Provider } from 'react-redux';
import './App.css';
import Body from './components/Body';
import Head from './components/Head';
import Sidebar from './components/Sidebar';
import appStore from "./utils/appStore"
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import WatchPage from './components/WatchPage';
import MainContainer from './components/MainContainer';



function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Body />,
      children: [
        {
          path: "/watch", // Matches /watch?v=xyz
          element: <WatchPage />,
        },
        {
          path: "/",
          element: <MainContainer />,
        },
      ],
    },
  ]);
  
  return (
    <Provider store={appStore}>
       <div className='text-cyan-200'>
     
     <Head/>
     <RouterProvider router={router}/>
   </div>
    </Provider>
   
  );
}

export default App;


