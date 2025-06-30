import React from "react";

type TabContentProps = {
    id: string;
    activeTab: string;
    children: React.ReactNode;
}

export default function TabContent({ id, activeTab, children }: TabContentProps) {
    return (
        activeTab === id ? < div className = "TabContent" > { children } 
        </div> : null
    );
};