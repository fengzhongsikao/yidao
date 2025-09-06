import {useNavigate, useSearchParams} from "react-router";
import {guaMap} from "@/values/guaMap.ts";
import {Qian, Dui, MyLi, Zhen, Xun, Kan, Gen, Kun} from "@/page/comnents/bagua.tsx";
import {useEffect, useState} from "react";
import useGuaStore from "@/store";
import Button from "@mui/material/Button";

type guaType = {
    "id": number,
    "gua_name": string,
    "up_down": string,
    "gua_ci": string,
    "yao_ci": Array<string>,
}

function DetailItem() {
    const navigator = useNavigate();

    const [gua, setGua] = useState<guaType>({gua_ci: "", gua_name: "", id: 0, up_down: "", yao_ci: []});

    const bears = useGuaStore((state: any) => state.guaListTemp)

    const [params] = useSearchParams();

    const numberParam = Number(params.get('id'));

    useEffect(() => {
        init().then(() => {
        })
    }, []);

    async function init() {
        setGua(
            {
                ...bears[numberParam]
            }
        )

    }

    return (
        <div>
            <Button onClick={() => navigator(-1)}>返回</Button>
            <div style={{display:"flex"}}>
                <div style={{
                    width: '400px'
                }}>
                    {content(gua)}
                </div>
                <div style={{
                    marginTop: '4px'
                }}>
                    {Object.keys(guaMap[numberParam]).map((key, value) => (
                        <div key={value}>
                            {ShowGua(key, guaMap[numberParam][parseInt(key)])}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export function ShowGua(key: string, value: number) {
    return (
        <div>
            {ShowUp(key)}
            {ShowDown(value)}
        </div>
    )

}

export function ShowUp(key: string) {
    if (key === '1') {
        return (
            <Qian/>
        )
    } else if (key === '2') {
        return (
            <Dui/>
        )
    } else if (key === '3') {
        return (
            <MyLi/>
        )
    } else if (key === '4') {
        return (
            <Zhen/>
        )
    } else if (key === '5') {
        return (
            <Xun/>
        )
    } else if (key === '6') {
        return (
            <Kan/>
        )
    } else if (key === '7') {
        return (
            <Gen/>
        )
    } else if (key === '8') {
        return (
            <Kun/>
        )
    }
}

export function ShowDown(value: number) {
    if (value === 1) {
        return (
            <><Qian/></>
        )
    } else if (value === 2) {
        return (
            <Dui/>
        )
    } else if (value === 3) {
        return (
            <MyLi/>
        )
    } else if (value === 4) {
        return (
            <Zhen/>
        )
    } else if (value === 5) {
        return (
            <Xun/>
        )
    } else if (value === 6) {
        return (
            <Kan/>
        )
    } else if (value === 7) {
        return (
            <Gen/>
        )
    } else if (value === 8) {
        return (
            <Kun/>
        )
    }
}

export function content(gua: guaType) {
    return (
        <div>
            <h3>{gua.gua_name}</h3>
            <p>{gua.up_down}</p>
            <br/>
            <h5>{gua.gua_ci}</h5>
            <p>{gua.yao_ci[0]}</p>
            <p>{gua.yao_ci[1]}</p>
            <p>{gua.yao_ci[2]}</p>
            <p>{gua.yao_ci[3]}</p>
            <p>{gua.yao_ci[4]}</p>
            <p>{gua.yao_ci[5]}</p>
        </div>
    )
}

export default DetailItem;