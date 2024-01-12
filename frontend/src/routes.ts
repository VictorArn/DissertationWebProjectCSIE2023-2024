import Contact from "./views/Contact";
import Home from "./views/Home";
import NotFound from "./views/NotFound";
import Requests from "./views/Requests";
import Sessions from "./views/Sessions";


export const Routes = Object.freeze([

    {
        path: "/Home",
        component: Home,
        name: "Home",
        //icon: HomeIcon
    },
 
    {
        path: "/Contact",
        component: Contact,
        name: "Contact",
        //icon: ContactIcon
    },

    {
        path: "*",
        component: NotFound,
        name: null,
        //icon: BrowserNotSupportedIcon
    },

    {
        path: "/Requests",
        component: Requests,
        name: "Reguests",
        //icon: RequestIcon
    },

    {
        path: "/Sessions",
        component: Sessions,
        name: "Sessions",
        //icon: SessionsIcon
    },


]);

