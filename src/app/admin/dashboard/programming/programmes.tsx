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
    return(
        <div>
            {
                    programming.length > 0 ? (
                      <div className="flex flex-col admin p-6">
                        {programming.map(program => (
                          <ProgramCard key={program.id} {...program}/>
                        ))}
                      </div>
                    ) : null
                  }
        </div>
    )
}