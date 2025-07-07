/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import useSWR from "swr";
import Highlights from "../home/highlights";
import Popular from "../home/popular";
import { fetcher } from "@/services/services";
import { ArticleType } from "@/app/admin/dashboard/types";
import { ReadMoreCard } from "../news/[article]/card";

export default function Events() {
  const { data, error } = useSWR<ArticleType[]>('/api/articles/highlight', fetcher);
  let articles: ArticleType[] = []
  if(data){
    articles = data
  }

  return (
    <div>
    <div className="rounded-lg">
    <div className="grid grid-cols-12 gap-2">
      <div className="col-span-9 bg-background p-8 rounded-lg mt-2">
        <div className="text-sm text-muted-foreground uppercase">videos </div>
      </div>
        <div className="col-span-3 bg-background rounded-lg p-4 mt-2">
            {/* <Mic size={150} className="border dark:text-primary rounded-full p-10"/> */}
            {/* <MegaphoneIcon size={70} className="p-4 ml-2 rounded-full border animate-spin"/> */}
            <div className="text-sm text-muted-foreground uppercase">articles </div>
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
    </div>
    </div>
    <div className="bg-background p-8 rounded-lg mt-2">
        <div className="text-sm uppercase text-muted-foreground">music</div>
    </div>
    <Popular/>
    </div>
  );
}
