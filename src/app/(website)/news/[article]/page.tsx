import Footer from "@/app/(website)/navigation/footer"
import {Menu} from "@/app/(website)/navigation/menu"
import { db } from "@/db/db"
import { articlesTable } from "@/db/schema"
import { eq } from "drizzle-orm"
import { ArticlesCard } from "../articlesCard"
import { ReadMoreCard } from "./card"
import { Metadata } from "next"

export async function generateMetadata({ params }: { params: { article: string } }): Promise<Metadata> {
  const title = decodeURIComponent(params.article)

  const [article] = await db
    .query
    .articlesTable
    .findMany({
      where: eq(articlesTable.title, title)
    })

  if (!article) {
    return {
      title: "Article not found | Pakwach FM",
    }
  }

  return {
    title: `${article.title} | Pakwach FM`,
    description: article.content.slice(0, 150).replace(/<[^>]*>/g, ""),
    openGraph: {
      title: article.title,
      description: article.content.slice(0, 150).replace(/<[^>]*>/g, ""),
      url: `https://pakwachfm.com/news/${encodeURIComponent(article.title)}`,
      type: "article",
      images: article.image
        ? [
            {
              url: article.image.startsWith("http")
                ? article.image
                : `https://pakwachfm.com${article.image}`,
              width: 1200,
              height: 630,
              alt: article.title,
            },
          ]
        : [],
    },
  }
}

export default async function Page({
    params,
  }: {
    params: { article: string }
  }) {
    const slug = decodeURIComponent(params.article)
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

    return <div className="sm:px-16 sm:bg-muted">
      <Menu/>
      <div className=" sm:p-8 p-2 rounded-lg bg-background my-2">
        <div className="grid sm:grid-cols-12">
          <div className="sm:col-span-8">
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
              <div className="sm:col-span-4">
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
        </div></div>
      <Footer/>
      </div>
  }