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
import { addNewNotification} from "@/server/fetch.actions"
import { addNotificationSchema } from '@/schema/schema'
import { tokenise } from "@/services/services"
import Image from "next/image"
import Shape from '@/app/images/shape.png'
import Link from "next/link"
import { CheckCircle, XCircle } from "lucide-react"

export default function Notify() {
  const [buttonText, setButtonText] = React.useState('Add Notification')
  const [success, setSuccess] = React.useState(false)

    const form = useForm<z.infer<typeof addNotificationSchema>>({
      resolver: zodResolver(addNotificationSchema),
        defaultValues: {
            notification: "",
            sender: parseInt(tokenise()[3]),
            status: 'new'
      },
    })
     
    async function onSubmit(values: z.infer<typeof addNotificationSchema>) {
      setButtonText('Processing Notification... ')

        const data = await addNewNotification(values)
        if(data?.error){
          form.setError("root", {
            "message": "Notification not added"
          })
        } else {
          setButtonText('Successful')
          setSuccess(true)
          window.location.reload()
        }
    }

  return (
    <div className="mt-2 sm:flex bg-background justify-between rounded-lg">
      <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="p-6 sm:p-8">
      <div className="text-2xl font-bold tracking-tight">Add a Notification</div>
      <div className="text-sm mb-6 text-muted-foreground">This goes out to all users for now.</div>
          <div className="">
              <FormField
                  control={form.control}
                  name="notification"
                  render={({ field }) => (
                      <FormItem>
                      <FormLabel>Tell users what you have to!</FormLabel>
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
        <Button id="submit" className="my-4" type="submit">{buttonText}</Button>
        {form.formState.errors.root && (
          <div className="bg-red-400/10 text-primary text-sm p-2 text-center rounded-md"><XCircle/> {form.formState.errors.root.message}</div>
        )}
        {success && (
          <div className=" bg-green-400/10 text-green-600 text-sm p-2 text-center rounded-md"><CheckCircle/> Notification added successfully </div>
        )}
      </form>
      </Form>
      <div className="w-[350]px p-6 sm:block hidden">
      <Link href='/admin/dashboard/notifications/view'><Button> View Notifications</Button></Link>
      </div>

        </div>
  )
}