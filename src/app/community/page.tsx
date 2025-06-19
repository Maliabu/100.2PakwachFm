/* eslint-disable @typescript-eslint/no-unused-vars */

import { ListItem, Menu } from "../navigation/menu";
import { Button } from "@/components/ui/button";
// import { Highlights } from "./highlights";
import Footer from "../navigation/footer";
import { SearchBar } from "../navigation/search";
import Popular from "../home/popular";
import Menu1 from "../navigation/menu1";
import { Users2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import PartnerCarousel from "./partners";

export default function Community() {
  return (
    <div className="sm:px-16 md:px-12 sm:bg-muted">
      <div className="sm:px-2">
        <Menu/>
      </div>
    <div className=" sm:px-2">
      <Menu1/>
    </div>
      <div className="px-2">
    <div>
    <div className="rounded-lg">
    <div className="grid sm:grid-cols-12 gap-2">
      <div className="sm:col-span-9 bg-background sm:p-8 p-4 rounded-lg">
        <div className="text-sm text-muted-foreground uppercase">our community </div>
        <div className="text-5xl tracking-tight leading-10 font-bold my-4 capitalize">join us</div>
        <div className="text-sm">Our roots run deep in Pakwach, Uganda — a place full of vibrant culture, strong community spirit, and inspiring local initiatives. We’re proud to work alongside NGOs, youth groups, and community organizations in Pakwach that are creating real change on the ground. This page highlights some of the partners we support as they work to uplift lives, promote education, protect the environment, and build a brighter future for everyone in the region.</div>
        <div className="text-sm text-muted-foreground uppercase my-8">cause ally </div>
        <PartnerCarousel/>
      </div>
        <div className="sm:col-span-3 community rounded-lg p-4">
            <div className="text-sm hidden text-muted-foreground uppercase"><Users2/> </div>
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
