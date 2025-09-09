import Stack from "@mui/material/Stack";
import {Chip, FormControl, MenuItem, Select} from "@mui/material";
import Button from "@mui/material/Button";
import React, {useState} from "react";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import {getCurrentDate} from '@/page/utils/time.ts';
import {invoke} from "@tauri-apps/api/core";
import {hexagramData} from  "@/values/guaMap.ts"
import {LIU_SHI_SI_GUA} from "@/values/liushisi-gua.ts";


interface GuaCardProps {
    hexagram: {value:number,change:boolean}[],
    sixRelatives: string[],
    sixGods: string[],
    shiYing?: { shiPosition: number; yingPosition: number }
}

interface GuaCardProps2 {
    hexagram: {value:number,change:boolean}[],
    sixRelatives: string[],
    sixGods: string[],
}

// 定义神煞类型
type Deity = '青龙' | '朱雀' | '勾陈' | '腾蛇' | '白虎' | '玄武';

// 定义天干对应的神煞映射
const DEITY_MAP: Record<string, Deity> = {
    '甲': '青龙',
    '乙': '青龙',
    '丙': '朱雀',
    '丁': '朱雀',
    '戊': '勾陈',
    '己': '腾蛇',
    '庚': '白虎',
    '辛': '白虎',
    '壬': '玄武',
    '癸': '玄武'
};

// 定义神煞的顺序（六神顺序）
const DEITY_ORDER: Deity[] = ['青龙', '朱雀', '勾陈', '腾蛇', '白虎', '玄武'];

// 生成单爻（通过三枚硬币抛掷）
function generateYao (){
    // 模拟三枚硬币抛掷（2=正面/阳，3=反面/阴）
    const coin1 = Math.floor(Math.random() * 2) + 2;
    const coin2 = Math.floor(Math.random() * 2) + 2;
    const coin3 = Math.floor(Math.random() * 2) + 2;

    const sum = coin1 + coin2 + coin3;

    // 6: 老阴, 7: 少阳, 8: 少阴, 9: 老阳
    if (sum === 6) return { value: 0, change: true }; // 老阴 (变爻)
    else if (sum === 7) return { value: 1, change: false }; // 少阳
    else if (sum === 8) return { value: 0, change: false }; // 少阴
    else return { value: 1, change: true }; // 老阳 (变爻)
}

// 生成六爻卦象
function generateHexagram(){
    const hexagram :{ value: number, change: boolean }[] = [];
    for (let i = 0; i < 6; i++) {
        hexagram.push(generateYao());
    }
    return hexagram.reverse();
}
// 生成六爻卦象 指定
function generateHexagram2(arr:string[]){
    const hexagram :{ value: number, change: boolean }[] = [];
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === '6') {
            hexagram.push({ value: 0, change: true })
        }
        else if (arr[i] === '7') {
            hexagram.push({ value: 1, change: false })
        }
        else if (arr[i] === '8') {
            hexagram.push({ value: 0, change: false })
        }
        else if (arr[i] === '9') {
            hexagram.push({ value: 1, change: true })
        }
    }
    return hexagram.reverse();
}

// 生成六亲 // 六亲数据 "父母", "官鬼", "兄弟", "妻财", "子孙"
function generateSixRelatives  (str:string) {
    let relatives:string[] = [];
    for (let i = 0; i < LIU_SHI_SI_GUA.length; i++) {
        if(LIU_SHI_SI_GUA[i].name === str){
            relatives= [...LIU_SHI_SI_GUA[i].yaos]
            break
        }
    }
    return relatives;
}

function generateSixRelatives2  (str:string) {
    let relatives:string[] = [];
    for (let i = 0; i < LIU_SHI_SI_GUA.length; i++) {
        if(LIU_SHI_SI_GUA[i].name === str){
            relatives= [...LIU_SHI_SI_GUA[i].yaos]
            break
        }
    }
    return relatives;
}


// 生成世应位置
function generateShiYing  (str:string)  {
    let shiPosition = 0;
    for (let i = 0; i < LIU_SHI_SI_GUA.length; i++) {
        if(LIU_SHI_SI_GUA[i].name === str){
            shiPosition=6-LIU_SHI_SI_GUA[i].shi
        }
    }
    const yingPosition = (shiPosition + 3) % 6;
    return {shiPosition, yingPosition};
}

