import { useState } from "react";
import { Hero } from "../components/strict-dev/Hero";
import { Services } from "../components/strict-dev/Services";
import { TechStack } from "../components/strict-dev/TechStack";
import { Compliance } from "../components/strict-dev/Compliance";
import { WhyUs } from "../components/strict-dev/WhyUs";
import { ProjectConfigurator } from "../components/strict-dev/ProjectConfigurator";
import { CTA } from "../components/strict-dev/CTA";
import { Contact } from "../components/strict-dev/Contact";

export function HomePage() {
  const [showAnimation, setShowAnimation] = useState(false);

  return (
    <>
      <Hero 
        onShowAnimation={() => setShowAnimation(true)}
        shouldHideCore={showAnimation}
        showAnimation={showAnimation}
        onCloseAnimation={() => setShowAnimation(false)}
      />
      <div className="border-t border-neutral-100 dark:border-[#1a1a1a]">
        <Services />
      </div>
      <TechStack />
      <div className="border-t border-neutral-100 dark:border-[#1a1a1a]">
        <Compliance />
      </div>
      <div className="border-t border-neutral-100 dark:border-[#1a1a1a]">
        <WhyUs />
      </div>
      <ProjectConfigurator />
      <CTA />
      <div className="border-t border-neutral-100 dark:border-[#1a1a1a]">
        <Contact />
      </div>
    </>
  );
}
