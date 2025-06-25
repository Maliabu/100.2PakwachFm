/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Image from "next/image"
// import DeletePage from "./deletePage"
import { ArticleType } from "../types"
import { getMyDay, getMyMonth } from "@/services/success"
import DeletePage from "./deletePage"


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
      <div className="py-2 rounded-md">
      <Card className=" border-none shadow-none p-2">
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
        <div className="p-4">
        <p className=" text-md font-bold tracking-tight line-clamp-2">{title}</p>
        <p className="text-muted-foreground text-xs my-2">by: {writer}</p>
        <p className="text-xs border-t border-b uppercase p-2 rounded"> {
      getMyDay(date.getDay())}, {getMyMonth(date.getMonth()+1)} {date.getDate()}, {date.getFullYear()
      }</p></div>
      </Card>
      {/* <DeletePage id={id} submitId={title}/>       */}
      </div>
    )
  }