"use client"
/* eslint-disable @typescript-eslint/no-unused-vars */


import { Bell, Loader2, Moon, Sun } from "lucide-react";
import Profile from "../auth/profile";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { fetcher, tokenise } from "@/services/services";
import useSWR from "swr";
import { UserType } from "./types";

export default function Header(){
    const { setTheme } = useTheme()
    let user: UserType[] = []
    const logged: UserType[] = []
    const { data, error } = useSWR("/api/users", fetcher);
    if(data){
        user = data
        user.forEach(user => {
            if(user.isLoggedIn == true){
                logged.push(user)
            }
        })
    }
    if (!data) return <div className="flex bg-background rounded-md justify-center items-center mt-2"><Loader2 className="animate-spin"/>Loading Users ...</div>;
    return <div className="">
        <div className=" rounded-lg sm:grid sm:grid-cols-12 gap-2">
            <div className="sm:col-span-6">
            {tokenise()[4]=="admin" && 
            <div className=" bg-secondary py-1 px-4 rounded-md flex justify-between items-center">
                <div className="text-sm">Logged in users: {logged.length}</div>
                <div className="flex">{logged.map(user => (
                    <div key={user.id} className="h-8 w-8 -ml-4 border border-2 border-muted bg-primary text-background grid font-bold rounded-full justify-center items-center">{user.name[0].toUpperCase()}</div>
                ))}</div>
            </div>}
            </div>
            <div className="sm:col-span-6">
                <div className="flex items-center justify-end">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline">
                            <div className="flex justify-center border-none items-center">
                        <Sun className="h-[1.2rem] w-full rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                        <Moon className="mr-3 h-[1.2rem] w-full rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                        <span className="">Light/Dark</span></div>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => setTheme("light")}>
                        Light
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setTheme("dark")}>
                        Dark
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setTheme("system")}>
                        System
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                    </DropdownMenu>
                    <div className="mx-3">
                    <Profile/></div>
                <Bell/></div>
            </div>
        </div>
    </div>
}