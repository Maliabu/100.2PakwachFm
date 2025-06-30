/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { Dispatch, SetStateAction } from "react";

type ReusableTabItem = {
    id: string
    title: React.ReactNode
    activeTab: string
    setActiveTab: Dispatch<SetStateAction<string>>
}
export default function TabNavItem({
    id, 
    title, 
    activeTab, 
    setActiveTab
}: ReusableTabItem){
    const handleClick = () => {
        setActiveTab(id);
        // if(props.show1){
        // props.setShow1(false)}
    }
    return ( 
    <div className = "tab-nav">
        <div onClick = { handleClick }
        className = { activeTab === id ? "text-primary text-xs uppercase font-bold cursor-pointer p-3 bg-red-400/10" : "cursor-pointer py-3 text-xs uppercase" } > { title } </div> 
        </div>
    );
}