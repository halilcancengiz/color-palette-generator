import React from "react";
import { Routes as RouteContainer, Route } from "react-router-dom";
import Home from "../pages/Home";


const Routes = () => {



    return (

        <RouteContainer location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
        </RouteContainer>
    );
};

export default Routes;

