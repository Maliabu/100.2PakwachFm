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
    updatedAt
  }: Programming){

    return (
      <div className="flex flex-row justify-between">
      <Card className="w-5/6 grid grid-cols-5 gap-4 p-6 mt-1 border-none shadow-none bg-secondary ">
        <div className="items-start">
          <p className="text-sm">Programme</p>
        <p className="mt-2 text-sm">{programme}</p></div>
        <div>
          <p className="text-sm">Starts</p>
          <p className="mt-2 text-wrap text-sm">{startTime}</p>
        </div>
        <div>
        <p className="text-sm">Ends</p>
        <p className="mt-2 text-sm">{endTime}</p></div>
      </Card>
      <DeletePage id={id} submitId={programme}/>      
      </div>
    )
  }