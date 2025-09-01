import App from "@/App";
import Aside from "@/page/Aside";
import Grid from "@/page/Grid";
import PortraitDetail from "@/page/portraitDetail";
import PlumBlossom from "@/page/PlumBlossom";
import SixLines from "@/page/SixLines";
import Test from "@/page/Test";

import {
    createBrowserRouter,
} from "react-router-dom";

const router=createBrowserRouter([
    {
        path:"/",
        Component:App,
        children:[
            {
                id:"grid",
                path:"/grid",
                Component:Grid
            },
            {
                id:"plumBlossom",
                path:"/plumBlossom",
                Component:PlumBlossom
            },
            {
                id:"sixLines",
                path:"/sixLines",
                Component:SixLines
            },
            {
                id:"test",
                path:'/test',
                Component:Test
            },
            {
                id:"portraitDetail",
                path:'/portraitDetail',
                Component:PortraitDetail
            },
        ]
    },
    {
        id:"aside",
        path:"/aside",
        Component:Aside,
    },





]);

export default router;
