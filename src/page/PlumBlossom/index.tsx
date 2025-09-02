import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import React, { useState} from "react";
import {guaIndexMap} from '@/values/guaMap.ts'


//乾1 兑2 离3 震4 巽5 坎6 艮7 坤8
const qian = [true, true, true];
const dui = [false, true, true];
const myli = [true, false, true];
const zhen = [false, false, true];
const xun = [true, true, false];
const kan = [false, true, false];
const gen = [true, false, false];
const kun = [false, false, false];

const guaMap = [
    [true, true, true],
    [false, true, true],
    [true, false, true],
    [false, false, true],
    [true, true, false],
    [false, true, false],
    [true, false, false],
    [false, false, false],
];


interface GuaCardProps {
    yaoArray: boolean[];      // 下标 0 是最底爻
}

const GuaCard: React.FC<GuaCardProps> = ({yaoArray}) => (
    <Box sx={{display: 'flex', flexDirection: 'column', gap: 1}}>
        {yaoArray.map((isYang, idx) =>
            isYang ? (
                // 阳爻：一条完整长线
                <Box
                    key={idx}
                    sx={{
                        height: 10,
                        backgroundColor: '#000',
                        borderRadius: 1,
                        width: '100%',
                    }}
                />
            ) : (
                // 阴爻：两条短横线，中间留空
                <Box
                    key={idx}
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}
                >
                    <Box sx={{height: 10, backgroundColor: '#000', width: '45%', borderRadius: 1}}/>
                    <Box sx={{height: 10, backgroundColor: '#000', width: '45%', borderRadius: 1}}/>
                </Box>
            )
        )}
    </Box>
);
const earthlyBranches: Record<string, number> = {
    '子': 1, '丑': 2, '寅': 3, '卯': 4, '辰': 5,
    '巳': 6, '午': 7, '未': 8, '申': 9, '酉': 10,
    '戌': 11, '亥': 12
};

const bagualei: Record<string, string> = {
    '乾': '天',
    '坤': '地',
    '震': '雷',
    '巽': '风',
    '坎': '水',
    '离': '火',
    '艮': '山',
    '兑': '泽'
}
// const bagua=['乾','兑','离','震','巽','坎','艮','坤']
const wuxin = {'乾': '金', '坤': '土', '震': '木', '巽': '木', '坎': '水', '离': '火', '艮': '土', '兑': '金'}


// 简化的转换函数（只返回地支数字）
function convertEarthlyBranch(ganzhi: string) {
    if (!ganzhi || ganzhi.length !== 2) {
        throw new Error('无效的干支格式');
    }

    const branchChar = ganzhi[1]; // 取第二个字符（地支）

    if (!earthlyBranches.hasOwnProperty(branchChar)) {
        throw new Error('无效的地支字符');
    }

    return earthlyBranches[branchChar];
}

const getEarthlyBranchHour = (hour: number) => {
    return Math.floor(((hour + 1) % 24) / 2);
};

function arraysEqual(a: boolean[], b: boolean[]) {
    return a.length === b.length && a.every((v, i) => v === b[i]);
}

