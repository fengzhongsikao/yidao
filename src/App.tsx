import "./App.css";
import Aside from "@/page/Aside/index.tsx";
import {Outlet} from "react-router-dom";

function App() {

    return (
        <div className="flex">
            <Aside/>
            <div className="flex-grow overflow-hidden h-screen ml-3">
                <Outlet></Outlet>
            </div>
        </div>
    );
}



export default App;




