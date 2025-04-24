/* eslint-disable @next/next/no-img-element */
import { Button } from "@/components/ui/button"
import { Check, Trash } from "lucide-react"

interface Props{
    src?: string
    onDelete?(): void
    onSelect?(): void
}

export default function GalleryImage({src, onDelete, onSelect}:Props){
    return <div className="relative">
        <div className="w-full aspect-square rounded-sm overflow-hidden">
            <img src={src}
            alt="article image"
            className="w-full h-full object-cover"/>
            </div>
        <div className="flex absolute left-0 right-0 bottom-0 backdrop-blur-sm">
            <Button onClick={onSelect} className="flex flex-1 items-center justify-center text-white" size="sm" variant="ghost">
                <Check/>
            </Button>
            <div id="del" onClick={onDelete} className="bg-destructive flex flex-1 items-center text-white justify-center">
                <Trash/>
            </div>
        </div>
    </div>
}