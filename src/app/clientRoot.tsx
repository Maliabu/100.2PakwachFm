"use client";

import { useEffect } from "react";
import { trackEvent } from "@/services/tracking";

export default function ClientRootWrapper({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement);
      trackEvent("click", { 
        tag: target.tagName,
        id: target.id || null,
        class: target.className || null,
        text: target.textContent?.trim().slice(0, 50) || null,
       });
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return <>{children}</>;
}
