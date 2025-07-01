/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import { Button } from "@/components/ui/button";
import { date, fetcher, tokenise } from "@/services/services";
import { CheckCircle, Loader2, X, XCircle } from "lucide-react";
import useSWR from "swr";
import { ReusableDialog } from "../../reusableDialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { messageReplySchema, replySchema } from "@/schema/schema";
import { notExists } from "drizzle-orm";
import { messageReply, sendHtmlEmail } from "@/server/fetch.actions";
import { useEffect, useState } from "react";
import { Messagecard } from "./messageCard";

export type Message = {
    id: number;
    message: string;
    createdAt: Date;
    updatedAt: Date;
    status: string;
    email: string;
}

export default function Messages(){
    let notify: Message[] = []
    const { data, error } = useSWR("/api/messages", fetcher);
    if(data){
        notify = data
    }
    if (!data) return <div className="flex p-6 bg-background rounded-md justify-center items-center mt-2"><Loader2 className="animate-spin"/></div>;

    return (
        <div className="sm:p-6 p-4 bg-background rounded-lg mt-2">
            <div className="flex justify-between items-center">
            <div className="text-2xl font-bold tracking-tight">Web Messages</div>
            <div className="h-10 w-10 bg-primary text-md text-muted font-bold rounded-full flex justify-center items-center ">{notify.length}</div>
            </div>
            <div className="bg-secondary rounded-lg sm:p-6 p-4 sm:w-3/4 mt-6 admin">
            
            { notify.length>0?
                        notify.map((notes, index) => (
                            <div key={index} className="mb-1">
                                <Messagecard {...notes}/>
                            </div>
                        )):<div>No notifications</div>
                    }
            </div>
        </div>
    )
}