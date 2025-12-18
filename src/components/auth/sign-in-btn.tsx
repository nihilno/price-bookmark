"use client";

import { useSession } from "@/hooks/useSession";
import { cn } from "@/lib/utils";
import { Loader2Icon, UserPlus } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";
import Modal from "./modal";
import SignOut from "./sign-out";

function SignInBtn() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, isLoadingSession } = useSession();

  if (isLoadingSession) {
    return (
      <Button
        variant="ghost"
        size="icon-sm"
        disabled
        className="button-hover hover:text-primary hover:bg-background!"
        aria-label="Loading session"
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
        onClick={() => setIsOpen(true)}
        aria-label="Sign in"
      >
        <UserPlus
          className={cn("size-5.5", isOpen ? "text-primary animate-pulse" : "")}
        />
      </Button>
      <Modal open={isOpen} onOpenChange={setIsOpen} />
    </>
  );
}

export default SignInBtn;
