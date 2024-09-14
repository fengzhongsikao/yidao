import {SetStateAction, useState} from "react";
// import { invoke } from "@tauri-apps/api/tauri";
import "./App.css";


function App() {
    // const [greetMsg, setGreetMsg] = useState("");
    // const [name, setName] = useState("");
    const [clickValue, setClickValue] = useState(0);

    // async function greet() {
    //   setGreetMsg(await invoke("greet", { name }));
    // }
    const cateGoryList = ['易经', '测试',];

    const handleButtonClick = (index: SetStateAction<number>) => {
        setClickValue(index); // 每次点击增加状态值
    };

    const listItems = cateGoryList.map((value, index) =>
        <button key={index} className='mt-4' onClick={() => handleButtonClick(index)} style={
            {
                backgroundColor: clickValue === index ? 'green' : 'white'
            }
        }>
            {value}
        </button>
    );


    const leftItem = (
        <div className="bg-red-200 w-48 flex justify-center items-start ">
            <ul className='flex flex-col justify-center items-center'>
                {listItems}
            </ul>
        </div>
    );

    const rightItem = (
        <div className="bg-blue-200 flex-1">

        </div>
    );
    return (
        <div className="flex h-screen ">
            {leftItem}

            {rightItem}
        </div>
    );
}


export default App;




