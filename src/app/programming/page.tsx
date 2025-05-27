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

export default async function Events() {
  const weekdays = await db.query.programmingTable.findMany({
    where: eq(programmingTable.weekday, 'true')
  })
  const weekends = await db.query.programmingTable.findMany({
    where: eq(programmingTable.weekday, 'false')
  })
  return (
    <div className="sm:px-12 sm:bg-muted">
      <div className="">
        <Menu/>
      </div>
    <div className="flex justify-between items-center">
      <Menu1/>
    </div>
      <div className="">
    <div>
    <div className="rounded-lg">
    <div className="grid sm:grid-cols-12 gap-2">
      <div className="sm:col-span-9 bg-background sm:p-8 p-4 rounded-lg mt-2">
        <div className="text-sm text-muted-foreground uppercase">programming </div>
        <div className="text-3xl tracking-tight leading-10 font-bold my-4 capitalize">Weekdays (Mon - Fri)</div>
        <div className="overflow-x-auto w-full">
        <Table className="min-w-full">
                <TableHeader>
                    <TableRow >
                    <TableHead >Programme</TableHead>
                    <TableHead >Start Time</TableHead>
                    <TableHead >End Time</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                {weekdays.length > 0 && weekdays.map((weekday, index) => (
                    <TableRow key={index}>
                        <TableCell>{weekday.programme}</TableCell>
                        <TableCell>{weekday.startTime}</TableCell>
                        <TableCell className="font-medium">{weekday.endTime}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
                </Table>
                </div>
        <div className="text-3xl tracking-tight leading-10 font-bold my-4 mt-8 capitalize">Weekends (Sat & Sun)</div>
        <Table>
                <TableHeader>
                    <TableRow >
                    <TableHead >Programme</TableHead>
                    <TableHead >Start Time</TableHead>
                    <TableHead >End Time</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                {weekends.length > 0 && weekends.map((weekday, index) => (
                    <TableRow key={index}>
                        <TableCell>{weekday.programme}</TableCell>
                        <TableCell>{weekday.startTime}</TableCell>
                        <TableCell className="font-medium">{weekday.endTime}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
                </Table>
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
      <div className="mt-2">
        <Footer/>
      </div>
    </div>
  );
}
