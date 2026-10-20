import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-0 py-12 md:py-0 md:min-h-screen flex items-start md:items-center justify-center overflow-hidden pt-16 md:pt-0">
      {/* Background Image - behind text */}
      <div className="absolute inset-0">
        <img
          src="/images/services/wedding-djs.jpg"
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          aria-hidden
        />
        {/* Fade overlay - darkens image for text readability */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to bottom, rgba(11, 15, 26, 0.7), rgba(11, 15, 26, 0.5), rgba(11, 15, 26, 0.9))',
          }}
          aria-hidden
        />
      </div>

      {/* Content - top-aligned on mobile for quicker visibility */}
      <div className="relative z-10 container mx-auto px-5 sm:px-6 text-center w-full">
        <h1 className="text-[clamp(1.75rem,5vw,3.5rem)] sm:text-[clamp(2rem,5vw,4rem)] font-bold text-white mb-6 sm:mb-8 leading-tight tracking-tight break-words">
          <span className="gradient-text">
            Your Wedding. Your Music. <br />
            Your Kind of Night.
          </span>
        </h1>

        <p className="hero-header-text text-[clamp(0.875rem,3vw,1.25rem)] sm:text-lg md:text-xl text-white/90 mb-8 sm:mb-12 max-w-3xl mx-auto leading-relaxed font-light break-words px-1">
          Full-evening wedding DJs and after-band sets, based in Longford and covering the Midlands and beyond. Plan the music around your people, with optional LED wristbands to make the dancefloor part of the show.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 justify-center items-center mb-8 md:mb-20">
          <Link
            to="/contact"
            className="btn-primary inline-flex items-center justify-center space-x-2 min-h-[44px] w-full sm:w-auto"
          >
            <span>Check Your Wedding Date</span>
            <ArrowRight className="w-5 h-5 shrink-0" />
          </Link>
          <Link
            to="/services"
            className="btn-secondary inline-flex items-center justify-center min-h-[44px] w-full sm:w-auto"
          >
            <span>Explore DJ Services</span>
          </Link>
        </div>

        {/* Stats */}
      </div>
    </section>
  );
};

export default Hero;
