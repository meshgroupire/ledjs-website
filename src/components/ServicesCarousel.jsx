import { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

const SWIPE_THRESHOLD = 50;

const ServicesCarousel = ({ services }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const slideCount = services.length;
  const slideWidthPercent = 100 / slideCount;

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slideCount);
    }, 4000);

    return () => clearInterval(interval);
  }, [slideCount, isAutoPlaying]);

  const goToSlide = useCallback((index) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  }, []);

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + slideCount) % slideCount);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  }, [slideCount]);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % slideCount);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  }, [slideCount]);

  // Touch swipe handlers for mobile
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    touchEndX.current = e.changedTouches[0].clientX;
    handleSwipe();
  };

  const handleSwipe = () => {
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > SWIPE_THRESHOLD) {
      if (diff > 0) goToNext();
      else goToPrevious();
    }
  };

  return (
    <div className="relative w-full max-w-full min-w-0">
      {/* Carousel Container - explicit width to fix mobile flex sizing */}
      <div
        className="relative overflow-hidden rounded-lg w-full"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        style={{ touchAction: "pan-y pinch-zoom" }}
      >
        <div
          className="flex transition-transform duration-500 ease-in-out will-change-transform"
          style={{
            width: `${slideCount * 100}%`,
            transform: `translateX(-${currentIndex * slideWidthPercent}%)`,
          }}
        >
          {services.map((service, index) => (
            <div
              key={service.id || index}
              className="flex-shrink-0 flex-grow-0"
              style={{ flexBasis: `${slideWidthPercent}%`, minWidth: 0 }}
            >
              <div className="relative h-[300px] min-h-[280px] sm:h-[420px] md:h-[480px] lg:h-[580px] w-full">
                  {/* Service Image Background */}
                  <div className="absolute inset-0">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover max-w-full"
                      onError={(e) => {
                        e.target.style.display = "none";
                        const parent = e.target.parentElement;
                        if (!parent.querySelector(".fallback-bg")) {
                          parent.innerHTML += `
                            <div class="fallback-bg w-full h-full bg-linear-to-br ${service.gradient}"></div>
                          `;
                        }
                      }}
                    />
                    {/* Gradient Overlay */}
                    <div
                      className={`absolute inset-0 bg-linear-to-br ${service.gradient} opacity-70`}
                    ></div>
                    <div className="absolute inset-0 bg-black/40"></div>
                  </div>

                  {/* Content Overlay - min 20px padding, z-10 so nav doesn't overlap */}
                  <div className="relative z-10 h-full flex items-center justify-center px-5 py-8 sm:px-6 sm:py-10 md:px-8">
                    <div className="text-center w-full max-w-4xl mx-auto">
                      {/* Title - responsive clamp, prevent overflow */}
                      <h2 className="carousel-heading font-bold text-white mb-4 sm:mb-6 break-words">
                        {service.title}
                      </h2>

                      {/* Description - responsive, prevent overflow */}
                      <p className="carousel-body text-white/90 mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed break-words">
                        {service.shortDescription || service.description}
                      </p>

                      {/* CTA Button - ensure visible, min touch target */}
                      <Link
                        to={service.link}
                        className="btn-primary inline-flex items-center justify-center space-x-2 text-base sm:text-lg px-6 py-3 sm:px-8 sm:py-4 min-h-[44px]"
                        onClick={() => setIsAutoPlaying(false)}
                      >
                        <span>CLICK HERE</span>
                        <ArrowRight className="w-5 h-5 shrink-0" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
          ))}
        </div>

        {/* Navigation Arrows - repositioned outside content, proper z-index, min 44px touch */}
        <button
          onClick={goToPrevious}
          className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-30 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-3 min-w-[44px] min-h-[44px] flex items-center justify-center transition-all"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-6 h-6 text-white shrink-0" />
        </button>
        <button
          onClick={goToNext}
          className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-30 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-3 min-w-[44px] min-h-[44px] flex items-center justify-center transition-all"
          aria-label="Next slide"
        >
          <ChevronRight className="w-6 h-6 text-white shrink-0" />
        </button>
      </div>

      {/* Dots Indicator - visible, properly spaced, 44x44 touch target */}
      <div className="flex justify-center mt-4 sm:mt-6 gap-2 sm:gap-3">
        {services.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className="group min-w-[44px] min-h-[44px] flex items-center justify-center p-2"
            aria-label={`Go to slide ${index + 1}`}
          >
            <span
              className={`block rounded-full transition-all ${
                index === currentIndex
                  ? "bg-cyan w-8 h-3"
                  : "bg-gray-600 w-3 h-3 group-hover:bg-gray-500"
              }`}
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ServicesCarousel;
