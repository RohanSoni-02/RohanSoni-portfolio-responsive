import { FaLinkedin, FaGithub, FaEnvelope } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";
export const Menu = (props) => {
  const { onSectionChange, menuOpened, setMenuOpened } = props;

  return (
    <>
      <button
        onClick={() => setMenuOpened(!menuOpened)}
        className="z-20 fixed top-4 right-4 md:top-12 md:right-12 p-3 bg-indigo-600 w-11 h-11 rounded-md"
      >
        <div
          className={`bg-white h-0.5 rounded-md w-full transition-all ${
            menuOpened ? "rotate-45  translate-y-0.5" : ""
          }`}
        />
        <div
          className={`bg-white h-0.5 rounded-md w-full my-1 ${
            menuOpened ? "hidden" : ""
          }`}
        />
        <div
          className={`bg-white h-0.5 rounded-md w-full transition-all ${
            menuOpened ? "-rotate-45" : ""
          }`}
        />
      </button>
      <div
        className={`z-10 fixed top-0 right-0 bottom-0 bg-white transition-all overflow-hidden flex flex-col
      ${menuOpened ? "w-full md:w-80" : "w-0"}`}
      >
        
        <div className="flex-1 flex items-start justify-center flex-col gap-6 p-8">
        <div className="flex justify-center w-full mb-2 flex-col items-center">
          <img 
              src="/logo.png" 
              alt="Logo" 
              className="w-24 h-24 mb-1" 
          />
          <h4 className="text-lg font-semibold text-gray-800">
            Rohan Soni
          </h4>
        </div>
          <MenuButton label="About" onClick={() => onSectionChange(0)} />
          <MenuButton label="Skills" onClick={() => onSectionChange(1)} />
          <MenuButton label="Experience" onClick={() => onSectionChange(2)} />
          <MenuButton label="Projects" onClick={() => onSectionChange(3)} />
          <MenuButton label="Contact" onClick={() => onSectionChange(4)} />
          <a 
          href="/resume.pdf" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-2xl font-bold cursor-pointer hover:text-indigo-600 transition-colors"
          >
            Resume
          </a>
          <div className="flex space-x-4 mt-6">
            <a href="https://www.linkedin.com/in/rohan-soni-389591203/" target="_blank" rel="noopener noreferrer">
              <FaLinkedin className="w-10 h-10 text-blue-600 hover:text-blue-800 transition" />
            </a>
            <a href="https://github.com/RohanSoni-02" target="_blank" rel="noopener noreferrer">
              <FaGithub className="w-10 h-10 text-gray-800 hover:text-black transition" />
            </a>
            <a href="mailto:soni.rohanchd@gmail.com">
              <FaEnvelope className="w-10 h-10 text-red-600 hover:text-red-800 transition" />
            </a>
            <a href="https://leetcode.com/RohanS02/">
              <SiLeetcode className="w-10 h-10 text-red-600 hover:text-red-800 transition" />
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

const MenuButton = (props) => {
  const { label, onClick } = props;
  return (
    <button
      onClick={onClick}
      className="text-2xl font-bold cursor-pointer hover:text-indigo-600 transition-colors"
    >
      {label}
    </button>
  );
};
