import React from "react";
import { APPNAV_ITEMS } from "./APPNAV_ITEMS";
import { Link, useLocation } from "react-router-dom";
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from "react-icons/md";
import { useSidebar } from "../contexts/sidebarContext";

const Sidebar = () => {
    const location = useLocation(); // Get current path
    const { isCollapsed, setIsCollapsed } = useSidebar();

    const toggleAppbarCollapseHandler = () => {
        setIsCollapsed(!isCollapsed);
    };

    const sidebarBaseClass = "fixed text-black bg-customGrey h-full shadow-lg shadow-gray-900/200 transition ease-in-out duration-500 transition-all";
    const sidebarClasses = isCollapsed 
        ? `${sidebarBaseClass} w-[5rem]` // width when collapsed
        : `${sidebarBaseClass} w-[16rem]`; // normal width

    const buttonBaseClass = "fixed z-50 top-[4rem] w-[1.5rem] h-[1.5rem] border border-gray-300 flex justify-center items-center cursor-pointer translate-x-2/4 bg-white rounded-full duration-500 transition-all";
    const buttonClasses = isCollapsed
        ? `${buttonBaseClass} left-[3.5rem]`
        : `${buttonBaseClass} left-[14.5rem]`;

    return (
        <div>
            {/* Collapse/Expand Button */}
            <button className={buttonClasses} onClick={toggleAppbarCollapseHandler}>
                {isCollapsed ? <MdOutlineKeyboardArrowRight /> : <MdOutlineKeyboardArrowLeft />}
            </button>

            {/* Sidebar */}
            <aside className={sidebarClasses}>
                {/* Title Section */}
                <div className="flex items-center justify-center py-5 px-3.5 mt-4">
                    <h1 className={`text-2xl text-Black font-bold text-center transition-all ${isCollapsed ? "hidden" : "block"}`}>
                        Task Manager
                    </h1>
                </div>

                {/* Navigation Section */}
                <nav className="flex flex-col gap-2 transition duration-500 ml-4 mt-10 mr-4">
                    {APPNAV_ITEMS.map((item) => {
                        const isActive = location.pathname === item.path;
                        const itemClass = isActive
                            ? "flex items-center gap-4 p-4 bg-customLightBlue text-customDarkBlue rounded-xl transition duration-500 ease-in-out cursor-pointer"
                            : "flex items-center gap-4 p-4 text-black rounded-xl transition duration-500 ease-in-out cursor-pointer";

                        return (
                            <Link to={item.path} key={item.title}>
                                <span className={itemClass}>
                                    {item.icon && React.cloneElement(item.icon, { className: "text-2xl" })}
                                    {!isCollapsed && <span>{item.title}</span>}
                                </span>
                            </Link>
                        );
                    })}
                </nav>
            </aside>
        </div>
    );
};

export default Sidebar;
