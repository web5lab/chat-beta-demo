import { createBrowserRouter } from "react-router-dom";
import Chat from "../../page/chat";




export const router = createBrowserRouter([
  {
    path: "/",
    element: <Chat />,
  },
]);
