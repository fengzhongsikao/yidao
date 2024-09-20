import App from "@/App";
import Aside from "@/page/Aside";
import Grid from "@/page/Grid";
import PortraitDetail from "@/page/portraitDetail";

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
            }
        ]
    },
    {
        id:"aside",
        path:"/aside",
        Component:Aside,
    },
    {
        id:"portraitDetail",
        path:'/portraitDetail',
        Component:PortraitDetail
    }

]);

export default router;
