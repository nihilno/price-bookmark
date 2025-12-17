import { Cat } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";

function Logo() {
  return (
    <Link href="#main">
      <Button
        size="icon-lg"
        variant="outline"
        className="bg-foreground button-hover group size-12 cursor-pointer rounded-full border transition-all duration-100 ease-in-out hover:size-14 hover:border-0 hover:shadow-[0px_0px_11px_16px_#ffffff20]"
      >
        <Cat className="group-hover:text-primary size-8" />
      </Button>
    </Link>
  );
}

export default Logo;
