/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Image from "next/image"
import { Message } from "./page"
import { date } from "@/services/services"
import ReplyPage from "./replyPage"


  export function Messagecard({
    id,
    message,
    status,
    email,
    createdAt,
    updatedAt,
  }: Message){

    function statuS(status: string){
        if(status == "new"){
            return 'text-xs p-2 rounded-full text-green-600 dark:text-black bg-green-100 dark:bg-green-600 uppercase float-right'
        } else {
            return 'text-xs p-2 rounded-full text-gray-700 bg-gray-100 dark:bg-muted uppercase float-right'
        }
    }

    return (
      <div className="mt-2">
      <Card className=" border-none shadow-none border-b sm:grid sm:grid-cols-12 bg-background rounded-lg p-6">
            <div className="col-span-1 h-10 w-10 bg-primary text-muted text-2xl rounded-full flex justify-center items-center ">{email[0].toUpperCase()}</div>
            <div className="col-span-9 pt-2 flex justify-between bg-background rounded-lg">
             <div>
            <div className="text-xs text-muted-foreground">{email}</div>
            <div className="text-sm font-medium mt-2">{message}</div>
            <div className="float-right text-xs text-muted-foreground p-2">{date(createdAt.toString())}</div>
            </div>
            <div><div className={statuS(status)}>{status}</div></div></div>
            <div className="col-span-2">
            <ReplyPage id={id} submitId={message}/>
            </div>
        </Card>
      </div>
    )
  }