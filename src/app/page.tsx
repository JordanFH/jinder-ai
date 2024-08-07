import React from "react";
import SectionHero from "@/app/(server-components)/SectionHero";
import BgGlassmorphism from "@/components/BgGlassmorphism";
import SectionOurFeatures from "@/components/SectionOurFeatures";
import SectionHowItWork from "@/components/SectionHowItWork";
import SectionBecomeAnAuthor from "@/components/SectionBecomeAnAuthor";
import SectionVideos from "@/components/SectionVideos";
import { Metadata } from "next";
import { APP_NAME } from "@/constants/app";

export const metadata: Metadata = {
  title: `Home - ${APP_NAME}`,
  description: "Home page",
};

function PageHome() {
  return (
    <main className="nc-PageHome relative overflow-hidden">
      {/* GLASSMOPHIN */}
      <BgGlassmorphism />

      <div className="container relative space-y-24 mb-24 lg:space-y-28 lg:mb-28">
        {/* SECTION HERO */}
        <SectionHero />

        <SectionOurFeatures />

        <SectionHowItWork />

        <SectionVideos />

        <SectionBecomeAnAuthor />
      </div>
    </main>
  );
}

export default PageHome;
