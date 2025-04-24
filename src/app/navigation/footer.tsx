/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Highlights from "../home/highlights";
import Articles from "../home/articles";
import { Mail, Monitor, Play } from "lucide-react";
import Link from "next/link";
import Logo from '../images/logo (1).png'


export default function Footer(){
    return <div className="bg-background rounded-lg">
        <div className="flex justify-between p-6">
            <div>
                <div className="text-2xl font-bold tracking-tight">Subscribe to our NewsLetter</div>
            </div>
            <Button><Mail size={18}/> Subscribe</Button>
        </div>
        <div className="p-6 bg-secondary my-6 flex justify-between">
        <Articles/>
        </div>
        <div className="bg-background p-6 flex justify-center rounded-lg">
            <div className="text-lg font-bold tracking-tight">quick links</div>
            <ul className="text-sm mt-6">
                <li className="hover:text-primary hover:font-bold hover:underline"><Link href='/news'>News & Sports</Link></li>
                <li className="hover:text-primary hover:font-bold hover:underline"><Link href='/programming'>programming & presenters</Link></li>
                <li className="hover:text-primary hover:font-bold hover:underline"><Link href='/events'>Events</Link></li>
                </ul>
        </div>
        <div className="bg-secondary mt-16 p-6">
            <div className="text-lg font-bold tracking-tight">Studio Lines</div>
            <div className="sm:flex sm:justify-between">
            <ul className="text-sm mt-6">
                <li>Administration:</li>
                <li>+256-776-994301,</li>
                <li>Spo+256-753-994300rts</li>
                </ul>
            <ul className="text-sm mt-6">
                <li>Newsroom:</li>
                <li>+256-783-584234</li>
                </ul>
            <ul className="text-sm mt-6">
                <li>Sales:</li>
                <li>+256-772-748172</li>
                <li>+256-772-331128,</li>
                <li>+256-702-632200</li>
                </ul>
                <ul className="text-sm mt-6">
                <li>Studio Lines:</li>
                <li>+256-786-223233</li>
                <li>+256-758-991623</li>
                </ul>
                </div>
        </div>
        <footer className="row-start-3 p-6 bg-black flex gap-[24px] text-white text-sm flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 font-bold tracking-tight hover:underline hover:underline-offset-4"
          href="https://www.youtube.com/@pakwachf.m2967"
          target="_blank"
          rel="noopener noreferrer"
        >
        <div className="font-bold rounded-md bg-primary w-8 h-8 grid items-center justify-center">
          <Play size={18}/>
        </div>
          Pakwach FM TV
        </a>
        <div className="hover:underline"><Link href='/privacy'>Privacy Policy</Link></div>
        <div className="w-30 h-10"><Link href='/'><Image src={Logo} alt="logo"/></Link></div>
      </footer>
      <div className="text-xs p-6">
          <p>&copy;copyright.pakwachfm@{new Date().getFullYear()}</p>
          </div>
    </div>
}