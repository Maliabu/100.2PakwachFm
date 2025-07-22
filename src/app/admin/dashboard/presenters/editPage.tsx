/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import { Button } from "@/components/ui/button"
import { addProgrammingSchema, deleteArticleSchema, deleteEventSchema, deleteProgrammingSchema, deleteSchema, editPresenterSchema, editProgrammingSchema } from "@/schema/schema"
import { deleteArticle, deleteCourse, deleteEvent, deleteProgramming, editPresenter, editProgramming } from "@/server/fetch.actions"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { fetcher, tokenise } from "@/services/services"
import { ReusableDialog } from "../reusableDialog"
import { Presenter, Programming } from "../types"
import useSWR from "swr"
import Image from "next/image"
import { useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"


  export default function EditPage(props: {id: number, submitId: string}){
    const [buttonText, setButtonText] = useState('Edit Presenters')
    const presenterId = props.id
    const { data, error } = useSWR(`/api/presenters/${presenterId}`, fetcher);
    let presenter = {
        id: 0,
        programme: "",
        name: "",
        radioName: '',
        profilePicture: "",
        image: ""
    }
    if(data){
        presenter = data
    }
    const programId = presenter.programme
    const { data:programming, error:programmingError } = useSWR<Programming>(`/api/programming/${programId}`, fetcher);
    const { data:programmings, error:programmingsError } = useSWR<Programming[]>('/api/programming', fetcher);
 
    const form = useForm<z.infer<typeof editPresenterSchema>>({
        resolver: zodResolver(editPresenterSchema),
          defaultValues: {
            programmeName: '',
            programme: data?.programme,
            name: data?.name,
            radioName: data?.radioName,
            userId: '',
            profilePicture: data?.profilePicture
        },
      })
      async function onSubmit(values: z.infer<typeof editPresenterSchema>) {
        values.userId = tokenise()[3]
        if (values.profilePicture === '') values.profilePicture = data?.profilePicture;
        if (values.radioName === '') values.radioName = data?.radioName;
        if (values.name === '') values.name = data?.name;
        if (values.programme === 0) values.programme = data?.programme;
          //create obj
        setButtonText('Updating...')
        const file = values.profilePicture1
  
        let formData: FormData | null = null;

        if (file instanceof File) {
            formData = new FormData();
            formData.append("file", file);
            formData.append("folder", "presenters");
        }
  
          const data1 = await editPresenter(values, formData, props.id)
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
                <div className="text-2xl font-bold tracking-tight">{presenter.radioName}</div>
                <div className=" text-sm uppercase">{presenter.name}</div>
                </div>
                <div style={{ position: 'relative', width: '150px', height: '150px' }}>
                      <Image
                          src={presenter.profilePicture}
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
                  name="profilePicture1"
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
                    name="programmeName"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Programme</FormLabel>
                        <FormControl>
                        <Select onValueChange={field.onChange} defaultValue={programming?.programme}>
                              <SelectTrigger id="programmeName">
                              <SelectValue placeholder="Programme"/>
                              </SelectTrigger>
                              <SelectContent position="popper">
                                {programmings?.map((programme, index) => (
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
                <div className="flex gap-2 my-3">
                <FormField
                    control={form.control}
                    name="radioName"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Stage Name</FormLabel>
                        <FormControl>
                            <Input type="text" placeholder={presenter.radioName} {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Full Names</FormLabel>
                            <FormControl>
                                <Input type="text" placeholder={presenter.name} {...field} />
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
            <div className="border-2 border-primary text-sm text-primary p-2 text-center rounded-md"> Presenter Data updated successfully </div>
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