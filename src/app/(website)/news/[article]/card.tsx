/* eslint-disable @typescript-eslint/no-explicit-any */
// components/ReadMoreCard.tsx
'use client'

import { useRouter } from 'next/navigation'
import Image from 'next/image'
import parse from 'html-react-parser'

export function ReadMoreCard({ article }: { article: { id: number; 
    facebookLink: string | null,
    twitterLink: string | null,
    instagramLink: string | null,
    date: Date,
    articleType: string, title: string; content: string; writer: string, image: string | null, updatedAt: Date, createdAt: Date} }) {
  const router = useRouter()
  const path = article.image !== null ? article.image : ''
  const handleReadMore = () => {
    router.push(`/news/${encodeURIComponent(article.title)}`)
  }

  return (
    <div key={article.id}>
      <div className="pb-8 cursor-pointer" onClick={handleReadMore}>
        <div>
          <div className="relative h-36 w-full">
            <Image
              alt="article image"
              src={path}
              fill
              objectFit='cover'
              unoptimized
              className="object-cover"
            />
          </div>
          <div className="text-lg font-bold tracking-tight mt-4 leading-5 text-dark pointer blog capitalize">
            {article.title}
          </div>
          <div className="line-clamp-2 text-sm leading-4 mt-2">
            {parse(article.content)}
          </div>
        </div>
      </div>
    </div>
  )
}