const PlumBlossom = () => {

    let year: number
    let month: number
    let day: number
    let hour: number

    const [num1UP, setNum1UP] = useState(0);
    const [num1Down, setNum1Down] = useState(0);
    const [changeNumber, setChangeNumber] = useState(0);

    const [num3Up, setNum3Up] = useState(0);
    const [num3Down, setNum3Down] = useState(0);

    const [num2Up, setNum2Up] = useState(0);
    const [num2Down, setNum2Down] = useState(0);


    const [visible, setVisible] = useState(false);

    const handleClick1 = async () => {

        const currentDate = getCurrentDate();
        await fetchData(currentDate)


        const up = ((year + month + day) % 8) || 8;
        const down = ((year + month + day + hour) % 8) || 8;
        const cn = ((year + month + day + hour) % 6) || 6;

        // 2. 更新状态
        setNum1UP(up);
        setNum1Down(down);
        setChangeNumber(cn);


        //变卦
        let rawA = returnGua(up);
        let rawB = returnGua(down);

        // 深拷贝，防止直接改原数组
        let newA = [...rawA];
        let newB = [...rawB];

        if (cn > 3) {
            newA[6 - cn] = !newA[6 - cn];
        } else {
            newB[3 - cn] = !newB[3 - cn];
        }

        // 4. 根据新卦爻数组找编号
        let num3Up = 0;
        let num3Down = 0;

        for (let i = 0; i < guaMap.length; i++) {
            if (arraysEqual(newA, guaMap[i])) num3Up = i + 1;
            if (arraysEqual(newB, guaMap[i])) num3Down = i + 1;
        }
        setNum3Up(num3Up);
        setNum3Down(num3Down)
        // console.log(num3Up, num3Down,"num3")

        //互卦
        let benGua = [...rawA, ...rawB]; // 6爻数组





        let num2Up = 0;
        let num2Down = 0;
        if (arraysEqual(rawA, guaMap[0]) && arraysEqual(rawB, guaMap[0]) || arraysEqual(rawA, guaMap[5]) && arraysEqual(rawB, guaMap[5])) {
            let newH = [...guaMap[num3Up - 1]];
            let newI = [...guaMap[num3Down - 1]];

            let he = [...newH.concat(newI)]
            let upWu = [he[1], he[2], he[3]]
            let downWu = [he[2], he[3], he[4]]

            for (let i = 0; i < guaMap.length; i++) {
                if (arraysEqual(upWu, guaMap[i])) num2Up = i + 1;
                if (arraysEqual(downWu, guaMap[i])) num2Down = i + 1;
            }
        } else {
            let huUp = [benGua[1], benGua[2], benGua[3]]; // 上卦
            let huDown = [benGua[2], benGua[3], benGua[4]]; // 下卦
            for (let i = 0; i < guaMap.length; i++) {
                if (arraysEqual(huUp, guaMap[i])) num2Up = i + 1;
                if (arraysEqual(huDown, guaMap[i])) num2Down = i + 1;
            }
        }

        setNum2Up(num2Up);
        setNum2Down(num2Down)

        setVisible(true)

        console.log(year,month,day,hour,"年月日时")
        console.log(num1UP,num1Down,changeNumber,"上下变")
    };

    const fetchData = async (dateString: string) => {
        try {
            // 注意：根据搜索结果，URL中的sun参数可能需要特定的日期格式，请确保dateString符合要求
            const response = await fetch(`https://www.36jxs.com/api/Commonweal/almanac?sun=${dateString}`);
            const result = await response.json();
            console.log(result)
            // 拿到年月日的数字
            year = convertEarthlyBranch(result.data.TianGanDiZhiYear)
            month = Number(result.data.LunarDateTime.split('-')[1])
            day = Number(result.data.LunarDateTime.split('-')[2])
        } catch (err) {
            console.error('Fetch error:', err);
        }
    };

    const getCurrentDate = () => {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0'); // 月份从0开始，所以要+1
        const day = String(now.getDate()).padStart(2, '0');
        const currentHour = new Date().getHours();
        const currentBranchIndex = getEarthlyBranchHour(currentHour);

        hour = currentBranchIndex + 1
        return `${year}-${month}-${day}`;
    };




    return (
        <div>
            <Stack direction="row" spacing={2}>
                <Button variant="contained" onClick={handleClick1}>时间起卦</Button>
                <Button variant="contained">数字起卦</Button>
                <Button variant="contained">自己设定</Button>
                <Button variant="contained">电脑自动</Button>
            </Stack>
            {visible &&<Stack direction="row" spacing={5} sx={{mt: 10}}>
                <OriginalHexagram num1={num1UP} num2={num1Down} changeNumber={changeNumber}/>
                <MutualHexagram num1={num2Up} num2={num2Down}/>
                <ChangingHexagram num1={num3Up} num2={num3Down}/>
            </Stack>}
        </div>
    );
};

interface ChildProps {
    num1: number;
    num2: number;
    changeNumber: number;
}

interface ChildProps2 {
    num1: number;
    num2: number;
}

const returnGua = (num: number): boolean[] => {
    switch (num) {
        case 1:
            return qian;
        case 2:
            return dui;
        case 3:
            return myli;
        case 4:
            return zhen;
        case 5:
            return xun;
        case 6:
            return kan;
        case 7:
            return gen;
        case 8:
            return kun;
        default:
            return kun;
    }
};


const returnGuaShu = (num: number): string => {
    switch (num) {
        case 1:
            return bagualei['乾'];
        case 2:
            return bagualei['兑'];
        case 3:
            return bagualei['离'];
        case 4:
            return bagualei['震'];
        case 5:
            return bagualei['巽'];
        case 6:
            return bagualei['坎'];
        case 7:
            return bagualei['艮'];
        case 8:
            return bagualei['坤'];
        default:
            return bagualei['乾'];
    }
};

