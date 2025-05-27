"use client"
import { tokenise } from "@/services/services";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Profile(){
    const [token, setToken] = useState("")
    const [pic, setPic] = useState("")
    useEffect(() => {
        setToken(tokenise()[0][0].toUpperCase())
        setPic(tokenise()[5])
    }, [])
    return(
        <Link href="/admin/dashboard/account">
          <div className="flex flex-row justify-between rounded-md">
          {pic=='' ? <div className="h-20 w-20 bg-primary cursor-pointer text-muted text-5xl rounded-full flex justify-center items-center ">{token}</div>:
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
        </div>
        </Link>
    )
}