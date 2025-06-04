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
import Messages from "../admin/dashboard/messages/page";

export default function Events() {
  return (
    <div className="sm:px-16 md:px-12 sm:bg-muted">
      <div className="sm:px-2">
        <Menu/>
      </div>
    <div className="sm:mx-2">
      <Menu1/>
    </div>
      <div className="sm:px-2">
    <div>
    <div className="rounded-lg">
    <div className="sm:grid sm:grid-cols-12 gap-2">
      <div className="sm:col-span-9 bg-background p-8 rounded-lg">
        <div className="text-sm text-muted-foreground uppercase">advertise with us </div>
        <div className="text-3xl tracking-tight leading-8 font-bold my-4 capitalize">Checkout our rate card! Advertise your Business</div>
        {/* <div style={{ position: 'relative', width: '100%', height: '500px' }}>
        <Image
            src={Sports}
            alt="Full size"
            fill
            style={{ objectFit: 'cover' }} // or 'contain'
        />
        </div> */}
        <Messages/>
      </div>
        <div className="sm:col-span-3 flex justify-center items-center text-muted-foreground advertize rounded-lg p-4">
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
