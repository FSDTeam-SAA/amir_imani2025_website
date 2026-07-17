import MakingOfSection from "@/components/about/MakingOfSection";
import MeetOurTeam from "@/components/about/MeetOurTeam";
import OurMission from "@/components/about/OurMission";
import GetInTouch from "@/components/shared/GetInTouch";
import Hero1 from "@/components/shared/Hero1";

const page = () => {
  return (
    <div>
      <Hero1 
        image="/hero.jpg"
        title="ABOUT US"
        subtitle="Our Story"
        description="Meet the team and learn about our mission to build a universe of games around thirteen symbols."
        text="So Far."
      />
      <OurMission />
      <MeetOurTeam />
      <MakingOfSection />
      <GetInTouch />
    </div>
  );
};

export default page;
