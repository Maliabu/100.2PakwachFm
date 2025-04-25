"use client"
/* eslint-disable @typescript-eslint/no-unused-vars */


import useSWR from "swr";
import { ArticleType } from "../types";
import { fetcher } from "@/services/services";
import { ArticlesCard } from "./articlesCard";

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
        <div className=" rounded-lg p-2">
          <div className="p-2 border-b text-sm">You have {article.length} Articles</div>
            {
                    article.length > 0 ? (
                      <div className="sm:grid sm:grid-cols-12">
                        {article.map(article => (
                          <div key={article.id} className="col-span-3">
                          <ArticlesCard {...article}/>
                          </div>
                        ))}
                      </div>
                    ) : null
                  }
        </div>
    )
}