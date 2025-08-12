import { Link } from "react-router-dom";
import { Typewriter } from "react-simple-typewriter";
import ThreeBackground from "../three/ThreeBackground";

function Header({ words, links, backgroundClass, useThreeBackground = false, showCameraControls = false }) {
  return (
    <main>
      <div className={`relative px-4 sm:px-6 lg:px-8 ${useThreeBackground ? '' : `bg-cover bg-center ${backgroundClass}`}`}>
        {useThreeBackground && <ThreeBackground showControls={showCameraControls} />}
        <div className="mx-auto max-w-7xl pt-16 pb-40 sm:pt-20 sm:pb-48 lg:pt-24 lg:pb-56 relative z-10 pointer-events-none">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-node-text font-sora tracking-tight font-bold leading-tight relative z-20 pointer-events-none px-4">
              <Typewriter
                words={words}
                loop={0}
                cursor
                cursorColor="white"
                cursorStyle="_"
                typeSpeed={80}
                deleteSpeed={50}
                delaySpeed={1000}
              />
            </h1>
            <div className="mt-8 sm:mt-12 relative z-20 pointer-events-none">
              <ul className="flex flex-col sm:flex-row gap-4 sm:gap-6 lg:gap-8 items-center justify-center px-4">
                {links.map((link, index) => (
                  <li
                    key={index}
                    className="inline-flex hover:underline border-transparent hover:border-blue-button transition duration-300 ease-in-out pointer-events-auto"
                  >
                    <Link
                      to={link.path}
                      className="text-base sm:text-lg lg:text-xl font-sora font-thin leading-relaxed text-node-text text-center pointer-events-auto px-2 py-1 rounded hover:bg-blue-button/10"
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