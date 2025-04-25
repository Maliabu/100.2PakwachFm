/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import { Button } from "@/components/ui/button"
import { deleteArticleSchema, deleteEventSchema, deleteProgrammingSchema, deleteSchema } from "@/schema/schema"
import { deleteArticle, deleteCourse, deleteEvent, deleteProgramming } from "@/server/fetch.actions"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"


  export default function DeletePage(props: {id: number, submitId: string}){
    const form = useForm<z.infer<typeof deleteProgrammingSchema>>({
      resolver: zodResolver(deleteProgrammingSchema),
        defaultValues: {
          programId: props.id
      },
    })
    async function onSubmit(values: z.infer<typeof deleteProgrammingSchema>) {
      const app = document.getElementById(props.submitId);
      const text = 'Deleting';
      if(app !== null){
        app.innerHTML = text;
      }
      const data = await deleteProgramming(values)
      if(data?.error){
        form.setError("root", {
          "message": "Programme not deleted"
        })
      } else {
        if(app !== null){
          app.innerHTML = "Deleted";
        }
        window.location.reload()
      }
    }
    return (
      <div className="mt-2">
        <Button className="text-white ml-1" id={props.submitId} onClick={() => onSubmit({"programId": props.id})}>Delete</Button>
        {form.formState.errors.root && (
          <div className="bg-light p-2 rounded-md">{form.formState.errors.root.message}</div>
        )}
        {form.formState.isSubmitSuccessful && (
          <div className="bg-light p-2 text-center rounded-md"> Programme deleted </div>
        )}
        </div>
    )
  }