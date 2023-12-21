import surebuyLogo from "../../assets/surebuyLogo.png";
import { TbBrandTwitter } from "react-icons/tb";
import { FiFacebook } from "react-icons/fi";
import { IoLogoInstagram } from "react-icons/io5";
import { FiYoutube } from "react-icons/fi";

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer>
      <div className="bg-gray-500 w-full h-72 rounded-xl px-[2rem] py-[3rem] mb-[2rem] text-white flex gap-8 justify-evenly max-[850px]:flex-wrap max-[850px]:h-[max-content] max-[420px]:justify-start max-[420px]:mb-0">
        <div>
          <img src={surebuyLogo} alt="surebuyLogo" className="w-[150px]" />
          <p className="text-xl mb-2">Follow us on</p>
          <span className="flex gap-5">
            <i className="text-2xl">
              <TbBrandTwitter />
            </i>
            <i className="text-2xl">
              <FiFacebook />
            </i>
            <i className="text-2xl">
              <IoLogoInstagram />
            </i>
            <i className="text-2xl">
              <FiYoutube />
            </i>
          </span>
        </div>
        <div>
          <p className="text-xl mb-2">Important Links</p>
          <p className="cursor-pointer">About Us</p>
          <p className="cursor-pointer">Contact Us</p>
          <p className="cursor-pointer">Sell your phone</p>
          <p className="cursor-pointer">Privacy policy</p>
        </div>
        <div>
          <p>SUREBUY</p>
          <p>copyright &copy; {year}.All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
