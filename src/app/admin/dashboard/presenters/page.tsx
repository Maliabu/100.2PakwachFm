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
import { addPresenter } from "@/server/fetch.actions"
import { addPresenterSchema } from '@/schema/schema'
import { fetcher, tokenise } from "@/services/services"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import useSWR from "swr"
import { ReusableDialog } from "../reusableDialog"
import { CheckCircle, Info, XCircle } from "lucide-react"
import { Programming } from "../types"
import Presenters from "./presenters"

export default function AddPresenter() {
  const [buttonText, setButtonText] = React.useState("Add Presenter")
  const [success, setSuccess] = React.useState(false)
  
    const form = useForm<z.infer<typeof addPresenterSchema>>({
      resolver: zodResolver(addPresenterSchema),
        defaultValues: {
          programmeName: "",
          name: "",
          radioName: "",
          userId: '',
          profilePicture: '',
          programme: 0,
      },
    })

    const {data, error} = useSWR<Programming[]>('/api/programming', fetcher)
    if(!data){
      return <div className="text-xs">Fetching Programming...</div>
    }

    async function onSubmit(values: z.infer<typeof addPresenterSchema>) {
      values.userId = tokenise()[3]
        //create obj
        setButtonText('Adding Presenter...')
        const file = values.profilePicture1
        // to burst vercel caching
        const timestamp = Date.now()
        if(file.size > 10 * 1024 * 1024){
          form.setError("root", {
            "message": 'Your image is too big'
          })
        } else{

        const formData = new FormData()
        formData.append("file", file, file.name + '-' + timestamp)
        formData.append('folder', 'presenters')

        const data = await addPresenter(values, formData)
        if(data?.error){
          form.setError("root", {
            "message": "Presenter not added"
          })
        } else {
          setButtonText('successful')
          setSuccess(true)
          window.location.reload()
        }
      }
    }

    function formBuild(){
      return(
      <div className=" p-4">
      <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} id="add-presenter-form">
        <div>
          <div className="flex flex-col space-y-1.5">
            <FormField
                control={form.control}
                name="profilePicture1"
                render={({ field: { value, onChange, ...fieldProps } }) => (
                    <FormItem>
                    <FormLabel>profile Picture</FormLabel>
                    <FormControl
                    >
                        <Input type="file" {...fieldProps} onChange={(event) =>
{                  
  const file = event.target.files?.[0]
  if(file && file.size > 10 * 1024 * 1024){
    form.setError('profilePicture1',{
      "message":"Image is too big"
    });
  } else{
    form.clearErrors('profilePicture1')
  }
  onChange(event.target.files && event.target.files[0])
}                }/>
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <div className="text-xs p-2 mt-1 bg-secondary rounded-md flex items-center"><Info className="mx-4"/> Image size should not exceed 10mb</div>
            </div>
              <div className="flex flex-col mt-2 space-y-1.5">
              <FormField
                  control={form.control}
                  name="programmeName"
                  render={({ field }) => (
                      <FormItem>
                      <FormLabel>Select a Programme</FormLabel>
                      <FormControl>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <SelectTrigger id="programmeName">
                              <SelectValue placeholder="Programme"/>
                              </SelectTrigger>
                              <SelectContent position="popper">
                                {data?.map((programme, index) => (
                              <SelectItem key={index} value={programme.programme}>{programme.programme}</SelectItem>
                                ))}
                              </SelectContent>
                          </Select>
                      </FormControl>
                      <FormMessage />
                      </FormItem>
                  )}
                  />
              </div>
              <div className="flex flex-col my-2 space-y-1.5">
              <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                      <FormItem>
                      <FormLabel>Presenter&apos;s Full Names</FormLabel>
                      <FormControl>
                          <Input type="text" placeholder="First Name Last Name" {...field} />
                      </FormControl>
                      <FormMessage />
                      </FormItem>
                  )}
                  />
              </div>
              <div className="flex flex-col my-2 space-y-1.5">
              <FormField
                  control={form.control}
                  name="radioName"
                  render={({ field }) => (
                      <FormItem>
                      <FormLabel>Stage Name</FormLabel>
                      <FormControl>
                          <Input type="text" placeholder="Stage/Studio/Radio Alias Name" {...field} />
                      </FormControl>
                      <FormMessage />
                      </FormItem>
                  )}
                  />
          </div></div>
        <Button className="my-4 text-white" type="submit">{buttonText}</Button>
        {form.formState.errors.root && (
                <div className="rounded text-sm font-bold bg-red-400/10 flex justify-center gap-4 text-red-600 p-2"><XCircle/> {form.formState.errors.root.message}</div>
            )}
            {success && (
            <div className="rounded text-sm font-bold bg-green-400/10 flex justify-center gap-4 text-green-600 p-2">
                <CheckCircle className="animate-pulse"/> Presenter added successfully
            </div>
            )}
      </form>
      </Form>
        </div>)
    }

  return (
    <div className="mt-2">
      <ReusableDialog page="Add Presenter" form={formBuild()}/>
      <div>
        <Presenters/>
      </div>
    </div>
  )
}