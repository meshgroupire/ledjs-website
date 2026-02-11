import { Link } from "react-router-dom";
import {
  Award,
  Users,
  Heart,
  Lightbulb,
  Target,
  Star,
  Quote,
} from "lucide-react";

const About = () => {
  const values = [
    {
      icon: Heart,
      title: "Passion for Entertainment",
      description: "We love what we do and it shows in every event we host.",
    },
    {
      icon: Lightbulb,
      title: "Innovation First",
      description:
        "Always exploring new technologies to enhance your experience.",
    },
    {
      icon: Target,
      title: "Client-Focused",
      description: "Your vision and satisfaction drive everything we do.",
    },
    {
      icon: Award,
      title: "Professional Excellence",
      description: "Top-tier equipment and service, every single time.",
    },
  ];

  const clients = [
    { name: "Abbott", logo: "/images/logos/logo_abbott.png" },
    { name: "PV's Longford", logo: "/images/logos/logo_pvs.png" },
    {
      name: "Longford County Council",
      logo: "/images/logos/logo_longfordcoco.png",
    },
    {
      name: "95 Entertainment",
      logo: "/images/logos/logo_95entertainment.png",
    },
    { name: "Global Logic", logo: "/images/logos/logo_globallogic.png" },
  ];

  const galleryImages = [
    { url: "/images/services/ledjs8.jpg", alt: "LED Wristband Event 1" },
    {
      url: "/images/services/ledjs6.jpg",
      alt: "Speed Quizzing Event",
    },
    {
      url: "/images/services/ledjs1.jpg",
      alt: "Music Bingo Event",
    },
    {
      url: "/images/services/ledjs3.jpg",
      alt: "LED Wristband Event 2",
    },
    {
      url: "/images/services/ledjs4.jpg",
      alt: "Corporate Event",
    },
    {
      url: "/images/services/ledjs5.jpg",
      alt: "Wedding Event",
    },
  ];

  return (
    <div className="bg-gray-900 min-h-screen">
      {/* Page Header */}
      <section className="gradient-bg py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            About LEDJs
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            Creating unforgettable experiences one event at a time.
          </p>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="section-padding bg-gray-900">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-white mb-6">Our Story</h2>
              <div className="space-y-4 text-gray-300 leading-relaxed">
                <p>
                  The LEDJs was born from a simple belief, that events should be
                  more than just gatherings. they should be experiences that
                  people remember for years to come.
                </p>
                <p>
                  What started as a passion for music has grown into a full
                  service DJ company. We've had the privilege of bringing joy to
                  thousands of guests across hundreds of events, from intimate
                  weddings to large-scale corporate gatherings.
                </p>
                <p>
                  Our team combines technical expertise with creative vision to
                  deliver entertainment experiences that truly stand out. We're
                  not just DJs, we're experience creators, using cutting-edge
                  technology like LED wristbands, interactive quizzing systems,
                  and music-driven games to transform ordinary events into
                  extraordinary memories.
                </p>
                <p>
                  Every event is unique, and we treat it that way. Whether
                  you're planning a corporate event, wedding, festival, or
                  private party, we work closely with you to customise our
                  services to match your vision perfectly.
                </p>
              </div>
            </div>

            <div className="relative">
              <img
                src="/images/services/ledjs2.jpg"
                alt="LEDJS Team"
                className="rounded-xl shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-primary-600 to-secondary-600 opacity-20 rounded-xl"></div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-gray-800">
        <div className="container mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Some of our valued clients
            </h2>
          </div>
          <div className="flex items-center gap-12 overflow-x-auto no-scrollbar">
            {clients.map((client, index) => (
              <div
                key={index}
                className="flex-shrink-0 flex items-center justify-center h-32"
              >
                <img
                  src={client.logo}
                  alt={client.name}
                  className="h-96 md:h-96 lg:h-28 object-contain grayscale opacity-80 hover:opacity-100 hover:grayscale-0 transition"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="section-padding bg-gray-900">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              What Drives Us
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Our core values guide everything we do
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div key={index} className="card text-center">
                  <div className="inline-flex p-4 rounded-full bg-gradient-to-br from-primary-600 to-secondary-600 mb-4">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {value.title}
                  </h3>
                  <p className="text-gray-400">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="section-padding bg-gray-800">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Event Gallery
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              A glimpse into the unforgettable experiences we've created
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryImages.map((image, index) => (
              <div
                key={index}
                className="relative overflow-hidden rounded-xl group cursor-pointer"
              >
                <img
                  src={image.url}
                  alt={image.alt}
                  className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding gradient-bg">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Work Together?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Let's create an unforgettable experience for your next event
          </p>
          <Link
            to="/contact"
            className="btn-primary inline-flex items-center space-x-2 bg-white text-primary-700 hover:bg-gray-100"
          >
            <span>Get in Touch</span>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default About;
