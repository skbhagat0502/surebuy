import { FaCheck } from "react-icons/fa6";
import Search from "../Search";
import surebuyLogo from "../../../assets/surebuyLogo.png";
const Hero = () => {
  return (
    <div className="w-full h-80 mt-[20vmax] max-[1200px]:mt-[12vmax] max-[1000px]:mt-[8vmax] max-[1000px]:mt-[0vmax] max-[500px]:mt-[-18vmax] max-[500px]:mb-[5vmax]">
      <div className="w-5/6 max-[500px]:w-[95%] h-full m-auto px-4 relative group bg-[#f5f5f5] rounded-2xl flex items-center justify-evenly max-[780px]:flex max-[780px]:flex-col max-[720px]:h-[120%] max-[420px]:h-[100%] max-[720px]:justify-center">
        <div className="w-full h-full rounded-2xl bg-center bg-cover duration-500 px-[2rem] max-[420px]:px-2 py-[2rem]">
          <h1 className="text-[3.2vmax] sm:text-[2.5vmax] font-[700] mb-[1rem]">
            Sell your Mobile Phone for
            <br />
            Instant Cash
          </h1>
          <div className="flex justify-start items-center gap-[2rem] mb-[2rem] max-[550px]:mb-0 max-[550px]:h-[50%] max-[600px]:flex-col max-[600px]:items-start">
            <p className="flex justify-start items-center gap-2">
              <i className="text-green-600">
                <FaCheck />
              </i>
              Maximum Value
            </p>
            <p className="flex justify-start items-center gap-2">
              <i className="text-green-600">
                <FaCheck />
              </i>
              Safe & Hassle-free
            </p>
            <p className="flex justify-start items-center gap-2">
              <i className="text-green-600">
                <FaCheck />
              </i>
              Free Doorstep Pickup
            </p>
          </div>
          <div className="max-[600px]:hidden">
            <Search />
          </div>
        </div>
        <img
          src={surebuyLogo}
          alt="surebuyLogo"
          className="w-[35vmax] sm:w-[20vmax] max-[420px]:w-[18vmax] max-[420px]:mb-[2rem] max-[420px]:hidden"
        />
      </div>
    </div>
  );
};

export default Hero;
