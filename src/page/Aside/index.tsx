import {useState} from "react";


function Aside() {

    const [clickValue, setClickValue] = useState(0);
    const categoryList = ['易经', '测试',];

    const handleButtonClick = (index: number) => {
        setClickValue(index); // 每次点击增加状态值
    };



    const items = categoryList.map((value, index) =>
        <li>
            <button key={index} className='mt-4' onClick={() => handleButtonClick(index)} style={
                {
                    backgroundColor: clickValue === index ? 'green' : 'white'
                }
            }>
                {value}
            </button>
        </li>
    );
    return (
        <div className='w-1/6 flex flex-col justify-start items-center border-r-2 border-r border-red-500'>
            {items}
        </div>

    );
}


export default Aside;