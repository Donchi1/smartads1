"use client"
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useSwipeable } from 'react-swipeable';

interface SliderProps {
  images: string[];
}

const sliderVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const Slider: React.FC<SliderProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handlers = useSwipeable({
    onSwipedLeft: () => nextSlide(),
    onSwipedRight: () => prevSlide(),
    trackMouse: true,
  });

  useEffect(() => {
    if (!isPaused) {
      const intervalId = setInterval(() => {
        nextSlide();
      }, 3000); // Change slide every 3 seconds
      return () => clearInterval(intervalId);
    }
  }, [isPaused, currentIndex]);

  return (
    <div
      className="relative w-full overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      {...handlers}
    >
      <motion.div
        className="flex slider-container transition-transform duration-500 ease-in-out"
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={sliderVariants}
        style={{
          display: 'flex',
          width: `${images.length * 100}%`,
          transform: `translateX(-${currentIndex * (115 / images.length)}%)`,
        }}
      >
        {images.map((image, index) => (
          <motion.img
            key={index}
            src={image}
            alt={`Slide ${index}`}
            className="w-full h-auto object-cover"
          />
        ))}
      </motion.div>
      <style jsx>{`
        @media (max-width: 639px) { /* Small screens */
          .slider-container {
            transform: translateX(-150%) ;
          }
        }
        @media (min-width: 640px) { /* Large screens and above */
          .slider-container {
            transform: translateX(-100%) !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Slider;