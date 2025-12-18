"use client";

import { useSession } from "@/app/hooks/useSession";
import Modal from "@/components/auth/modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FORM_BUTTON } from "@/lib/consts";
import { cn } from "@/lib/utils";
import { Loader2Icon } from "lucide-react";
import { useState } from "react";

function MainForm() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, isLoadingSession } = useSession();

  return (
    <form className="w-full max-w-2xl space-y-4 px-2 md:px-4">
      <Input
        type="url"
        placeholder="Paste product link..."
        className="bg-background! focus-visible:ring-primary focus:ring-primary h-15 w-full px-4 text-sm md:h-18 md:text-base!"
      />
      {!user ? (
        <>
          <Button
            onClick={() => setIsOpen(true)}
            type="button"
            disabled={isLoadingSession}
            className={cn(
              FORM_BUTTON,
              isOpen
                ? "bg-primary translate-y-1 scale-105 rotate-2 animate-pulse text-white shadow-inner shadow-black/40"
                : "",
            )}
          >
            {isLoadingSession && (
              <Loader2Icon className="size-5 animate-spin" />
            )}
            <span>
              {isLoadingSession ? "Checking You..." : "Sign In to Track"}
            </span>
          </Button>
          <Modal open={isOpen} onOpenChange={setIsOpen} />
        </>
      ) : (
        <Button
          type="button"
          disabled={isLoadingSession}
          className={cn(FORM_BUTTON)}
        >
          {isLoadingSession && <Loader2Icon className="size-5 animate-spin" />}
          <span>Track Now</span>
        </Button>
      )}

      <h2 className="mt-2 text-sm md:text-base">Your watchlist for the web.</h2>
    </form>
  );
}

export default MainForm;
