import { Link } from "react-router-dom";
import { Typewriter } from "react-simple-typewriter";
import { useState, useEffect } from "react";
import ThreeBackground from "../three/ThreeBackground";
import useLanguage from "../../hooks/useLanguage";
import { useTranslation } from "react-i18next";

function Header({ words, links, backgroundClass, useThreeBackground = false, showCameraControls = false }) {
  const { currentLanguage } = useLanguage();
  const { i18n } = useTranslation();
  const [typewriterKey, setTypewriterKey] = useState(0);
  
  // Simple language-based content without complex translation system
  const getContent = () => {
    // Use i18n.language as primary source
    const activeLang = i18n.language || currentLanguage;
    
    if (activeLang === "en") {
      return {
        words: ["Digital Transformation", "Computer Vision", "Industry 4.0"],
        links: [
          { label: "Digital Transformation", path: "/servicios" },
          { label: "Computer Vision", path: "/servicios" },
          { label: "Industry 4.0", path: "/servicios" }
        ]
      };
    } else {
      return {
        words: ["Transformación Digital", "Visión por Computadora", "Industria 4.0"],
        links: [
          { label: "Transformación Digital", path: "/servicios" },
          { label: "Visión por Computadora", path: "/servicios" },
          { label: "Industria 4.0", path: "/servicios" }
        ]
      };
    }
  };

  // Update when language changes - listen to both sources
  useEffect(() => {
    setTypewriterKey(prev => prev + 1);
  }, [currentLanguage, i18n.language]);

  const content = getContent();
  // Use internal content since we removed the hardcoded props
  const displayWords = words || content.words;
  const displayLinks = links || content.links;

  return (
    <main>
      <div className={`relative px-4 sm:px-6 lg:px-8 min-h-screen ${useThreeBackground ? "" : `bg-cover bg-center ${backgroundClass}`}`}>
        {useThreeBackground && <ThreeBackground showControls={showCameraControls} />}
        <div className="mx-auto max-w-7xl pt-32 pb-20 sm:pt-40 sm:pb-24 lg:pt-44 lg:pb-28 relative z-30 pointer-events-none">
          <div className="text-center">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl text-node-text font-chakra tracking-tight font-bold leading-tight relative z-50 pointer-events-none px-2 sm:px-4 header-title">
              <Typewriter
                key={`${typewriterKey}-${i18n.language}-${currentLanguage}`}
                words={displayWords}
                loop={0}
                cursor
                cursorColor="white"
                cursorStyle="_"
                typeSpeed={80}
                deleteSpeed={50}
                delaySpeed={1000}
              />
            </h1>
            <div className="mt-8 sm:mt-12 relative z-50 pointer-events-none">
              <ul className="flex flex-col sm:flex-row gap-4 sm:gap-6 lg:gap-8 items-center justify-center px-4">
                {displayLinks.map((link, index) => (
                  <li
                    key={`${i18n.language}-${currentLanguage}-${index}`}
                    className="inline-flex hover:underline border-transparent hover:border-blue-button transition duration-300 ease-in-out pointer-events-auto"
                  >
                    <Link
                      to={link.path}
                      className="text-base sm:text-lg lg:text-xl font-chakra font-thin leading-relaxed text-node-text text-center pointer-events-auto px-2 py-1 rounded hover:bg-blue-button/10 navbar-link"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="absolute inset-x-0 top-[calc(100%-8rem)] sm:top-[calc(100%-13rem)] lg:top-[calc(100%-30rem)] -z-10 transform-gpu overflow-hidden blur-3xl">
            <svg
              className="relative left-[calc(50%+1rem)] sm:left-[calc(50%+3rem)] lg:left-[calc(50%+36rem)] h-[16rem] sm:h-[21.1875rem] lg:h-[42.375rem] max-w-none -translate-x-1/2"
              viewBox="0 0 1155 678"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill="url(#ecb5b0c9-546c-4772-8c71-4d3f06d544bc)"
                fillOpacity=".3"
                d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z"
              />
              <defs>
                <linearGradient
                  id="ecb5b0c9-546c-4772-8c71-4d3f06d544bc"
                  x1="1155.49"
                  x2="-78.208"
                  y1=".177"
                  y2="474.645"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#9089FC" />
                  <stop offset={1} stopColor="#FF80B5" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Header;
