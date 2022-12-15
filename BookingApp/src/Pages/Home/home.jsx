import Featured from "../../Components/Featured/Featured";
import FeaturedProperties from "../../Components/FeaturedProperties/FeaturedProperties";
import Footer from "../../Components/Footer/Footer";
import Header from "../../Components/Header/Header";
import MailList from "../../Components/MailList/MailList";
import Navbar from "../../Components/Navbar/Navbar";
import PropertyList from "../../Components/PropertyList/PropertyList";
import "./home.css";
const home = () => {
  return (
    <div className="container">
      <Navbar />
      <Header list="true" />
      <div className="homeContainer">
        <Featured />
        <h1 className="homeTitle">Browse elements by category</h1>
        <PropertyList />
        <h1 className="homeTitle">Homes guest loves...</h1>
        <FeaturedProperties />
      </div>
      <MailList />
      <Footer />
    </div>
  );
};

export default home;
