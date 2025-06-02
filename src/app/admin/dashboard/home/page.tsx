/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
'use client'

import useSWR from "swr";
import { date, fetcher, tokenise } from "@/services/services";
import { BarChart2, Calendar, Clock10, Cloud, CloudFog, Dot, Globe, Info, Loader2, Paperclip, Ticket, User2 } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import Image from "next/image";
import Logged from "../../auth/user";
import { ActivityType, UserType } from "../types";
import { TooltipContent, TooltipProvider, TooltipTrigger, Tooltip as ToolTip } from "@/components/ui/tooltip";
import Link from "next/link";
import { useEffect, useState } from "react";

type Activity = {
  activity: {
    user: number,
    value: string,
    activity: string,
  },
  users_table: {
    name: string,
    profilePicture: string
    isLoggedIn: boolean
  }
};

export default function Page() {
  const [idType, setId] = useState("")
    useEffect(() => {
        setId(tokenise()[4])
    }, [])
  const { data, error } = useSWR<Activity[]>("/api/activity", fetcher);
  const { data:userData, error:userError } = useSWR<UserType[]>("/api/users", fetcher);
  const { data:articles, error:articlesError } = useSWR<UserType[]>("/api/articles", fetcher);
  const { data:events, error:eventsError } = useSWR<UserType[]>("/api/events", fetcher);

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
        <foreignObject x={-15} y={0} width={40} height={40}>
          {userData?.profilePicture ? (
            <img
              src={userData.profilePicture}
              alt="avatar"
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                objectFit: 'cover',
                display: 'block',
              }}
            />
          ) : (
            <div
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                backgroundColor: '#E5E7EB', // example fallback color
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'black',
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
  let greeting = 'Good Morning'
  const today = new Date()
  let ampm = today.getHours() >= 12 ? 'PM' : 'AM';
  const hour = today.getHours();
  if (hour >= 5 && hour < 12) {
    greeting = 'Good Morning';
  } else if (hour >= 12 && hour < 17) {
    greeting = 'Good Afternoon';
  } else {
    greeting = 'Good Evening';
  }
  const formatTime = (date: Date) => {
    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    ampm = hours >= 12 ? 'PM' : 'AM';

    hours = hours % 12 || 12; // Convert 0 to 12 for 12-hour format
    hours = parseInt(String(hours).padStart(2, '0'));

    return `${hours}:${minutes} ${ampm}`;
  };

  return (
    <div className=" mt-2">
      <div className="rounded-lg bg-background my-1">
        <div className="grid grid-cols-12 gap-4 p-2 bg-secondary rounded-lg">
            <div className=" p-4 sm:col-span-8">
              <div className="text-lg font-bold tracking-tight">Overview</div>
            <div className="bg-background p-3 rounded-lg text-md font- tracking-tight mt-6 flex justify-between">
            <div className="flex"><Info className="mr-4 text-primary"/>Notifications</div>
              <div>0</div>
              </div>
              <div className="bg-background p-3 rounded-lg text-md font- tracking-tight mt-2 flex justify-between">
              <div className="flex"><Globe className="mr-4 text-primary"/>Web Usage</div>
              <div>0</div>
              </div>
              <div className="bg-background p-3 rounded-lg text-md font- tracking-tight mt-2 flex justify-between">
              <div className="flex"><Ticket className="mr-4 text-primary"/>Tickets</div>
              <div>0</div>
              </div>
              <div className="bg-background p-3 rounded-lg text-md font- tracking-tight mt-2 flex justify-between">
              <div className="flex"><BarChart2 className="mr-4 text-primary"/> Activities</div>
              <div>0</div>
              </div>
            </div>
            <div className="text-sm p-6 flex flex-col sm:col-span-4 justify-center items-center bg-primary text-background rounded-lg tracking-tight font-bold ">
              <div className="p-2 border rounded-md flex justify-between items-center"><Clock10 className="mr-5"/>{greeting}</div>
              <Cloud size={30} className="mt-4"/>
              <div className="text-5xl font-bold tracking-tight p-12">{formatTime(today)}</div>
                {date(today.toString())}
            </div>
        </div>
      </div>
      <div className="rounded-lg p-6 border my-1">
        <div className="text-xl tracking-tight font-bold">Dashboard Statistics</div>
        <div className="bg-secondary rounded-lg p-4 mt-6 flex">
            {
                userData?.map((data, index)=>(
                    <div className="flex mr-1" key={index}>
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
                        <div className="h-10 cursor-pointer w-10 grid justify-center items-center dark:text-foreground rounded-full bg-primary text-background">{data.name[0].toUpperCase()}</div>
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
        <div className="grid grid-cols-12 text-xs p-2">
            <div className="sm:col-span-1 col-span-6 flex items-center font-medium">
                <Dot className="text-green-400" size={30}/> Logged In
            </div>
            <div className="sm:col-span-1 col-span-6 flex items-center font-medium">
                <Dot className="text-red-400" size={30}/> Logged Out
            </div>
        </div>
        <div className="grid grid-cols-12 text-lg p-2 gap-4">
            {idType=='admin' && <div className="col-span-4">
            <Link href='/admin/dashboard/users' className="p-3 rounded-lg transition-transform duration-300 cursor-pointer hover:scale-105 bg-secondary flex justify-between">
            <User2 size={20} className="text-primary"/> <div className="h-8 w-8 flex font-medium items-center justify-center bg-secondary rounded-full">{userData?.length}</div></Link>
            </div>}
            <div className="col-span-4">
            <Link href='/admin/dashboard/articles' className="p-3 rounded-lg transition-transform duration-300 cursor-pointer hover:scale-105 bg-secondary flex justify-between">
                <Paperclip size={20} className="text-primary"/> <div className="h-8 w-8 flex items-center justify-center bg-secondary rounded-full">{articles?.length}</div></Link>
            </div>
            <div className="col-span-4">
            <Link href='/admin/dashboard/events' className="p-3 rounded-lg transition-transform duration-300 cursor-pointer hover:scale-105 bg-secondary flex justify-between">
                <Calendar size={20} className="text-primary"/> <div className="h-8 w-8 flex items-center justify-center bg-secondary rounded-full">{events?.length}</div></Link>
            </div>
        </div>
        <div className="grid grid-cols-12 text-md gap-4">
            {idType=='admin' && <div className="col-span-4 px-3 flex justify-between">
                Users            
            </div>}
            <div className="col-span-4 px-3 flex justify-between">
                Articles
            </div>
            <div className="col-span-4 px-3 flex justify-between">
                Events
            </div>
        </div>

      </div>
      {idType=='admin' && <div className="rounded-lg p-6 border my-1">
        <div className="sm:grid sm:grid-cols-12">
          <div className="sm:col-span-6">
          <div className="text-xl tracking-tight font-bold mb-6">User Activity</div>
        <BarChart width={350} height={400} data={chartData}>
          <XAxis dataKey="userId" tick={<CustomTick />} axisLine={false} interval={0} height={50} />
          {/* <YAxis axisLine={false} tickLine={false}/> */}
          <Tooltip />
          <Legend />
          <Bar dataKey="activities" fill="#fa3c00" label={{ position: "top" }} radius={[10, 10, 10, 10]} />
        </BarChart></div>
        <div className="sm:col-span-6 admin rounded-lg">
          {
            data.map((activity, index) => (
              <div key={index} className="sm:grid bg-secondary p-2 rounded-lg sm:grid-cols-12 mt-1 items-center text-xs">
                        <div className="h-10 col-span-2 w-10 grid justify-center items-center text-lg dark:text-foreground text-background rounded-full bg-primary">{activity.users_table.name[0].toUpperCase()}</div>
                        <div className="col-span-10 font-medium">{activity.activity.activity}</div>
              </div>
            ))
          }
        </div>
        </div>
      </div>}
    </div>
  );
}
