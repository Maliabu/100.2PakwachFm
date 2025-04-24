import React from "react";

type ReusableTabItem = {
    id: string
    title: React.JSX.Element
    activeTab: string
    setActiveTab: any
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
        <h6 onClick = { handleClick }
        className = { activeTab === id ? "active bolder" : "" } > { title } </h6> 
        </div>
    );
}