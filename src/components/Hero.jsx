import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-0 py-12 md:py-0 md:min-h-screen flex items-start md:items-center justify-center overflow-hidden pt-16 md:pt-0">
      {/* Gradient Background */}
      <div className="absolute inset-0 gradient-bg opacity-90"></div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse-slow"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-secondary-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse-slow animation-delay-2000"></div>
        <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-accent-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse-slow animation-delay-4000"></div>
      </div>

      {/* Content - top-aligned on mobile for quicker visibility */}
      <div className="relative z-10 container mx-auto px-5 sm:px-6 text-center w-full">
        <h1 className="text-[clamp(1.75rem,5vw,3.5rem)] sm:text-[clamp(2rem,5vw,4rem)] font-bold text-white mb-6 sm:mb-8 leading-tight tracking-tight break-words">
          <span className="text-white bg-clip-text bg-linear-to-r from-secondary-400 to-secondary-500">
            The Party Starts.. <br />
            When We Press Play!
          </span>
        </h1>

        <p className="text-[clamp(0.875rem,3vw,1.25rem)] sm:text-lg md:text-xl text-white/90 mb-8 sm:mb-12 max-w-3xl mx-auto leading-relaxed font-light break-words px-1">
          High-energy DJ entertainment with LED wristbands, speed quizzing, music bingo and karaoke. Turning your event into an unforgettable experience.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 justify-center items-center mb-8 md:mb-20">
          <Link
            to="/contact"
            className="btn-primary inline-flex items-center justify-center space-x-2 min-h-[44px] w-full sm:w-auto"
          >
            <span>Get Your Free Quote</span>
            <ArrowRight className="w-5 h-5 shrink-0" />
          </Link>
          <Link
            to="/services"
            className="btn-secondary inline-flex items-center justify-center min-h-[44px] w-full sm:w-auto"
          >
            <span>Explore Services</span>
          </Link>
        </div>

        {/* Stats */}
      </div>
    </section>
  );
};

export default Hero;
