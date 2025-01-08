import {Ying,Yang} from "@/page/comnents/twoYao.tsx";
import Stack from "@mui/material/Stack";

// 乾1
export function Qian(){
    return (
        <Stack spacing={2} sx={{marginBottom:'10px'}}>
            <Yang/>
            <Yang/>
            <Yang/>
        </Stack>
    )
}

// 兑2
export function Dui(){
    return (
        <Stack spacing={2} sx={{marginBottom:'10px'}}>
            <Ying/>
            <Yang/>
            <Yang/>
        </Stack>
    )
}
// 离3
export function MyLi(){
    return (
        <Stack spacing={2} sx={{marginBottom:'10px'}}>
            <Yang/>
            <Ying/>
            <Yang/>
        </Stack>
    )
}


// 震4
export function Zhen(){
    return (
        <Stack spacing={2} sx={{marginBottom:'10px'}}>
            <Ying/>
            <Ying/>
            <Yang/>
        </Stack>
    )
}

// 巽5
export function Xun(){
    return (
        <Stack spacing={2} sx={{marginBottom:'10px'}}>
            <Yang/>
            <Yang/>
            <Ying/>
        </Stack>
    )
}
// 坎6
export function Kan(){
    return (
        <Stack spacing={2} sx={{marginBottom:'10px'}}>
            <Ying/>
            <Yang/>
            <Ying/>
        </Stack>
    )
}

// 艮7
export function Gen(){
    return (
        <Stack spacing={2} sx={{marginBottom:'10px'}}>
            <Yang/>
            <Ying/>
            <Ying/>
        </Stack>
    )
}

// 坤8
export function Kun(){
    return (
        <Stack spacing={2} sx={{marginBottom:'10px'}}>
            <Ying/>
            <Ying/>
            <Ying/>
        </Stack>
    )
}


