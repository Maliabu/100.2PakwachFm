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
import { addMessages, addNewNotification, addOpportunity} from "@/server/fetch.actions"
import { opportunitySchema } from '@/schema/schema'
import { tokenise } from "@/services/services"
import Image from "next/image"
import Shape from '@/app/images/shape2.png'
import Link from "next/link"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export default function Opportunities() {

    const form = useForm<z.infer<typeof opportunitySchema>>({
      resolver: zodResolver(opportunitySchema),
        defaultValues: {
            email: "",
            message: '',
            purpose: 'hiring',
            phone: ''
            
      },
    })
     
    async function onSubmit(values: z.infer<typeof opportunitySchema>) {
     
      const app = document.getElementById('submit');
      const text = 'processing';
      if(app !== null){
        app.innerHTML = text;
      }

        const data = await addOpportunity(values)
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
    <div className="p-4 bg-background rounded-lg my-2">
      <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
      <div className="text-sm text-muted-foreground">Drop a message.</div>
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
              <div className="flex flex-col my-3 space-y-1.5">
              <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                      <FormItem>
                      <FormLabel>Phone (required)</FormLabel>
                      <FormControl>
                          <Input type="text" placeholder="Phone number" {...field} />
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
                          placeholder="looking for?" {...field} />
                      </FormControl>
                      <FormMessage />
                      </FormItem>
                  )}
                  />
              </div>
              <div className="flex flex-col my-3 space-y-1.5">
              <FormField
                  control={form.control}
                  name="purpose"
                  render={({ field }) => (
                      <FormItem>
                      <FormLabel>Employing or Seeking?</FormLabel>
                      <FormControl>
                      <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value='hiring' />
                    </FormControl>
                    <FormLabel className="font-normal">
                      Hiring
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value='seeking' />
                    </FormControl>
                    <FormLabel className="font-normal">
                      Seeking
                    </FormLabel>
                  </FormItem>
                </RadioGroup>
                      </FormControl>
                      <FormMessage />
                      </FormItem>
                  )}
                  />
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
        </div>
    </div>
  )
}