// 显示卦象的组件
const HexagramDisplay: React.FC<GuaCardProps> = ({hexagram, sixRelatives, sixGods, shiYing}) => {
    return (
        <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', my: 3}}>
            {hexagram.map((yao, index:number) => {
                const isShi = index === shiYing?.shiPosition;
                const isYing = index=== shiYing?.yingPosition;

                return (
                    <Box key={index} sx={{display: 'flex', alignItems: 'center', width: '100%', mb: 1}}>
                        {/* 六神 */}
                        <Box sx={{width: 60, textAlign: 'center'}}>
                            <Chip
                                label={sixGods[index]}
                                size="small"
                                color="primary"
                                variant="outlined"
                            />
                        </Box>

                        {/* 六亲 */}
                        <Box sx={{width: 120, textAlign: 'center'}}>
                            <Chip
                                label={sixRelatives[index].split(' ')[1]+sixRelatives[index].split(' ')[0]}
                                size="small"
                                color="secondary"
                                variant="outlined"
                            />
                        </Box>

                        {/* 爻象 */}
                        <Box
                            sx={{
                                width: 120,
                                height: 20,
                                margin: 0.5,
                                borderRadius: 1,
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                position: 'relative'
                            }}
                        >
                            {yao.value===1 ? (
                                // 阳爻 - 实线
                                <Box sx={{
                                    width: '100%',
                                    height:  6,
                                    backgroundColor: yao.change ? '#f50057' : 'black',
                                    borderRadius: 1,
                                }} />
                            ) : (
                                // 阴爻 - 虚线（分开的两段）
                                <Box sx={{
                                    width: '100%',
                                    height: 20,
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                }}>
                                    <Box sx={{
                                        width: '45%',
                                        height:  6,
                                        backgroundColor: yao.change ? '#f50057' : 'black',
                                        borderRadius: 1,
                                    }} />
                                    <Box sx={{
                                        width: '45%',
                                        height:  6,
                                        backgroundColor: yao.change ? '#f50057' : 'black',
                                        borderRadius: 1,
                                    }} />
                                </Box>
                            )}

                        </Box>

                        {/* 世应标记 */}
                        <Box sx={{ width: 30, textAlign: 'center', position: 'relative' }}>
                            {isShi && (
                                <Box sx={{
                                    fontSize: '14px',
                                    color: '#ff5722',
                                    fontWeight: 'bold'
                                }}>
                                    世
                                </Box>
                            )}

                            {isYing && (
                                <Box sx={{
                                    fontSize: '14px',
                                    color: '#2196f3',
                                    fontWeight: 'bold'
                                }}>
                                    应
                                </Box>
                            )}
                        </Box>

                        <Box sx={{width: 60, textAlign: 'center'}}>
                            {yao.change?<Chip
                                label={"x"}
                                size="small"
                                variant="outlined"
                            />:null}
                        </Box>
                    </Box>
                );
            })}
        </Box>
    );
};

const HexagramDisplay2: React.FC<GuaCardProps2> = ({hexagram, sixRelatives}) => {
    return (
        <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', my: 3}}>
            {hexagram.map((yao, index:number) => {

                return (
                    <Box key={index} sx={{display: 'flex', alignItems: 'center', width: '100%', mb: 1}}>

                        {/* 六亲 */}
                        <Box sx={{width: 120, textAlign: 'center'}}>
                            <Chip
                                label={sixRelatives[index].split(' ')[1]+sixRelatives[index].split(' ')[0]}
                                size="small"
                                color="secondary"
                                variant="outlined"
                            />
                        </Box>

                        {/* 爻象 */}
                        <Box
                            sx={{
                                width: 120,
                                height: 20,
                                margin: 0.5,
                                borderRadius: 1,
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                position: 'relative'
                            }}
                        >
                            {yao.value===1 ? (
                                // 阳爻 - 实线
                                <Box sx={{
                                    width: '100%',
                                    height:  6,
                                    backgroundColor: yao.change ? '#f50057' : 'black',
                                    borderRadius: 1,
                                }} />
                            ) : (
                                // 阴爻 - 虚线（分开的两段）
                                <Box sx={{
                                    width: '100%',
                                    height: 20,
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                }}>
                                    <Box sx={{
                                        width: '45%',
                                        height:  6,
                                        backgroundColor: yao.change ? '#f50057' : 'black',
                                        borderRadius: 1,
                                    }} />
                                    <Box sx={{
                                        width: '45%',
                                        height:  6,
                                        backgroundColor: yao.change ? '#f50057' : 'black',
                                        borderRadius: 1,
                                    }} />
                                </Box>
                            )}

                        </Box>


                    </Box>
                );
            })}
        </Box>
    );
};

// 游魂
const you:string[]=["火地晋","雷山小过","天水讼","泽风大过","山雷颐","地火明夷","风泽中孚","水天需"]
// 归魂
const gui:string[]=["火天大有","雷泽归妹","天火同人","泽雷随","山风蛊","地水师","风山渐","水地比"]

