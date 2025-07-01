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
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Image from "next/image";


export default async function Events() {
  const weekdays = await db.query.programmingTable.findMany({
    where: eq(programmingTable.weekday, 'true')
  })
  const weekends = await db.query.programmingTable.findMany({
    where: eq(programmingTable.weekday, 'false')
  })
  return (
    <div>
    <div className="rounded-lg">
    <div className="grid sm:grid-cols-12 gap-2">
      <div className="sm:col-span-9 bg-background sm:p-8 p-4 rounded-lg">
        <div className="text-sm text-muted-foreground uppercase">programming </div>
        <div className="text-3xl tracking-tight leading-10 font-bold my-4 capitalize">Weekdays (Mon - Fri)</div>
        <div className="grid sm:grid-cols-12 gap-2">
        {weekdays.length > 0 && weekdays.map((weekday, index) => (
                    <div key={index} className="sm:col-span-4 bg-blue-950 text-white rounded-lg">
                      <div style={{ position: 'relative', width: '100%', height: '200px' }}>
                      <Image
                          src={weekday.image}
                          alt="Full size"
                          className="rounded-t-lg"
                          fill
                          unoptimized
                          style={{ objectFit: 'cover' }} // or 'contain'
                      />
                      </div>
                      <div className="p-8">
                        <div className="text-2xl font-bold tracking-tight capitalize leading-6">{weekday.programme}</div>
                        <div className="flex justify-between text-sm py-3">
                        <div>{weekday.startTime}</div>
                        <div className="font-medium">{weekday.endTime}</div>
                        </div>
                        </div>
                        </div>
                    ))}
        </div>
        <div className="text-3xl tracking-tight leading-10 font-bold my-4 mt-8 capitalize">Weekends (Sat & Sun)</div>
        <div className="grid sm:grid-cols-12 gap-2">
        {weekends.length > 0 && weekends.map((weekday, index) => (
                    <div key={index} className="sm:col-span-4 bg-slate-950 text-white rounded-lg">
                      <div style={{ position: 'relative', width: '100%', height: '200px' }}>
                      <Image
                          src={weekday.image}
                          alt="Full size"
                          className="rounded-t-lg"
                          fill
                          unoptimized
                          style={{ objectFit: 'cover' }} // or 'contain'
                      />
                      </div>
                      <div className="p-8">
                        <div className="text-2xl font-bold tracking-tight capitalize leading-6">{weekday.programme}</div>
                        <div className="flex justify-between text-sm py-3">
                        <div>{weekday.startTime}</div>
                        <div className="font-medium">{weekday.endTime}</div>
                        </div>
                        </div>
                        </div>
                    ))}
        </div>
      </div>
        <div className="sm:col-span-3 present rounded-lg p-4">
            {/* <Mic size={150} className="border dark:text-primary rounded-full p-10"/> */}
            {/* <MegaphoneIcon size={70} className="p-4 ml-2 rounded-full border animate-spin"/> */}
            <div className="text-sm text-muted-foreground uppercase">presenters </div>
            {/* <Highlights/> */}
        </div>
    </div>
    </div>
    <Popular/>
    </div>
  );
}
