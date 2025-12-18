"use client";

import { useSession } from "@/app/hooks/useSession";
import { Loader2Icon, User } from "lucide-react";
import Image from "next/image";

function UserBtn() {
  const { user, isLoadingSession } = useSession();
  const avatar = user?.user_metadata.avatar_url || null;

  if (isLoadingSession) {
    return <Loader2Icon className="size-5 animate-spin" />;
  }

  if (avatar) {
    return (
      <Image
        src={avatar}
        width={24}
        height={24}
        alt="Avatar"
        className="button-hover cursor-pointer rounded-full"
      />
    );
  }

  return (
    <User className="button-hover hover:text-primary size-6 cursor-pointer" />
  );
}

export default UserBtn;
