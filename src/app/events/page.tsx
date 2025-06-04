/* eslint-disable @typescript-eslint/no-unused-vars */

import { ListItem, Menu } from "../navigation/menu";
import { Button } from "@/components/ui/button";
import Footer from "../navigation/footer";
import { Concerts } from "./concerts";
import { SearchBar } from "../navigation/search";
import Popular from "../home/popular";
import Menu1 from "../navigation/menu1";
import { getMyMonth } from "@/services/success";
import { Calendar } from "lucide-react";

export default function Events() {
  const date = new Date()
  return (
    <div className="sm:px-16 md:px-12 sm:bg-muted">
      <div className="sm:px-2">
        <Menu/>
      </div>

    <div className=" sm:mx-2">
      <Menu1/>
    </div>
      <div className="sm:px-2">
    <div>
    <div className="rounded-lg">
    <div className="grid sm:grid-cols-12 gap-2">
      <div className="sm:col-span-9 bg-background p-8 rounded-lg">
        <div className="text-sm text-muted-foreground">LATEST </div>
        <div className="text-4xl tracking-tight leading-10 font-bold my-4 capitalize">Events and Concerts</div>
      </div>
      <div className="sm:col-span-3 rounded-lg events items-center flex justify-center"><Calendar/></div>
    </div>
    </div>
    <div className="bg-background sm:p-8 p-4 rounded-lg mt-2">
        <div className="text-sm uppercase text-muted-foreground">All events</div>
        <div className="p-4 rounded-lg mt-4">
            <Concerts/>
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
