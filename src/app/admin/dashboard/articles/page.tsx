/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import * as React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"
import z, { any } from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Textarea } from '@/components/ui/textarea'
import { addArticles } from "@/server/fetch.actions"
import { addArticleSchema } from '@/schema/schema'
import { ReusableDrawer } from "../reusableDrawer"
// import { useRouter } from "next/navigation"
import Tiptap from '../editor/tipTap'
import { tokenise } from "@/services/services"
import Editor from "../editor/editor"
import ImageGallery from "../editor/imageGallery"
import { ArticlesCard } from "./articlesCard"
import Articles from "./articles"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"


export default function AddArticle() {
  const [value, setValue] = React.useState("")
  const [name, setName] = React.useState("")

  React.useEffect(() => {
    setName(tokenise()[0])
  }, [])

    const form = useForm<z.infer<typeof addArticleSchema>>({
      resolver: zodResolver(addArticleSchema),
        defaultValues: {
          title: "",
          content: "",
          facebookLink: "",
          twitterLink: "",
          instagramLink: "",
          writer: name,
          image: "",
          date: ''
      },
    })
    console.log(form.getValues())

    async function onSubmit(values: z.infer<typeof addArticleSchema>) {
      values.content = value
      values.writer = name
        //create obj
        const app = document.getElementById('submit');
        const text = 'processing';
        if(app !== null){
          app.innerHTML = text;
        }
        const file = values.image1

        const formData = new FormData()
        formData.append("file", file)
        formData.append('folder', 'articles')

        const data = await addArticles(values, formData)
        if(data?.error){
          form.setError("root", {
            "message": "Article not added"
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
      return(
      <div className="admin pb-36">
      <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid grid-cols-3 w-full gap-4">
          <div className="col-span-1">
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
              <div className="flex flex-col my-2 space-y-1.5">
              <FormField
                  control={form.control}
                  name="facebookLink"
                  render={({ field }) => (
                      <FormItem>
                      <FormLabel>Facebook Link</FormLabel>
                      <FormControl>
                          <Input type="text" placeholder="Link" {...field} />
                      </FormControl>
                      <FormMessage />
                      </FormItem>
                  )}
                  />
              </div>
              <div className="flex flex-col my-2 space-y-1.5">
              <FormField
                  control={form.control}
                  name="twitterLink"
                  render={({ field }) => (
                      <FormItem>
                      <FormLabel>Twitter Link</FormLabel>
                      <FormControl>
                          <Input type="text" placeholder="Link" {...field} />
                      </FormControl>
                      <FormMessage />
                      </FormItem>
                  )}
                  />
              </div>
              <div className="flex flex-col my-2 space-y-1.5">
              <FormField
                  control={form.control}
                  name="instagramLink"
                  render={({ field }) => (
                      <FormItem>
                      <FormLabel>Instagram Link</FormLabel>
                      <FormControl>
                          <Input type="text" placeholder="Link" {...field} />
                      </FormControl>
                      <FormMessage />
                      </FormItem>
                  )}
                  />
              </div>
              <div className="flex flex-col mt-2 space-y-1.5">
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
              <div className="flex flex-col space-y-1.5 my-2">
              <FormField
                  control={form.control}
                  name="articleType"
                  render={({ field }) => (
                      <FormItem>
                      <FormLabel>Article Type</FormLabel>
                      <FormControl>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <SelectTrigger id="articleType">
                              <SelectValue placeholder="Headline"/>
                              </SelectTrigger>
                              <SelectContent position="popper" className=" font-[family-name:var(--font-futura)]">
                              <SelectItem value="headline">Headline</SelectItem>
                              <SelectItem value="highlight">Highlight</SelectItem>
                              <SelectItem value="business">Business</SelectItem>
                              <SelectItem value="sports">Sports</SelectItem>
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
                  name="date"
                  render={({ field }) => (
                      <FormItem>
                      <FormLabel>Date of Article (displayed on the artcle)</FormLabel>
                      <FormControl>
                          <Input type="text" placeholder="WEDNESDAY 23 APRIL 2025 - format" {...field} />
                      </FormControl>
                      <FormMessage />
                      </FormItem>
                  )}
                  />
              </div>
          </div>
          <div className="col-span-2">
              <div className="flex flex-col mt-2 space-y-1.5">
              <FormField
                  control={form.control}
                  name="content"
                  render={({ field: { value, onChange, ...fieldProps }  }) => (
                      <FormItem>
                      <FormLabel>Content</FormLabel>
                      <FormControl>
                      <Editor
                      content={value}
                      onChange={setValue}
                      placeholder="Write your article here..."
                       />
                      {/* <Textarea
                  placeholder="Write your article, editing will happen automatically at submission..."
                  {...field}
                /> */}
                      </FormControl>
                      <FormMessage />
                      </FormItem>
                  )}
                  />
                  <p className="text-sm">Your username will be attached to this article as <a>{name}</a></p>
              </div></div>
        </div>
        <Button id="submit" className="my-4 text-white" type="submit">Add Article</Button>
        {form.formState.errors.root && (
          <div className="bg-light p-2 rounded-md">{form.formState.errors.root.message}</div>
        )}
        {form.formState.isSubmitSuccessful && (
          <div className="bg-light p-2 text-center rounded-md"> Article added successfully </div>
        )}
      </form>
      </Form>
        </div>)
    }

  return (
    <div className="">
      <ReusableDrawer page="Article" form={formBuild()}/>
      <div>
        <Articles/>
      </div>
    </div>
  )
}