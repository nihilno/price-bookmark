import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

function HeroForm() {
  return (
    <form className="w-full max-w-2xl space-y-4 px-2 md:px-4">
      <Input
        type="text"
        placeholder="Paste product link..."
        className="bg-background! focus-visible:ring-primary focus:ring-primary h-15 w-full px-4 text-sm md:h-18 md:text-base!"
      />
      <Button
        type="button"
        className="h-15 w-full rounded-xl text-sm font-bold shadow-2xl transition-all duration-300 ease-in-out hover:translate-y-1 hover:scale-105 hover:rotate-2 hover:shadow-inner hover:shadow-black/40 active:translate-y-2 active:scale-95 md:h-18 md:text-base"
      >
        <span>Track Now</span>
      </Button>

      <h2 className="mt-2 text-sm md:text-base">Your watchlist for the web.</h2>
    </form>
  );
}

export default HeroForm;
