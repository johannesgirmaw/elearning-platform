import Footer from "../../components/layout/footer/Footer";
import HeroSection from "../../components/home/Herosection";
import { useEffect } from "react";
import useLoading from "../../components/customs/loading/LoadingHook";
import Loading from "../../components/customs/loading/Loading";

function Homepage() {
  const loading = useLoading()
  useEffect(() => {
  }, [])
  return (
    <>
      <Loading {...loading} />
      <HeroSection title="Home" activeTab="home" />
      <Footer />
    </>
  );
}

export default Homepage;
