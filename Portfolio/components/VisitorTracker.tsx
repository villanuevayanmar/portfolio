"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

// Records one anonymous page view per path per browser session.
export default function VisitorTracker() {
  const pathname = usePathname();

  useEffect(() => {
    try {
      const key = "tracked:" + pathname;
      if (sessionStorage.getItem(key)) return;
      sessionStorage.setItem(key, "1");

      fetch("/api/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ path: pathname, referrer: document.referrer }),
        keepalive: true,
      }).catch(() => {
        /* tracking must never break the page */
      });
    } catch {
      /* ignore */
    }
  }, [pathname]);

  return null;
}
