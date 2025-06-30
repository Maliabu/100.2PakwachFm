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
import { db } from "@/db/db"
import { getMyDay, getMyMonth } from "@/services/success"
import { eq } from "drizzle-orm"
import { articlesTable } from "@/db/schema"
import { ArticlesTabsProps } from "../../admin/dashboard/types"
import { dater } from "@/services/services"

export default function Highlights({articles}: ArticlesTabsProps) {
  function path(image: string | null){
    if(image !== null){
    return image} else{return ''}
  }
  return (
    <Carousel className="w-full rounded-lg" 
      >
      <CarouselContent className="-ml-1">
        {articles.map((news, index) => (
          <CarouselItem key={index} className="pl-1 md:basis-1/2 lg:basis-1/3">
            <div className="p-1">
              <Card className="shadow-none border-none">
                <CardContent className="justify-center px-6">
                <div className="relative h-36 w-full">
                <Image
                    alt="article image"
                    src={path(news.image)}
                    fill
                    unoptimized
                    className="object-cover"/>
                  </div>
                  <div className="text-2xl my-4 line-clamp-3 font-bold tracking-tight leading-5 hover:text-primary capitalize"><Link href={'/news/'+encodeURIComponent(news.title)}>{news.title}</Link></div>
                  <div className="text-xs uppercase text-muted-foreground">{news.writer} | {getMyDay(dater(news.updatedAt).getDay())}, {getMyMonth(dater(news.updatedAt).getMonth())} {dater(news.updatedAt).getDate()}, {dater(news.updatedAt).getFullYear()}</div>
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
