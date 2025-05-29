/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import * as React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"
import z from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { addEvents } from "@/server/fetch.actions"
import { addEventSchema } from '@/schema/schema'
import { DatePicker } from "../datePicker"
import { tokenise } from "@/services/services"

export default function AddEvents() {

    const form = useForm<z.infer<typeof addEventSchema>>({
      resolver: zodResolver(addEventSchema),
        defaultValues: {
          title: "",
          description: "",
          link: "",
          image: "",
          startDate: new Date(),
          endDate: new Date(),
          userId: tokenise()[3],
      },
    })

    async function onSubmit(values: z.infer<typeof addEventSchema>) {
        values.userId = tokenise()[3]

        //create obj
        const app = document.getElementById('submit');
        const text = 'processing';
        if(app !== null){
          app.innerHTML = text;
        }
        const file = values.image1

        const formData = new FormData()
        formData.append("file", file)
        formData.append('folder', 'events')

        const data = await addEvents(values, formData)
        if(data?.error){
          form.setError("root", {
            "message": "event not added"
          })
        } else {
          if(app !== null){
            app.innerHTML = "Successful";
          }
          window.location.reload()
        }
    }
  return (
    <div className="p-4 sm:p-8 pb-0 rounded bg-secondary">
    <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="text-2xl font-bold tracking-tight">Add an Event</div>
      <div className="grid grid-cols-2 w-full items-center gap-4 bg-background rounded-lg p-4 sm:p-8 mt-4">
        <div>
            <div className="flex flex-col space-y-1.5">
            <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                        <Input 
                        type="text" 
                        placeholder="Title" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
            </div>
            <div className="flex flex-col mt-6 space-y-1.5">
            <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                        <Input type="text" placeholder="Description" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
            </div>
            <div className="flex flex-col mt-6 space-y-1.5">
            <FormField
                control={form.control}
                name="link"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Link</FormLabel>
                    <FormControl>
                        <Input type="text" placeholder="Link" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
            </div>
        </div>
        <div>
            <div className="flex flex-col space-y-1.5">
            <p className="text-sm">Start Date</p>
            <FormField
                control={form.control}
                name="startDate"
                render={({ field }) => (
                    <FormItem>
                    <FormControl
                    >
                        <DatePicker field={field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
            </div>
            <div className="flex flex-col space-y-1.5 mt-6">
            <p className="text-sm">End Date</p>
            <FormField
                control={form.control}
                name="endDate"
                render={({ field }) => (
                    <FormItem>
                    <FormControl
                    >
                        <DatePicker field={field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
            </div>
            <div className="flex flex-col mt-6 space-y-1.5">
            <FormField
                control={form.control}
                name="image1"
                render={({ field: { value, onChange, ...fieldProps } }) => (
                    <FormItem>
                    <FormLabel>Image</FormLabel>
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
            </div>
        </div>
      </div>
      <Button id="submit" className="my-4 text-white" type="submit">Add Event</Button>
      {form.formState.errors.root && (
        <div className="border-1 border-destructive text-destructive p-2 rounded-md">{form.formState.errors.root.message}</div>
      )}
      {form.formState.isSubmitSuccessful && (
        <div className="border-1 border-primary text-primary p-2 text-center rounded-md"> Event added successfully </div>
      )}
    </form>
    </Form>
      </div>
  )
}