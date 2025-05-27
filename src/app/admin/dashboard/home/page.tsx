/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
'use client'

import useSWR from "swr";
import { date, fetcher } from "@/services/services";
import { Calendar, Dot, Loader2, Paperclip, User2 } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import Image from "next/image";
import Logged from "../../auth/user";
import { ActivityType, UserType } from "../types";
import { TooltipContent, TooltipProvider, TooltipTrigger, Tooltip as ToolTip } from "@/components/ui/tooltip";
import Link from "next/link";

type Activity = {
  activity: {
    user: number,
    value: string
  },
  users_table: {
    name: string,
    profilePicture: string
    isLoggedIn: boolean
  }
};

export default function Page() {
  const { data, error } = useSWR<Activity[]>("/api/activity", fetcher);
  const { data:userData, error:userError } = useSWR<UserType[]>("/api/users", fetcher);
  const { data:articles, error:articlesError } = useSWR<UserType[]>("/api/articles", fetcher);

  if (!data) {
    return (
      <div className="flex bg-background rounded-md justify-center items-center mt-2">
        <Loader2 className="animate-spin" />
        Loading Users ...
      </div>
    );
  }

  // Aggregate activity count by user
  const userMap = new Map<number, { name: string; profilePicture: string; count: number }>();

  data.forEach(({ activity, users_table }) => {
    const userId = activity.user;
    if (!userMap.has(userId)) {
      userMap.set(userId, {
        name: users_table.name,
        profilePicture: users_table.profilePicture,
        count: 1,
      });
    } else {
      userMap.get(userId)!.count += 1;
    }
  });

  const chartData = Array.from(userMap.entries()).map(([userId, { name, profilePicture, count }]) => ({
    userId,
    name,
    profilePicture,
    activities: count,
  }));
  
  const CustomTick = ({ x, y, payload }: any) => {
    const { profilePicture } = payload;
    const userData = chartData.find(d => d.userId.toString() === payload.value.toString())
    return (
        <g transform={`translate(${x},${y})`}>
        <foreignObject x={-15} y={0} width={30} height={30}>
          {userData?.profilePicture ? (
            <img
              src={userData.profilePicture}
              alt="avatar"
              style={{
                width: '30px',
                height: '30px',
                borderRadius: '50%',
                objectFit: 'cover',
                display: 'block',
              }}
            />
          ) : (
            <div
              style={{
                width: '30px',
                height: '30px',
                borderRadius: '50%',
                backgroundColor: '#FF2500', // example fallback color
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontWeight: 'bold',
                fontSize: '16px',
              }}
            >
              {userData?.name[0].toUpperCase()}
            </div>
          )}
        </foreignObject>
      </g>
      
    );
  };
  const today = new Date()

  return (
    <div className="bg-secondary rounded-lg p-6">
      <div className="rounded-lg p-4 bg-background my-1">
        <div className="flex justify-between">
            <div className="text-sm tracking-tight font-bold text-primary ">
            Dashboard &gt; Home &gt; Overview</div>
            <div className="text-xs p-2 bg-secondary rounded-lg text-muted-foreground tracking-tight font-bold ">
                {date(today.toString())}
            </div>
        </div>
      </div>
      <div className="rounded-lg p-6 bg-background my-1">
        <div className="text-xl tracking-tight font-bold">Dashboard Statistics</div>
        <div className="bg-secondary rounded-lg p-4 mt-6 flex">
            {
                userData?.map((data, index)=>(
                    <div className="flex mr-2" key={index}>
                        {data.profilePicture!==''?
                        <div style={{ position: 'relative', width: '40px', height: '40px' }}>
                            <TooltipProvider>
                            <ToolTip>
                                <TooltipTrigger asChild>
                                <Image
                                    src={data.profilePicture}
                                    alt="Full size"
                                    className="rounded-full cursor-pointer"
                                    fill
                                    title={data.name}
                                    unoptimized
                                    style={{ objectFit: 'cover' }} // or 'contain'
                                />
                                </TooltipTrigger>
                                <TooltipContent>
                                <p>{data.name}</p>
                                </TooltipContent>
                            </ToolTip>
                            </TooltipProvider>
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block bg-gray-800 text-white text-xs px-2 py-1 rounded">
                        Hover text here
                    </div>
                    </div>:<ToolTip>
                        <TooltipTrigger asChild>
                        <div className="h-10 cursor-pointer w-10 grid justify-center items-center text-background rounded-full bg-primary">{data.name[0].toUpperCase()}</div>
                        </TooltipTrigger>
                        <TooltipContent>
                                <p>{data.name}</p>
                                </TooltipContent>
                        </ToolTip>}
                <Dot className={data.isLoggedIn==true?'absolute -mt-6 -mr-8 text-green-400':'absolute -mt-6 -mr-6 text-primary'} size={50}/>
                </div>
                ))
            }
        </div>
        <div className="grid grid-cols-12 text-sm p-2">
            <div className="col-span-2 flex">
                <Dot className="text-green-400"/> Logged In
            </div>
            <div className="col-span-2 flex">
                <Dot className="text-red-400"/> Logged Out
            </div>
        </div>
        <div className="grid grid-cols-12 text-3xl font-bold p-2 gap-4">
            <div className="col-span-4">
            <Link href='/admin/dashboard/users' className="p-3 rounded-lg hover:bg-primary hover:text-white transition-transform duration-300 cursor-pointer hover:scale-105 bg-secondary flex justify-between">
            <User2 size={20}/> {userData?.length}</Link>
            </div>
            <div className="col-span-4">
            <Link href='/admin/dashboard/articles' className="p-3 rounded-lg hover:bg-primary hover:text-white transition-transform duration-300 cursor-pointer hover:scale-105 bg-secondary flex justify-between">
                <Paperclip size={20}/> {articles?.length}</Link>
            </div>
            <div className="col-span-4">
            <Link href='/admin/dashboard/events' className="p-3 rounded-lg hover:bg-primary hover:text-white transition-transform duration-300 cursor-pointer hover:scale-105 bg-secondary flex justify-between">
                <Calendar size={20}/> 0</Link>
            </div>
        </div>
        <div className="grid grid-cols-12 text-sm gap-4">
            <div className="col-span-4 px-3 flex justify-between">
                Users            
            </div>
            <div className="col-span-4 px-3 flex justify-between">
                Articles
            </div>
            <div className="col-span-4 px-3 flex justify-between">
                Events
            </div>
        </div>

      </div>
      <div className="rounded-lg p-6 bg-background my-1">
        <div className="text-xl tracking-tight font-bold mb-6">User Activity</div>
        <BarChart width={300} height={400} data={chartData}>
          <XAxis dataKey="userId" tick={<CustomTick />} interval={0} height={50} />
          {/* <YAxis /> */}
          <Tooltip />
          <Legend />
          <Bar dataKey="activities" fill="#FF2500" label={{ position: "top" }} />
        </BarChart>
      </div>
    </div>
  );
}
