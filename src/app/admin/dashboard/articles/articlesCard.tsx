/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Image from "next/image"
import DeletePage from "./deletePage"
import { ArticleType } from "../types"
import { getMyDay, getMyMonth } from "@/services/success"


  export function ArticlesCard({
    id,
    title,
    writer,
    image,
    facebookLink,
    createdAt
  }: ArticleType){
    // const path = '/articles/'+image
    let path = ''
    image!==null?path=image:''
    const date = new Date(createdAt); 

    return (
      <div className="p-4 rounded-md">
      <Card className=" border-none shadow-none">
      <div style={{ position: 'relative', width: '100%', height: '200px' }}>
        <Image
            src={path}
            alt="Full size"
            className="rounded-t-lg"
            fill
            unoptimized
            style={{ objectFit: 'cover' }} // or 'contain'
        />
        </div>
        <div className="">
        <p className=" text-sm font-bold tracking-tight line-clamp-2">{title}</p>
        <p className="text-muted-foreground text-xs my-2">by: {writer}</p>
        <p className="text-xs bg-secondary p-2 rounded"> {
      getMyDay(date.getDay())}, {getMyMonth(date.getMonth()+1)} {date.getDate()}, {date.getFullYear()
      }</p></div>
      </Card>
      <DeletePage id={id} submitId={title}/>      
      </div>
    )
  }