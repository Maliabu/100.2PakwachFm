/* eslint-disable @typescript-eslint/no-unused-vars */
import Image from "next/image";
import Sports from '../images/radio.jpeg'
import Announce from '../images/_ (1).jpeg'
import { ChevronRight, File, LucideTrophy, Medal, MegaphoneIcon, Mic, Mic2, MicVocal, Search, Star, ThumbsUp, Trophy } from "lucide-react";
import { ListItem, Menu } from "../navigation/menu";
import { Button } from "@/components/ui/button";
import Footer from "../navigation/footer";
import { SearchBar } from "../navigation/search";
import Menu1 from "../navigation/menu1";

export default function Events() {
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
    <div className="grid grid-cols-12 gap-2">
      <div className="col-span-9 bg-background p-8 rounded-lg mt-2">
        <div className="text-sm text-muted-foreground uppercase">advertise with us </div>
        <div className="text-4xl tracking-tight leading-10 font-bold my-4 capitalize">Leave us a message</div>
        {/* <div style={{ position: 'relative', width: '100%', height: '500px' }}>
        <Image
            src={Sports}
            alt="Full size"
            fill
            style={{ objectFit: 'cover' }} // or 'contain'
        />
        </div> */}
      </div>
        <div className="col-span-3 flex justify-center items-center text-muted-foreground bg-background rounded-lg p-4 mt-2">
          <MegaphoneIcon/>
            {/* <Mic size={150} className="border dark:text-primary rounded-full p-10"/> */}
            {/* <MegaphoneIcon size={70} className="p-4 ml-2 rounded-full border animate-spin"/> */}
            {/* <Highlights/> */}
        </div>
    </div>
    </div>
    <div className="bg-background p-8 rounded-lg mt-2">
        <div className="text-sm uppercase text-muted-foreground">Sports news</div>
    </div>
    </div>
      </div>
      <div className="sm:p-2">
        <Footer/>
      </div>
    </div>
  );
}
