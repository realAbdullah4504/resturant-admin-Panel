import { Mail, Home, EyeOff, LifeBuoy, User, Circle } from "react-feather"

export default [
  // {
  //   id: "home",
  //   title: "Home",
  //   icon: <Home size={20} />,
  //   navLink: "/home"
  // },
  // {
  //   id: "secondPage",
  //   title: "Second Page",
  //   icon: <Mail size={20} />,
  //   navLink: "/second-page"
  // },
  // {
  //   id: "dashboards",
  //   title: "Dashboards",
  //   icon: <Home size={20} />,
  //   badge: "light-warning",
  //   badgeText: "2"
  // },
  // {
  //   id: "disabledMenu",
  //   title: "Disabled Menu",
  //   icon: <EyeOff size={20} />,
  //   navLink: "#",
  //   disabled: true
  // },
  // {
  //   id: 'raiseSupport',
  //   title: 'Raise Support',
  //   icon: <LifeBuoy size={20} />,
  //   externalLink: true,
  //   newTab: true,
  //   navLink: 'https://pixinvent.ticksy.com/'
  // },
  {
    id: 'category',
    title: 'Category',
    icon: <User size={20} />,
    navLink: "/options"
  },
  {
    id: 'menu',
    title: 'Menu',
    icon: <User size={20} />,
    navLink: "/services"
  }
]
