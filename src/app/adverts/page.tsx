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
    <div className="flex justify-between items-center mt-2">
      <Menu1/>
    </div>
      <div className="px-2">
    <div>
    <div className="rounded-lg">
    <div className="grid grid-cols-12 gap-2">
      <div className="col-span-9 bg-background p-8 rounded-lg mt-2">
        <div className="text-sm text-muted-foreground uppercase">news </div>
        <div className="text-5xl tracking-tight leading-10 font-bold my-4 capitalize">The latest in news</div>
        {/* <div style={{ position: 'relative', width: '100%', height: '500px' }}>
        <Image
            src={Sports}
            alt="Full size"
            fill
            style={{ objectFit: 'cover' }} // or 'contain'
        />
        </div> */}
      </div>
        <div className="col-span-3 bg-background rounded-lg p-4 mt-2">
            {/* <Mic size={150} className="border dark:text-primary rounded-full p-10"/> */}
            {/* <MegaphoneIcon size={70} className="p-4 ml-2 rounded-full border animate-spin"/> */}
            <div className="text-sm text-muted-foreground uppercase">highlights </div>
            {/* <Highlights/> */}
        </div>
    </div>
    </div>
    <div className="bg-background p-8 rounded-lg mt-2">
        <div className="text-sm uppercase text-muted-foreground">Sports news</div>
    </div>
    <div className="bg-background p-8 rounded-lg mt-2">
        <div className="flex justify-between"><Star size={18} className="text-primary"/>
        <div className="text-sm uppercase text-muted-foreground"> OUR MOST POPULAR YET</div>
        <Button><ThumbsUp/> Vote</Button>
        </div>
    <div className="grid grid-cols-2 gap-4 mx-40 my-10">
        <div className="rounded-lg">
        <div style={{ position: 'relative', width: '100%', height: '300px' }}>
        <Image
            src={Sports}
            alt="Full size"
            className="rounded-t-lg"
            fill
            style={{ objectFit: 'cover' }} // or 'contain'
        />
        </div>
        <div className="p-4">
            <Trophy className="text-primary"/><span>1</span>
        <div className="text-2xl font-bold tracking-tight">Radio Adverts</div>
        <div className="text-sm leading-4 mt-2">
        promotion of goods or services through radio broadcasts, whether in the form of commercials or programming. In other words, an advertisement on the radio is a form of paid promotion in which a good or service is promoted employing airtime on a radio station
        </div>
        </div>
        </div>
        <div>
                    <div style={{ position: 'relative', width: '100%', height: '300px' }}>
        <Image
            src={Announce}
            alt="Full size"
            fill
            className="rounded-t-lg"
            style={{ objectFit: 'cover' }} // or 'contain'
        />
        </div>
        <div className="p-4">
            <Medal className="text-primary"/><span>1</span>
        <div className="text-2xl font-bold tracking-tight">Announcements</div>
        <div className="text-sm leading-4 mt-2">
        promotion of goods or services through radio broadcasts, whether in the form of commercials or programming. In other words, an advertisement on the radio is a form of paid promotion in which a good or service is promoted employing airtime on a radio station
        </div>
        </div>
        </div>
        </div>
    </div>
    </div>
      </div>
      <div className="sm:p-2">
        <Footer/>
      </div>
    </div>
  );
}
