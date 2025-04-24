"use client"

import { readEditorFiles } from "@/server/fetch.actions"
import { ReactNode, createContext, useContext, useEffect, useState } from "react"

interface Props{
    children: ReactNode
}

interface EditorImages{
    images: string[]
    updateImages(images: string[]): void
    removeOldImages(src: string): void

}
const Context = createContext<EditorImages | null>(null)


export default function ImageProvider({children}: Props){
    const [images, setImages] = useState<string[]>([])

    const updateImages = (data: string[]) => {
        setImages([...data, ...images])
    }

    const removeOldImages = (src: string) => {
        setImages((old) => old.filter(img => src !== img))
    }

    useEffect(() => {
        readEditorFiles().then(setImages)
    }, [])

    return(
        <Context.Provider value={{images, updateImages, removeOldImages}}>
    <div>{children}</div>
    </Context.Provider>
)
}

export const useImages = () => useContext(Context);