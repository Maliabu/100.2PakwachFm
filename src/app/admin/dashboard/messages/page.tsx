/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-expressions */
"use client"

import * as React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"
import z from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { addMessages, addNewNotification} from "@/server/fetch.actions"
import { addMessagesSchema, addNotificationSchema } from '@/schema/schema'
import { tokenise } from "@/services/services"
import Image from "next/image"
import Shape from '@/app/images/shape2.png'
import Link from "next/link"

export default function Messages() {

    const form = useForm<z.infer<typeof addMessagesSchema>>({
      resolver: zodResolver(addMessagesSchema),
        defaultValues: {
            email: "",
            message: '',
            status: 'new',
            
      },
    })
     
    async function onSubmit(values: z.infer<typeof addMessagesSchema>) {
     
      const app = document.getElementById('submit');
      const text = 'processing';
      if(app !== null){
        app.innerHTML = text;
      }

        const data = await addMessages(values)
        if(data?.error){
          form.setError("root", {
            "message": "Message not added"
          })
        } else {
          if(app !== null){
            app.innerHTML = "Successful";
          }
          window.location.reload()
        }
    }

  return (
    <div>
    <div className="my-2 sm:flex bg-background justify-between rounded">
      <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="p-6 sm:p-8">
      <div className="text-2xl font-bold tracking-tight">Leave a message</div>
      <div className="text-sm mb-6 text-muted-foreground">Drop a comment or message and we will get back to you asap</div>
          <div className="grid sm:grid-cols-3 gap-2">
          <div className="flex flex-col space-y-1.5">
              <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                      <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                          <Input type="email" placeholder="Email" {...field} />
                      </FormControl>
                      <FormMessage />
                      </FormItem>
                  )}
                  />
              </div>
              <div className="flex flex-col space-y-1.5">
              <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                      <FormItem>
                      <FormLabel>Message</FormLabel>
                      <FormControl>
                          <Input 
                          type="text" 
                          placeholder="for example: merry christmas. happy holidays" {...field} />
                      </FormControl>
                      <FormMessage />
                      </FormItem>
                  )}
                  />
              </div>
          </div>
        <Button id="submit" className="my-4" type="submit">Add message</Button>
        {form.formState.errors.root && (
          <div className="bg-light p-2 rounded-md">{form.formState.errors.root.message}</div>
        )}
        {form.formState.isSubmitSuccessful && (
          <div className="border text-sm font-bold border-primary text-primary p-2 text-center rounded-md"> Message sent </div>
        )}
      </form>
      </Form>
      <div className="w-[350]px p-6">
      <Image src={Shape} alt="shape" width={200} height={20}/></div>
        </div>
      <Link href='/admin/dashboard/messages/view' className="mt-2 hidden"><Button>View messages</Button></Link>
    </div>
  )
}