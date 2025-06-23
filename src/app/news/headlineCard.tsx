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
      <div className="relative w-full sm:h-96 h-64">
        <Image
            src={path}
            alt="article image"
            fill
            unoptimized
            objectFit="cover"
            className="object-cover"/></div>
      <div className="">
      <div className="sm:text-5xl text-4xl tracking-tight font-bold sm:leading-12 leading-10">{title}</div>
      <div className="my-4">
            <Button onClick={() => handleReadMore(title)}>Read full article</Button>
        </div>
      </div>
      </Card>
      </div>
    )
  }