import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import useGuaStore from "@/store";
import {invoke} from "@tauri-apps/api/core";

import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import {Box} from "@mui/material";

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
type guaListType = guaType[];

function Aside() {

    const [clickValue, setClickValue] = useState(0);
    // @ts-ignore
    const {setGuaListTemp} = useGuaStore();

    const categoryList: Category[] = [
        {
            id: 0,
            name: '易经',
        },
        {
            id: 1,
            name: '梅花'
        },
        {
            id: 2,
            name: '六爻'
        },
        {
            id: 3,
            name: '测试'
        }
    ];

    const navigator = useNavigate();

    useEffect(() => {
        async function init() {
            try {
                let res: guaListType = await invoke("json");
                setGuaListTemp(res);
            } catch (error) {
                console.error("Failed to fetch guaList:", error);
                // 处理错误，例如设置一个错误状态
            }
        }

        init().then(() => {
        })

    }, []);

    useEffect(() => {
        navigator('grid');
    }, []); // 空数


    const handleButtonClick = async (index: number) => {
        if (index == 0) {
            navigator('grid');
        } else if (index == 1) {
            navigator('plumBlossom');
        } else if (index == 2) {
            navigator('sixLines');
        } else if (index == 3) {
            navigator('test');
        }

        setClickValue(index); // 每次点击增加状态值

    };
    return (

        <Box sx={{width: 100, height: "100vh", borderRight: "1px solid red"}}>
            <Stack spacing={4}>
                {categoryList.map((item) => (
                    <Button key={item.id} variant={clickValue === item.id ? "contained" : 'outlined'} onClick={() =>
                        handleButtonClick(item.id)} sx={{maxWidth: 'fit-content'}}>{item.name}</Button>
                ))}
            </Stack>
        </Box>

    );
}


export default Aside;