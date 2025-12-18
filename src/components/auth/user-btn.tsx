"use client";

import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";
import type { User } from "@supabase/supabase-js";
import { Loader2Icon, UserPlus } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Button } from "../ui/button";
import Modal from "./modal";
import SignOut from "./sign-out";

function UserBtn() {
  const supabase = useMemo(() => createClient(), []);
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isLoadingSession, setIsLoadingSession] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user ?? null);
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

  function handleClick() {
    if (!user) {
      setIsOpen(true);
    }
  }

  if (isLoadingSession) {
    return (
      <Button
        variant="ghost"
        size="icon-sm"
        disabled
        className="button-hover hover:text-primary hover:bg-background!"
      >
        <Loader2Icon className="size-5 animate-spin" />
      </Button>
    );
  }

  return user ? (
    <SignOut />
  ) : (
    <>
      <Button
        variant="ghost"
        size="icon-sm"
        className={cn("button-hover hover:text-primary hover:bg-background!")}
        onClick={handleClick}
      >
        <UserPlus
          className={cn("size-5.5", isOpen ? "text-primary animate-pulse" : "")}
        />
      </Button>
      <Modal open={isOpen} onOpenChange={setIsOpen} />
    </>
  );
}

export default UserBtn;
