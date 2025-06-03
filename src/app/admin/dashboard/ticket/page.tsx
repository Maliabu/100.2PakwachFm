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
import { addNewNotification, openNewTicket} from "@/server/fetch.actions"
import { addNotificationSchema, openTicket } from '@/schema/schema'
import { tokenise } from "@/services/services"
import Image from "next/image"
import Shape from '@/app/images/shape.png'
import Link from "next/link"

export default function Ticket() {

    const form = useForm<z.infer<typeof openTicket>>({
      resolver: zodResolver(openTicket),
        defaultValues: {
            issue: "",
            opened: parseInt(tokenise()[3]),
            status: 'open'
      },
    })
     
    async function onSubmit(values: z.infer<typeof openTicket>) {
      
      const app = document.getElementById('submit');
      const text = 'processing';
      if(app !== null){
        app.innerHTML = text;
      }

        const data = await openNewTicket(values)
        if(data?.error){
          form.setError("root", {
            "message": "Ticket not opened"
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
    <div className="my-2 flex bg-background rounded">
      <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className=" sm:p-8">
      <div className="text-2xl font-bold tracking-tight">What do you need help with?</div>
      <div className="text-sm mb-6 text-muted-foreground">This goes out to support for web app support.</div>
          <div className="grid sm:grid-cols-3 gap-2">
              <div className="flex flex-col space-y-1.5">
              <FormField
                  control={form.control}
                  name="issue"
                  render={({ field }) => (
                      <FormItem>
                      <FormLabel>Something not working? Tell support!</FormLabel>
                      <FormControl>
                          <Input 
                          type="text" 
                          placeholder="for example: a button does not click" {...field} />
                      </FormControl>
                      <FormMessage />
                      </FormItem>
                  )}
                  />
              </div>
          </div>
        <Button id="submit" className="my-4" type="submit">Open Ticket</Button>
        {form.formState.errors.root && (
          <div className="bg-light p-2 rounded-md">{form.formState.errors.root.message}</div>
        )}
        {form.formState.isSubmitSuccessful && (
          <div className="border border-primary text-primary p-2 text-center rounded-md"> Ticket opened successfully </div>
        )}
      </form>
      </Form>
      <div className="w-[350]px p-6">
      <Image src={Shape} alt="shape" width={300} height={20}/></div>
        </div>
      <Link href='/admin/dashboard/ticket/view'><Button>View Tickets</Button></Link>
    </div>
  )
}