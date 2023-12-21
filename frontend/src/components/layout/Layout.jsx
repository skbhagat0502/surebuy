import Footer from "./Footer";
import Navbar from "./Header/Navbar";
import Brands from "../brands/Brands";
import Models from "../Models/Models";

const Layout = (props) => {
  return (
    <>
      <Navbar />
      {props.children}
      <Brands />
      <Models />
      <Footer />
    </>
  );
};
export default Layout;
