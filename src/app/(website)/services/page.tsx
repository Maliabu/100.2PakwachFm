/* eslint-disable @typescript-eslint/no-unused-vars */

import { ListItem, Menu } from "../navigation/menu";
import { Button } from "@/components/ui/button";
// import { Highlights } from "./highlights";
import Footer from "../navigation/footer";
import { SearchBar } from "../navigation/search";
import Menu1 from "../navigation/menu1";
import Popular from "../home/popular";

export default function Events() {
  return (
    <div>
    <div className="rounded-lg">
    <div className="grid grid-cols-12 gap-2">
      <div className="col-span-9 bg-background p-8 rounded-lg">
        <div className="text-sm text-muted-foreground uppercase">services </div>
        <div className="text-5xl tracking-tight leading-10 font-bold my-4 capitalize">We offer</div>
      </div>
        <div className="col-span-3 bg-background rounded-lg p-4">
            {/* <Mic size={150} className="border dark:text-primary rounded-full p-10"/> */}
            {/* <MegaphoneIcon size={70} className="p-4 ml-2 rounded-full border animate-spin"/> */}
            <div className="text-sm text-muted-foreground uppercase">Advertise </div>
            {/* <Highlights/> */}
        </div>
    </div>
    </div>
    <Popular/>
    </div>
  )
}
