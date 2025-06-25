/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Image from "next/image"
import DeletePage from "./deletePage"
import { Programming } from "../types"
import EditPage from "./editPage"


  export function ProgramCard({
    id,
    programme,
    startTime,
    endTime,
    createdAt,
    updatedAt,
    weekday,
    image
  }: Programming){

    return (
      <div className="mt-2">
      <Card className=" border-none shadow-none border-b bg-background rounded-lg p-2">
      <div style={{ position: 'relative', width: '100%', height: '150px' }}>
                      <Image
                          src={image}
                          alt="Full size"
                          className="rounded-t-lg"
                          fill
                          unoptimized
                          style={{ objectFit: 'cover' }} // or 'contain'
                      />
                      </div>
        <div className="items-start px-4">
        <p className=" text-lg font-bold tracking-tight">{programme}</p>
        <div className="flex justify-between">
          <p className=" text-sm">{startTime}</p>
        <p className=" text-sm">to</p>
        <p className=" text-sm">{endTime}</p>
        </div>
        </div>
        <div>
        <p className={weekday=='true'?" text-sm border-t border-b p-2 uppercase flex justify-center":'text-sm bg-slate-400/30 text-slate-600 p-2 uppercase flex justify-center'}>{weekday=='true'?'weekday':"weekend"}</p></div>
        <div className="flex"><DeletePage id={id} submitId={programme}/> <EditPage id={id} submitId={programme}/> </div>   
      </Card>
      </div>
    )
  }