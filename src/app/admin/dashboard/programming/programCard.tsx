/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Image from "next/image"
import DeletePage from "./deletePage"
import { Programming } from "../types"


  export function ProgramCard({
    id,
    programme,
    startTime,
    endTime,
    createdAt,
    updatedAt,
    weekday
  }: Programming){

    return (
      <div className="sm:flex sm:flex-row sm:justify-between">
      <Card className="sm:w-5/6 grid sm:grid-cols-5 grid-cols-4 sm:gap-4 p-4 mt-1 border-none shadow-none border-b bg-background rounded">
        <div className="items-start">
        <p className=" text-sm font-bold tracking-tight">{programme}</p></div>
        <div>
          <p className=" text-sm">{startTime}</p>
        </div>
        <div className=" sm:block hidden">
        <p className=" text-sm">to</p></div>
        <div>
        <p className=" text-sm">{endTime}</p></div>
        <div>
        <p className=" text-sm bg-secondary p-2 rounded uppercase flex justify-center">{weekday=='true'?'weekday':"weekend"}</p></div>
      </Card>
      <DeletePage id={id} submitId={programme}/>      
      </div>
    )
  }