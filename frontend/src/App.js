import { RouterProvider } from "react-router-dom";
import "./App.css";
import { router } from "./component/router/router";
import { useDispatch } from "react-redux";

import { useEffect } from "react";
import { getChats } from "./App/features/chatFeatures/chatAction";




function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getChats())
   }, [])

   useEffect(() => {
    Notification.requestPermission();
  }, []);
   
  return (
    <>
      <RouterProvider
        router={router}
      />
    </>
  );
}

export default App;
