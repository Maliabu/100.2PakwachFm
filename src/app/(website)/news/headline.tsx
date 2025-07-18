"use client"
import * as React from "react"

import Link from "next/link"
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card"
import { useState } from "react"
import Image from "next/image"
import parse from 'html-react-parser'
import { HeadLineCard } from "./headlineCard"
import { HeadLineOtherCard } from "./headlineOther"
import { ArticlesTabsProps } from "../../admin/dashboard/types"
import { date } from "@/services/services"
import { ReadMoreCard } from "./[article]/card"

export function HeadlineTabs(
    {articles}: ArticlesTabsProps){
    
    const [contents, setContent] = useState({
      id: articles["0"].id, 
      title: articles["0"].title, 
      content: articles["0"].content, 
      writer: articles["0"].writer, 
      image: articles["0"].image,
      updatedAt: articles["0"].updatedAt,
      createdAt: articles["0"].createdAt,
      facebookLink: articles["0"].facebookLink,
      twitterLink: articles["0"].twitterLink,
      instagramLink: articles["0"].instagramLink,
      date: articles['0'].date,
      articleType: articles['0'].articleType,
    })

    function getContent(content: {
      id: number, 
      title: string, 
      content: string, 
      writer: string, 
      image: string | null,
      facebookLink: string | null,
      twitterLink: string | null,
      instagramLink: string | null,
      date: Date,
      articleType: string,
      updatedAt: Date,
      createdAt: Date,
    }){
        setContent(content)
    }
    const allArticles = Object.values(articles);
    function path(image: string | null){
      if(image !== null){
      return image} else{return ''}
    }
    function ref(link: string){
      return '#'+ link
    }
    
    return(
        <div>
        <div className="">
            <div className="grid sm:grid-cols-12 gap-2">
    <div className=" sm:col-span-8 rounded-xl sm:p-0 p-4">
    <HeadLineCard 
              id={contents.id}
              title={contents.title}
              content={contents.content}
              image={contents.image}
              facebookLink={contents.facebookLink}
              instagramLink={contents.instagramLink}
              twitterLink={contents.twitterLink}
              writer={contents.writer}
              date={contents.date}
              articleType={contents.articleType}
              updatedAt={contents.updatedAt} 
              createdAt={contents.createdAt} 
              />
              
              <div className="grid sm:grid-cols-12 gap-8">
                <div className="sm:col-span-6">
          {articles.length > 1 && <HeadLineOtherCard 
                    id={articles["1"].id}
                    title={articles["1"].title}
                    content={articles["1"].content}
                    image={articles["1"].image}
                    facebookLink={articles["1"].facebookLink}
                    instagramLink={articles["1"].instagramLink}
                    twitterLink={articles["1"].twitterLink}
                    date={articles["1"].date}
                    articleType={articles["1"].articleType}
                    writer={articles["1"].writer}
                    updatedAt={articles["1"].updatedAt} 
                    createdAt={articles["1"].createdAt} 
                    />}
                </div>
                <div className="sm:col-span-6">
          {articles.length > 2 && <HeadLineOtherCard 
                    id={articles["2"].id}
                    title={articles["2"].title}
                    content={articles["2"].content}
                    image={articles["2"].image}
                    facebookLink={articles["2"].facebookLink}
                    instagramLink={articles["2"].instagramLink}
                    twitterLink={articles["2"].twitterLink}
                    date={articles["2"].date}
                    articleType={articles["2"].articleType}
                    writer={articles["2"].writer}
                    updatedAt={articles["2"].updatedAt} 
                    createdAt={articles["2"].createdAt} 
                    />}
                </div>
                <div className="sm:col-span-6">
          {articles.length > 3 && <HeadLineOtherCard 
                    id={articles["3"].id}
                    title={articles["3"].title}
                    content={articles["3"].content}
                    image={articles["3"].image}
                    facebookLink={articles["3"].facebookLink}
                    instagramLink={articles["3"].instagramLink}
                    twitterLink={articles["3"].twitterLink}
                    date={articles["3"].date}
                    articleType={articles["3"].articleType}
                    writer={articles["3"].writer}
                    updatedAt={articles["3"].updatedAt} 
                    createdAt={articles["3"].createdAt} 
                    />}
                </div>
                <div className="sm:col-span-6">
          {articles.length > 4 && <HeadLineOtherCard 
                    id={articles["4"].id}
                    title={articles["4"].title}
                    content={articles["4"].content}
                    image={articles["4"].image}
                    facebookLink={articles["4"].facebookLink}
                    instagramLink={articles["4"].instagramLink}
                    twitterLink={articles["4"].twitterLink}
                    date={articles["4"].date}
                    articleType={articles["4"].articleType}
                    writer={articles["4"].writer}
                    updatedAt={articles["4"].updatedAt} 
                    createdAt={articles["4"].createdAt} 
                    />}
                </div>
              </div>
    </div>
        <div className="sm:col-span-4 hidden sm:block">
      <Card className=" border-none shadow-none">
      <CardHeader>
        <div className="text-2xl font-bold tracking-tight leading-6">Highlights</div>
      </CardHeader>
      <CardContent>
      <div className="scroll-y-blog bg-background py-2">
      {
          articles.map((article: { id: number; title: string; 
            facebookLink: string | null;
            twitterLink: string | null;
            instagramLink: string | null;
            date: Date;
            articleType: string; content: string; writer: string, image: string | null, updatedAt: Date, createdAt: Date}
          ) => (
            <ReadMoreCard key={article.id} article={article} />
          ))
        }
      </div>
      </CardContent>
    </Card>
    </div>
    </div>
    <div className="sm:hidden sm:mt-12 bg-secondary p-6">
      <div className="border-none shadow-none p-0 bg-none">
        <div className="text-sm font-light uppercase text-muted-foreground leading-6 mb-6">More happening</div>
      <div className="scroll-y-blog">
        {
          allArticles.map((article: { id: number; 
            facebookLink: string | null,
            twitterLink: string | null,
            instagramLink: string | null,
            date: Date,
            articleType: string, title: string; content: string; writer: string, image: string | null, updatedAt: Date, createdAt: Date}
          ) => (
            <div className="" key={article.id}>
            <div className="mt-1 pb-4" 
            onClick={() => getContent(article)}>
              <div>
                <div className="relative h-36 sm:w-92">
                <Image
                    alt="article image"
                    src={path(article.image)}
                    fill
                    unoptimized
                    className="object-cover"/>
                  </div>
                  <Link href={ref(article.title)}>
                <div className="text-2xl line-clamp-3 font-bold tracking-tight mt-4 leading-6 text-dark pointer blog capitalize">
              {article.title}</div></Link>
              <div className="line-clamp-2 text-md leading-6 mt-2">
              {parse(article.content)}
              </div>
              <div className="py-8">
              <p className="text-sm text-muted-foreground float-right"> {date(article.date.toString())}</p>
              </div>
              </div>
              </div>
              </div>
          ))
        }</div>
    </div>
    </div>
        </div>
        </div>
    )
}