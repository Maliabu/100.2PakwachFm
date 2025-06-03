/* eslint-disable @typescript-eslint/no-unused-vars */
import { Card } from "@/components/ui/card"
import Image from "next/image"
import { EventType } from "../../types"
import DeletePage from "./deletePage"
import { getMyDay, getMyMonth } from "@/services/success"

  export function EventCard({
    id,
    title,
    description,
    image,
    link,
    startDate
  }: EventType){
    // const path = '/events/'+image
    const date = new Date(startDate); 

    return (
        <div className="mt-2">
        <Card className=" border-none shadow-none p-8">
        <div style={{ position: 'relative', width: '100%', height: '200px' }}>
          <Image
              src={image}
              alt="Full size"
              className="rounded-t-lg"
              fill
              unoptimized
              style={{ objectFit: 'cover' }} // or 'contain'
          />
          </div>
          <div className="">
          <p className=" text-sm font-bold tracking-tight line-clamp-2">{title}</p>
          <p className="text-muted-foreground text-xs my-2"> {description}</p>
          <p className="text-xs bg-secondary p-2 rounded"> {
        getMyDay(date.getDay())}, {getMyMonth(date.getMonth()+1)} {date.getDate()}, {date.getFullYear()
        }</p></div>
        </Card>
        {/* <DeletePage id={id} submitId={title}/>       */}
        </div>
    )
  }