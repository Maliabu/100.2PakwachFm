"use client"
/* eslint-disable @typescript-eslint/no-unused-vars */


import useSWR from "swr";
import { fetcher } from "@/services/services";
import { EventType } from "../types";
import { EventCard } from "./view/eventsCard";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Events(){
    let event: EventType[] = []
  const { data: events, error: eventError } = useSWR("/api/events", fetcher);
  if(events){
      event = events
  }
  if(!events){
    return <div className="text-xs">loading events ...</div>
  }
    return(
        <div className=" rounded-lg p-2 bg-secondary">
          <div className="p-4 bg-background rounded-lg flex items-center justify-between text-sm uppercase"> 
            <div className="text-2xl font-bold tracking-tight capitalize">
            Events
            </div>
            <Link href='/admin/dashboard/events'><Button>Add New Events</Button></Link>
            total: {event.length}</div>
            {
                    event.length > 0 ? (
                      <div className="sm:grid sm:grid-cols-12">
                        {event.map(event => (
                          <div key={event.id} className="col-span-3">
                          <EventCard {...event}/>
                          </div>
                        ))}
                      </div>
                    ) : <div className="flex flex-col space-y-3 bg-background rounded-lg mt-2 items-center justify-center p-6">
                    <Skeleton className="h-[125px] w-[250px] rounded-xl" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-[250px]" />
                      <Skeleton className="h-4 w-[200px]" />
                    </div>
                  </div>
                  }
        </div>
    )
}