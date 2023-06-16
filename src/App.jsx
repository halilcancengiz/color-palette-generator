import React from "react";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import GenerateColor from "./components/GenerateColor";

function App() {

  return (
    <div className="max-h-screen h-full">
      <ToastContainer />
      <div className="grow">
        <GenerateColor />
      </div>
    </div>
  );
}

export default App;
