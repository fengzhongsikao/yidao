import "./App.css";
import Aside from "@/page/Aside/index.tsx";
import {Outlet} from "react-router";

function App() {

    return (
        <div style={
            { display:"flex"}
        }>
            <Aside/>
            <div style={
                {
                    flexGrow: 1,
                    overflow: 'hidden',
                    height: '100vh',
                    marginLeft: '0.75rem'
                }
            }>
                <Outlet></Outlet>
            </div>
        </div>
    );
}



export default App;




