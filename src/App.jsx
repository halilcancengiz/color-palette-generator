import React from "react";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import GenerateColor from "./components/GenerateColor";

function App() {

  return (
    <div >
      <ToastContainer />
      <GenerateColor />
    </div>
  );
}

export default App;
