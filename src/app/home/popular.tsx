import { Medal, Star, ThumbsUp, Trophy } from "lucide-react";
import Image from "next/image";
import Sports from '../images/radio.jpeg'
import Announce from '../images/_ (1).jpeg'
import { Button } from "@/components/ui/button";

export default function Popular(){
    return(
        <div>
        <div className="bg-background sm:p-8 p-2 rounded-lg mt-2">
            <div className="flex justify-between"><Star size={18} className="text-primary"/>
            <div className="text-sm uppercase text-muted-foreground"> OUR MOST POPULAR YET</div>
            <Button className="bg-secondary text-muted-foreground"><ThumbsUp/> Voted</Button>
            </div>
        <div className="grid sm:grid-cols-2 gap-4 sm:mx-40 my-10">
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
            pre-recorded or live message broadcast over the air to inform, promote, or alert listeners about specific events, programs, services, or public interest information. These announcements are typically concise and designed to quickly capture attention, often featuring a clear voice, music or sound effects, and a strong call to action. Whether it&apos;s a public service message, a show promo, or an emergency alert, radio announcements play a vital role in keeping audiences informed and engaged.            </div>
            </div>
            </div>
            </div>
        </div>
        </div>
    )
}