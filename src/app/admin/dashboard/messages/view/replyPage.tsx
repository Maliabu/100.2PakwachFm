/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import { Button } from "@/components/ui/button"
import { addProgrammingSchema, deleteArticleSchema, deleteEventSchema, deleteProgrammingSchema, deleteSchema, editProgrammingSchema, messageReplySchema } from "@/schema/schema"
import { deleteArticle, deleteCourse, deleteEvent, deleteProgramming, editProgramming, messageReply } from "@/server/fetch.actions"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { fetcher, tokenise } from "@/services/services"
import useSWR from "swr"
import Image from "next/image"
import { useEffect, useState } from "react"
import { Message } from "./page"
import { CheckCircle, XCircle } from "lucide-react"
import { ReusableDialog } from "../../reusableDialog"


  export default function ReplyPage(props: {id: number, submitId: string}){
    const [buttonText, setButtonText] = useState('Send reply')
    const [userType, setUserType] = useState('')
    const form = useForm<z.infer<typeof messageReplySchema>>({
        resolver: zodResolver(messageReplySchema),
        defaultValues: {
            reply: '',
            email: '',
            id: 0,
            userId: ''
        }
    })
    useEffect(() => {
        setUserType(tokenise()[4])
    }, [userType])
    const messageId = props.id
    const { data, error } = useSWR(`/api/messages/${messageId}`, fetcher);
    if(!data){
        return <div className="text-xs">Loading message...</div>
    }
    let messaging = {
        id: 0,
        email: "",
        reply: "",
        message: ''
    }
    if(data){
        messaging = data
    }
      async function onSubmit(values: z.infer<typeof messageReplySchema>) {
        values.userId = tokenise()[3]
        if (values.email === '') values.email = messaging.email;
        if (values.id === 0) values.id = messaging.id;
    
        form.clearErrors() // Clear any previous errors
        setButtonText('Sending response email...')
        console.log(values)
        
        try {
            const sendReply = await messageReply(
                values.email,
                'Pakwach Fm Messaging',
                values.reply,
                values.id,
                values.userId
            )
            if (sendReply.success === true) {
                setButtonText('Sent Successfully')
                // Optionally clear root error again
                form.clearErrors("root")
                window.location.reload()
            } else {
                setButtonText('Failed')
                form.setError("root", {
                    message: `${sendReply.error || "Something went wrong"}`
                })
            }
        } catch (err) {
            setButtonText('Error')
            form.setError("root", {
                message: 'Unexpected error. Please try again.'
            })
        }
    }
    
    function formBuild(){
        return(
            <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="p-6 sm:p-8">
      <div className="text-2xl font-bold tracking-tight">Reply to {messaging.email}</div>
      <div className="text-sm mb-6 text-muted-foreground">This sends an email in response to the message: {messaging.message}</div>
          <div className=" gap-2">
              <div className=" space-y-1.5">
              <FormField
                  control={form.control}
                  name="reply"
                  render={({ field }) => (
                      <FormItem>
                      <FormLabel>Response</FormLabel>
                      <FormControl>
                          <Input 
                          type="text" 
                          placeholder="reply to the message" {...field} />
                      </FormControl>
                      <FormMessage />
                      </FormItem>
                  )}
                  />
              </div>
          </div>
        <Button id="submit" className="my-4" type="submit">{buttonText}</Button>
        {form.formState.errors.root && (
          <div className="bg-red-400/10 rounded text-primary font-bold text-sm p-2 flex gap-4 justify-center"><XCircle/> {form.formState.errors.root.message}</div>
        )}
        {form.formState.isSubmitSuccessful && (
          <div className="rounded text-sm font-bold bg-green-400/10 flex justify-center gap-4 text-green-600 p-2"><CheckCircle/> Reply Email sent </div>
        )}
      </form>
      </Form>
        )
    }
    return (
        <div className="mx-1">
            {data.status == "new" && (userType === "admin" || userType === 'community') && <ReusableDialog page="Reply" form={formBuild()}/>}
            </div>
    )
  }