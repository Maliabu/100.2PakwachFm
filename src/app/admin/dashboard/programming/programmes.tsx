/* eslint-disable @typescript-eslint/no-unused-vars */
import useSWR from "swr";
import { ArticleType, Programming } from "../types";
import { fetcher } from "@/services/services";
import { ProgramCard } from "./programCard";

export default function Programmes(){
    let programming: Programming[] = []
  const { data: programmes, error: programmeError } = useSWR("/api/programming", fetcher);
  if(programmes){
      programming = programmes
  }
  console.log(programming)
    return(
        <div className="admin rounded">
            {
                    programming.length > 0 ? (
                      <div className="sm:grid sm:grid-cols-12 gap-2">
                        {programming.map(program => (
                          <div key={program.id} className="sm:col-span-3">
                          <ProgramCard {...program}/>
                          </div>
                        ))}
                      </div>
                    ) : null
                  }
        </div>
    )
}