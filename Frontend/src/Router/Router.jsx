import {createBrowserRouter} from "react-router-dom";
import App from "../App";  
import About from "../Pages/About";
import Home from "../Pages/Home";

const router = createBrowserRouter([
    {
      path: "/",
      element: <App/>,
      children: [
        {path: "/", element: <Home/>},
        
    ]
    },
  ]);
  export default router;