const returnWuxin = (num: number): string => {
    switch (num) {
        case 1:
            return wuxin['乾'];
        case 2:
            return wuxin['兑'];
        case 3:
            return wuxin['离'];
        case 4:
            return wuxin['震'];
        case 5:
            return wuxin['巽'];
        case 6:
            return wuxin['坎'];
        case 7:
            return wuxin['艮'];
        case 8:
            return wuxin['坤'];
        default:
            return wuxin['乾'];
    }
};


const returnEight = (num: number): string => {
    switch (num) {
        case 1:
            return '乾';
        case 2:
            return '兑';
        case 3:
            return '离';
        case 4:
            return '震';
        case 5:
            return '巽';
        case 6:
            return '坎';
        case 7:
            return '艮';
        case 8:
            return '坤';
        default:
            return '乾';
    }
};

const guaMin = (num1: number, num2: number) => {
    if (returnGua(num1) == returnGua(num2)) {
        return returnEight(num1) + "为" + returnGuaShu(num1)
    } else {
        return returnGuaShu(num1) + returnGuaShu(num2)
    }
}

const getGuamin=(num1:number,num2:number):string=>{
    const key = `${num1}-${num2}`;
    // 得到卦名，如 "乾"
    return guaIndexMap[key];
}

//主卦
const OriginalHexagram: React.FC<ChildProps> = ({num1, num2, changeNumber}) => {
    return <Stack direction="row" spacing={2}>
        <Card sx={{textAlign: 'center', minWidth: 140, maxWidth: 150}}>
            <CardContent>
                <Typography variant="h6" gutterBottom>
                    {guaMin(num1, num2)}{getGuamin(num1, num2)}
                </Typography>
                <GuaCard yaoArray={returnGua(num1)}/>
                <Box sx={{mt: 1}}/>
                <GuaCard yaoArray={returnGua(num2)}/>
                <Typography variant="h6" gutterBottom sx={{mt: 3}}>
                    主卦 {changeNumber}爻动
                </Typography>
            </CardContent>
        </Card>
        <Stack direction="column" sx={{height: '100%', justifyContent: 'space-between'}}>
            <Box sx={{mt: 8}}>{returnEight(num1)}{returnWuxin(num1)}</Box>
            <Box sx={{mb: 12}}>{returnEight(num2)}{returnWuxin(num2)}</Box>
        </Stack>
    </Stack>
}

//互卦
const MutualHexagram: React.FC<ChildProps2> = ({num1, num2}) => {
    return <Stack direction="row" spacing={2}>
        <Card sx={{textAlign: 'center', minWidth: 140}}>
            <CardContent>
                <Typography variant="h6" gutterBottom>
                    {returnEight(num1)}{returnEight(num2)}
                </Typography>
                <GuaCard yaoArray={returnGua(num1)}/>
                <Box sx={{mt: 1}}/>
                <GuaCard yaoArray={returnGua(num2)}/>
                <Typography variant="h6" gutterBottom sx={{mt: 3}}>
                    互卦
                </Typography>
            </CardContent>
        </Card>
        <Stack direction="column" sx={{height: '100%', justifyContent: 'space-between'}}>
            <Box sx={{mt: 8}}>{returnEight(num1)}{returnWuxin(num1)}</Box>
            <Box sx={{mb: 12}}>{returnEight(num2)}{returnWuxin(num2)}</Box>
        </Stack>
    </Stack>
}
//变卦
const ChangingHexagram: React.FC<ChildProps2> = ({num1, num2}) => {
    return <Stack direction="row" spacing={2}>
        <Card sx={{textAlign: 'center', minWidth: 140}}>
            <CardContent>
                <Typography variant="h6" gutterBottom>
                    {guaMin(num1, num2)}{getGuamin(num1, num2)}
                </Typography>
                <GuaCard yaoArray={returnGua(num1)}/>
                <Box sx={{mt: 1}}/>
                <GuaCard yaoArray={returnGua(num2)}/>
                <Typography variant="h6" gutterBottom sx={{mt: 3}}>
                    变卦
                </Typography>
            </CardContent>
        </Card>
        <Stack direction="column" sx={{height: '100%', justifyContent: 'space-between'}}>
            <Box sx={{mt: 8}}>{returnEight(num1)}{returnWuxin(num1)}</Box>
            <Box sx={{mb: 12}}>{returnEight(num2)}{returnWuxin(num2)}</Box>
        </Stack>
    </Stack>
}

export default PlumBlossom;