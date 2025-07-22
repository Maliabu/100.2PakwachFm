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
import { ArrowBigDownDash, Loader2, MessageCircle, MessageCircleDashed } from "lucide-react"
import { ArticleType, ArticleVotesComments } from "../../admin/dashboard/types"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import Link from "next/link"

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
        router.push(`/news/${encodeURIComponent(article)}`)
      }
    return (
      <div>
      <Card className="border-none shadow-none background-none" id={title}>
      <div className="relative w-full sm:h-96 h-64">
          <span className="absolute top-2 left-2 bg-primary text-sm text-white p-2 uppercase rounded z-10">
            {articleType} | Headlines
          </span>
          <span className="absolute top-14 flex left-2 bg-primary/50 text-white p-2 uppercase rounded-full z-10">
            <Link href={'#'+articleType}><ArrowBigDownDash/></Link>
          </span>
          <Image
            src={path}
            alt="article image"
            fill
            unoptimized
            className="object-cover"
          />
        </div>
      <div className="">
      <div className="text-5xl select-none tracking-tight font-bold leading-11 hover:text-primary cursor-pointer" onClick={() => handleReadMore(title)}>{title}</div>
      </div>
      </Card>
      </div>
    )
  }