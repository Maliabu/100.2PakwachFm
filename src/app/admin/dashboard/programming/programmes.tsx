/* eslint-disable @typescript-eslint/no-unused-vars */
import useSWR from "swr";
import { ArticleType, Programming } from "../types";
import { fetcher } from "@/services/services";
import { ProgramCard } from "./programCard";
import React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function Programmes(){
  const [filter, setFilter] = React.useState<'all' | 'weekday' | 'weekend'>('all')

    let programming: Programming[] = []
  const { data: programmes, error: programmeError } = useSWR("/api/programming", fetcher);
  if(programmes){
      programming = programmes
  }

  const filteredProgrammes = programming.filter((prog) => {
    const isWeekday = String(prog.weekday).toLowerCase() === 'true'
  
    if (filter === 'all') return true;
    if (filter === 'weekday') return isWeekday;
    if (filter === 'weekend') return !isWeekday;
    return true;
  })
   
  
  console.log(filter, filteredProgrammes)

    return(
        <div className="admin">
        <div className="flex items-center p-2 bg-background gap-2 rounded mt-2">
        <div className=" text-sm">Filter Your Programmes: </div>
        <Select onValueChange={(value) => setFilter(value as typeof filter)} defaultValue="all">
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Filter programmes" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="weekday">Weekday</SelectItem>
            <SelectItem value="weekend">Weekend</SelectItem>
          </SelectContent>
        </Select>
        <div className="uppercase text-sm p-2 h-8 w-8 border border-black dark:border-white rounded-full flex items-center justify-center">{filteredProgrammes.length}</div>
        </div>
          <div>
            {
                    filteredProgrammes.length > 0 ? (
                      <div className="sm:grid sm:grid-cols-12 gap-2">
                        {filteredProgrammes.map(program => (
                          <div key={program.id} className="sm:col-span-3">
                          <ProgramCard {...program}/>
                          </div>
                        ))}
                      </div>
                    ) : null
                  }
          </div>
        </div>
    )
}