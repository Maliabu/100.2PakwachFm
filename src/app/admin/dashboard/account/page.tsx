/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { fetcher, tokenise } from "@/services/services";
import { useEffect, useState } from "react";
import useSWR from "swr";
import { date } from "@/services/services";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { uploadProfilePicture } from "@/schema/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { z } from "zod";
import { uploadProfileImage } from "@/server/fetch.actions";
import Image from "next/image";
import { MapPin } from "lucide-react";
import { UserType } from "../types";

export default function Page(){
    const [email, setEmail] = useState("")
    const [username, setUsername] = useState("")
    const [name, setName] = useState("")
    const [buttonText, setButtonText] = useState('Upload')
    const [userType, setUserType] = useState("")
    const [id, setId] = useState("")
    const [pic, setPicture] = useState("")

    const form = useForm<z.infer<typeof uploadProfilePicture>>({
        resolver: zodResolver(uploadProfilePicture),
          defaultValues: {
            image: "",
            userId: tokenise()[3]
        },
      })
    useEffect(() => {
        setEmail(tokenise()[2])
        setUsername(tokenise()[1])
        setName(tokenise()[0])
        setUserType(tokenise()[4])
        setId(tokenise()[3])
        setPicture(tokenise()[5])

    }, [])
        const { data, error } = useSWR("/api/activity", fetcher);
        const { data:userData, error:userError } = useSWR("/api/users", fetcher);
        const act: any[] = []
        let user: UserType[] = []
        const logged: UserType[] = []
        if(data){
            act.push(data)
        } else return []
        if(userData){
          user = userData
          user.forEach(user => {
          if(user.isLoggedIn == true){
              logged.push(user)
          }
      })
        }
    
          async function onSubmit(values: z.infer<typeof uploadProfilePicture>) {
            setButtonText("Processing...")
            setTimeout(() => {
                setButtonText('Uploading...')
            }, 3000)
            setTimeout(() => {
                setButtonText('Something went wrong')
            }, 5000)
              const app = document.getElementById('submit');
              const text = 'processing';
              if(app !== null){
                app.innerHTML = text;
              }
              const file = values.image1
      
              const formData = new FormData()
              formData.append("file", file)
              formData.append('folder', 'users')

              const data = await uploadProfileImage(values, formData)
        if(data?.error){
            setButtonText("Failed")
          form.setError("root", {
            "message": "Picture not added"
          })
        } else {
            localStorage.setItem('picture', data.url)
          setButtonText("Successful")
          window.location.reload()
          // useRouter().refresh()
        }
          }

    return<div className=" mt-2">
        <div className="grid sm:grid-cols-3 gap-2 bg-background rounded-lg p-6">
            <div className="col-span-1 text-2xl font-bold tracking-tight">
                Account <div className="text-sm font-medium">This is your login account to access this dashboard. User accounts can only be created and updated by an admin account.</div>
            </div>
            <div className="p-4 bg-background rounded-md font-medium">
                <div className="text-sm">Name: <div className="text-muted-foreground text-sm font-medium">{name}</div></div>
                <div className="mt-3 text-sm">Email: <div className="text-muted-foreground text-sm font-medium">{email}</div></div>
                <div className="mt-3 text-sm">Username: <div className="text-muted-foreground text-sm font-medium">{username}</div></div>
            </div>
            <div className="flex justify-center items-center">
            <Dialog>
      <DialogTrigger asChild>
      {pic=='' ? <div className="h-30 w-30 cursor-pointer bg-primary cursor-pointer text-muted text-5xl rounded-full flex justify-center items-center ">{name[0]}</div>:
      <div style={{ position: 'relative', width: '200px', height: '200px' }}>
      <Image
          src={pic}
          alt="Full size"
          className="rounded-full cursor-pointer"
          fill
          unoptimized
          style={{ objectFit: 'cover' }} // or 'contain'
      />
      </div>}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Upload Profile Picture
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
        <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
                  control={form.control}
                  name="image1"
                  render={({ field: { value, onChange, ...fieldProps } }) => (
                      <FormItem>
                      <FormLabel>Upload a profile picture</FormLabel>
                      <FormControl
                      >
                          <Input type="file" {...fieldProps} onChange={(event) =>
                    onChange(event.target.files && event.target.files[0])
                  }/>
                      </FormControl>
                      <FormMessage />
                      </FormItem>
                  )}
                  />
                <Button type="submit" className="mt-4">{buttonText}</Button>
                {form.formState.errors.root && (
          <div className="border-2 border-primary text-sm p-2 rounded-md">{form.formState.errors.root.message}</div>
        )}
        {form.formState.isSubmitSuccessful && (
          <div className="border-2 border-primary mt-2 text-primary text-sm p-2 text-center rounded-md"> Picture uploaded </div>
        )}
                  </form>
                  </Form>
        </div>
      </DialogContent>
    </Dialog>
            </div>
        </div>
        <div className="p-6 my-2 rounded-lg sm:col-span-12 font-medium">
                <div className=" text-2xl font-bold items-center tracking-tight">LoggedIn Users:</div>
                <div className="p-2 mt-2">{logged.map(user => (
                    <div key={user.id} className=" bg-background p-2 rounded-lg mt-1 grid grid-cols-12 gap-4 justify-between items-center">
                    <div className="h-12 w-12 text-lg -ml-6 border col-span-1 border-8 border-muted bg-primary text-background grid font-bold rounded-full justify-center items-center">{user?.name[0].toUpperCase()}</div>
                    <div className="text-sm p-2 sm:col-span-2 rounded-full sm:block hidden">{user?.name}</div>
                    <div className="text-sm sm:mr-6 sm:mr-4 sm:ml-0 ml-4 sm:col-span-4 col-span-6"><span className="text-muted-foreground font-bold">last login:</span><br/>{date(user.lastLogin.toString())}</div>
                    <div className="text-sm p-2 bg-secondary rounded-md col-span-4 sm:col-span-3 capitalize">{user.userType}</div>
                    </div>
                ))}</div>
            </div>
        {userType=="admin" &&
        <div className=" sm:p-8 p-4 bg-background font-medium rounded-lg">
            <div className="text-2xl font-bold tracking-tight">User Activity / Timeline (Logging)</div>
            <div className="text-sm font-medium text-muted-foreground">Logging user activities on the platform, visible only to the administrator</div>
            <div className="bg-background p-6 mt-6 rounded-md overflow-auto h-[300px]">
                <div className="text-sm flex justify-between text-muted-foreground my-4 p-2 bg-secondary rounded-md">
                    <p>User</p>
                    <p>Activities</p>
                    <p>Date of activity</p>
                </div>
                {data.map((item: {activity:{activity: string, createdAt: string, id:number, user: number}, users_table:{name: string}}) => (
                    <div className="text-sm py-2 border-b grid grid-cols-3" key={item.activity.id}>
                         <p>{item.users_table?.name}</p>
                         <p className="text-left">{item.activity.activity}</p>
                        <p className="text-right">{date(item.activity.createdAt)}</p>
                    </div>
                ))}
            </div>
        </div>}
    </div>
}