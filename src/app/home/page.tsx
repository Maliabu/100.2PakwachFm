/* eslint-disable @typescript-eslint/no-unused-vars */

import Highlights from "./highlights";
import { articlesTable } from "@/db/schema";
import { db } from "@/db/db";
import { HeadlineTabs } from "../news/headline";
import Sport from "./sports";
import Business from "./business";
import { eq } from "drizzle-orm";
import Popular from "./popular";
import Menu1 from "../navigation/menu1";


export default async function Page() {
  const votes =  await db.select().from(articlesTable)
  const sportSection = await db
    .select()
    .from(articlesTable)
    .where(eq(articlesTable.articleType, 'sports'));

  const businessSection = await db
    .select()
    .from(articlesTable)
    .where(eq(articlesTable.articleType, 'business'));
    const highlightSection = await db
    .select()
    .from(articlesTable)
    .where(eq(articlesTable.articleType, 'highlight'));
  return (
    <div>
    <div className="rounded-lg">
      <Menu1/>
    <div className="grid grid-cols-12 gap-2">
      <div className="col-span-12 bg-background sm:p-8 p-2 rounded-lg sm:mt-2">
        <div className="text-sm text-muted-foreground">HEADLINES | APRIL 1 2025 </div>
        <HeadlineTabs articles={votes}/>
        {/* <div style={{ position: 'relative', width: '100%', height: '500px' }}>
        <Image
            src={Sports}
            alt="Full size"
            fill
            style={{ objectFit: 'cover' }} // or 'contain'
        />
        </div> */}
      </div>
    </div>
    </div>
    {/* <div className="p-2 absolute left-1/5 top-1/6 bg-background w-80 rounded-lg transform -translate-x-1/2 -translate-y-1/2"><Search size={18} className="text-muted-foreground"/></div> */}
    <div className="bg-background p-8 rounded-lg mt-2">
        <div className="text-sm uppercase text-muted-foreground">WHAT YOU MISSED</div>
        <div className="p-4 rounded-lg mt-4">
        <Highlights articles={highlightSection} />        
        </div>
    </div>
    <div className="bg-background p-8 rounded-lg mt-2">
        <div className="text-sm uppercase text-muted-foreground">SPORT</div>
        <div className="p-4 rounded-lg mt-4">
        <Sport articles={sportSection} /> 
        </div>
    </div>
    <div className="bg-background p-8 rounded-lg mt-2">
        <div className="text-sm uppercase text-muted-foreground">BUSINESS</div>
        <div className="p-4 rounded-lg mt-4">
        <Business articles={businessSection} />        
        </div>
    </div>
    <Popular/>
    </div>
  );
}
