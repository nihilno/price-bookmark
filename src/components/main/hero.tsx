import About from "@/components/about";
import Arrow from "./arrow";
import Badges from "./badges";
import Grid from "./grid";
import HeroForm from "./hero-form";
import Title from "./title";

function Hero() {
  return (
    <section
      id="hero"
      className="bg-background/50 container mx-auto mt-8 flex flex-col items-center gap-8 rounded-t-xl border-l-2 px-4 py-16 text-center backdrop-blur-md"
    >
      <Title />
      <HeroForm />
      <Arrow href="#grid" />
      <Grid />
      <Arrow href="#badges" />
      <About />
      <Badges />

      <Title />
      <HeroForm />
    </section>
  );
}

export default Hero;
