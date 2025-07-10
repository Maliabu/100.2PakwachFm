"use client"
import * as React from "react"

import Link from "next/link"
import {
  CardContent,
  Card,
  CardHeader,
} from "@/components/ui/card"
import {ArticlesCard} from "./articlesCard"
import TabNavItem from "../navigation/tabItem"
import { useState } from "react"
import Image from "next/image"
import { getMyDay, getMyMonth } from "@/services/success"
import parse from 'html-react-parser'
import { ArticlesTabsProps } from "../../admin/dashboard/types"

export function ArticlesTabs(
    {articles}: ArticlesTabsProps){
    
    const [activeTab, setActiveTab] = useState("tab1")
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

    const handleTab1 = () => {
        setActiveTab("tab1")
    }
    function getContent(content: {
      id: number, 
      title: string, 
      content: string, 
      writer: string, 
      image: string | null,
      updatedAt: Date,
      createdAt: Date,
      facebookLink: string | null,
      twitterLink: string | null,
      instagramLink: string | null,
      date: Date,
      articleType: string,
    }){
        setContent(content)
        handleTab1()
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
    <div className=" sm:col-span-8 col-span-12 rounded-xl">
          <ArticlesCard 
              id={contents.id}
              title={contents.title}
              content={contents.content}
              image={contents.image}
              writer={contents.writer}
              facebookLink={contents.facebookLink}
              instagramLink={contents.instagramLink}
              twitterLink={contents.twitterLink}
              date={contents.date}
              articleType={contents.articleType}
              updatedAt={contents.updatedAt} 
              createdAt={contents.createdAt} 
              />
    </div>
        <div className="col-span-12 sm:col-span-4 hidden sm:block">
      <Card className="p-0 border-none shadow-none">
      <CardHeader>
        <div className="text-sm uppercase text-muted-foreground">More happening</div>
      </CardHeader>
      <div className="scroll-y-blog bg-background">
        {
          allArticles.map((article: { id: number; 
            facebookLink: string | null,
            twitterLink: string | null,
            instagramLink: string | null,
            date: Date,
            articleType: string, title: string; content: string; writer: string, image: string | null, updatedAt: Date, createdAt: Date}
          ) => (
            <CardContent className="" key={article.id}>
            <div className="mt-1 pb-4" 
            onClick={() => getContent(article)}>
              <TabNavItem id="tab1" activeTab={activeTab} setActiveTab={setActiveTab} 
              title={<div>
                <div className="relative h-36 w-full">
                <Image
                    alt="article image"
                    src={path(article.image)}
                    fill
                    unoptimized
                    className="object-cover"/>
                  </div>
                  <Link href={ref(article.title)} className="text-xl line-clamp-3 font-bold tracking-tight leading-5 hover:text-primary">
                  <div className="my-4">
                  {article.title}</div></Link>
              <div className="line-clamp-2 hidden text-sm leading-4 mt-2">
              {parse(article.content)}
              </div></div>}/>
              </div>
              </CardContent>
          ))
        }</div>
    </Card>
    </div>
    </div>
    <div className="sm:hidden mt-12">
      <Card className="border-none shadow-none bg-secondary">
      <CardHeader>
        <div className="text-sm font-lighter text-muted-foreground mt-4 uppercase">Recommended Articles</div>
      </CardHeader>
      <div className="scroll-y-blog">
        {
          allArticles.map((article: { id: number; title: string; content: string; writer: string, 
            facebookLink: string | null,
            twitterLink: string | null,
            instagramLink: string | null,
            date: Date,
            articleType: string, image: string | null, updatedAt: Date, createdAt: Date}
          ) => (
            <CardContent className="" key={article.id}>
            <div className="" 
            onClick={() => getContent(article)}>
              <TabNavItem id="tab1" activeTab={activeTab} setActiveTab={setActiveTab} 
              title={<div>
                <div className="relative h-36 sm:w-92 mt-6">
                <Image
                    alt="article image"
                    src={path(article.image)}
                    fill
                    unoptimized
                    className="object-cover"/>
                  </div>
                  <Link href={ref(article.title)} className="text-2xl font-bold tracking-tight leading-5 text-dark pointer capitalize line-clamp-3">
                  <div className="pt-4">
                  {article.title}</div></Link>
              <div className="line-clamp-2 text-md leading-5 mt-2">
              {parse(article.content)}
              </div>
              <div className="py-4">
              <p className=" float-right text-sm text-muted-foreground"> {
              getMyDay(article.date.getDay())}, {getMyMonth(article.date.getMonth())} {article.date.getDate()}, {article.date.getFullYear()
              }</p>
              </div>
              </div>
            }/>
              </div>
              </CardContent>
          ))
        }</div>
    </Card>
    </div>
        </div>
        </div>
    )
}