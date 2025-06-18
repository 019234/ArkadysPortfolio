import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import Spline from '@splinetool/react-spline';
import ExpandableCard from './components/ExpandableCard';
import MyCarousel from './components/MyCarousel';
import MyCarouselModels from './components/MyCarouselModels';
import YoutubeEmbed from './components/YouTubeEmbed.js';
import MyAcads from './components/MyAcads.js';
import { gameSlides, animationSlides, modelSlides } from './components/slides';
import Pdf from "./Arkady_Trinidad_Resume.pdf";

function ClipboardCopy({ text }) {
  const [copied, setCopied] = useState(false);
  const splineRef = useRef(null);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      console.error('Failed to copy!', err);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0 hover:underline"
    >
      {copied ? 'Copied!' : text}
    </button>
  );
}

export default function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [modalContent, setModalContent] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

const scrollToSection = (id) => {
  if (id === 'about') {
    // Scroll to top for About linkasd asd asdasd
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  } else {
    // Normal section scrolling for others
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  }
  setIsMenuOpen(false);
};


  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const phoneNumber = '0917-123-4567';
  const email = 'arkadytrinidad747@gmail.com';

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className={`min-h-screen transition-colors duration-700 ${darkMode ? 'dark bg-gray-900 text-white ' : 'bg-white text-gray-900'}`}>
      <header className="p-4 flex justify-between items-center border-b border-gray-300 dark:border-gray-700 sticky top-0 z-50 bg-inherit">
        <img src="/files/Icon.png" alt="Logo" className="w-13 h-12 ml-2 md:ml-5" />

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center">
          <label className="inline-flex items-center cursor-pointer mr-4">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={darkMode}
              onChange={() => setDarkMode(!darkMode)}
            />
            <div className="relative w-11 h-6 bg-blue-600 peer-focus:outline-none dark:peer-focus:ring-black-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-yellow-500 after:border-blue-600 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-blue-600 peer-checked:bg-white-900 dark:peer-checked:bg-gray-100"></div>
          </label>
          <button
            onClick={toggleMenu}
            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
          >
            <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        <div className="hidden md:flex max-w-screen-xl flex-wrap items-center justify-between ml-auto p-4">
          <ul
            className={`transition-colors duration-700 font-medium flex flex-col p-4 md:p-0 mt-4 border rounded-lg md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 ${
              darkMode
                ? "bg-gray-800 border-gray-700 md:bg-gray-900 text-white"
                : "bg-gray-50 border-gray-100 md:bg-white text-gray-900"}`}>
           <li>
             <button
               onClick={() => scrollToSection('about')}
               className={`block py-2 px-3 rounded-sm md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 hover:bg-gray-100 w-full text-left ${
                 darkMode ? "text-white hover:bg-gray-700 hover:text-white md:hover:text-blue-500" : "text-gray-900 md:hover:text-black-500"
               }`}
             >
               About
             </button>
           </li>
           <li>
             <button
               onClick={() => scrollToSection('projects')}
               className={`block py-2 px-3 rounded-sm md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 hover:bg-gray-100 w-full text-left ${
                darkMode ? "text-white hover:bg-gray-700 hover:text-white md:hover:text-blue-500" : "text-gray-900 md:hover:text-black-500"
                 }`}
             >
               Projects
             </button>
           </li>
           <li>
             <button
               onClick={() => scrollToSection('academics')}
               className={`block py-2 px-3 rounded-sm md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 hover:bg-gray-100 w-full text-left ${
                darkMode ? "text-white hover:bg-gray-700 hover:text-white md:hover:text-blue-500" : "text-gray-900 md:hover:text-black-500"
                }`}
             >
               Academics
             </button>
           </li>
            <li>
              <a
                href={Pdf} target="_blank" rel="noreferrer"
                className={`block py-2 px-3 rounded-sm md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0
                  hover:bg-gray-100
                  ${darkMode ? "text-white hover:bg-gray-700 hover:text-white md:hover:text-blue-500" : "text-gray-900 md:hover:text-black-500"}
                `}>Resume</a>
            </li>
            <label className="inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={darkMode}
                onChange={() => setDarkMode(!darkMode)}
              />
              <div className="relative w-11 h-6 bg-blue-600 peer-focus:outline-none dark:peer-focus:ring-black-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-yellow-500 after:border-blue-600 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-blue-600 peer-checked:bg-white-900 dark:peer-checked:bg-gray-100"></div>
            </label>
          </ul>
        </div>
      </header>

      {isMenuOpen && (
        <div className={`fixed right-0 md:hidden ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
          <ul className="px-2 pt-2 pb-3 space-y-1">
            <li>
              <a
                href="#"
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  darkMode ? 'text-white hover:bg-gray-700' : 'text-gray-900 hover:bg-gray-200'
                }`}
              >
                About
              </a>
            </li>
            <li>
              <a
                href="#"
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  darkMode ? 'text-white hover:bg-gray-700' : 'text-gray-900 hover:bg-gray-200'
                }`}
              >
                Projects
              </a>
            </li>
            <li>
              <a
                href="#"
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  darkMode ? 'text-white hover:bg-gray-700' : 'text-gray-900 hover:bg-gray-200'
                }`}
              >
                Academics
              </a>
            </li>
            <li>
              <a
                href={Pdf}
                target="_blank"
                rel="noreferrer"
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  darkMode ? 'text-white hover:bg-gray-700' : 'text-gray-900 hover:bg-gray-200'
                }`}
              >
                Resume
              </a>
            </li>
          </ul>
        </div>
      )}

      <div className="px-4 md:px-64 py-10 md:py-20 md:pl-56 md:mr-64 ">
        <section id="hero" className="md:fixed md:top-1/4 md:left-[120px] mt-6 ">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 md:mb-35">Hi, I am</h2>
          <h2 className="text-5xl md:text-8xl font-bold mb-2 w-full ">Arkady Trinidad</h2>
          <p className="py-4 md:py-6 text-lg md:text-xl font-bold">Web developer / Game Director / 3D modeller</p>
          <div className="md:fixed w-full md:w-1/2 h-1/2">
            <section id="splineBox" className="relative md:absolute top-0 md:top-[-5rem] left-0 md:left-[-5rem] w-full md:w-[80%] h-64 md:h-full scale-100 md:scale-[1.3] z-10">
              <Spline scene="https://prod.spline.design/GKKowBoUEGgKNwfG/scene.splinecode"/>
            </section>
          </div>
        </section>
      </div>

      <main  className="md:ml-[50%] flex-1 p-4 md:p-8 space-y-8 md:space-y-16">
        <section id="about" className="mb-8 md:mb-16">
          <h3 className="text-2xl font-semibold mb-5"></h3>

          <p className="text-base md:text-[20px] leading-relaxed max-w-3xl">
            I'm Arkady Trinidad — a passionate and driven developer with a foundation in game development. I've led both solo projects and collaborative teams, always pushing for quality, creativity, and innovation. One of my proudest achievements was leading my team to win Most Popular Game, all while maintaining strong academics as a two-time Dean's Lister.
            <br />
            <br />
            Throughout my journey, I've worn many hats — from game director to 3D modeler to intern graphic designer — each role sharpening my skills in communication, aesthetics, and problem-solving. I love building things from scratch and watching ideas evolve into something people can see, feel, or interact with.
            <br />
            <br />
            Now, I'm channeling that same energy and dedication into web development, where I aim to grow as a full-stack developer. I'm continuously learning, experimenting, and improving — not just to keep up with tech, but to contribute something meaningful. I don't settle. I adapt, evolve, and always strive for the next level.
          </p>

          <div className="mt-10 md:mt-20">

            <div>
              <div id="projects" className="mt-10 md:mt-40">
                <ExpandableCard
                  title="Games"
                  description="College-made animations that mix fun, motion, and a touch of madness. Built with love and So much caffeine.">
                  <MyCarousel slides={gameSlides} />
                </ExpandableCard>
              </div>

              <div className="mt-10 md:mt-20">
                <ExpandableCard
                  title="Animations"
                  description="A collection of motion-filled, caffeine-fueled animation projects I crafted during college.">
                  <YoutubeEmbed slides={animationSlides} />
                </ExpandableCard>
              </div>

              <div className="mt-10 md:mt-20 mb-10 md:mb-44">
                <ExpandableCard
                  title="3D models & Graphic designs"
                  description="College-era 3D and graphic design works — creative experiments that shaped my style and workflow.">
                  <MyCarouselModels slides={modelSlides} />
                </ExpandableCard>
              </div>

          <div id="academics">
           <MyAcads
             title="Solo Physics Game project"
             description="- Directed a short animated film for a final-year requirement"
             description1="- Created concept, wrote narrative, modeled assets, and programmed core systems"
             description2="- Showcased initiative, problem-solving, and multidisciplinary ability."
             date="2023 - 2024"
             />

            <MyAcads
              title="Director, Writer, modeler, and Programmer"
              description="- Directed a first-person exploration game 2nd year project"
              description1="- Led animation production, narrative writing, and gameplay programming."
              description2="- Facilitated smooth collaboration between team members across roles"
              date="2022-2023"
              />



             <MyAcads
              title="Director, Writer and Lead Animator"
              description="- Directed a short animated film for a final-year requirement"
              description1="- Developed the story, led the creative vision, and managed the team throughout production."
              description2="- Ensured delivery under deadlines while maintaining quality and team coordination."
              date="2018 - 2019"
              />

              <MyAcads
              title="Achievements"
              description="- Dean Lister For 2nd and 3rd Year"
              description1="- Won most popular Game Project on 3 Year"
              description2="- Led 5+ Game/Animation Projects Across 4 Academic Years"
              date="2020 - 2025"
              />
          </div>

              <div className="w-full max-w-md mr-0 md:mr-10">
                <span className="font-normal text-gray-700 dark:text-gray-400">Built with brains and caffeine —designed in <span className="font-semibold text-gray-900 dark:text-gray-100">figma</span> and coded in
                <span className="font-semibold text-gray-900 dark:text-gray-100"> intelliJ</span>, powered by
                <span className="font-semibold text-gray-900 dark:text-gray-100"> React.js</span>, styled with
                <span className="font-semibold text-gray-900 dark:text-gray-100"> Tailwind CSS</span> and deployed with
                <span className="font-semibold text-gray-900 dark:text-gray-100"> vercel.</span> coded by me.
                </span>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-400 dark:bg-gray-800">
        <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center z-100 md:justify-between">
          <span className="text-sm text-gray-900 sm:text-center dark:text-gray-400">
            © 2025 Arkady Trinidad.
          </span>

          <ul className="flex flex-wrap items-center mt-3 space-x-4 md:space-x-8 text-sm font-medium text-gray-900 dark:text-gray-400 sm:mt-0">
            <li>
              <ClipboardCopy text={phoneNumber} />
            </li>
            <li>
              <ClipboardCopy text={email} />
            </li>
          </ul>
        </div>
      </footer>
    </div>
  );
}