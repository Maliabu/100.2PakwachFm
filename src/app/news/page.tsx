/* eslint-disable @typescript-eslint/no-unused-vars */

import { Menu } from "../navigation/menu";
import Footer from "../navigation/footer";
import { db } from "@/db/db";
import { articlesTable } from "@/db/schema";
import { ArticlesTabs } from "./articlesTab";
import Menu1 from "../navigation/menu1";
import Popular from "../home/popular";
import Image from "next/image";
import mtn1 from '../images/mtn1.jpg'
import mtn2 from '../images/mtn2.jpg'
import { Ads } from "./ads";

export default async function News() {
  const votes =  await db.select().from(articlesTable)
  return (
    <div className="sm:px-16 md:px-12 sm:bg-muted">
      <div className="sm:px-2">
        <Menu/>
      </div>
    <div className="px-2">
      <Menu1/>
    </div>
      <div className="px-2">
    <div>
    <div className="rounded-lg">
    <div className="grid sm:grid-cols-12 gap-2">
      <div className="sm:col-span-10 bg-background sm:p-8 p-4 rounded-lg">
        <div className="text-sm text-muted-foreground uppercase mb-2">news </div>
        <ArticlesTabs articles={votes}/>
      </div>
      <div className="col-span-2 rounded-lg">
        <Ads/>
      </div>
    </div>
    {/* <div className="p-2 absolute left-1/5 top-1/6 bg-background w-80 rounded-lg transform -translate-x-1/2 -translate-y-1/2"><Search size={18} className="text-muted-foreground"/></div> */}
    </div>
    <div className="bg-background p-8 rounded-lg mt-2">
        <div className="text-sm uppercase text-muted-foreground">Sports news</div>
    </div>
    <Popular/>
    </div>
      </div>
      <div className="sm:p-2">
        <Footer/>
      </div>
    </div>
  );
}
