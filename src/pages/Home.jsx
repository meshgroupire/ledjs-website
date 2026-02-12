import { Link } from "react-router-dom";
import { Helmet } from "@dr.pogodin/react-helmet";
import Hero from "../components/Hero";
import ServicesCarousel from "../components/ServicesCarousel";
import {
  Radio,
  Brain,
  Music,
  Mic,
  Star,
  Quote,
  ArrowRight,
} from "lucide-react";
import { services as servicesConfig } from "../config/services";

// Icon mapping
const iconMap = {
  radio: Radio,
  brain: Brain,
  music: Music,
  mic: Mic,
};

const Home = () => {
  // Use services from config
  const services = servicesConfig.map((service) => ({
    ...service,
    Icon: iconMap[service.icon] || Music, // Default to Music if icon not found
  }));

  const testimonials = [
    {
      name: "Corporate Client",
      event: "Annual Corporate Event",
      text: "Dave has hosted a number of events for us and is always professional and a great DJ and MC. He ensures the event runs smoothly and the music is perfect for the occasion.",
      rating: 5,
    },
    {
      name: "Charlie",
      event: "Wedding Reception",
      text: "Music Bingo was the perfect icebreaker for our wedding. Guests of all ages loved it, and it created such a fun atmosphere. Highly recommend!",
      rating: 5,
    },
    {
      name: "Lisryan Community",
      event: "Charity Fundraiser",
      text: "Music helped us raise more money than ever before. Dave is a great host and the music was perfect for the event.",
      rating: 5,
    },
    {
      name: "Siobhan",
      event: "Birthday Celebration",
      text: "Dave hosted my 30th birthday party and it was amazing. No request was too much and he hosted Karaoke too!",
      rating: 5,
    },
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#1C1C1C" }}>
      <Helmet>
        <title>LED JS - Interactive DJ Entertainment</title>
        <meta name="description" content="LEDJS delivers interactive DJ entertainment with LED wristbands, speed quizzing, and music bingo. Creating unforgettable experiences for weddings, corporate events, and parties across Ireland." />
      </Helmet>
      {/* Hero Section */}
      <Hero />

      {/* Our Services Section - Sliding Banner */}
      <section style={{ backgroundColor: "#1C1C1C" }}>
        <div className="container mx-auto px-4 py-12">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
              Our Services
            </h2>
          </div>

          {/* Sliding Banner Carousel */}
          <ServicesCarousel services={services} />
         
        </div>
      </section>

      {/* Testimonials Section - What Our Customers Are Saying */}
      <section
        className="section-padding"
        style={{ backgroundColor: "#0f4446" }}
      >
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center space-x-2 mb-6">
              <Star className="w-6 h-6 fill-current text-secondary-500" />
              <Star className="w-6 h-6 fill-current text-secondary-500" />
              <Star className="w-6 h-6 fill-current text-secondary-500" />
              <Star className="w-6 h-6 fill-current text-secondary-500" />
              <Star className="w-6 h-6 fill-current text-secondary-500" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
              What Our Customers Are Saying
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="card">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-current text-secondary-500"
                    />
                  ))}
                </div>
                <h3 className="text-lg font-semibold text-white mb-3 tracking-tight">
                  {testimonial.name}
                </h3>
                <p className="text-gray-300 mb-4 text-sm leading-relaxed font-light">
                  {testimonial.text}
                </p>
                <div className="text-xs text-gray-400 font-light uppercase tracking-wide">
                  {testimonial.event}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Message Section */}
      <section
        className="section-padding"
        style={{ backgroundColor: "#1C1C1C" }}
      >
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            One Chance To Get It Right!
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8 leading-relaxed">
            Whatever event you are hosting, the entertainment can make or break
            it. Choose well with the LEDJS, where we are committed to providing
            the best entertainment for your event.
          </p>
          <Link
            to="/contact"
            className="btn-primary inline-flex items-center space-x-2"
          >
            <span>Enquire Here</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
