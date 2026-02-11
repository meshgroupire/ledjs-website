import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 gradient-bg opacity-90"></div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse-slow"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-secondary-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse-slow animation-delay-2000"></div>
        <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-accent-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse-slow animation-delay-4000"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight tracking-tight">
          <span className="text-white bg-clip-text bg-linear-to-r from-secondary-400 to-secondary-500">
            The Party Starts 
            When We Press Play!          </span>
        </h1>

        <p className="text-lg md:text-xl lg:text-2xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed font-light">
          Transform your events with LED wristbands, speed quizzing, music
          bingo, and karaoke. Create unforgettable experiences your guests will
          love.
        </p>

        <div className="flex flex-col sm:flex-row gap-5 justify-center items-center mb-20">
          <Link
            to="/contact"
            className="btn-primary inline-flex items-center space-x-2"
          >
            <span>Get Your Free Quote</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
          <Link
            to="/services"
            className="btn-secondary inline-flex items-center"
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
