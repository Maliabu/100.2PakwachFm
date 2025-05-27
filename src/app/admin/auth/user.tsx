"use client"
import { tokenise } from "@/services/services";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Logged(){
    const [token, setToken] = useState("")
    const [name, setName] = useState("")
    const [pic, setPic] = useState("")
    useEffect(() => {
        setToken(tokenise()[0][0].toUpperCase())
        setName(tokenise()[0].split(" ")[0])
        setPic(tokenise()[5])
    }, [])
    return(
        <Link href="/admin/dashboard/account">
          <div className="flex flex-row justify-between bg-muted rounded-md p-4">
          {pic=='' ? <div className="h-20 w-20 bg-primary cursor-pointer text-muted text-5xl rounded-full flex justify-center items-center ">{token.toUpperCase()}</div>:
      <div style={{ position: 'relative', width: '40px', height: '40px' }}>
      <Image
          src={pic}
          alt="Full size"
          className="rounded-full"
          fill
          unoptimized
          style={{ objectFit: 'cover' }} // or 'contain'
      />
      </div>}
            <div className=" leading-4 w-2/3 text-sm">
            Hi, <span className="font-bold">{name}</span>. Welcome to the dashboard!</div>
        </div>
        </Link>
    )
}