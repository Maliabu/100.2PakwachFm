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
import { ArticleType, ArticleVotesComments } from "../admin/dashboard/types"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

  export function HeadLineCard({
    id,
    title,
    writer,
    image,
    facebookLink,
    twitterLink,
    instagramLink,
    date,
    articleType,
    updatedAt,
    createdAt,
    content,
  }: ArticleType){
    const router = useRouter()

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
    const handleReadMore = (article: string) => {
        router.push(`/news/${article}`)
      }
    return (
      <div>
      <Card className="border-none shadow-none background-none" id={title}>
      <div className="relative w-full h-96">
        <Image
            src={path}
            alt="article image"
            fill
            unoptimized
            objectFit="cover"
            className="object-cover"/></div>
      <div className="">
      <div className="sm:text-6xl text-4xl tracking-tight font-bold sm:leading-13 leading-10 lowercase">{title}</div>
      <div className="my-4">
            <Button onClick={() => handleReadMore(title)}>Read full article</Button>
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