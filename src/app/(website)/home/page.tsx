"use client"

import Highlights from "./highlights";
import { HeadlineTabs } from "../news/headline";
import Sport from "./sports";
import Business from "./business";
import Popular from "./popular";
import Menu1 from "../navigation/menu1";
import useSWR from "swr";
import { fetcher } from "@/services/services";

// Assuming this is the async fetcher
export default function Page() {
  const { data: articles, error: articleError } = useSWR('/api/articles', fetcher);
  const { data: highlights, error: highlightError } = useSWR('/api/articles/highlight', fetcher);
  const { data: sport, error: sportError } = useSWR('/api/articles/sport', fetcher);
  const { data: business, error: businessError } = useSWR('/api/articles/business', fetcher);
  const { data: political, error: politicalError } = useSWR('/api/articles/political', fetcher);

  // Handle loading/error states
  if (articleError || highlightError || sportError || businessError || politicalError) {
    return <div>Error loading data</div>;
  }

  if (!articles || !highlights || !sport || !business || !political) {
    return <div>...</div>;
  }

  return (
    <div>
      <Menu1 />
      <div className="grid grid-cols-12 gap-1">
        <div className="col-span-12 bg-background sm:p-8 rounded-lg">
          <div className="text-sm text-muted-foreground pt-6 sm:px-0 sm:pt-0 sm:block hidden">HEADLINES </div>
          <HeadlineTabs articles={articles} />
        </div>
      </div>
      <div className="bg-background p-8 rounded-lg mt-2" id="highlight">
        <div className="text-sm uppercase text-muted-foreground">WHAT YOU MISSED</div>
        <div className="p-4 rounded-lg mt-4">
          <Highlights articles={highlights} />
        </div>
      </div>
      <div className="bg-background p-8 rounded-lg mt-2" id="political">
        <div className="text-sm uppercase text-muted-foreground">POLITICAL</div>
        <div className="p-4 rounded-lg mt-4">
          <Business articles={political} />
        </div>
      </div>
      <div className="bg-background p-8 rounded-lg mt-2" id="sport">
        <div className="text-sm uppercase text-muted-foreground">SPORT</div>
        <div className="p-4 rounded-lg mt-4">
          <Sport articles={sport} />
        </div>
      </div>
      <div className="bg-background p-8 rounded-lg mt-2" id="business">
        <div className="text-sm uppercase text-muted-foreground">BUSINESS</div>
        <div className="p-4 rounded-lg mt-4">
          <Business articles={business} />
        </div>
      </div>
      <Popular />
    </div>
  );
}
