import Link from "next/link";
import { BsArrowDown } from "react-icons/bs";

function Arrow({ href }: { href: string }) {
  return (
    <div className="grid h-64 w-full place-items-center md:h-100">
      <Link href={href} className="group grid size-12 place-items-center">
        <BsArrowDown className="group-hover:text-primary size-6 animate-bounce" />
      </Link>
    </div>
  );
}

export default Arrow;
