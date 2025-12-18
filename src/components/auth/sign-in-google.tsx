"use client";

import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";
import { Loader2Icon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

function SignInGoogle() {
  const supabase = createClient();
  const [isLoading, setIsLoading] = useState(false);

  async function handleSignInGoogle() {
    setIsLoading(true);
    try {
      await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${location.origin}/auth/callback`,
        },
      });
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Button
      onClick={handleSignInGoogle}
      disabled={isLoading}
      className={cn(
        isLoading
          ? "bg-background hover:bg-background size-26 cursor-not-allowed!"
          : "hover:bg-primary/50 focus:bg-primary/50 focus-visible:bg-primary/50 relative aspect-square size-26 rounded-md hover:size-32 hover:shadow-[0px_0px_100px_10px_var(--primary)] focus:size-32 focus:shadow-[0px_0px_100px_10px_var(--primary)] focus-visible:size-32 focus-visible:shadow-[0px_0px_100px_10px_var(--primary)]",
      )}
    >
      {isLoading ? (
        <Loader2Icon className="text-primary size-16 animate-spin" />
      ) : (
        <Image
          src="/google-logo.svg"
          alt="Sign In"
          fill
          className="object-cover"
        />
      )}
    </Button>
  );
}

export default SignInGoogle;
