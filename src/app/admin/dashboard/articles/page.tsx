/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import * as React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"
import z, { any, date } from 'zod'
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
import { DatePicker } from "../datePicker"
import { DatePick } from "../datePick"


export default function AddArticle() {
  const [value, setValue] = React.useState("")
  const [name, setName] = React.useState("")
  const [id, setId] = React.useState("")

  React.useEffect(() => {
    setName(tokenise()[0])
    setId(tokenise()[3])
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
          date: new Date(),
          userId: id
      },
    })

    async function onSubmit(values: z.infer<typeof addArticleSchema>) {
      values.userId = id
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
    }

  return (
    <div className="p-2">
      {/* <ReusableDrawer page="Article" form={formBuild()}/> */}

      <div className="sm:admin sm:p-12 bg-secondary rounded-lg">
      <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="text-2xl font-bold tracking-tight my-4">Add Story/Article</div>
        <div className="sm:grid sm:grid-cols-3 sm:w-full gap-2 bg-background p-6 rounded-lg">
          <div className="sm:col-span-1">
              <div className="sm:flex sm:flex-col space-y-2">
              <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                      <FormItem>
                      <FormLabel>Title - heading of article *</FormLabel>
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
              <div className="text-xs my-2 text-muted-foreground">These social media links below will follow every article if the story happens to be on social media as well (optional)</div>
              <div className="flex flex-col mt-4 space-y-2">
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
              <div className="flex flex-col mt-4 space-y-2">
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
              <div className="flex flex-col mt-4 space-y-2">
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
              <div className="flex flex-col mt-4 space-y-2">
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
              <div className="flex flex-col space-y-2 mt-4">
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
                              <SelectItem value="political">Political</SelectItem>
                              </SelectContent>
                          </Select>
                      </FormControl>
                      <FormMessage />
                      </FormItem>
                  )}
                  />
              </div>
              <div className="flex flex-col space-y-1.5 mt-4">
              <p className="text-sm">Date of the Article</p>
              <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                      <FormItem>
                      <FormControl
                      >
                          <DatePick field={field} />
                      </FormControl>
                      <FormMessage />
                      </FormItem>
                  )}
                  />
              </div>
          </div>
          <div className="sm:col-span-2">
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
        </div>
    </div>
  )
}