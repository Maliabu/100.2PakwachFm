"use client"

import { Button } from "@/components/ui/button"
import { deleteEventSchema } from "@/schema/schema"
import { deleteEvent } from "@/server/fetch.actions"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"


  export default function DeletePage(props: {id: number, submitId: string}){
    const form = useForm<z.infer<typeof deleteEventSchema>>({
      resolver: zodResolver(deleteEventSchema),
        defaultValues: {
          eventId: props.id
      },
    })
    async function onSubmit(values: z.infer<typeof deleteEventSchema>) {
      const app = document.getElementById(props.submitId);
      const text = 'Deleting';
      if(app !== null){
        app.innerHTML = text;
      }
      const data = await deleteEvent(values)
      if(data?.error){
        form.setError("root", {
          "message": "Event not deleted"
        })
      } else {
        if(app !== null){
          app.innerHTML = "Deleted";
        }
        window.location.reload()
      }
    }
    return (
      <div>
        <Button className="text-white ml-1" id={props.submitId} onClick={() => onSubmit({"eventId": props.id})}>Delete</Button>
        {form.formState.errors.root && (
          <div className="bg-light p-2 rounded-md">{form.formState.errors.root.message}</div>
        )}
        {form.formState.isSubmitSuccessful && (
          <div className="bg-light p-2 text-center rounded-md"> Event deleted </div>
        )}
        </div>
    )
  }