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
import { ArticleVotesComments } from "../../admin/dashboard/types"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

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
  date: Date,
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
      <div className="relative w-full h-44">
      <Image
            src={path}
            alt="article image"
            fill
            unoptimized
            objectFit="contain"
            className="object-cover"/></div>
      <div className="">
      <div className="text-2xl tracking-tight font-bold line-clamp-3 leading-6 capitalize hover:text-primary cursor-pointer" onClick={() => handleReadMore(title)}>{title}</div>

      </div>
      </Card>
      </div>
    )
  }