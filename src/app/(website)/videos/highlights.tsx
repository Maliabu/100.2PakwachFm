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

const highlight = [
    {
        heading: 'Todays news is about seargents in the army',
        from: "The seargents polls",
        date: 'APRIL 1 2020',
        who: 'OGENRWOTH FELIX'
    },
    {
        heading: 'Todays news is about seargents in the army',
        from: "The seargents polls",
        date: 'APRIL 1 2020',
        who: 'OGENRWOTH FELIX'
    },
    {
        heading: 'Todays news is about seargents in the army',
        from: "The seargents polls",
        date: 'APRIL 1 2020',
        who: 'OGENRWOTH FELIX'
    },
    {
        heading: 'Todays news is about seargents in the army',
        from: "The seargents polls",
        date: 'APRIL 1 2020',
        who: 'OGENRWOTH FELIX'
    },
    {
        heading: 'Todays news is about seargents in the army',
        from: "The seargents polls",
        date: 'APRIL 1 2020',
        who: 'OGENRWOTH FELIX'
    }
]

export function Highlights() {
  return (
    <Carousel className="p-1" orientation="vertical" 
      >
      <CarouselContent className="-mt-1 h-[400px]">
        {highlight.map((news, index) => (
          <CarouselItem key={index} className="pl-1 md:basis-1/2 lg:basis-1/3">
            <div className="p-1">
              <Card className="shadow-none border-none">
                <CardContent className="justify-center">
                  <div className="text-2xl font-bold tracking-tight leading-5">{news.heading}</div>
                  <div className="text-sm my-4">{news.from}</div>
                  <div className="text-xs uppercase text-muted-foreground">{news.who} | {news.date}</div>
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
