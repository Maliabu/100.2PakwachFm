/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import { Loader2 } from "lucide-react";
import { YearData } from "./monthGraph";
import MonthGraph from "./monthGraph";
import { getMyMonth } from "@/services/services";
import MonthRepGraph from "./monthRepGraph";
import { Cooky } from "../types";

export default function MonthlyActivity(props: {links: Cooky[], buttons: Cooky[], submissions: Cooky[]}) {


    // Step 1: Grouping by day (instead of year and month)
    const groupByDay = (links: Cooky[]) => {
        const currentMonth = new Date().getMonth(); // Get the current month (0-11)
        const currentYear = new Date().getFullYear(); // Get the current year
        return links.reduce((acc, link) => {
                // Get the date from createdAt
                const createdAt = new Date(link.createdAt);
                const day = createdAt.getDate(); // Get the day of the month (1-31)
                const month = createdAt.getMonth(); // Get the month (0-11)
                const year = createdAt.getFullYear(); // Get the year

                // Only accumulate data for the current month and year
                if (month === currentMonth && year === currentYear) {
                    if (!acc[day]) {
                        acc[day] = 0;
                    }
                    acc[day] += 1;
                }
            return acc;
        }, {} as Record<number, number>);
    };

    // Step 2: Structure the data for the graph
    const prepareForGraph = (groupedData: Record<number, number>) => {
        const result: YearData[] = [];
        const currentMonth = new Date().getMonth() + 1; // Get the current month (1-12)
        
        // Get the total number of days in the current month
        const daysInMonth = new Date(new Date().getFullYear(), currentMonth, 0).getDate(); // Total days in the current month
        const monthData: { day: number; month: string; total: number }[] = [];

        // Prepare the data for each day of the current month
        for (let day = 1; day <= daysInMonth; day++) {
            const total = groupedData[day] || 0; // Amount for that day or 0 if no data
            monthData.push({
                day: day, // Use day number as the label
                month: getMyMonth(currentMonth) || "",
                total: total
            });
        }

        result.push({
            year: new Date().getFullYear(),
            months: monthData, // Add month data (now it is by days)
            total: monthData.reduce((total, entry) => total + entry.total, 0) // Sum of total sales for the month
        });

        return result;
    };

    // Step 3: Prepare the data for the graph
    const groupedData = groupByDay(props.links);
    const dataForGraph = prepareForGraph(groupedData);

    const groupedData1 = groupByDay(props.buttons);
    const dataForGraph1 = prepareForGraph(groupedData1);

    const groupedData2 = groupByDay(props.submissions);
    const dataForGraph2 = prepareForGraph(groupedData2);
    const today = new Date()

    return <div>
        <div className="bg-transparent hidden sm:block rounded-lg mt-2">
            <div className="flex justify-between items-center p-1 border-b border-dark-subtle">
                <div className="text-2xl font-bold tracking-tight">Monthly Activities</div>
                <div className="text-sm bg-primary text-background rounded p-2 text-center uppercase font-bold tracking-tight">{getMyMonth(today.getMonth())}</div>
            </div>
            <MonthGraph pages={dataForGraph} buttons={dataForGraph1} submissions={dataForGraph2}/>
        </div>
        <div className="bg-transparent sm:hidden rounded-lg mt-2">
        <div className="flex justify-between p-2 border-b border-dark-subtle">
                <div className="text-2xl font-bold tracking-tight">Monthly Activities</div>
                <div className="text-sm bg-primary text-background rounded p-2 itens-center uppercase font-bold tracking-tight">{getMyMonth(today.getMonth())}</div>
            </div>
            <MonthRepGraph pages={dataForGraph} buttons={dataForGraph1} submissions={dataForGraph2}/>
        </div>
    </div>
}