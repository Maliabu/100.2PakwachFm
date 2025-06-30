/* eslint-disable @typescript-eslint/no-unused-vars */


import { galleryImages } from "./helper";
import CommunityGallery from "@/app/(website)/community/gallery";

export default async function Gallery(){
    const images = await galleryImages(); 
    return(
        <div className=" rounded-lg p-2 bg-secondary">
          <div className="p-2 bg-background flex justify-between text-xl font-bold tracking-tight rounded-lg text-sm">Community Gallery <div className="grid items-center justify-center w-8 h-8 bg-primary text-white rounded-full">{images.length}</div></div>
          <CommunityGallery images={images}/>
        </div>
    )
}