function generateDeitiesArray(dayStem: string): Deity[] {
    const startingDeity = DEITY_MAP[dayStem];
    const startIndex = DEITY_ORDER.indexOf(startingDeity);
    const temp= [...DEITY_ORDER.slice(startIndex), ...DEITY_ORDER.slice(0, startIndex)];
    return temp.reverse();
}

function SixLines() {

    const [visible, setVisible] = useState(false);
    const [visible2, setVisible2] = useState(false);
    const [selectValue, setSelectValue] = React.useState('10');
    const [value1, setValue1] = React.useState('');


    const [hexagram, setHexagram] = useState<{value:number,change:boolean}[]>([]);
    const [hexagram2, setHexagram2] = useState<{value:number,change:boolean}[]>([]);

    const [guaWay, setGuaWay] = useState('无')

    const [publicTime, setPublicTime] = useState('无')
    const [shifen, setShifen] = useState('无')
    const [lunar, setLunar] = useState('无')
    const [ganYear, setGanYear] = useState('无')
    const [ganMonth, setGanMonth] = useState('无')
    const [ganDay, setGanDay] = useState('无')

    const [hexagramName1, setHexagramName1] = useState('');
    const [hexagramName2, setHexagramName2] = useState('');


    const [sixRelatives, setSixRelatives] = useState<string[]>([]);
    const [sixRelatives2, setSixRelatives2] = useState<string[]>([]);
    const [sixGods, setSixGods] = useState<string[]>([]);
    const [shiYing, setShiYing] = useState({shiPosition: 0, yingPosition: 3});

    const [place, setPlace] = useState("")
    const [place2, setPlace2] = useState("")


    const fetchData = async () => {
        const dateString = getCurrentDate();
        try {
            const response: any = await invoke('fetch_external_data', {
                url: `https://www.36jxs.com/api/Commonweal/almanac?sun=${dateString}`
            });
            const data = JSON.parse(response);

            setLunar(data.LunarDateTime)


            setGanYear(data.TianGanDiZhiYear)
            setGanMonth(data.TianGanDiZhiMonth)
            setGanDay(data.TianGanDiZhiDay)

            setPublicTime(data.GregorianDateTime)

            const now = new Date();
            const hours = String(now.getHours()).padStart(2, '0');
            const minutes = String(now.getMinutes()).padStart(2, '0');
            setShifen(`${hours}:${minutes}`)


        } catch (err) {
            console.error('Fetch error:', err);
        }
    };

    const handleChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        if (event.target.value == '20') {
            setVisible2(true);
        } else {
            setVisible2(false);
        }
        setSelectValue(event.target.value);
    };

    const handleBack = () => {
        setVisible(false);
        if(guaWay==="自己设定"){
            setVisible2(true)
        }
    }

    const handleChangeNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue1(e.target.value);          // 实时拿到最新值
    };


    // 开始排盘
    const handleClick = async () => {
        let sel = Number(selectValue)
        console.log(sel)
        if (sel === 10) {
            await handleClick1()
        } else if (sel === 20) {
            await handleClick2()
        }
    }
    // 电脑自动
    const handleClick1 = async () => {
        await fetchData()
        setVisible(true);


        const newHexagram = generateHexagram();


        const newGods = generateDeitiesArray(ganDay.slice(0,1));


        const newHexagram2 = newHexagram.map(
            ({ value, change }) =>
                change ? { value: value ^ 1, change } : { value, change }
        );

        const result1 = Object.values(newHexagram).map(item => item.value).join('');
        const result2 = Object.values(newHexagram).map(item => {
            if(item.change){
                if(item.value===1){
                    return 0
                }else{
                    return 1
                }
            }
            return item.value
        }).join('');
        const newShiYing = generateShiYing(hexagramData[result1]);
        const newRelatives = generateSixRelatives(hexagramData[result1]);
        const newRelatives2 = generateSixRelatives2(hexagramData[result2]);
        setHexagramName1(hexagramData[result1])
        setHexagramName2(hexagramData[result2])

        setHexagram(newHexagram);
        setHexagram2(newHexagram2);

        setSixRelatives(newRelatives);
        setSixRelatives2(newRelatives2);
        setSixGods(newGods);
        setShiYing(newShiYing);

        // 卦宫
        for (let i = 0; i < LIU_SHI_SI_GUA.length; i++) {
            if(LIU_SHI_SI_GUA[i].name === hexagramData[result1]){
                setPlace(LIU_SHI_SI_GUA[i].palace)
            }
            else if(LIU_SHI_SI_GUA[i].name === hexagramData[result2]){
                setPlace2(LIU_SHI_SI_GUA[i].palace)
            }
        }
        setGuaWay("电脑自动")
    }


    const pattern=(str: string)=> /^([6-9])\.([6-9])\.([6-9])\.([6-9])\.([6-9])\.([6-9])$/.test(str);

    //自己设定
    const handleClick2 = async () => {
        await fetchData()

        setGuaWay("自己设定")
        if(!pattern(value1)){
            alert("请规范输入")
        }else{
            console.log(value1)
            let s1=value1.split('.')
            const newHexagram= generateHexagram2(s1)
            const newGods = generateDeitiesArray(ganDay.slice(0,1));


            const newHexagram2 = newHexagram.map(
                ({ value, change }) =>
                    change ? { value: value ^ 1, change } : { value, change }
            );

            const result1 = Object.values(newHexagram).map(item => item.value).join('');
            const result2 = Object.values(newHexagram).map(item => {
                if(item.change){
                    if(item.value===1){
                        return 0
                    }else{
                        return 1
                    }
                }
                return item.value
            }).join('');
            const newShiYing = generateShiYing(hexagramData[result1]);
            const newRelatives = generateSixRelatives(hexagramData[result1]);
            const newRelatives2 = generateSixRelatives2(hexagramData[result2]);
            setHexagramName1(hexagramData[result1])
            setHexagramName2(hexagramData[result2])

            setHexagram(newHexagram);
            setHexagram2(newHexagram2);

            setSixRelatives(newRelatives);
            setSixRelatives2(newRelatives2);
            setSixGods(newGods);
            setShiYing(newShiYing);

            // 卦宫
            for (let i = 0; i < LIU_SHI_SI_GUA.length; i++) {
                if(LIU_SHI_SI_GUA[i].name === hexagramData[result1]){
                    setPlace(LIU_SHI_SI_GUA[i].palace)
                }
                else if(LIU_SHI_SI_GUA[i].name === hexagramData[result2]){
                    setPlace2(LIU_SHI_SI_GUA[i].palace)
                }
            }
            setVisible2(false);
            setVisible(true);
        }
    }

    return (
        <div>
            <Stack direction="row" spacing={2}>
                {visible ? null : <FormControl sx={{minWidth: 200}} size='small'>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={selectValue}
                        label="起卦方式"
                        onChange={handleChange}
                    >
                        <MenuItem value={10}>电脑自动</MenuItem>
                        <MenuItem value={20}>自己设定</MenuItem>
                    </Select>
                </FormControl>}
                {visible ? null : <Button variant="contained" onClick={handleClick}>开始排盘</Button>}
                {!visible ? null : <Button variant="contained" onClick={handleBack}>返回</Button>}
            </Stack>
            {!visible2 ? null : <Stack direction="row" spacing={2} sx={{mt: 5}}>
                <TextField
                    required
                    id="outlined-required"
                    label="正2 反3 例如:6.7.8.9.6.7"
                    value={value1}
                    onChange={handleChangeNumber}
                />
            </Stack>}
            {!visible ? null : <Stack direction="column" spacing={2} sx={{mt: 5}}>
                <Typography>
                    <Box component="span" fontWeight="bold">起卦方式: </Box>{guaWay}
                </Typography>
                <Typography>
                    <Box component="span" fontWeight="bold">公历: </Box>{publicTime} {shifen}
                </Typography>
                <Typography>
                    <Box component="span" fontWeight="bold">农历: </Box>{lunar}
                </Typography>
                <Typography>
                    <Box component="span" fontWeight="bold">干支: </Box>{ganYear}年 {ganMonth}月 {ganDay}日
                </Typography>
            </Stack>}
            {!visible ? null : <Stack direction="row"  sx={{mt: 5}}>
                <Stack direction="column" spacing={2} sx={{mt: 5,alignItems:'center'}}>
                    <Typography variant="h6" gutterBottom>
                        {hexagramName1}({place}){you.includes(hexagramName1)?"游魂":""}{gui.includes(hexagramName1)?"归魂":""}
                    </Typography>
                    <HexagramDisplay
                        hexagram={hexagram}
                        sixRelatives={sixRelatives}
                        sixGods={sixGods}
                        shiYing={shiYing}
                    />
                </Stack>

                <Stack direction="column" spacing={2} sx={{mt: 5,alignItems:'center'}}>
                    <Typography variant="h6" gutterBottom>
                        {hexagramName2}({place2}){you.includes(hexagramName2)?"游魂":""}{gui.includes(hexagramName2)?"归魂":""}
                    </Typography>
                    <HexagramDisplay2
                        hexagram={hexagram2}
                        sixRelatives={sixRelatives2}
                        sixGods={sixGods}
                    />
                </Stack>
            </Stack>}
        </div>
    );
}

export default SixLines;