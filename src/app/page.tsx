import BrowserImage from "@/components/homepage/browser-image";
import HomepageHero from "@/components/homepage/homepage-hero";
import Navbar from "@/components/homepage/navbar";

export default function Home() {
  return (<div className="w-full flex flex-col items-center justify-start">
    <Navbar />

    <main className="flex flex-col flex-1 items-center my-30 w-full max-w-7xl gap-24">

      <HomepageHero />

      <BrowserImage />
      
    </main>
  </div>);
}
