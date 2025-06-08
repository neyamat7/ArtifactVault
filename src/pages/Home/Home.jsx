import Featured from "../../components/Featured/Featured";
import Footer from "../../components/Footer/Footer";
import Hero from "../../components/Hero/Hero";
import MysteryArtifacts from "../../components/MysteryArtifacts/MysteryArtifacts";
import Quiz from "../../components/Quiz/Quiz";
import TimeCapsule from "../../components/TimeCapsule/TimeCapsule";

const Home = () => {
  return (
    <>
      <Hero />
      <Featured />
      <TimeCapsule />
      <MysteryArtifacts />
      <Quiz />
      <Footer />
    </>
  );
};

export default Home;
