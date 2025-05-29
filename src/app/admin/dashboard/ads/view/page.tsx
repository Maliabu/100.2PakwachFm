/* eslint-disable @typescript-eslint/no-unused-vars */


import useSWR from "swr";
import { fetcher } from "@/services/services";
import { columnImages, getAdImages, getMenuAds, menuImages } from "./helper";
import AdCarousel from "./embla";

export default async function Articles(){
    // const images = getAdImages(); 
    // const menuAds = getMenuAds();

    const images = await columnImages(); 
    const menuAds = await menuImages();
    return(
        <div className=" rounded-lg p-2 bg-secondary">
          <div className="p-2 bg-background flex justify-between text-xl font-bold tracking-tight rounded-lg text-sm">Ads <div className="grid items-center justify-center w-8 h-8 bg-primary text-white rounded-full">{images.length + menuAds.length}</div></div>
          <AdCarousel images={images} menuAds={menuAds}/>
        </div>
    )
}