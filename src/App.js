import { useState, useEffect } from 'react';
import Spline from '@splinetool/react-spline';
import ExpandableCard from './components/ExpandableCard';
import MyCarousel from './components/MyCarousel';
import MyCarouselModels from './components/MyCarouselModels';
import YoutubeEmbed from './components/YouTubeEmbed.js';
import MyCards from './components/MyCards.js';
import { workSlides, gameSlides, animationSlides, modelSlides, webSlides } from './components/slides';
import Pdf from "./Arkady_Trinidad_Resume.pdf";

// ── Clipboard copy button ────────────────────────────────────────────────────
function ClipboardCopy({ text }) {
  const [copied, setCopied] = useState(false);

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
      {copied ? '✓ Copied!' : text}
    </button>
  );
}

// ── Reusable nav button ──────────────────────────────────────────────────────
function NavButton({ label, onClick, darkMode, className = '' }) {
  return (
    <button
      onClick={onClick}
      className={`block py-2 px-3 rounded-sm md:hover:bg-transparent md:border-0 md:p-0 hover:bg-gray-100 w-full text-left
        ${darkMode
          ? 'text-white hover:bg-gray-700 md:hover:text-blue-400'
          : 'text-gray-900 md:hover:text-blue-600'
        } ${className}`}
    >
      {label}
    </button>
  );
}

// ── Nav links config ─────────────────────────────────────────────────────────
const NAV_LINKS = [
  { label: 'About', id: 'about' },
  { label: 'Work Experience', id: 'work' },
  { label: 'Projects', id: 'projects' },
  { label: 'Academics', id: 'academics' },
];

// ── Dark-mode toggle ─────────────────────────────────────────────────────────
function DarkModeToggle({ darkMode, onChange }) {
  return (
    <label className="inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        className="sr-only peer"
        checked={darkMode}
        onChange={onChange}
      />
      <div className="relative w-11 h-6 bg-blue-600 peer-focus:outline-none rounded-full peer dark:bg-gray-700
        peer-checked:after:translate-x-full peer-checked:after:border-white
        after:content-[''] after:absolute after:top-[2px] after:start-[2px]
        after:bg-yellow-500 after:border-blue-600 after:border after:rounded-full
        after:h-5 after:w-5 after:transition-all
        dark:border-blue-600 dark:peer-checked:bg-gray-100" />
    </label>
  );
}

