/* eslint-disable @next/next/no-img-element */
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
import { ArticleType, ArticleVotesComments } from "../../admin/dashboard/types"
import Outline from '@/app/images/outline.png'

  export function ArticlesCard({
    id,
    title,
    writer,
    image,
    updatedAt,
    createdAt,
    facebookLink,
    twitterLink,
    instagramLink,
    date,
    articleType,
    content,
  }: ArticleType){

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
    const facebook = facebookLink!==null?facebookLink:''
    const twitter = twitterLink!==null?twitterLink:''
    const insta = instagramLink!==null?instagramLink:''
    return (
      <div>
      <Card className="border-none shadow-none background-none sm:p-4" id={title}>
      <div className="relative w-full sm:h-96 h-72">
        <Image
            src={path}
            alt="article image"
            fill
            unoptimized
            objectFit="contain"
            className="object-cover"/></div>
            <div className="row-start-3 p-2 flex gap-[24px] text-sm flex-wrap bg-white items-center justify-center">
        <span className="flex items-center uppercase text-xs rounded">
        <Image
            src={Outline}
            alt="logo"
            height={30}
            width={30}
            className="mr-2"
            unoptimized/>
         <span className="p-1 font-bold text-black border-black border-t border-r border-b rounded">{articleType}</span></span>
         <div className="text-xs text-muted-foreground">Follow the story: </div>
            <a
      className="flex items-center gap-2 font-bold tracking-tight hover:underline hover:underline-offset-4"
      href={facebook}
      target="_blank"
      rel="noopener noreferrer"
    >
    <img src="/facebook.svg" alt="instagram" className="w-5 h-5" />
    </a>
    <a
      className="flex items-center gap-2 font-bold tracking-tight hover:underline hover:underline-offset-4"
      href={insta}
      target="_blank"
      rel="noopener noreferrer"
    >
    <img src="/instagram.svg" alt="instagram" className="w-5 h-5" /></a>
    <a
      className="flex items-center font-bold tracking-tight gap-2 hover:underline hover:underline-offset-4"
      href={twitter}
      target="_blank"
      rel="noopener noreferrer">
    <img src="/twitter.svg" alt="instagram" className="w-5 h-5" />
    </a>
            </div>
      <div className="px-2 sm:px-0">
      <div className="text-5xl tracking-tight font-bold leading-11">{title}</div>
      <span className="mt-6 sm:float-right sm:mx-12"> {}</span>
      <p className="py-4 border-b text-xs uppercase text-muted-foreground">By {writer}</p>
      <p className="py-4 float-right text-xs text-muted-foreground uppercase"> { date == null ?
      getMyDay(updatedAt.getDay()): getMyDay(date.getDay())}, {date == null ? getMyMonth(updatedAt.getMonth()): getMyMonth(date.getMonth()+1)} {date == null ? updatedAt.getDate(): date.getDate()}, {date == null ? updatedAt.getFullYear(): date.getFullYear()
      }</p>
      <div className="text-wrap lh-1 mt-20 prose prose-sm sm:prose-base lg:prose-lg xl:prose-2xl focus:outline-none">{parse(content)}</div>
      </div>
      </Card>
      </div>
    )
  }