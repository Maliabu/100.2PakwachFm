"use client";

import { CircleCheckBig, TriangleAlert, XCircle } from "lucide-react";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then(res => res.json());

export function DbMonitor() {
  const { data } = useSWR("/api/database", fetcher, {
    refreshInterval: 2000,
  });

  if (!data) return <div>Loading DB Stats...</div>;

  const getStatusIcon = (type: "connections" | "queries" | "queue") => {
    if (type === "connections") {
      return data.activeConnections < data.poolLimit ? <CircleCheckBig className="text-red-300"/> : <XCircle className="text-primary"/>;
    }
    if (type === "queries") {
      return data.totalQueries < 10000 ? <CircleCheckBig className="text-red-300"/> : <TriangleAlert className="text-orange-300"/>;
    }
    if (type === "queue") {
      return data.queuedEvents === 0 ? <CircleCheckBig className="text-red-300"/> : <TriangleAlert className="text-orange-300"/>;
    }
  };

  return (
    <div className="p-6 mt-3 rounded-lg bg-secondary space-y-4">
      <h2 className="text-xl font-bold tracking-tight">Database Monitor</h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
        <div className="bg-background p-4 rounded-lg space-y-2">
          <div className="text-3xl">{getStatusIcon("connections")}</div>
          <div className="text-xs text-muted-foreground uppercase">Active Connections</div>
          <div className="text-xl font-semibold">
            {data.activeConnections} / {data.poolLimit}
          </div>
        </div>

        <div className="bg-background p-4 rounded-lg space-y-2">
          <div className="text-3xl">{getStatusIcon("queries")}</div>
          <div className="text-xs text-muted-foreground uppercase">Total Queries</div>
          <div className="text-xl font-semibold">{data.totalQueries}</div>
        </div>

        <div className="bg-background p-4 rounded-lg space-y-2">
          <div className="text-3xl">{getStatusIcon("queue")}</div>
          <div className="text-xs text-muted-foreground uppercase">Queued Events</div>
          <div className="text-xl font-semibold">{data.queuedEvents}</div>
        </div>
      </div>

      <div className="text-xs text-right font-bold tracking-tight">
        Last Updated: {new Date(data.time).toLocaleTimeString()}
      </div>
    </div>
  );
}
