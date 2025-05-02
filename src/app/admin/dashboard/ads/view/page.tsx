/* eslint-disable @typescript-eslint/no-unused-vars */


import useSWR from "swr";
import { fetcher } from "@/services/services";
import { getAdImages, getMenuAds } from "./helper";
import AdCarousel from "./embla";

export default async function Articles(){
    const images = getAdImages(); 
    const menuAds = getMenuAds();
    return(
        <div className=" rounded-lg p-2">
          <div className="p-2 border-b mb-2 text-sm">You have {images.length + menuAds.length} Ads</div>
          <AdCarousel images={images} menuAds={menuAds}/>
        </div>
    )
}