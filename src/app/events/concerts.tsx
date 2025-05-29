/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from "react"
import Autoplay from "embla-carousel-react"
import Sports from '../images/_ (1).jpeg'
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Image from "next/image"
import { db } from "@/db/db"
import Link from "next/link"


export async function Concerts() {
  const events = await db.query.EventsTable.findMany()
  return (
    <Carousel className="w-full sm:bg-secondary rounded-lg p-4" 
      >
      <CarouselContent className="-ml-1">
        {events.map((event, index) => (
          <CarouselItem key={index} className="pl-1 md:basis-1/2 lg:basis-1/4">
            <div className="p-1">
              <Card className="shadow-none border-none p-0">
                <CardContent className="justify-center p-0">
                <div style={{ position: 'relative', width: '100%', height: '300px' }}>
        <Image
            src={event.image}
            alt="Full size"
            className="rounded-t-lg"
            fill
            unoptimized
            style={{ objectFit: 'cover' }} // or 'contain'
        />
        </div>
        <div className="p-6">
                  <div className="text-2xl font-bold tracking-tight leading-5 ">{event.title}</div>
                  <div className="text-sm my-4">{event.description}</div>
                  {event.link!==null?<div className="text-xs hover:text-primary uppercase text-muted-foreground"><Link href={event.link}>Find out more</Link></div>:null}
                  </div>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="text-white bg-primary ml-4"/>
      <CarouselNext className="text-white bg-primary mr-4"/>
    </Carousel>
  )
}
