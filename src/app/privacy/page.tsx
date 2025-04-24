/* eslint-disable @typescript-eslint/no-unused-vars */
import Image from "next/image";
import Sports from '../images/radio.jpeg'
import Announce from '../images/_ (1).jpeg'
import { cn } from "@/lib/utils"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import Link from "next/link";
import { ChevronRight, File, LucideTrophy, Medal, MegaphoneIcon, Mic, Mic2, MicVocal, Search, Star, ThumbsUp, Trophy } from "lucide-react";
import { ListItem, Menu } from "../navigation/menu";
import { Button } from "@/components/ui/button";
import Footer from "../navigation/footer";
import { SearchBar } from "../navigation/search";

export default function Events() {
  return (
    <div className="sm:px-16 sm:bg-muted">
      <div className="sm:p-2">
        <Menu/>
      </div>
      <div className="px-2">
    <div>
    <div className="rounded-lg">
    <div className="grid gap-2">
      <div className=" bg-background p-8 sm:p-16 rounded-lg">
        <div className="text-sm text-muted-foreground uppercase">pakwach fm | privacy policy </div>
        <div className="text-2xl tracking-tight leading-10 font-bold my-4 capitalize">Overview</div>
        <div className="text-sm">At Pakwach FM, accessible from www.pakwachfm.com, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by Pakwach FM and how we use it.
            If you have additional questions or require more information about our Privacy Policy, do not hesitate to contact us.
            This Privacy Policy applies only to our online activities and is valid for visitors to our website with regards to the information that they shared and/or collect in Pakwach FM. This policy is not applicable to any information collected offline or via channels other than this website.
        </div>
        <div className="text-2xl tracking-tight leading-10 font-bold my-4 capitalize">Consent</div>
        <div className="text-sm">By using our website, you hereby consent to our Privacy Policy and agree to its terms.
        </div>
        <div className="text-2xl tracking-tight leading-10 font-bold my-4 capitalize">Data and Information we collect</div>
        <div className="text-sm">The personal information that you are asked to provide, and the reasons why you are asked to provide it, will be made clear to you at the point we ask you to provide your personal information.
            If you contact us directly, we may receive additional information about you such as your name, email address, phone number, the contents of the message and/or attachments you may send us, and any other information you may choose to provide.
        </div>
        <div className="text-sm">does not collect any user information automatically</div>
        <div className="text-2xl tracking-tight leading-10 font-bold my-4 capitalize">How we use the data we collect</div>
        <div className="text-sm">
        We use the information we collect in various ways, including to:
        <li>Provide, operate, and maintain our website</li>
        <li>Improve, personalize, and expand our website</li>
        <li>Understand and analyze how you use our website</li>
        <li>Develop new products, services, features, and functionality</li>
        <li>Communicate with you, either directly or through one of our partners, including for customer service, to provide you with updates and other information relating to the website, and for marketing and promotional purposes</li>
        <li>Send you emails</li>
        <li>Find and prevent fraud</li>
        </div>
        <div className="text-2xl tracking-tight leading-10 font-bold my-4 capitalize">Our Advertising Partners</div>
        <div className="text-sm">Some of advertisers on our site may use cookies and web beacons. Our advertising partners are listed below. Each of our advertising partners has their own Privacy Policy for their policies on user data.
        </div>
        <div className="text-2xl tracking-tight leading-10 font-bold my-4 capitalize">Advertising Partners Privacy Policies</div>
        <div className="text-sm">Third-party ad servers or ad networks uses technologies like cookies, JavaScript, or Web Beacons that are used in their respective advertisements and links that appear on Pakwach FM, which are sent directly to users browser. They automatically receive your IP address when this occurs.
        These technologies are used to measure the effectiveness of their advertising campaigns and/or to personalize the advertising content that you see on websites that you visit.
        Note that Pakwach FM has no access to or control over these cookies that are used by third-party advertisers.
        </div>
        <div className="text-2xl tracking-tight leading-10 font-bold my-4 capitalize">Third Party Privacy Policies</div>
        <div className="text-sm">Pakwach FM&apos;s Privacy Policy does not apply to other advertisers or websites. Thus, we are advising you to consult the respective Privacy Policies of these third-party ad servers for more detailed information. It may include their practices and instructions about how to opt-out of certain options.
        You can choose to disable cookies through your individual browser options. To know more detailed information about cookie management with specific web browsers, it can be found at the browsers respective websites.
        </div>
      </div>
    </div>
    {/* <div className="p-2 absolute left-1/5 top-1/6 bg-background w-80 rounded-lg transform -translate-x-1/2 -translate-y-1/2"><Search size={18} className="text-muted-foreground"/></div> */}
    </div>
    </div>
      </div>
      <div className="sm:p-2">
        <Footer/>
      </div>
    </div>
  );
}
