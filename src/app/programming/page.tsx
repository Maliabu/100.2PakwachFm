/* eslint-disable @typescript-eslint/no-unused-vars */

import { ListItem, Menu } from "../navigation/menu";
import { Button } from "@/components/ui/button";
import Footer from "../navigation/footer";
import { SearchBar } from "../navigation/search";
import Popular from "../home/popular";
import { db } from "@/db/db";
import { eq } from "drizzle-orm";
import { programmingTable } from "@/db/schema";
import Menu1 from "../navigation/menu1";

export default async function Events() {
  const weekdays = await db.query.programmingTable.findMany({
    where: eq(programmingTable.weekday, 'true')
  })
  const weekends = await db.query.programmingTable.findMany({
    where: eq(programmingTable.weekday, 'false')
  })
  return (
    <div className="sm:px-16 sm:bg-muted">
      <div className="sm:p-2">
        <Menu/>
      </div>
    <div className="flex justify-between items-center mx-2">
      <Menu1/>
    </div>
      <div className="px-2">
    <div>
    <div className="rounded-lg">
    <div className="grid sm:grid-cols-12 gap-2">
      <div className="sm:col-span-9 bg-background sm:p-8 p-4 rounded-lg mt-2">
        <div className="text-sm text-muted-foreground uppercase">programming </div>
        <div className="text-3xl tracking-tight leading-10 font-bold my-4 capitalize">Weekdays (Mon - Fri)</div>
        {
          weekdays.length > 0 && weekdays.map((weekday, index) => (
            <div key={index} className="grid sm:grid-cols-12 gap-2 bg-secondary rounded-md mt-1 p-4">
              <div className="col-span-4 text-sm font-bold tracking-tight">{weekday.programme}</div>
              <div className="col-span-4 text-sm">{weekday.startTime}</div>
              <div className="col-span-4 text-sm">{weekday.endTime}</div>
              </div>
          ))
        }
        <div className="text-3xl tracking-tight leading-10 font-bold my-4 mt-8 capitalize">Weekends (Sat & Sun)</div>
        {
          weekends.length > 0 && weekends.map((weekday, index) => (
            <div key={index} className="grid sm:grid-cols-12 gap-2 bg-secondary rounded-md mt-1 p-4">
              <div className="col-span-4 text-sm font-bold tracking-tight">{weekday.programme}</div>
              <div className="col-span-4 text-sm">{weekday.startTime}</div>
              <div className="col-span-4 text-sm">{weekday.endTime}</div>
              </div>
          ))
        }
        {/* <div style={{ position: 'relative', width: '100%', height: '500px' }}>
        <Image
            src={Sports}
            alt="Full size"
            fill
            style={{ objectFit: 'cover' }} // or 'contain'
        />
        </div> */}
      </div>
        <div className="sm:col-span-3 bg-background rounded-lg p-4 mt-2">
            {/* <Mic size={150} className="border dark:text-primary rounded-full p-10"/> */}
            {/* <MegaphoneIcon size={70} className="p-4 ml-2 rounded-full border animate-spin"/> */}
            <div className="text-sm text-muted-foreground uppercase">presenters </div>
            {/* <Highlights/> */}
        </div>
    </div>
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
