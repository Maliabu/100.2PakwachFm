/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import * as React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"
import z, { any } from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { addprogrammings } from "@/server/fetch.actions"
import { addProgrammingSchema } from '@/schema/schema'
import { ReusableDrawer } from "../reusableDrawer"
import { fetcher, tokenise } from "@/services/services"
import Editor from "../editor/editor"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Programmes from "./programmes"
import useSWR from "swr"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ReusableDialog } from "../reusableDialog"

export default function AddProgramming() {
  const [name, setName] = React.useState("")


    const form = useForm<z.infer<typeof addProgrammingSchema>>({
      resolver: zodResolver(addProgrammingSchema),
        defaultValues: {
          programme: "",
          startTime: "",
          endTime: "",
          weekday: '',
          userId: '',
          image: ''
      },
    })

    async function onSubmit(values: z.infer<typeof addProgrammingSchema>) {
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
        formData.append('folder', 'programming')

        const data = await addprogrammings(values, formData)
        if(data?.error){
          form.setError("root", {
            "message": "Programming not added"
          })
        } else {
          if(app !== null){
            app.innerHTML = "Successful";
          }
          window.location.reload()
        }
    }

    function formBuild(){
      return(
      <div className=" p-4">
      <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} id="add-programming-form">
        <div>
          <div>
          <div className="flex flex-col space-y-1.5">
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
              <div className="flex flex-col mt-2 space-y-1.5">
              <FormField
                  control={form.control}
                  name="programme"
                  render={({ field }) => (
                      <FormItem>
                      <FormLabel>Programme Name</FormLabel>
                      <FormControl>
                          <Input 
                          type="text" 
                          placeholder="Programme Name" {...field} />
                      </FormControl>
                      <FormMessage />
                      </FormItem>
                  )}
                  />
              </div>
              <div className="flex flex-col my-2 space-y-1.5">
              <FormField
                  control={form.control}
                  name="startTime"
                  render={({ field }) => (
                      <FormItem>
                      <FormLabel>From</FormLabel>
                      <FormControl>
                          <Input type="text" placeholder="start Time - 10:00 AM format" {...field} />
                      </FormControl>
                      <FormMessage />
                      </FormItem>
                  )}
                  />
              </div>
              <div className="flex flex-col my-2 space-y-1.5">
              <FormField
                  control={form.control}
                  name="endTime"
                  render={({ field }) => (
                      <FormItem>
                      <FormLabel>To</FormLabel>
                      <FormControl>
                          <Input type="text" placeholder="Time it ends" {...field} />
                      </FormControl>
                      <FormMessage />
                      </FormItem>
                  )}
                  />
              </div>
              <div className="flex flex-col my-3 space-y-1.5">
              <FormField
                  control={form.control}
                  name="weekday"
                  render={({ field }) => (
                      <FormItem>
                      <FormLabel>Is this a weekday programme? (mon - fri)?</FormLabel>
                      <FormControl>
                      <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value='true' />
                    </FormControl>
                    <FormLabel className="font-normal">
                      Yes, Week-day Programme
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value='false' />
                    </FormControl>
                    <FormLabel className="font-normal">
                      No, week-end programme
                    </FormLabel>
                  </FormItem>
                </RadioGroup>
                      </FormControl>
                      <FormMessage />
                      </FormItem>
                  )}
                  />
              </div>
          </div></div>
        <Button id="submit" className="my-4 text-white" type="submit">Add Programming</Button>
        {form.formState.errors.root && (
          <div className="border-2 border-primary text-primary p-2 rounded-md">{form.formState.errors.root.message}</div>
        )}
        {form.formState.isSubmitSuccessful && (
          <div className="border-2 border-primary text-primary p-2 text-center rounded-md"> Programming added successfully </div>
        )}
      </form>
      </Form>
        </div>)
    }

  return (
    <div className="mt-2">
      <ReusableDialog page="Add Programming" form={formBuild()}/>
      <div>
        <Programmes/>
      </div>
    </div>
  )
}