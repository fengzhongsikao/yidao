import {SetStateAction, useState} from "react";

const [clickValue, setClickValue] = useState(0);
const cateGoryList = ['易经', '测试',];

const handleButtonClick = (index: SetStateAction<number>) => {
    setClickValue(index); // 每次点击增加状态值
};

const items = cateGoryList.map((value, index) =>
    <button key={index} className='mt-4' onClick={() => handleButtonClick(index)} style={
        {
            backgroundColor: clickValue === index ? 'green' : 'white'
        }
    }>
        {value}
    </button>
);
const Aside=()=> {
   return (
       <div className="bg-gray-200 h-screen overflow-y-auto w-1/6">
           {items}
       </div>
   );
}


export default Aside;