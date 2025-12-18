"use client";

import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";
import { Loader2Icon, LogOut } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

function SignOutBtn() {
  const supabase = createClient();
  const [isLoading, setIsLoading] = useState(false);

  async function handleSignOut() {
    setIsLoading(true);
    try {
      await supabase.auth.signOut();
      toast.success("😸", { description: "Signed out successfully." });
    } catch (error) {
      console.error(error);

      const message =
        error instanceof Error
          ? error.message
          : "An unknown error occurred during sign out.";

      toast.error("😾", { description: message });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Button
      variant="ghost"
      size="icon-sm"
      className="button-hover hover:text-primary hover:bg-background!"
      onClick={handleSignOut}
      disabled={isLoading}
      aria-label="Sign out"
    >
      {isLoading ? (
        <Loader2Icon className="size-5 animate-spin" />
      ) : (
        <LogOut className="size-5.5" />
      )}
    </Button>
  );
}

export default SignOutBtn;
