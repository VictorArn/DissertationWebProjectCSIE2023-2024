import Contact from "./views/Contact";
import Home from "./views/Home";
import NotFound from "./views/NotFound";
import RequestList from "./views/Requests";
import Requests from "./views/Requests";
import Sessions from "./views/Sessions";
import HomeIcon from '@mui/icons-material/Home';
import RequestPageIcon from '@mui/icons-material/RequestPage';
import GroupsIcon from '@mui/icons-material/Groups';
import BrowserNotSupportedIcon from '@mui/icons-material/BrowserNotSupported';
import ContactPageIcon from '@mui/icons-material/ContactPage';
import RequestEdit from "./views/RequestsEdit";
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';

export const routes = Object.freeze([

    {
        path: "/Home",
        component: Home,
        name: "Home",
        icon: HomeIcon
    },
 
    {
        path: "/Contact",
        component: Contact,
        name: "Contact",
        icon: ContactPageIcon
    },

    {
        path: "*",
        component: NotFound,
        name: null,
        icon: BrowserNotSupportedIcon
    },

    {
        path: "/Requests",
        component: RequestList,
        name: "Requests",
        icon: RequestPageIcon
    },

    {
        path: "/Sessions",
        component: Sessions,
        name: "Sessions",
        icon: GroupsIcon
    },

    {
        path:"/NewRequest",
        component: RequestEdit,
        name: null,
        icon: AddIcon

    },

    {
        path:"/EditRequest:id",
        component: RequestEdit,
        name: null,
        icon: EditIcon
        

    }



]);

