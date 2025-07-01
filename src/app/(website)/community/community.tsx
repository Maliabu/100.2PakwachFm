"use client"
/* eslint-disable @typescript-eslint/no-unused-vars */

import * as React from "react"
import { ListItem, Menu } from "../navigation/menu";
import { Button } from "@/components/ui/button";
// import { Highlights } from "./highlights";
import Footer from "../navigation/footer";
import { SearchBar } from "../navigation/search";
import Popular from "../home/popular";
import Menu1 from "../navigation/menu1";
import { Loader2, Users2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import PartnerCarousel from "./partners";
import Articles from "../articles";
import TabContent from "../navigation/tabContent";
import TabNavItem from "../navigation/tabItem";
import Gallery, { GalleryProps } from "./gallery";
import CommunityGallery from "./gallery";
import Messages from "@/app/admin/dashboard/messages/page";
import Opportunities from "@/app/admin/dashboard/opportunities/page";
import { Opportunity } from "@/app/admin/dashboard/opportunities/view/page";
import useSWR from "swr";
import { date, fetcher } from "@/services/services";
import { Skeleton } from "@/components/ui/skeleton";


export default function Community({ images, items }: GalleryProps) {
  const [activeTab, setActiveTab] = React.useState<string>('tab1')
  let notify: Opportunity[] = []
  const { data, error } = useSWR("/api/opportunities/hiring", fetcher);
  const { data:seeking, error:seekingError } = useSWR<Opportunity[]>("/api/opportunities/seeking", fetcher);
  if(data){
      notify = data
  }
  if (!data) return <div className="flex p-6 bg-background rounded-md justify-center items-center mt-2"><Loader2 className="animate-spin"/></div>;
  if (!seeking) return <div className="flex p-6 bg-background rounded-md justify-center items-center mt-2"><Loader2 className="animate-spin"/></div>;


  return (
    <div>
    <div className="grid sm:grid-cols-12 gap-1 rounded-lg">
      <div className="sm:col-span-9 bg-background sm:p-8 p-4 rounded-lg">
        <div className="text-sm text-muted-foreground uppercase">our community </div>
        <div className="text-5xl tracking-tight leading-10 font-bold my-4 capitalize">join us</div>
        <div className="text-sm">Our roots run deep in Pakwach, Uganda — a place full of vibrant culture, strong community spirit, and inspiring local initiatives. We’re proud to work alongside NGOs, youth groups, and community organizations in Pakwach that are creating real change on the ground. This page highlights some of the partners we support as they work to uplift lives, promote education, protect the environment, and build a brighter future for everyone in the region.</div>
        <div className="text-sm text-muted-foreground uppercase my-8">cause ally </div>
        <PartnerCarousel/>
      </div>
        <div className="sm:col-span-3 community rounded-lg p-4">
            <div className="text-sm hidden text-muted-foreground uppercase"><Users2/> </div>
        </div>
    </div>
    <div className="grid sm:grid-cols-12 gap-1 my-1 rounded-lg">
      <div className="sm:col-span-9">
        <TabContent id="tab1" activeTab={activeTab}>
          <CommunityGallery images={images}/>
        </TabContent>
        <TabContent id="tab2" activeTab={activeTab}>
            <div className="grid sm:grid-cols-12 gap-2">
                <div className="sm:col-span-4 bg-background rounded-lg p-4">
          <div className="text-2xl tracking-tight font-bold leading-6">Are you Hiring? or just looking for a vacancy?</div>
          <Opportunities/>
          </div>
          <div className="sm:col-span-8 flex justify-between gap-2 p-4 rounded-lg bg-background admin">
          { notify.length>0?
                        notify.map((notes, index) => (
                            <div key={index} className="mb-1">
                     <div className="p-8 shadow-sm rounded-lg">
                        <div>
                     <div className="text-xs text-muted-foreground">{notes.email}</div>
                     <div className="text-xs text-muted-foreground">{notes.phone}</div>
                     <div className="text-sm font-medium my-3">{notes.message}</div>
                       <div className=" text-xs text-muted-foreground">{date(notes.createdAt.toString())}</div>
                       </div>
                       <div></div></div>
                            </div>
                        )):<div>None hiring</div>
                    }
            <div>
            { seeking.length>0?
                        seeking.map((notes, index) => (
                            <div key={index} className="mb-1">
                     <div className="p-8 shadow-sm rounded-lg">
                        <div>
                     <div className="text-xs text-muted-foreground">{notes.email}</div>
                     <div className="text-xs text-muted-foreground">{notes.phone}</div>
                       <div className="text-sm font-medium my-3">{notes.message}</div>
                       <div className=" text-xs text-muted-foreground">{date(notes.createdAt.toString())}</div>
                       </div>
                       <div></div></div>
                            </div>
                        )):<div>None hiring</div>
                    }
            </div>
          </div>
            </div>
        </TabContent>
        <TabContent id="tab3" activeTab={activeTab}>
            <div className="bg-background rounded-lg p-8">
                <div className="text-2xl font-bold tracking-tight">Our Projects</div>
                <div className="sm:col-span-12 flex flex-col space-y-3 bg-background rounded-lg mt-2 items-center justify-center p-6">
                <Skeleton className="h-[125px] w-[250px] rounded-xl" />
                <div className="space-y-2">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
                </div>
            </div>
            </div>
        </TabContent>
      </div>
        <div className="sm:col-span-3 bg-background rounded-lg p-8">
            <TabNavItem id="tab1" activeTab={activeTab} setActiveTab={setActiveTab} title={<div>Gallery</div>}/>
            <TabNavItem id="tab2" activeTab={activeTab} setActiveTab={setActiveTab} title={<div>Opportunity Board</div>}/>
            <TabNavItem id="tab3" activeTab={activeTab} setActiveTab={setActiveTab} title={<div>Pakwach FM Projects</div>}/>
        </div>
    </div>
    <Popular/>
    </div>
  );
}
