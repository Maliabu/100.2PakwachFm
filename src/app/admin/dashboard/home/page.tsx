/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
'use client'

import useSWR from "swr";
import { date, dater, fetcher, getMyDay, getMyMonth, tokenise } from "@/services/services";
import { BarChart2, Calendar, Calendar1, Clock10, ClockAlert, Cloud, CloudFog, Dot, Globe, Info, Loader2, MailOpen, Paperclip, Ticket, User2 } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import Image from "next/image";
import Logged from "../../auth/user";
import { ActivityType, ArticleType, Cooky, EventType, UserType } from "../types";
import { TooltipContent, TooltipProvider, TooltipTrigger, Tooltip as ToolTip } from "@/components/ui/tooltip";
import Link from "next/link";
import { useEffect, useState } from "react";
import Shape from '@/app/images/shape.png'
import Shape1 from '@/app/images/shape2.png'
import { Message } from "../messages/view/page";
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'
import { Activity } from "../account/page";

export type Ticketing = {
  tickets: {
    opened: number,
    value: string,
    issue: string,
    status: string,
  },
  users_table: {
    name: string,
    profilePicture: string
    isLoggedIn: boolean
  }
};
export type Notify = {
  id: number;
  notification: string;
  createdAt: Date;
  updatedAt: Date;
  status: string;
  users: {
      name: string
  }
}

