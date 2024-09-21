import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

interface Category {
    id: number;
    name: string;
}
function Aside() {

    const [clickValue, setClickValue] = useState(0);
    const categoryList:Category[]=[
        {
        id: 0,
        name: '易经',
        },
        {
            id: 1,
            name: '测试'
        }
    ];

    const navigator = useNavigate();

    useEffect(() => {
        navigator('grid');
    }, []); // 空数


    const handleButtonClick = (index: number) => {
        if (index == 0) {
            navigator('grid');
        } else {
            navigator('test');
        }
        setClickValue(index); // 每次点击增加状态值

    };

    const items = categoryList.map((value, index) =>
        <li key={value.id}>
            <button  className='mt-4' onClick={() => handleButtonClick(index)} style={
                {
                    backgroundColor: clickValue === index ? 'green' : 'white'
                }
            }>
                {value.name}
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