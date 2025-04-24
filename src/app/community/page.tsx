/* eslint-disable @typescript-eslint/no-unused-vars */

import { ListItem, Menu } from "../navigation/menu";
import { Button } from "@/components/ui/button";
// import { Highlights } from "./highlights";
import Footer from "../navigation/footer";
import { SearchBar } from "../navigation/search";
import Popular from "../home/popular";
import Menu1 from "../navigation/menu1";

export default function Community() {
  return (
    <div className="sm:px-16 sm:bg-muted">
      <div className="sm:p-2">
        <Menu/>
      </div>
    <div className="flex justify-between items-center mt-2">
      <Menu1/>
    </div>
      <div className="px-2">
    <div>
    <div className="rounded-lg">
    <div className="grid grid-cols-12 gap-2">
      <div className="col-span-9 bg-background p-8 rounded-lg mt-2">
        <div className="text-sm text-muted-foreground uppercase">our community </div>
        <div className="text-5xl tracking-tight leading-10 font-bold my-4 capitalize">join us</div>
      </div>
        <div className="col-span-3 bg-background rounded-lg p-4 mt-2">
            <div className="text-sm text-muted-foreground uppercase">activities </div>
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