// ── Main app ─────────────────────────────────────────────────────────────────
export default function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Scroll to section helper
  const scrollToSection = (id) => {
    if (id === 'about') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const el = document.getElementById(id);
      if (el) {
        const offset = el.getBoundingClientRect().top + window.pageYOffset - 80;
        window.scrollTo({ top: offset, behavior: 'smooth' });
      }
    }
    setIsMenuOpen(false);
  };

  // Sticky header shadow on scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const phoneNumber = '09122796064';
  const email = 'arkadytrinidad747@gmail.com';
  const github = 'https://github.com/019234';

  return (
    <div className={`min-h-screen transition-colors duration-700 ${darkMode ? 'dark bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>

      {/* ── Header ── */}
      <header className={`p-4 flex justify-between items-center border-b border-gray-300 dark:border-gray-700 sticky top-0 z-50 bg-inherit transition-shadow duration-300 ${scrolled ? 'shadow-lg' : ''}`}>
        <img src="/files/Icon.png" alt="Logo" className="w-13 h-12 ml-2 md:ml-5" />

        {/* Mobile controls */}
        <div className="md:hidden flex items-center gap-3">
          <DarkModeToggle darkMode={darkMode} onChange={() => setDarkMode(!darkMode)} />
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            aria-label="Toggle menu"
          >
            <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isMenuOpen
                ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              }
            </svg>
          </button>
        </div>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center ml-auto p-4 gap-1">
          <ul className={`font-medium flex items-center gap-8 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            {NAV_LINKS.map(({ label, id }) => (
              <li key={id}>
                <NavButton label={label} onClick={() => scrollToSection(id)} darkMode={darkMode} />
              </li>
            ))}
            <li>
              <a
                href={Pdf}
                target="_blank"
                rel="noreferrer"
                className={`block py-2 px-3 rounded-sm md:hover:bg-transparent md:border-0 md:p-0
                  ${darkMode ? 'text-white md:hover:text-blue-400' : 'text-gray-900 md:hover:text-blue-600'}`}
              >
                Resume
              </a>
            </li>
          </ul>
          <DarkModeToggle darkMode={darkMode} onChange={() => setDarkMode(!darkMode)} />
        </nav>
      </header>

      {/* ── Mobile dropdown menu ── */}
      {isMenuOpen && (
        <div className={`md:hidden fixed right-0 w-48 rounded-bl-lg shadow-lg z-40 ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
          <ul className="px-2 pt-2 pb-3 space-y-1">
            {NAV_LINKS.map(({ label, id }) => (
              <li key={id}>
                <button
                  onClick={() => scrollToSection(id)}
                  className={`block px-3 py-2 rounded-md text-base font-medium w-full text-left
                    ${darkMode ? 'text-white hover:bg-gray-700' : 'text-gray-900 hover:bg-gray-200'}`}
                >
                  {label}
                </button>
              </li>
            ))}
            <li>
              <a
                href={Pdf}
                target="_blank"
                rel="noreferrer"
                className={`block px-3 py-2 rounded-md text-base font-medium
                  ${darkMode ? 'text-white hover:bg-gray-700' : 'text-gray-900 hover:bg-gray-200'}`}
              >
                Resume
              </a>
            </li>
          </ul>
        </div>
      )}

      {/* ── Hero / fixed left panel ── */}
      <div className="px-4 sm:px-32 py- md:py-20 md:pl-56 md:mr-96">
        <section id="hero" className="md:fixed md:top-1/4 md:left-[100px] mt-6">
          <h2 className="text-[5vw] md:text-[clamp(1.3rem,2.4vw,7rem)] font-bold mb-1 w-full">Hi, I am</h2>
          <h2 className="text-[10vw] md:text-[clamp(2rem,5vw,12rem)] font-bold mb-2 w-full">Arkady Trinidad</h2>
          <p className="text-[clamp(0.7rem,1.5vw,2rem)] font-bold mb-2 w-full">
            Game Designer / Multimedia Artist / Web Developer
          </p>
          <div className="md:fixed w-full md:w-1/2 h-1/2">
            <section
              id="splineBox"
              className="relative md:absolute top-0 md:top-[-5rem] left-0 md:left-[-5rem] w-full md:w-[80%] h-64 md:h-full scale-100 md:scale-[1.3] z-10"
            >
              <Spline scene="https://prod.spline.design/GKKowBoUEGgKNwfG/scene.splinecode" />
            </section>
          </div>
        </section>
      </div>

      {/* ── Main content ── */}
      <main className="md:ml-[50%] flex-1 p-4 md:p-8 space-y-8 md:space-y-16">
        <section id="about" className="mb-8 md:mb-16">

          {/* Bio */}
          <p className="text-base md:text-[20px] leading-relaxed max-w-3xl">
            I'm Arkady Trinidad, a{' '}
            <span className="text-red-500 font-semibold">Game Designer</span> with experience
            creating hundreds of game design documents, shaping systems, mechanics, and player
            experiences from concept to execution. My background in game development sharpened my
            ability to think critically about user flow, interaction, and engagement.
            <br /><br />
            Alongside this, I work as a{' '}
            <span className="text-red-500 font-semibold">virtual assistant and front-end developer</span>,
            turning ideas and designs into functional, user-focused web experiences. I write clean,
            maintainable code and focus on building interfaces that are both practical and intuitive.
            <br /><br />
            I value clarity, adaptability, and continuous growth — and I bring that mindset into
            every project I take on.
          </p>

          {/* ── Work Experience ── */}
          <h1 id="work" className="text-[clamp(1.5rem,2vw,2rem)] font-bold md:text-[30px] mt-10 leading-relaxed max-w-3xl">
            Work Experience
          </h1>

          <MyCards
            title="Game Designer"
            description="- Designs and iterates on gameplay systems, mechanics, and user flows"
            description1="- Created 200+ GDDs including mechanics design, level structure, and player progression"
            description2="- Game Designed for Playable Ads like Wordle!, Woodoku, and many more; wrote scripts for video ads like Planes Evolve"
            date="2026 - Current"
          />

          <MyCards
            title="Multimedia Artist"
            description="- The go-to creator for all things 3D, from modeling to rendering"
            description1="- Designed and produced 100+ digital artworks"
            description2="- Contributed to the WorldSkills Event 2025 through visual design and media production support"
            date="2025 - 2026"
          />

          <div className="mt-10 md:mt-10">
            <ExpandableCard
              title="Work Projects"
              description="I work on various tasks — graphics design, photography, and 3D works among other things."
            >
              <MyCarousel slides={workSlides} />
            </ExpandableCard>
          </div>

          {/* ── Projects ── */}
          <h1 id="projects" className="text-[clamp(1.5rem,2vw,3rem)] font-bold mt-20 leading-relaxed max-w-3xl">
            Projects
          </h1>

          <div className="mt-10 space-y-10 md:space-y-20">
            <ExpandableCard
              title="Web Dev Projects"
              description="Made during off hours of work, teaching myself tirelessly."
            >
              <MyCarousel slides={webSlides} />
            </ExpandableCard>

            <ExpandableCard
              title="Games"
              description="College-made games that mix fun, mechanics, and a touch of madness. Built with love and so much caffeine."
            >
              <MyCarousel slides={gameSlides} />
            </ExpandableCard>

            <ExpandableCard
              title="Animations"
              description="A collection of motion-filled, caffeine-fueled animation projects I crafted during college."
            >
              <YoutubeEmbed slides={animationSlides} />
            </ExpandableCard>

            <ExpandableCard
              title="3D Models & Graphic Designs"
              description="College-era 3D and graphic design works — creative experiments that shaped my style and workflow."
            >
              <MyCarouselModels slides={modelSlides} />
            </ExpandableCard>
          </div>

          {/* ── Academics ── */}
          <h1 id="academics" className="text-[clamp(1.5rem,2vw,3rem)] font-bold mt-20 leading-relaxed max-w-3xl">
            Academics
          </h1>

          <div className="mt-10">
            <MyCards
              title="Solo Physics Game Project"
              description="- Developed a solo physics-based game as a final-year requirement"
              description1="- Created concept, wrote narrative, modeled assets, and programmed core systems"
              description2="- Showcased initiative, problem-solving, and multidisciplinary ability"
              date="2023 - 2024"
            />

            <MyCards
              title="Director, Writer, Modeler & Programmer"
              description="- Directed a first-person exploration game for a 2nd-year project"
              description1="- Led animation production, narrative writing, and gameplay programming"
              description2="- Facilitated smooth collaboration between team members across roles"
              date="2022 - 2023"
            />

            <MyCards
              title="Director, Writer & Lead Animator"
              description="- Directed a short animated film for a final-year requirement"
              description1="- Developed the story, led the creative vision, and managed the team throughout production"
              description2="- Ensured delivery under deadlines while maintaining quality and team coordination"
              date="2018 - 2019"
            />

            <MyCards
              title="Achievements"
              description="- Dean's Lister for 2nd and 3rd Year"
              description1="- Won Most Popular Game Project in 3rd Year"
              description2="- Led 5+ Game/Animation Projects Across 4 Academic Years"
              date="2020 - 2025"
            />
          </div>

          {/* Built with */}
          <div className="w-full max-w-md mt-10 mb-4">
            <span className="font-normal text-gray-700 dark:text-gray-400">
              Built with brains and caffeine — designed in{' '}
              <span className="font-semibold text-gray-900 dark:text-gray-100">Figma</span> and coded in{' '}
              <span className="font-semibold text-gray-900 dark:text-gray-100">IntelliJ</span>, powered by{' '}
              <span className="font-semibold text-gray-900 dark:text-gray-100">React.js</span>, styled with{' '}
              <span className="font-semibold text-gray-900 dark:text-gray-100">Tailwind CSS</span> and deployed with{' '}
              <span className="font-semibold text-gray-900 dark:text-gray-100">Vercel</span>. Coded by me.
            </span>
          </div>

        </section>
      </main>

      {/* ── Footer ── */}
      <footer className="bg-gray-400 dark:bg-gray-800">
        <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
          <span className="text-sm text-gray-900 sm:text-center dark:text-gray-400">
            © 2026 Arkady Trinidad.
          </span>
          <ul className="flex flex-wrap items-center mt-3 space-x-4 md:space-x-8 text-sm font-medium text-gray-900 dark:text-gray-400 sm:mt-0">
            <li><ClipboardCopy text={phoneNumber} /></li>
            <li><ClipboardCopy text={email} /></li>
            <li><ClipboardCopy text={github} /></li>
          </ul>
        </div>
      </footer>

    </div>
  );
}