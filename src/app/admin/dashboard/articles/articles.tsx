"use client"
/* eslint-disable @typescript-eslint/no-unused-vars */


import useSWR from "swr";
import { ArticleType } from "../types";
import { fetcher } from "@/services/services";
import { ArticlesCard } from "./articlesCard";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Articles(){
    let article: ArticleType[] = []
  const { data: articles, error: articleError } = useSWR("/api/articles", fetcher);
  if(articles){
      article = articles
  }
  if(!articles){
    return <div className="text-xs">loading articles ...</div>
  }
    return(
        <div className="mt-2">
<div className="p-4 bg-background rounded-lg flex items-center justify-between text-sm uppercase"> 
            <div className="text-2xl font-bold tracking-tight capitalize">
            Articles
            </div>
            <Link href='/admin/dashboard/articles'><Button>Add New Articles</Button></Link>
            total: {article.length}</div>          {
                    article.length > 0 ? (
                      <div className="sm:grid sm:grid-cols-12 gap-2">
                        {article.map(article => (
                          <div key={article.id} className="col-span-3">
                          <ArticlesCard {...article}/>
                          </div>
                        ))}
                      </div>
                    ) : <div className="flex flex-col space-y-3 bg-background rounded-lg mt-2 items-center justify-center p-6">
                    <Skeleton className="h-[125px] w-[250px] rounded-xl" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-[250px]" />
                      <Skeleton className="h-4 w-[200px]" />
                    </div>
                  </div>
                  }
        </div>
    )
}