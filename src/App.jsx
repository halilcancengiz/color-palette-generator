import React from "react";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Routes from "./routes/Routes";

const App = () => {
  return (
    <div className="max-h-screen h-full">
      <Routes />
      <ToastContainer />
    </div>
  )
}

export default App;