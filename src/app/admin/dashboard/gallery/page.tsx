/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import * as React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"
import z, { any } from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { uploadAds } from "@/server/fetch.actions"
import {gallerySchema } from '@/schema/schema'
import { tokenise } from "@/services/services"
import { CheckCircle, XCircle } from "lucide-react"


export default function AddImage() {
  const [buttonText, setButtonText] = React.useState("Upload Image")
  const [success, setSuccess] = React.useState(false)
  
    const form = useForm<z.infer<typeof gallerySchema>>({
      resolver: zodResolver(gallerySchema),
        defaultValues: {
            image: "",
      },
    })

    async function onSubmit(values: z.infer<typeof gallerySchema>) {
        const folders = 'gallery'
        //create obj
        setButtonText('Uploading...')
        const file = values.image1

        const formData = new FormData()
        formData.append("file", file)
        formData.append('folder', folders)

        const data = await uploadAds(formData)
        if(data.image == ''){
          form.setError("root", {
            "message": "Image not uploaded"
          })
        } else {
          setButtonText('Successful')
          setSuccess(true)
          window.location.reload()
          // useRouter().refresh()
        }
    }

    function formBuild(){
    }

  return (
    <div className="">
      {/* <ReusableDrawer page="Article" form={formBuild()}/> */}

      <div className="p-8 bg-background rounded-md mt-2">
      <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="text-2xl font-bold tracking-tight my-4">Upload Images to Gallery</div>
              <div className="flex flex-col mt-3 space-y-2">
              <FormField
                  control={form.control}
                  name="image1"
                  render={({ field: { value, onChange, ...fieldProps } }) => (
                      <FormItem>
                      <FormLabel>Gallery Image *</FormLabel>
                      <div className="text-xs font-medium">Preferrably 900x400 size images for menu ads and 500x600 for column ads</div>
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
        <Button id="submit" className="my-4 text-white" type="submit">{buttonText}</Button>
        {form.formState.errors.root && (
          <div className="bg-red-400/10 text-primary text-sm p-2 text-center rounded-md"><XCircle/> {form.formState.errors.root.message}</div>
        )}
        {success && (
          <div className=" bg-green-400/10 text-green-600 text-sm p-2 text-center rounded-md"><CheckCircle/> Image added successfully </div>
        )}
      </form>
      </Form>
        </div>
    </div>
  )
}