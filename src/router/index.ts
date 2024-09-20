import App from "@/App";
import Aside from "@/page/Aside";
import Grid from "@/page/Grid";
import PortraitDetail from "@/page/portraitDetail";
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
                path:"grid",
                Component:Grid
            },
            {
                id:"test",
                path:'test',
                Component:Test
            },
            {
                id:"portraitDetail",
                path:'portraitDetail',
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
