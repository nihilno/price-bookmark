import About from "@/components/main/about";
import { CARD_STYLE } from "@/lib/consts";
import { cn } from "@/lib/utils";
import Arrow from "../global/arrow";
import Grid from "./grid";
import MainForm from "./main-form";
import MainMarquee from "./marquee";
import Title from "./title";

function Main() {
  return (
    <section className={cn(CARD_STYLE)}>
      <Title />
      <MainForm />
      <Arrow href="#" />
      <Grid />
      <Arrow href="#" />
      <About />
      <MainMarquee />
      <Title />
      <MainForm />
    </section>
  );
}

export default Main;
