import { FOOTER_DETAILS, FOOTER_ITEMS } from "@/lib/consts";
import { ArrowUpRight, Cat } from "lucide-react";
import Link from "next/link";

function Footer() {
  return (
    <footer className="container mx-auto my-8 px-4">
      <div className="bg-background/50 relative z-50 space-y-12 rounded-xl border-2 px-4 py-4 shadow-md backdrop-blur-md">
        <div className="grid grid-cols-3 gap-6 text-sm">
          {FOOTER_ITEMS.map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              className="hover:text-primary px-1 transition-colors"
            >
              <div className="border-muted-foreground/50 flex items-center justify-between gap-1 border-b border-dashed pb-1">
                <h3 className="line-clamp-1">{label}</h3>
                <ArrowUpRight className="h-4 w-4 shrink-0" />
              </div>
            </Link>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-6">
          {FOOTER_DETAILS.map((section, index) => {
            const [key, value] = Object.entries(section)[0];

            return (
              <ul key={index} className="space-y-1 px-1 text-xs sm:text-sm">
                <h4 className="mb-2 font-bold">{key}</h4>
                {value.map((item: string) => (
                  <li
                    key={item}
                    className="text-muted-foreground hover:text-foreground cursor-pointer transition-colors"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            );
          })}
        </div>
        <div className="flex flex-col border-t pt-1">
          <small className="text-muted-foreground text-xs">
            &copy; Maciej Polowy 2025. All Rights Reserved.
          </small>
          <Cat className="text-muted-foreground mt-4 h-4 w-4 self-end" />
        </div>
      </div>
    </footer>
  );
}

export default Footer;
