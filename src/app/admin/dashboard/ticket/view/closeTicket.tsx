/* eslint-disable @typescript-eslint/no-unused-vars */
import { fetcher, tokenise } from "@/services/services"
import useSWR from "swr"
import { ReusableDialog } from "../../reusableDialog"
import { useState } from "react"
import { Tickets } from "../../types"
import { Button } from "@/components/ui/button"
import { closeTickets } from "@/server/fetch.actions"

export default function CloseTicketing(props:{id: number}){
    const [buttonText, setButtonText] = useState('Close Ticket')
    const ticketId = props.id
    const {data, error} = useSWR<Tickets>(`/api/tickets/${ticketId}`, fetcher)
    if(!data){
        return <div className="text-xs">Loading ticket...</div>
    }
    async function onSubmit(){
        const userId = tokenise()[3]
        setButtonText('Closing...')
        const closed = await closeTickets(ticketId, userId)
        if(closed.success === true){
            setButtonText("Successful")
            window.location.reload()
        } else {
            setButtonText('Failed')
        }
    }
    function formBuild(){
        return <div>
            <div className="text-sm text-muted-foreground">Are you sure you want to close this ticket: {data?.issue}?</div>
            <Button className="my-4" onClick={onSubmit}>{buttonText}</Button>
        </div>
    }
    return <div>
        <ReusableDialog page="Close" form={formBuild()}/>
    </div>
}