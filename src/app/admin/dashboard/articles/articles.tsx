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
    return(
        <div>
            {
                    article.length > 0 ? (
                      <div className="flex flex-col admin p-6">
                        {article.map(article => (
                          <ArticlesCard key={article.id} {...article}/>
                        ))}
                      </div>
                    ) : null
                  }
        </div>
    )
}