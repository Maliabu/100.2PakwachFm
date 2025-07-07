"use client"
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { Card } from "@/components/ui/card"
import { date, tokenise, username } from "@/services/services"
import { Ticket } from "./page"
import CloseTicketing from "./closeTicket"
import { useEffect, useState } from "react"


  export function TicketCard({
    tickets: {
    id,
    issue,
    status,
    createdAt,
    updatedAt,
    }, users_table: {
        name: userName
    }
  }: Ticket){
    const [userType, setUsetType] = useState('')
    useEffect(() => {
        setUsetType(tokenise()[4])
    },[userType])

    function statuS(status: string){
        if(status == "open"){
            return 'text-xs p-2 rounded-full text-green-600 dark:text-black bg-green-100 dark:bg-green-600 uppercase float-right'
        } else {
            return 'text-xs p-2 rounded-full text-gray-700 bg-gray-100 dark:bg-muted uppercase float-right'
        }
    }

    return (
      <div className="mt-2 sm:grid sm:grid-cols-12 bg-background rounded-lg p-4">
      <div className="col-span-1 h-10 w-10 bg-primary text-muted text-2xl rounded-full flex justify-center items-center ">{userName[0]}</div>
      <div className="col-span-10 sm:p-6 sm:bg-background rounded-lg flex justify-between">
         <div className="w-5/6 sm:py-0 py-3">
      <div className="text-xs text-muted-foreground">Opened by: {userName}</div>
        <div className="text-sm font-medium mt-3">{issue}</div>
        <div className="float-right text-xs text-muted-foreground p-2">{date(createdAt.toString())}</div>
        </div>
        <div>
        <div className={statuS(status)}>{status}</div></div>
        </div>
        <div className="col-span-1">
            {status==='open'&&userType==='admin'&&<CloseTicketing id={id}/>}
        </div>
      </div>
    )
  }