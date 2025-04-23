import { LuDollarSign } from "react-icons/lu";
import { PiBag } from "react-icons/pi";
import { MdFavoriteBorder } from "react-icons/md";
import { FiSettings } from "react-icons/fi";
import { MdLogout } from "react-icons/md";
import { MdOutlineArticle } from "react-icons/md";
import { MdTour } from "react-icons/md";
import { FaBus } from "react-icons/fa";
import { TbPencilExclamation } from "react-icons/tb";
import { FaUsers } from "react-icons/fa6";
import ProfileFavorites from "../components/ProfileFavorites/ProfileFavorites";
import ProfileMyTours from "../components/ProfileMyTours/ProfileMyTours";
import ProfilePaidArticles from "../components/ProfilePaidArticles/ProfilePaidArticles";
import ProfileSettings from "../components/ProfileSettings/ProfileSettings";
import ProfileMyArticles from "../components/ProfileMyArticles/ProfileMyArticles";
import ProfileExit from "../components/ProfileExit/ProfileExit";
import ProfileTourRequests from "../components/ProfileTourRequests/ProfileTourRequests";
import ProfileAdminTours from "../components/ProfileAdminTours/ProfileAdminTours";
import ProfileModeratorArticles from "../components/ProfileModeratorArticles/ProfileModeratorArticles";
import ProfileAdminUsers from "../components/ProfileAdminUsers/ProfileAdminUsers";

const adminRole = 'admin'
const moderatorRole = 'moderator'
const authorRole = 'author'

export const profileButtons = [
    {
        name: 'users',
        text: 'Пользователи',
        icon: FaUsers,
        component: ProfileAdminUsers,
        role: adminRole,
    },
    {
        name: 'tours',
        text: 'Туры',
        icon: FaBus,
        component: ProfileAdminTours,
        role: adminRole,
    },
    {
        name: 'tour-requests',
        text: 'Заявки на тур',
        icon: MdTour,
        component: ProfileTourRequests,
        role: adminRole,
    },
    {
        name: 'unapproved-articles',
        text: 'Новые статьи',
        icon: TbPencilExclamation,
        component: ProfileModeratorArticles,
        role: moderatorRole,
    },
    {
        name: 'articles',
        text: 'Мои статьи',
        icon: MdOutlineArticle,
        component: ProfileMyArticles,
        role: authorRole,
    },
    {
        name: 'favorites',
        text: 'Избранное',
        icon: MdFavoriteBorder,
        component: ProfileFavorites,
        role: null,
    },
    {
        name: 'trips',
        text: 'Мои поездки',
        icon: PiBag,
        component: ProfileMyTours,
        role: null,
    },
    {
        name: 'paidArticles',
        text: 'Платные статьи',
        icon: LuDollarSign,
        component: ProfilePaidArticles,
        role: null,
    },
    {
        name: 'settings',
        text: 'Настройки',
        icon: FiSettings,
        component: ProfileSettings,
        role: null,
    },
    {
        name: 'exit',
        text: 'Выход',
        icon: MdLogout,
        component: ProfileExit,
        role: null,
    },
]