import BrowserImage from "@/components/homepage/browser-image";
import Footer from "@/components/global/footer";
import HomepageHero from "@/components/homepage/homepage-hero";
import InstallCTA from "@/components/homepage/install-cta";
import Navbar from "@/components/global/navbar";
import SellingFeatures from "@/components/homepage/selling-features";

export default function Home() {
  return (<div className="w-full flex flex-col items-center justify-start">
    <Navbar />

    <main className="flex flex-col flex-1 items-center my-16 md:my-30 w-full md:max-w-7xl px-4 md:px-0 gap-24">
      <HomepageHero />

      <BrowserImage />

      <SellingFeatures />

      <InstallCTA />
    </main>

    <Footer />
  </div>);
}
