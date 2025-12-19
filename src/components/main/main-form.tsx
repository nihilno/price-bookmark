"use client";

import Modal from "@/components/auth/modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSession } from "@/hooks/useSession";
import { addProduct } from "@/lib/actions/actions";
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
        toast.error("Product not added", {
          description: result.error || "The reason is unknown.",
        });
      } else {
        setUrl("");
        toast.success(result.message || "Product tracked successfully", {
          description: (
            <Link
              href="/watchlist"
              className="flex cursor-pointer items-center gap-2 underline"
            >
              View in your watchlist <ChevronsRight className="size-3.5" />
            </Link>
          ),
        });
      }
    } catch (error) {
      console.error(error);
      const message =
        error instanceof Error
          ? error.message
          : "An unexpected error occurred during submission.";

      toast.error("Submission failed", {
        description: message,
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form
      className="w-full max-w-2xl space-y-4 px-2 md:px-4"
      onSubmit={handleSubmit}
    >
      <Input
        type="url"
        inputMode="url"
        name="url"
        placeholder="Enter product URL to track."
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