export default function Page() {
  const [idType, setId] = useState("")
  const [id, setid] = useState("")
    useEffect(() => {
        setId(tokenise()[4])
        setid(tokenise()[3])
    }, [])
  const { data, error } = useSWR<Activity[]>('/api/activity', fetcher);
  const { data:activity, error:activityError } = useSWR<Activity[]>(`/api/activity/${id}`, fetcher);
  const { data:userData, error:userError } = useSWR<UserType[]>("/api/users", fetcher);
  const { data:articles, error:articlesError } = useSWR<ArticleType[]>("/api/articles", fetcher);
  const { data:events, error:eventsError } = useSWR<EventType[]>("/api/events", fetcher);
  const { data:tickets, error:ticketError } = useSWR<Ticketing[]>("/api/tickets", fetcher);
  const { data:notifications, error:notificationError } = useSWR<Notify[]>("/api/notifications", fetcher);
  const { data:messages, error:messageError } = useSWR<Message[]>("/api/messages", fetcher);
  const { data:cookies, error:cookieError } = useSWR<Cooky[]>('/api/cookies', fetcher);
  const open: Ticketing[] = []
  const closed: Ticketing[] = []
  const newNot: Notify[] = []
  const newMessage: Message[] = []
  const oldMessage: Message[] = []
  const read: Notify[] = []
  let cooky: Cooky[] = []

  if (!data) {
    return (
      <div className="flex bg-background rounded-md justify-center items-center mt-2">
        <Loader2 className="animate-spin" />
        Loading Users ...
      </div>
    );
  }

  if(tickets){
    tickets.forEach(ticket => {
      if(ticket.tickets.status==='open'){
        open.push(ticket)
      } else{
        closed.push(ticket)
      }
    })
  }
  if(notifications){
    notifications.forEach(notification => {
      if(notification.status==='new'){
        newNot.push(notification)
      } else{
        read.push(notification)
      }
    })
  }
  if(messages){
    messages.forEach(message => {
      if(message.status==='new'){
        newMessage.push(message)
      } else{
        oldMessage.push(message)
      }
    })
  }
  let links = []
  let buttons = []
  let submissions = []
  if(cookies){
    cooky = cookies
    const parsedEvents = cooky.map(cookie => {
      let metadata: any = {}
      try {
        metadata = typeof cookie.metadata === 'string' ? JSON.parse(cookie.metadata) : cookie.metadata
      } catch (e) {
        console.warn(`Could not parse metadata for event ${cookie.id}`)
      }

      return {
        ...cookie,
        metadata,
      }
    })
    links = parsedEvents.filter(e => e.metadata.tag === 'A')
    buttons = parsedEvents.filter(e => e.metadata.tag === 'BUTTON')
    submissions = parsedEvents.filter(e =>
      ['FORM', 'INPUT', 'TEXTAREA'].includes(e.metadata.tag ?? '')
    )
  }
  const uniqueData = activity!==undefined?activity.filter((value: Activity, index: number, self: Activity[]) => 
    index === self.findIndex((t: Activity) => (
      t.activity.id === value.activity.id
    ))
  ):null
  const uniqueActivity = data!==undefined?data.filter((value: Activity, index: number, self: Activity[]) => 
    index === self.findIndex((t: Activity) => (
      t.activity.id === value.activity.id
    ))
  ):null
  const pieData = [
    { name: 'Links', value: links.length || 0 },
    { name: 'Buttons', value: buttons.length || 0 },
    { name: 'Submissions', value: submissions.length || 0 },
    { name: 'Others', value: cooky.length - (buttons.length + submissions.length + links.length) || 0 },
  ]

  // Aggregate activity count by user
  const userMap = new Map<number, { name: string; profilePicture: string; count: number; tickets: number }>();

  uniqueActivity?.forEach(({ activity, users_table }) => {
    const userId = activity.user;
    if (!userMap.has(userId)) {
      userMap.set(userId, {
        name: users_table.name,
        profilePicture: users_table.profilePicture,
        count: 1,
        tickets: 0,
      });
    } else {
      userMap.get(userId)!.count += 1;
    }
  });
  tickets?.forEach(({ tickets, users_table }) => {
    const userId = parseInt(tickets.opened.toString()); // Replace with actual user ID field
  
    // You probably need the user ID of the ticket owner, not `.opened`
    // Fix this depending on your schema
    // For example:
    // const userId = tickets.user;
  
    const existing = [...userMap.values()].find(u => u.name === users_table.name); // fallback if userId missing
    if (existing) {
      userMap.forEach((value, key) => {
        if (value.name === users_table.name) {
          userMap.get(key)!.tickets += 1;
        }
      });
    } else {
      // If user not already in map, add them
      userMap.set(userId, {
        name: users_table.name,
        profilePicture: users_table.profilePicture,
        count: 0,
        tickets: 1,
      });
    }
  });
  

  const chartData = Array.from(userMap.entries()).map(([userId, { name, profilePicture, count, tickets }]) => ({
    userId,
    name,
    profilePicture,
    activities: count,
    tickets: tickets
  }));
  
  const CustomTick = ({ x, y, payload }: any) => {
    const { profilePicture } = payload;
    const userData = chartData.find(d => d.userId.toString() === payload.value.toString())
    return (
        <g transform={`translate(${x},${y})`}>
        <foreignObject x={-15} y={0} width={40} height={40}>
          {userData?.profilePicture.includes('users') ? (
            <img
              src={userData.profilePicture}
              alt="avatar"
              style={{
                width: '35px',
                height: '35px',
                borderRadius: '50%',
                objectFit: 'cover',
                display: 'block',
              }}
            />
          ) : (
            <div
              style={{
                width: '35px',
                height: '35px',
                border: '1px solid #A1A1AA',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#A1A1AA',
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
  // const COLORS = ['#22c55e', '#fa3c00', '#152653', '#ededed'] 
  // #fa3c00 - orange
  // #152653 - blue
  const COLORS = ['#992600', '#fa3c00', '#FF6A3D', '#FFD2C2'] 

  return (
    <div className=" mt-2">
      <div className="rounded-lg my-1">
        <div className="grid grid-cols-12 gap-2">
            <div className=" sm:p-8 p-6 sm:col-span-8 col-span-12 bg-background rounded-lg">
              <div className="text-xl font-bold flex justify-between tracking-tight text-">Overview <Image src={Shape} alt="shape" height={40} width={80}/></div>
            <div className="bg-secondary p-3 rounded-lg text-md font-bold tracking-tight mt-6 flex justify-between">
            <div className="flex"><Info className="mr-4 text-"/>Notifications</div>
              <div>{newNot.length + read.length}</div>
              </div>
              <div className="grid grid-cols-3 font-medium text-sm py-4">
              <div className="flex"><div className=" mr-2 border-r pr-2">{newNot.length}</div>New</div>
              <div className="flex"><div className=" mr-2 border-r pr-2">{read.length}</div>Read</div>
              </div>
              <div className="bg-secondary p-3 rounded-lg text-md font-bold tracking-tight mt-2 flex justify-between">
              <div className="flex"><Globe className="mr-4 text-"/>Web Usage</div>
              <div>{cooky.length}</div>
              </div>
              <div className="sm:flex sm:justify-between">
              <div className=" font-medium text-sm">
              <div className="flex mt-4 p-2 border border-black dark:border-white/50 rounded"><div className=" mr-2 border-r pr-2">{links.length}</div>Page Visits</div>
              <div className="flex mt-4 p-2 border border-black dark:border-white/50 rounded"><div className=" mr-2 border-r pr-2">{buttons.length}</div>Button Clicks</div>
              <div className="flex mt-4 p-2 border border-black dark:border-white/50 rounded"><div className=" mr-2 border-r pr-2">{submissions.length}</div>Submissions</div>
              <div className="flex mt-4 p-2 border border-black dark:border-white/50 rounded"><div className=" mr-2 border-r pr-2">{messages?.length}</div>Messages</div>
              <div className="flex mt-4 p-2 border border-black dark:border-white/50 rounded"><div className=" mr-2 border-r pr-2">{cooky.length - (buttons.length + submissions.length + links.length)}</div>Other Interactions</div>
              </div>
              <ResponsiveContainer width={300} height={300}>
                <PieChart>
                  <Pie
                    data={pieData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    // label
                  >
                    {data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="none" />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend verticalAlign="bottom" height={36} wrapperStyle={{ fontSize: '12px' }}  />
                </PieChart>
              </ResponsiveContainer>
              </div>
              <div className="bg-secondary p-3 rounded-lg text-md font-bold tracking-tight mt-2 flex justify-between">
              <div className="flex"><Ticket className="mr-4 text-"/>Tickets</div>
              <div>{open.length + closed.length}</div>
              </div>
              <div className="grid grid-cols-3 font-medium text-sm py-4">
              <div className="flex"><div className=" mr-2 border-r pr-2">{open.length}</div>Opened</div>
              <div className="flex"><div className=" mr-2 border-r pr-2">{closed.length}</div>Closed</div>
              </div>
              <div className="bg-secondary p-3 rounded-lg text-md font-bold tracking-tight mt-2 flex justify-between">
              <div className="flex"><BarChart2 className="mr-4 text-"/> Activities</div>
              <div>{uniqueActivity?.length}</div>
              </div>
            </div>
            <div className="text-sm p-6 flex flex-col sm:col-span-4 col-span-12 bg-background text-foreground rounded-lg tracking-tight font-bold ">
              <div className="py-2 px-5 bg-secondary rounded-md flex justify-between items-center"><Calendar1 className="mr-5"/>{greeting}</div>
              {open.length>0 && <Link href='/admin/dashboard/ticket/view'><div className="py-2 px-5 bg-orange-400/20 text-orange-600 rounded-md flex justify-between items-center animate-pulse mt-1"><Ticket className="mr-5"/>You have {open.length} Ticket(s) pending</div></Link>}
              {newNot.length>0 && <div className="py-2 px-5 bg-orange-400/20 text-orange-600 rounded-md flex justify-between items-center animate-pulse mt-1"><Info className="mr-5"/>You have {newNot.length} Notification(s) pending</div>}
              {newMessage.length>0 && <div className="py-2 px-5 bg-orange-400/20 text-orange-600 rounded-md flex justify-between items-center mt-1 animate-pulse"><MailOpen className="mr-5"/>You have {newMessage.length} Message(s) pending</div>}
              <div className="p-5 my-8 bg-secondary rounded-xl">
              <ClockAlert size={60} className=""/>
              <div className="text-5xl font-bold tracking-tight mt-12">{formatTime(today)}</div>
              <div className="font-normal py-2">{getMyDay(today.getDay())}, {today.getDate()} {getMyMonth(today.getMonth()+1)}</div></div>
        <div className="items-center bg-background rounded-lg">
        <Image src={Shape1} alt="shape" height={20} width={80}/>
        <div className="text-xl tracking-tight text- font-bold my-8 p-2 bg-secondary rounded-lg">User Statistics</div>
        <div className=" flex">
            {
                userData?.map((data, index)=>(
                    <div className="flex mr-1" key={index}>
                        {data.profilePicture.includes('users')?
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
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block bg-backgrund text-white text-xs px-2 py-1 rounded">
                        Hover text here
                    </div>
                    </div>:<ToolTip>
                        <TooltipTrigger asChild>
                        <div className="h-10 cursor-pointer w-10 grid justify-center items-center dark:text-foreground rounded-full bg-secondary">{data.name[0].toUpperCase()}</div>
                        </TooltipTrigger>
                        <TooltipContent>
                                <p>{data.name}</p>
                                </TooltipContent>
                        </ToolTip>}
                <Dot className={data.isLoggedIn==true?'absolute -mt-6 -mr-8 text-orange-400':'absolute -mt-6 -mr-6 text-black-600'} size={50}/>
                </div>
                ))
            }
        </div>
        </div>
        <div className="grid grid-cols-12 text-sm p-2">
            <div className=" col-span-6 flex items-center font-medium">
                <Dot className="text-orange-400" size={30}/> Logged In
            </div>
            <div className=" col-span-6 flex items-center font-medium">
                <Dot className="text-black-400" size={30}/> Logged Out
            </div>
        </div>
            </div>
        </div>
      </div>
      <div>
        <div className="grid sm:grid-cols-12 grid-cols-1 text-lg p-1 gap-2">
            {idType=='admin' && <div className="sm:col-span-4">
            <Link href='/admin/dashboard/users' className=" rounded-lg transition-transform duration-300 cursor-pointer hover:scale-105 bg-background flex justify-between">
            <div className="text-sm p-6"><User2 size={20} className="text-"/> Users</div> 
            <div className="p-6 flex text-2xl font-medium items-center justify-center bg-primary text-white rounded-r-lg">{userData?.length}</div>
            </Link>
            </div>}
            <div className="sm:col-span-4">
            <Link href='/admin/dashboard/articles' className=" rounded-lg transition-transform duration-300 cursor-pointer hover:scale-105 bg-background flex justify-between">
                <div className="text-sm p-6"><Paperclip size={20} className="text-"/> Articles</div>
                <div className="p-6 flex text-2xl font-medium items-center justify-center bg-primary text-white rounded-r-lg">{articles?.length}</div></Link>
            </div>
            <div className="sm:col-span-4">
            <Link href='/admin/dashboard/events' className=" rounded-lg transition-transform duration-300 cursor-pointer hover:scale-105 bg-background flex justify-between">
                <div className="text-sm p-6"><Calendar size={20} className="text-"/> Events</div>
                <div className="p-6 flex text-2xl font-medium items-center justify-center bg-primary text-white rounded-r-lg">{events?.length}</div></Link>
            </div>
        </div>

      </div>
      {idType=='admin' && <div className="rounded-lg p-6 p-2 bg-background my-1">
        <div className="sm:grid sm:grid-cols-12">
          <div className="sm:col-span-8">
          <div className="text-xl tracking-tight font-bold text- mb-6">User Activity</div>
          <div className="sm:hidden">
        <BarChart width={300} height={300} data={chartData} barCategoryGap={8} barGap={0}>
          <XAxis dataKey="userId" tick={<CustomTick />} axisLine={false} tickLine={false} interval={0} height={50} />
          {/* <YAxis axisLine={false} tickLine={false}/> */}
          <Tooltip />
          <Legend />
          <Bar dataKey="activities" fill="#FFD2C2" label={{ position: "top" }} />
          <Bar dataKey="tickets" fill="#fa3c00" label={{ position: "top" }} />
        </BarChart></div>
          <div className="sm:block hidden">
        <BarChart width={500} height={400} data={chartData} barCategoryGap={8} barGap={0}>
          <XAxis dataKey="userId" tick={<CustomTick />} axisLine={false} tickLine={false} interval={0} height={50} />
          <YAxis axisLine={false} tickLine={false}/>
          <Tooltip />
          <Legend />
          <Bar dataKey="activities" fill="#FFD2C2" label={{ position: "top" }} />
          <Bar dataKey="tickets" fill="#fa3c00" label={{ position: "top" }} />
        </BarChart>
          </div></div>
        <div className="sm:col-span-4 admin rounded-lg">
          {
            uniqueData!==null?uniqueData.map((activity, index) => (
              <div key={index} className="grid bg-secondary p-2 rounded-lg grid-cols-12 mt-1 items-center text-xs">
                        <div className="h-10 col-span-3 w-10 grid justify-center items-center text-lg dark:text-foreground text-background rounded-full bg-primary">{activity.users_table.name[0].toUpperCase()}</div>
                        <div className="col-span-9 font-medium">{activity.activity.activity}</div>
              </div>
            )):null
          }
        </div>
        </div>
      </div>}
    </div>
  );
}
// #fa3c00 - orange
// #152653 - blue
