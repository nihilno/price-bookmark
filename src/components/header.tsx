import { Radar, User } from "lucide-react";
import Logo from "./logo";

function Header() {
  return (
    <header className="fixed top-0 left-1/2 z-50 container -translate-x-1/2 px-4">
      <nav className="bg-background/50 mt-8 flex h-20! items-center justify-center gap-6 rounded-xl border-2 px-4 shadow-md backdrop-blur-2xl">
        <User className="button-hover hover:text-primary cursor-pointer" />
        <Logo />
        <Radar className="button-hover hover:text-primary cursor-pointer" />
      </nav>
    </header>
  );
}

export default Header;
