import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';


export default function MyCarousel({ slides }) {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  const paginate = (newDirection) => {
    setDirection(newDirection);
    setCurrent((prev) =>
      newDirection === 1
        ? (prev + 1) % slides.length
        : (prev - 1 + slides.length) % slides.length
    );
  };

  useEffect(() => {


  }, []);

  // ✅ Guard clause
  if (!slides || slides.length === 0) {
    return <div className="text-center text-gray-500">No slides available.</div>;
  }




  return (
    <div className="relative w-full max-w-2xl mx-auto overflow-hidden rounded-2xl ml-0">
      <div className="relative h-80 md:h-96 bg-gray-200 rounded-3xl">
        <AnimatePresence mode="wait" initial={false} custom={direction}>
          <motion.div
            key={current}
            custom={direction}
            initial={{ x: direction > 0 ? 300 : -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: direction < 0 ? 300 : -300, opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute w-full h-full"
          >
            <div className="max-w-2xl border-gray-200 rounded-2xl shadow-sm dark:bg-gray-800 dark:border-gray-700 h-full overflow-hidden">
              <img
                src={slides[current].image}
                className="rounded-t-lg object-cover w-full h-56"
                alt=""
              />
              <div className="p-3 flex flex-col justify-between h-[calc(100%-9rem)] overflow-hidden">
                <div className="overflow-hidden">
                  <h5 id="title" className="mb-2 text-lg sm:text-xl md:text-2xl font-bold tracking-tight text-gray-900 dark:text-white break-words line-clamp-2">
                    {slides[current].title}
                  </h5>

                  <p id="description" className="mb-4 font-normal text-sm sm:text-base text-gray-700 dark:text-gray-400 break-words line-clamp-3">
                    {slides[current].desc}
                  </p>
                  <p id="link" className="flex justify-end font-normal text-sm text-gray-700 dark:text-gray-400 -mt-2 mb-0">
                    <a
                      href={slides[current].link}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-600 hover:underline dark:text-blue-500 break-all"
                    >
                      {slides[current].linkName}
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Buttons */}
        <button
          onClick={() => paginate(-1)}
          className="absolute top-1/2 right-3 transform -translate-y-1/2 bg-white/70 hover:bg-white text-black rounded-full p-2 z-10"
        >
          ›
        </button>
        <button
          onClick={() => paginate(1)}
          className="absolute top-1/2 left-3 transform -translate-y-1/2 bg-white/70 hover:bg-white text-black rounded-full p-2 z-10"
        >
          ‹
        </button>
      </div>

      {/* Dots */}
      <div className="flex justify-center mt-2 space-x-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              setDirection(i > current ? -1 : 1);
              setCurrent(i);
            }}
            className={`w-3 h-3 rounded-full ${i === current ? 'bg-black dark:bg-white' : 'bg-gray-400'
              }`}
          />
        ))}
      </div>
    </div>
  );
}
