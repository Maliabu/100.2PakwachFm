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
        className = { activeTab === id ? " text-xs cursor-pointer py-3" : "cursor-pointer py-3 text-xs" } > { title } </div> 
        </div>
    );
}