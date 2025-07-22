/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Image from "next/image"
import DeletePage from "./deletePage"
import { Presenter, Programming } from "../types"
import EditPage from "./editPage"


  export function PresenterCard({
    id,
    programme,
    name,
    radioName,
    createdAt,
    updatedAt,
    profilePicture
  }: Presenter){

    return (
      <div className="mt-2">
      <Card className=" border-none shadow-none border-b bg-background rounded-lg p-2">
      <div style={{ position: 'relative', width: '100%', height: '150px' }}>
                      <Image
                          src={profilePicture}
                          alt="Full size"
                          className="rounded-t-lg"
                          fill
                          unoptimized
                          style={{ objectFit: 'cover' }} // or 'contain'
                      />
                      </div>
        <div className="items-start px-4">
        <p className=" text-lg font-bold tracking-tight">{radioName}</p>
        </div>
        <div className="flex"><DeletePage id={id} submitId={radioName}/> <EditPage id={id} submitId={radioName}/> </div>   
      </Card>
      </div>
    )
  }