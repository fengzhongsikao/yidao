import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";


function Aside() {

    const [clickValue, setClickValue] = useState(0);
    const categoryList = ['易经', '测试',];

    const  navigator=useNavigate();

    useEffect(() => {
        navigator('grid');
    }, []); // 空数


    const handleButtonClick = (index: number) => {
        setClickValue(index); // 每次点击增加状态值

        if(index==0){
            navigator('grid');
        }else{
            navigator('test');
        }

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