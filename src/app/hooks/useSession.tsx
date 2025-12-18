import { createClient } from "@/lib/supabase/client";
import { User } from "@supabase/supabase-js";
import { useEffect, useMemo, useState } from "react";

export function useSession() {
  const supabase = useMemo(() => createClient(), []);

  const [user, setUser] = useState<User | null>(null);
  const [isLoadingSession, setIsLoadingSession] = useState(true);

  useEffect(() => {
    supabase.auth
      .getSession()
      .then(({ data }) => {
        setUser(data.session?.user ?? null);
      })
      .catch((error) => {
        console.error("Failed to get session:", error);
      })
      .finally(() => {
        setIsLoadingSession(false);
      });
    const { data: subscription } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
        setIsLoadingSession(false);
      },
    );

    return () => {
      subscription.subscription.unsubscribe();
    };
  }, [supabase]);

  return { user, isLoadingSession };
}
