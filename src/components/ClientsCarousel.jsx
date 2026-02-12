import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const ClientsCarousel = ({ clients }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % clients.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [clients.length]);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + clients.length) % clients.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % clients.length);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  if (!clients?.length) return null;

  return (
    <div className="relative w-full">
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {clients.map((client, index) => (
            <div
              key={index}
              className="min-w-full shrink-0 flex items-center justify-center px-8"
            >
              <div className="flex items-center justify-center h-28 sm:h-32 md:h-36 w-full">
                <img
                  src={client.logo}
                  alt={client.name}
                  className="max-h-full w-auto max-w-[200px] sm:max-w-[240px] object-contain grayscale opacity-80 hover:opacity-100 hover:grayscale-0 transition-all duration-300"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation arrows - one logo view so arrows make sense */}
      <button
        onClick={goToPrevious}
        className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-10 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full p-2 min-w-[44px] min-h-[44px] flex items-center justify-center transition-all"
        aria-label="Previous client"
      >
        <ChevronLeft className="w-6 h-6 text-white" />
      </button>
      <button
        onClick={goToNext}
        className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-10 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full p-2 min-w-[44px] min-h-[44px] flex items-center justify-center transition-all"
        aria-label="Next client"
      >
        <ChevronRight className="w-6 h-6 text-white" />
      </button>

      {/* Dots indicator */}
      <div className="flex justify-center mt-6 gap-2">
        {clients.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className="group min-w-[44px] min-h-[44px] flex items-center justify-center p-2"
            aria-label={`View ${clients[index].name}`}
          >
            <span
              className={`block rounded-full transition-all ${
                index === currentIndex
                  ? "bg-white w-8 h-2"
                  : "bg-white/40 w-2 h-2 group-hover:bg-white/60"
              }`}
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ClientsCarousel;
