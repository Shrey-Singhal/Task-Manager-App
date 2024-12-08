import { Home, ListTodo, CircleCheckBig, Trash2 } from "lucide-react";

export const APPNAV_ITEMS = [
  {
    title: "Dashboard",
    path: "/dashboard",
    icon: <Home />,
  },
  {
    title: "To Do",
    path: "/todo",
    icon: <ListTodo />,
  },
  {
    title: "In Progress",
    path: "/inprogress",
    icon: <ListTodo />
  },
  {
    title: "Completed",
    path: "/completed",
    icon: <CircleCheckBig />
  },
  {
    title: "Trash",
    path: "/trash",
    icon: <Trash2 />
  }
];