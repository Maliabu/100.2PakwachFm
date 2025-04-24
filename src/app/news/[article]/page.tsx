import Footer from "@/app/navigation/footer"
import {Menu} from "@/app/navigation/menu"
import { db } from "@/db/db"
import { articlesTable } from "@/db/schema"
import { eq } from "drizzle-orm"
import { ArticlesCard } from "../articlesCard"
import { ReadMoreCard } from "./card"


export default async function Page({
    params,
  }: {
    params: Promise<{ article: string }>
  }) {
    const slug = (await params).article
    const title = decodeURIComponent(slug)
    const [article] = await db
    .query
    .articlesTable
    .findMany({
    where: eq(articlesTable.title, title)
    })
    const articles = await db
    .query
    .articlesTable
    .findMany()

  if (!article) return <div>no articles</div>

    return <div className="sm:px-16 bg-muted">
      <Menu/>
      <div className=" p-8 rounded-lg bg-background my-2">
        <div className="grid grid-cols-12">
          <div className="col-span-8">
        <ArticlesCard 
              id={article.id}
              title={article.title}
              content={article.content}
              image={article.image}
              writer={article.writer}
              facebookLink={article.facebookLink}
              twitterLink={article.twitterLink}
              instagramLink={article.instagramLink}
              date={article.date}
              articleType={article.articleType}
              updatedAt={article.updatedAt} 
              createdAt={article.createdAt} 
              /></div>
              <div className="col-span-4">
              {
          articles.map((article: { id: number; title: string; 
            facebookLink: string | null;
            twitterLink: string | null;
            instagramLink: string | null;
            date: string | null;
            articleType: string; content: string; writer: string, image: string | null, updatedAt: Date, createdAt: Date}
          ) => (
            <ReadMoreCard key={article.id} article={article} />
          ))
        }
              </div>
        </div></div>
      <Footer/>
      </div>
  }