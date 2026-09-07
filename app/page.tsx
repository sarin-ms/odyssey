import Navbar from "./compoenents/navbar/Navbar";
import Hero from "./compoenents/hero/Hero";
import About from "./compoenents/about/About";
import Organizers from "./compoenents/organizers/Organizers";
import Prizepool from "./compoenents/prizepool/Prizepool";
import Structure from "./compoenents/structure/Structure";
import Schedule from "./compoenents/schedule/Schedule";
import Partners from "./compoenents/partners/Partners";
import Footer from "./compoenents/footer/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <About />
      <Organizers />
      <Prizepool />
      <Structure />
      <Schedule />
      <Partners />
      <Footer />
    </main>
  );
}
