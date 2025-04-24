/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import { getMyDay, getMyMonth } from "@/services/success"
import parse from 'html-react-parser'
import useSWR from "swr"
import { date, fetcher } from "@/services/services"
import { Loader2, MessageCircle, MessageCircleDashed } from "lucide-react"
import { ArticleVotesComments } from "../admin/dashboard/types"
import { Button } from "@/components/ui/button"

type ArticleCardProp = {
  id: number
  title: string
  writer: string
  image: string | null
  updatedAt: Date
  createdAt: Date
  content: string
  facebookLink: string | null,
  twitterLink: string | null,
  instagramLink: string | null,
  date: string | null,
  articleType: string,
}

  export function HeadLineOtherCard({
    id,
    title,
    writer,
    image,
    updatedAt,
    createdAt,
    content,
    facebookLink,
    twitterLink,
    instagramLink,
    date,
    articleType,
  }: ArticleCardProp){

    let articleId = id
    let article: ArticleVotesComments[] = []
    const { data: articles, error: articleError } = useSWR(
      articleId ? `/api/articles/${articleId}` : null, fetcher)
    if(!articles){
      return <div><Loader2 className="animate-spin"/></div>
    }
    if(article){
        article = articles
        // return <div>Loading courses...</div>
      }

    const path = image!==null?image:''
    return (
      <div>
      <Card className="border-none shadow-none background-none" id={title}>
      <div className="relative w-full h-64">
        <Image
            src={path}
            alt="article image"
            fill
            unoptimized
            objectFit="cover"
            className="object-cover"/></div>
      <div className="">
      <div className="text-2xl tracking-tight font-bold leading-7 lowercase">{title}</div>
      <div className="my-4">
            <Button>Read full article</Button>
        </div>
      {/* <span className="mt-6 sm:float-right sm:mx-12"> {}</span>
      <p className="py-4 border-b text-sm">: {writer}</p>
      <p className="py-4 float-right text-sm"> {
      getMyDay(updatedAt.getDay())}, {getMyMonth(updatedAt.getMonth())} {updatedAt.getDate()}, {updatedAt.getFullYear()
      }</p>
      <div className="text-wrap lh-1 mt-20 prose prose-sm sm:prose-base lg:prose-lg xl:prose-2xl focus:outline-none">{parse(content)}</div> */}
      </div>
      </Card>
      </div>
    )
  }