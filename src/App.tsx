// import {SetStateAction, useState} from "react";
// import { invoke } from "@tauri-apps/api/tauri";
import "./App.css";
import Aside from "./Aside.tsx";


function App() {
    // const [greetMsg, setGreetMsg] = useState("");
    // const [name, setName] = useState("");
    // const [clickValue, setClickValue] = useState(0);

    // async function greet() {
    //   setGreetMsg(await invoke("greet", { name }));
    // }
    const rightItem = (
        <div>
            <div className="bg-gray-200 p-4">Item 1</div>
            <div className="bg-gray-200 p-4">Item 2</div>
            <div className="bg-gray-200 p-4">Item 3</div>
            <div className="bg-gray-200 p-4">Item 4</div>
            <div className="bg-gray-200 p-4">Item 5</div>
            <div className="bg-gray-200 p-4">Item 6</div>
            <div className="bg-gray-200 p-4">Item 6</div>
            <div className="bg-gray-200 p-4">Item 6</div>
            <div className="bg-gray-200 p-4">Item 6</div>
            <div className="bg-gray-200 p-4">Item 6</div>
            <div className="bg-gray-200 p-4">Item 6</div>
            <div className="bg-gray-200 p-4">Item 6</div>
            <div className="bg-gray-200 p-4">Item 6</div>
        </div>
    );

    return (
        <div className="flex f-screen">
            <Aside></Aside>
            <div className="flex-grow">
                {rightItem}
            </div>
        </div>
    );
}


export default App;




