import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { services as servicesConfig } from "../config/services";

const Services = () => {
  const services = servicesConfig;

  return (
    <div className="bg-gray-900 min-h-screen">
      <Helmet>
        <title>Our Services - LED Wristbands, Speed Quizzing & Music Bingo | LED JS</title>
        <meta name="description" content="Discover LEDJS entertainment services: LED wristbands, speed quizzing, music bingo, and professional DJ services for weddings, corporate events, and celebrations in Ireland." />
      </Helmet>
      {/* Page Header */}
      <section className="gradient-bg py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Our Services
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            Discover our range of interactive entertainment solutions designed
            to create unforgettable experiences
          </p>
        </div>
      </section>

      {/* Services Detail Sections */}
      {services.map((service, index) => {
        const isEven = index % 2 === 0;

        return (
          <section
            key={service.id}
            id={service.id}
            className={`section-padding ${
              isEven ? "bg-gray-900" : "bg-gray-800"
            }`}
          >
            <div className="container mx-auto">
              <div
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                  !isEven ? "lg:flex-row-reverse" : ""
                }`}
              >
                {/* Image */}
                <div className={`${!isEven ? "lg:order-2" : ""}`}>
                  <div className="relative rounded-xl overflow-hidden shadow-2xl">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-auto min-h-[400px] object-cover"
                      onError={(e) => {
                        e.target.style.display = "none";
                        const parent = e.target.parentElement;
                        if (!parent.querySelector(".fallback-placeholder")) {
                          parent.innerHTML += `
                            <div class="fallback-placeholder w-full min-h-[400px] bg-linear-to-br ${service.gradient} flex items-center justify-center">
                              <div class="text-center p-8">
                                <p class="text-white/80 text-sm">Place your image at: ${service.image}</p>
                              </div>
                            </div>
                          `;
                        }
                      }}
                    />
                    <div
                      className={`absolute inset-0 bg-linear-br ${service.gradient} opacity-10`}
                    />
                  </div>
                </div>

                {/* Content */}
                <div className={`${!isEven ? "lg:order-1" : ""}`}>
                  <h2 className="text-4xl font-bold text-white mb-4">
                    {service.title}
                  </h2>

                  <p className="text-lg text-gray-300 mb-4 leading-relaxed">
                    {service.description}
                  </p>

                  {service.longDescription && (
                    <p className="text-gray-400 mb-6 leading-relaxed">
                      {service.longDescription}
                    </p>
                  )}

                  {service.features && service.features.length > 0 && (
                    <>
                      <h3 className="text-xl font-semibold text-white mb-4">
                        Key Features:
                      </h3>
                      <ul className="space-y-3 mb-8">
                        {service.features.map((feature, idx) => (
                          <li key={idx}>
                            <span className="text-gray-300">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </>
                  )}

                  <Link
                    to="/contact"
                    className="btn-primary inline-flex items-center"
                  >
                    <span>Book This Service</span>
                  </Link>
                </div>
              </div>
            </div>
          </section>
        );
      })}

      {/* CTA Section */}
      <section className="section-padding gradient-bg">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Let's Create Something Amazing Together
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Mix and match our services or choose a complete package. We'll
            customize everything to fit your event perfectly.
          </p>
          <Link
            to="/contact"
            className="btn-primary inline-flex items-center bg-white text-primary-700 hover:bg-gray-100"
          >
            <span>Get Your Custom Quote</span>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Services;
