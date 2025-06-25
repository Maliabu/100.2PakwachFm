/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import { Button } from "@/components/ui/button"
import { addProgrammingSchema, deleteArticleSchema, deleteEventSchema, deleteProgrammingSchema, deleteSchema, editProgrammingSchema } from "@/schema/schema"
import { deleteArticle, deleteCourse, deleteEvent, deleteProgramming, editProgramming } from "@/server/fetch.actions"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { fetcher, tokenise } from "@/services/services"
import { ReusableDialog } from "../reusableDialog"
import { Programming } from "../types"
import useSWR from "swr"
import Image from "next/image"
import { useState } from "react"


  export default function EditPage(props: {id: number, submitId: string}){
    const [buttonText, setButtonText] = useState('Edit Programming')
    const programmeId = props.id
    const { data, error } = useSWR(`/api/programming/${programmeId}`, fetcher);
    let programming = {
        id: 0,
        programme: "",
        startTime: "",
        endTime: '',
        weekday: "",
        image: ""
    }
    if(data){
        programming = data
    }
    const form = useForm<z.infer<typeof editProgrammingSchema>>({
        resolver: zodResolver(editProgrammingSchema),
          defaultValues: {
            programme: programming.programme,
            startTime: programming.startTime,
            endTime: programming.endTime,
            weekday: '',
            userId: '',
            image: programming.image
        },
      })
      async function onSubmit(values: z.infer<typeof editProgrammingSchema>) {
        values.userId = tokenise()[3]
        if (values.image === '') values.image = programming.image;
        if (values.weekday === '') values.weekday = programming.weekday;
        if (values.programme === '') values.programme = programming.programme;
        if (values.startTime === '') values.startTime = programming.startTime;
        if (values.endTime === '') values.endTime = programming.endTime;
          //create obj
        setButtonText('Updating...')
        const file = values.image1
  
        let formData: FormData | null = null;

        if (file instanceof File) {
            formData = new FormData();
            formData.append("file", file);
            formData.append("folder", "programming");
        }
  
          const data = await editProgramming(values, formData, props.id)
          if(data?.error){
            setButtonText('Edit Programming')
            form.setError("root", {
              "message": "Programming not updated"
            })
          } else {
            setButtonText('Successful')
            window.location.reload()
          }
      }
    function formBuild(){
        return(
        <div className=" p-4">
            <div className="flex justify-between p-4 mb-4 rounded-lg bg-secondary">
                <div className="flex flex-col justify-between">
                <div className="text-2xl font-bold tracking-tight">{programming.programme}</div>
                <div className=" text-sm uppercase">{programming.startTime} to {programming.endTime} | {programming.weekday=='True'?'weekday':'weekend'}</div>
                </div>
                <div style={{ position: 'relative', width: '150px', height: '150px' }}>
                      <Image
                          src={programming.image}
                          alt="Full size"
                          className="rounded-full"
                          fill
                          unoptimized
                          style={{ objectFit: 'cover' }} // or 'contain'
                      />
                      </div>
            </div>
        <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} id="edit-programming-form">
          <div>
            <div>
            <div className="flex flex-col space-y-1.5">
              <FormField
                  control={form.control}
                  name="image1"
                  render={({ field: { value, onChange, ...fieldProps } }) => (
                      <FormItem>
                      <FormLabel>New Image</FormLabel>
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
                <div className="flex flex-col mt-3 space-y-1.5">
                <FormField
                    control={form.control}
                    name="programme"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Programme Name</FormLabel>
                        <FormControl>
                            <Input 
                            type="text" 
                            placeholder={programming.programme} {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                </div>
                <div className="flex gap-2 my-3">
                <FormField
                    control={form.control}
                    name="startTime"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>From</FormLabel>
                        <FormControl>
                            <Input type="text" placeholder={programming.startTime} {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <FormField
                        control={form.control}
                        name="endTime"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>To</FormLabel>
                            <FormControl>
                                <Input type="text" placeholder={programming.endTime} {...field} />
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
          <Button id="submit" className="my-4 text-white" type="submit">{buttonText}</Button>
          {form.formState.errors.root && (
            <div className="border-2 border-primary text-sm text-center text-primary p-2 rounded-md">{form.formState.errors.root.message}</div>
          )}
          {form.formState.isSubmitSuccessful && (
            <div className="border-2 border-primary text-sm text-primary p-2 text-center rounded-md"> Programming updated successfully </div>
          )}
        </form>
        </Form>
          </div>)
      }
    return (
        <div className="mx-1">
        <ReusableDialog page="Edit" form={formBuild()}/>
      </div>
    )
  }