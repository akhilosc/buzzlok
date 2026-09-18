import { createFileRoute } from "@tanstack/react-router";
import { BuzzlokProvider } from "@/context/buzzlok-context";
import { CategorySidebar } from "@/components/buzzlok/category-sidebar";
import { SiteNav } from "@/components/buzzlok/site-nav";
import { Hero } from "@/components/buzzlok/hero";
import { Ticker } from "@/components/buzzlok/ticker";
import { DiscoveryFeed } from "@/components/buzzlok/discovery-feed";
import { SixtySecond } from "@/components/buzzlok/sixty-second";
import { AroundMe } from "@/components/buzzlok/around-me";
import { ForYou } from "@/components/buzzlok/for-you";
import { Daily } from "@/components/buzzlok/daily";
import { Participate } from "@/components/buzzlok/participate";
import { SeoDiscovery } from "@/components/buzzlok/seo-discovery";
import { SiteFooter } from "@/components/buzzlok/site-footer";
import { ExploreModal } from "@/components/buzzlok/modals/explore-modal";
import { SubmitBuzzModal } from "@/components/buzzlok/modals/submit-buzz-modal";
import { ClaimBusinessModal } from "@/components/buzzlok/modals/claim-business-modal";
import { SavedDrawer } from "@/components/buzzlok/modals/saved-drawer";
import { useReveal } from "@/hooks/use-reveal";

export const Route = createFileRoute("/")({
  component: Index,
});

function BuzzlokApp() {
  useReveal();

  return (
    <div className="min-h-screen bg-background text-foreground antialiased selection:bg-buzz/30 selection:text-buzz">
      <div className="flex min-h-screen w-full">
        {/* Left Vertical Category Menu */}
        <CategorySidebar />

        {/* Right Main Content Area (End to End) */}
        <div className="flex-1 min-w-0 flex flex-col w-full">
          <SiteNav />
          <main className="w-full flex-1">
            <Hero />
            <Ticker />
            <DiscoveryFeed />
            <AroundMe />
            <SixtySecond />
            <ForYou />
            <Daily />
            <Participate />
            <SeoDiscovery />
          </main>
          <SiteFooter />
        </div>
      </div>

      {/* Global Interactive Modals */}
      <ExploreModal />
      <SubmitBuzzModal />
      <ClaimBusinessModal />
      <SavedDrawer />
    </div>
  );
}

function Index() {
  return (
    <BuzzlokProvider>
      <BuzzlokApp />
    </BuzzlokProvider>
  );
}
