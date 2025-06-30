"use client"

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
import Link from "next/link"
import { getMyDay, getMyMonth } from "@/services/success"
import useSWR from "swr"
import { ArticleType } from "../admin/dashboard/types"
import { fetcher } from "@/services/services"

export default function Articles() {
  const {data, error} = useSWR<ArticleType[]>('/api/articles', fetcher)
    if(!data){
        return <div className="text-sm">Loading Articles...</div>
    }
  function path(image: string | null){
    if(image !== null){
    return image} else{return ''}
  }
  return (
    <Carousel className="w-full rounded-lg" 
      >
      <CarouselContent className="-ml-1">
        {data.map((news, index) => (
          <CarouselItem key={index} className="pl-1 md:basis-1/2 lg:basis-1/3">
            <div className="p-1">
              <Card className="shadow-none border-none bg-transparent">
                <CardContent className="justify-center p-6">
                <div className="relative h-36 w-full">
                <Image
                    alt="article image"
                    src={path(news.image)}
                    fill
                    unoptimized
                    className="object-cover"/>
                  </div>
                  <div className="text-2xl my-4 font-bold tracking-tight leading-6 hover:text-primary line-clamp-3 capitalize"><Link href={'/news/'+encodeURIComponent(news.title)}>{news.title}</Link></div>
                  {(() => {
  const updatedDate = new Date(news.updatedAt);
  return (
    <div className="text-xs uppercase text-muted-foreground">
      {news.writer} | {getMyDay(updatedDate.getDay())}, {getMyMonth(updatedDate.getMonth())} {updatedDate.getDate()}, {updatedDate.getFullYear()}
    </div>
  );
})()}

                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="text-white bg-primary ml-4"/>
      <CarouselNext className="text-white bg-primary sm:mr-4 mr-6"/>
    </Carousel>
  )
}
