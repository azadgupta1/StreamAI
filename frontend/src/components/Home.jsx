import ContinueWatching from "./ContinueWatching";
import Explore from "./Explore";
import Footer from "./Footer";
import Hero from "./Hero";
import ExploreLiveStreamPage from "../pages/ExploreLiveStreamPage";

const Home = () => {
  return (
    <div className="bg-black text-white min-h-screen overflow-x-hidden">
      <Hero />
      {/* <ContinueWatching /> */}
      {/* <Explore /> */}
      <ExploreLiveStreamPage />
      {/* <Footer /> */}
    </div>
  );
};

export default Home;
