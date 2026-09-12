import BestSeller from "../components/Home/BestSeller";
import Hero from "../components/Home/Hero";
import Menu from "../components/Home/Menu";
import Reviews from "../components/Home/Reviews";
import Footer from "../components/Footer";
import Bar from "../UI/Bar";

const Home = () => {
  return (
    <main>
      <Hero />
      <Bar />
      <BestSeller />
      <Menu />
      <Reviews />
      <Footer />
    </main>
  );
};

export default Home;
