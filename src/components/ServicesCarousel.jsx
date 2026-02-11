import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

const ServicesCarousel = ({ services }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % services.length);
    }, 4000); // Change slide every 4 seconds

    return () => clearInterval(interval);
  }, [services.length, isAutoPlaying]);

  const goToSlide = (index) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false); // Pause auto-play when manually navigating
    // Resume auto-play after 10 seconds
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const goToPrevious = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + services.length) % services.length
    );
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % services.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  return (
    <div className="relative w-full">
      {/* Carousel Container */}
      <div className="relative overflow-hidden rounded-lg">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {services.map((service, index) => {
            const Icon = service.Icon;
            return (
              <div
                key={service.id || index}
                className="min-w-full flex-shrink-0"
              >
                <div className="relative h-[500px] md:h-[600px] w-full">
                  {/* Service Image Background */}
                  <div className="absolute inset-0">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.style.display = "none";
                        const parent = e.target.parentElement;
                        if (!parent.querySelector(".fallback-bg")) {
                          parent.innerHTML += `
                            <div class="fallback-bg w-full h-full bg-gradient-to-br ${service.gradient}"></div>
                          `;
                        }
                      }}
                    />
                    {/* Gradient Overlay */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-70`}
                    ></div>
                    <div className="absolute inset-0 bg-black/40"></div>
                  </div>

                  {/* Content Overlay */}
                  <div className="relative z-10 h-full flex items-center justify-center">
                    <div className="text-center px-4 max-w-4xl">
                      {/* Title */}
                      <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
                        {service.title}
                      </h2>

                      {/* Description */}
                      <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed">
                        {service.shortDescription || service.description}
                      </p>

                      {/* CTA Button */}
                      <Link
                        to={service.link}
                        className="btn-primary inline-flex items-center space-x-2 text-lg px-8 py-4"
                        onClick={() => setIsAutoPlaying(false)}
                      >
                        <span>CLICK HERE</span>
                        <ArrowRight className="w-5 h-5" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={goToPrevious}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-3 transition-all"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>
        <button
          onClick={goToNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-3 transition-all"
          aria-label="Next slide"
        >
          <ChevronRight className="w-6 h-6 text-white" />
        </button>
      </div>

      {/* Dots Indicator */}
      <div className="flex justify-center mt-6 gap-2">
        {services.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-3 rounded-full transition-all ${
              index === currentIndex
                ? "bg-primary-500 w-8"
                : "bg-gray-600 w-3 hover:bg-gray-500"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default ServicesCarousel;
