/* eslint-disable @typescript-eslint/no-unused-vars */
import useSWR from "swr";
import { ArticleType, Presenter, Programming } from "../types";
import { fetcher } from "@/services/services";
import { PresenterCard } from "./presenterCard";
import React from "react";

export default function Presenters(){

  const { data, error } = useSWR<Presenter[]>("/api/presenters", fetcher);
  if(!data){
      return <div className="text-xs">Fetching presenters</div>
  }

    return(
        <div className="admin">
        <div className="flex justify-between items-center p-2 bg-background gap-2 rounded-lg mt-2">
        <div className=" text-xl font-bold tracking-tight"> Presenters </div>
        <div className=" text-sm p-2 h-8 w-8 border border-black dark:border-white rounded-full flex items-center justify-center">{data.length}</div>
        </div>
          <div>
            {
                    data.length > 0 ? (
                      <div className="sm:grid sm:grid-cols-12 gap-2">
                        {data.map(presenter => (
                          <div key={presenter.id} className="sm:col-span-3">
                          <PresenterCard {...presenter}/>
                          </div>
                        ))}
                      </div>
                    ) : null
                  }
          </div>
        </div>
    )
}