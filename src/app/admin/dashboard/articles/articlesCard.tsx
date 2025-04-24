/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Image from "next/image"
import DeletePage from "./deletePage"
import { ArticleType } from "../types"


  export function ArticlesCard({
    id,
    title,
    writer,
    image,
    facebookLink
  }: ArticleType){
    // const path = '/articles/'+image
    let path = ''
    image!==null?path=image:''

    return (
      <div className="flex flex-row justify-between">
      <Card className="w-5/6 grid grid-cols-5 gap-4 p-6 mt-1 border-none shadow-none bg-secondary ">
        <div className="w-10 h-10">
            <Image src={path} width={80} height={80} alt="article image" unoptimized/>
        </div>
        <div className="items-start">
          <p className="text-sm">Title</p>
        <p className="mt-2 text-sm">{title}</p></div>
        <div>
          <p className="text-sm">Article By</p>
          <p className="mt-2 text-wrap text-sm">{writer}</p>
        </div>
        <div>
        <p className="text-sm">Link</p>
        <p className="mt-2 text-sm">{facebookLink}</p></div>
      </Card>
      <DeletePage id={id} submitId={title}/>      
      </div>
    )
  }