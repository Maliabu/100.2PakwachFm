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
import { CheckCircle, XCircle } from "lucide-react"

export default function Ticket() {
  const [buttonText, setButtonText] = React.useState("Add Presenter")
  const [success, setSuccess] = React.useState(false)
  

    const form = useForm<z.infer<typeof openTicket>>({
      resolver: zodResolver(openTicket),
        defaultValues: {
            issue: "",
            opened: parseInt(tokenise()[3]),
            status: 'open',
            userId: ''
      },
    })
     
    async function onSubmit(values: z.infer<typeof openTicket>) {
      values.userId = tokenise()[3]
      
      setButtonText('Processing Ticket...')

        const data = await openNewTicket(values)
        if(data?.error){
          form.setError("root", {
            "message": "Ticket not opened"
          })
        } else {
          setButtonText('Successful')
          setSuccess(true)
          window.location.reload()
        }
    }

  return (
    <div>
    <div className="my-2 sm:flex bg-background rounded">
      <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="p-6 sm:p-8">
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
          <Button className="my-4 text-white" type="submit">{buttonText}</Button>
        {form.formState.errors.root && (
                <div className="rounded text-sm font-bold bg-red-400/10 flex justify-center gap-4 text-red-600 p-2"><XCircle/> {form.formState.errors.root.message}</div>
            )}
            {success && (
            <div className="rounded text-sm font-bold bg-green-400/10 flex justify-center gap-4 text-green-600 p-2">
                <CheckCircle className="animate-pulse"/> Ticket opened successfully
            </div>
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