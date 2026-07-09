"use client";

import { useEffect } from "react";
import { SessionProvider, useSession } from "next-auth/react";
import type { ReactNode } from "react";

function SessionTokenSync() {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const accessToken = session?.accessToken || session?.user?.accessToken;

    if (accessToken) {
      localStorage.setItem("authToken", accessToken);
      return;
    }

    if (status === "unauthenticated") {
      localStorage.removeItem("authToken");
    }
  }, [session, status]);

  return null;
}

export default function Provider({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <SessionTokenSync />
      {children}
    </SessionProvider>
  );
}
