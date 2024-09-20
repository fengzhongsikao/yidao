// import {SetStateAction, useState} from "react";
// import { invoke } from "@tauri-apps/api/tauri";
import "./App.css";
import Aside from "@/page/Aside/index.tsx";
// import RightList from "@/page/Grid/index.tsx";
import {Outlet} from "react-router-dom";


function App() {
    return (
        <div className="flex">
            <Aside/>
            <div className="flex-grow overflow-hidden h-screen">
                <Outlet></Outlet>
            </div>
        </div>
    );
}


export default App;




