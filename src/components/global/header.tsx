"use client";

import SignInBtn from "@/components/auth/sign-in-btn";
import { Radar, Settings } from "lucide-react";
import Link from "next/link";
import UserBtn from "../auth/user-btn";
import Logo from "./logo";

function Header() {
  return (
    <header className="fixed top-0 left-1/2 z-50 container -translate-x-1/2 px-4">
      <nav className="bg-background/50 mt-8 flex h-20! items-center justify-between gap-4 rounded-xl border-2 px-4 shadow-md backdrop-blur-2xl sm:gap-6">
        <Settings className="button-hover hover:text-primary size-6 shrink-0 cursor-pointer" />

        <div className="flex items-center gap-4 sm:gap-6">
          <Link href="/watchlist">
            <Radar className="button-hover hover:text-primary size-6 cursor-pointer" />
          </Link>
          <Logo />
          <SignInBtn />
        </div>
        <UserBtn />
      </nav>
    </header>
  );
}

export default Header;
