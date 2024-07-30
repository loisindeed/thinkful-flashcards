import React from "react";
import Header from "./Header";
import { Outlet } from 'react-router-dom';
import RootRoutes from "../RootRoutes";

function Layout() {
    return (
        <>
            <Header />
            <div className="container">
                <RootRoutes />
                <Outlet />
            </div>
        </>
    );
}

export default Layout;