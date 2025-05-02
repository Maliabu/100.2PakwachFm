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
import { addArticles, uploadAds } from "@/server/fetch.actions"
import { adSchema, addArticleSchema } from '@/schema/schema'
import { tokenise } from "@/services/services"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"


export default function AddArticle() {
  const [value, setValue] = React.useState("")
  const [name, setName] = React.useState("")

  React.useEffect(() => {
    setName(tokenise()[0])
  }, [])

    const form = useForm<z.infer<typeof adSchema>>({
      resolver: zodResolver(adSchema),
        defaultValues: {
            folder: "",
            image: "",
      },
    })
    console.log(form.getValues())

    async function onSubmit(values: z.infer<typeof adSchema>) {
        let folders = 'columnAd'
        values.folder=='menuAd'?folders='menuAd':folders='columnAd'
        //create obj
        const app = document.getElementById('submit');
        const text = 'processing';
        if(app !== null){
          app.innerHTML = text;
        }
        const file = values.image1

        const formData = new FormData()
        formData.append("file", file)
        formData.append('folder', folders)

        const data = await uploadAds(formData)
        if(data.image == ''){
          form.setError("root", {
            "message": "Ad not uploaded"
          })
        } else {
          if(app !== null){
            app.innerHTML = "Successful";
          }
          window.location.reload()
          // useRouter().refresh()
        }
    }

    function formBuild(){
    }

  return (
    <div className="">
      {/* <ReusableDrawer page="Article" form={formBuild()}/> */}

      <div className="admin p-16">
      <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="text-2xl font-bold tracking-tight my-4">Upload Ads to Website</div>
              <div className="flex flex-col space-y-2 my-3">
              <FormField
                  control={form.control}
                  name="folder"
                  render={({ field }) => (
                      <FormItem>
                      <FormLabel>Select where ad will appear</FormLabel>
                      <FormControl>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <SelectTrigger id="articleType">
                              <SelectValue placeholder="Menu or column, wide or long"/>
                              </SelectTrigger>
                              <SelectContent position="popper" className=" font-[family-name:var(--font-futura)]">
                              <SelectItem value="menuAd">Menu Ad - appears on the menu bar - horizontal/wide</SelectItem>
                              <SelectItem value="columnAd">Column Ad - appears on the news page, last column - vertical/long</SelectItem>
                              </SelectContent>
                          </Select>
                      </FormControl>
                      <FormMessage />
                      </FormItem>
                  )}
                  />
              </div>
              <div className="flex flex-col mt-3 space-y-2">
              <FormField
                  control={form.control}
                  name="image1"
                  render={({ field: { value, onChange, ...fieldProps } }) => (
                      <FormItem>
                      <FormLabel>Image - displayed before the story *</FormLabel>
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
        <Button id="submit" className="my-4 text-white" type="submit">Upload Ad</Button>
        {form.formState.errors.root && (
          <div className="text-primary text-sm border-2 border-primary p-2 rounded-md">{form.formState.errors.root.message}</div>
        )}
        {form.formState.isSubmitSuccessful && (
          <div className="text-primary text-sm p-2 border-2 border-primary text-center rounded-md"> Ad uploaded successfully </div>
        )}
      </form>
      </Form>
        </div>
    </div>
  )
}