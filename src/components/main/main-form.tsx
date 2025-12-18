"use client";

import Modal from "@/components/auth/modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSession } from "@/hooks/useSession";
import { addProduct } from "@/lib/actions/add-products";
import { FORM_BUTTON } from "@/lib/consts";
import { cn } from "@/lib/utils";
import { ChevronsRight, Loader2Icon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";

function MainForm() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, isLoadingSession } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [url, setUrl] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);

    try {
      const formData = new FormData(e.currentTarget);
      const result = await addProduct(formData);

      if (!result.success) {
        toast.error("Could not add product.", {
          description: result.error || "Reason unknown.",
        });
      } else {
        toast.success(result.message || "Product tracked...", {
          description: (
            <Link
              href="#"
              className="flex cursor-pointer items-center gap-2 underline"
            >
              Check it out <ChevronsRight />
            </Link>
          ),
        });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
      setUrl("");
    }
  }

  return (
    <form
      className="w-full max-w-2xl space-y-4 px-2 md:px-4"
      onSubmit={handleSubmit}
    >
      <Input
        type="url"
        name="url"
        placeholder="Paste product link..."
        className="bg-background! focus-visible:ring-primary focus:ring-primary h-15 w-full px-4 text-sm md:h-18 md:text-base!"
        required
        value={url}
        onChange={(e) => setUrl(e.target.value)}
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
          type="submit"
          disabled={isLoadingSession || isLoading}
          className={cn(FORM_BUTTON)}
        >
          {(isLoadingSession || isLoading) && (
            <Loader2Icon className="size-5 animate-spin" />
          )}
          <span>{isLoading ? "Looking for your product..." : "Track!"}</span>
        </Button>
      )}

      <h2 className="mt-2 text-sm md:text-base">Your watchlist for the web.</h2>
    </form>
  );
}

export default MainForm;
