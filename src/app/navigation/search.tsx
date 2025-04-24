/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { search } from "@/schema/schema"
import { Search } from "lucide-react"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from '@hookform/resolvers/zod'

export function SearchBar() {
  const form = useForm<z.infer<typeof search>>({
    resolver: zodResolver(search),
      defaultValues: {
        search: '',
    },
  })
  const searchParam = form.getValues("search")
  const searchCriteria = [
    {
        "name": "Events & News",
        "description": "News & Events",
        "tab": "/events"
    },
    {
        "name": "services",
        "description": "services",
        "tab": "/services"
    },
    {
        "name": "programming",
        "description": "programming, presenters",
        "tab": "/programming"
    },
    {
        "name": "community",
        "description": "our community",
        "tab": "/community"
    },
    {
      "name": "videos",
      "description": "music and videos",
      "tab": "/videos"
  }
  ]
  const criteria = {}
  function searchResults(){
    if(searchParam === ""){
      return (
          <div>
              <p className="small text-start">0 search results found</p>
          </div>
      )
    } else {
      const SearchFilter = searchCriteria.filter((item)=>{ if(item.name.toLowerCase().includes(searchParam.toLowerCase())){return <p key={item.tab}>{item.name}</p>}})
      const myFinalSearch = SearchFilter.map((item) => {return <div key={item.tab} className="grid grid-cols-1 p-4 bg-muted rounded-md mt-1"><p>{item.name}</p><Link href={item.tab}>{item.description}</Link></div>})
      return(
          <div className="pt-4">{myFinalSearch}</div>
      )
    }
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
          <div className="hover:cursor-pointer px-4">
            <Search size={18} className="text-black"/></div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Search</DialogTitle>
          <DialogDescription>
            what would you like to find?...
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid items-center gap-4">
          <Form {...form}>
          <form>
                <FormField
                  control={form.control}
                  name="search"
                  render={({ field }) => (
                      <FormItem>
                      <FormControl>
                      <Input id="search" placeholder="search here..." {...field}/>
                      </FormControl>
                      <FormMessage />
                      </FormItem>
                  )}/>
        </form>
        </Form>
        </div>
          <div className="border-b mt-2 py-3">
            <p className="text-2xl font-bold tracking-tight">Results Found</p>
          </div>
          <div className="text-sm">{searchResults()}</div>
        </div>
      </DialogContent>
    </Dialog>
  )
}