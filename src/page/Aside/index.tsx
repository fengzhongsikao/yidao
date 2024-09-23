import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import useGuaStore from "@/store";
import {invoke} from "@tauri-apps/api/core";

interface Category {
    id: number;
    name: string;
}


type guaType = {
    "id": number,
    "gua_name": string,
    "up_down": string,
    "gua_ci": string,
    "yao_ci": Array<string>,
}
type guaListType=guaType[];

function Aside() {

    const [clickValue, setClickValue] = useState(0);
    const categoryList: Category[] = [
        {
            id: 0,
            name: '易经',
        },
        {
            id: 1,
            name: '测试'
        },
    ];

    const navigator = useNavigate();

    const [guaList, setGuaList] = useState<guaListType>([{gua_ci: "", gua_name: "", id: 0, up_down: "", yao_ci: []}]);

    // @ts-ignore
    const {setGuaListTemp} = useGuaStore();



    useEffect(() => {
        async function init() {
            try {
                let res: guaListType = await invoke("json");
                setGuaList(res); // 假设 res 已经是 guaListType 类型的数组
                console.log('guaList------'+guaList)
                setGuaListTemp(guaList);
            } catch (error) {
                console.error("Failed to fetch guaList:", error);
                // 处理错误，例如设置一个错误状态
            }
        }
        init().then(()=>{})

    }, []);

    useEffect(() => {
        navigator('grid');
    }, []); // 空数


    const handleButtonClick = async (index: number) => {
        if (index == 0) {
            navigator('grid');
        } else if (index == 1) {
            navigator('test');
        } else if (index == 2) {
        }
        setClickValue(index); // 每次点击增加状态值

    };

    const items = categoryList.map((value, index) =>
        <li key={value.id} className='mt-5'>
            <button onClick={() => handleButtonClick(index)} style={
                {
                    backgroundColor: clickValue === index ? 'green' : 'white'
                }
            }>
                {value.name}
            </button>
        </li>
    );
    return (
        <div className='w-1/6 flex flex-col justify-start items-center border-r border-red-500'>
            {items}
        </div>

    );
}



export default Aside;