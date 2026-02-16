import { Helmet } from "@dr.pogodin/react-helmet";
import QuoteForm from "../components/QuoteForm";
import { Mail, Phone, MapPin, Clock } from "lucide-react";

const Contact = () => {
  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      value: "info@theledjs.ie",
      link: "mailto:dave@theledjs.ie",
    },
    {
      icon: MapPin,
      title: "Location",
      value: "Longford, Ireland",
      link: null,
    },
    {
      icon: Clock,
      title: "Response Time",
      value: "Within 24 hours",
      link: null,
    },
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#0B0F1A" }}>
      <Helmet>
        <title>Get In Touch - Contact The LEDJS</title>
        <meta name="description" content="Let us host your next event. LEDJS offers LED wristbands, speed quizzing, music bingo, and DJ services. Get in touch - we respond within 24 hours." />
      </Helmet>
      {/* P age Header */}
      <section className="gradient-bg py-16 sm:py-20">
        <div className="container mx-auto px-5 sm:px-6 text-center">
          <h1 className="text-[clamp(1.75rem,5vw,3rem)] sm:text-5xl md:text-6xl font-bold text-white mb-6 break-words">
            Get In Touch!
          </h1>
          <p className="text-[clamp(0.875rem,3vw,1rem)] sm:text-xl text-white/90 max-w-3xl mx-auto">
            Tell us about your event and we'll create a custom package just for
            you
          </p>
        </div>
      </section>

      {/* Contact Form and Info Section */}
      <section className="section-padding" style={{ backgroundColor: "#0B0F1A" }}>
        <div className="container mx-auto px-5 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Info */}
            <div className="lg:col-span-1">
              <h2 className="text-3xl font-bold text-white mb-6">
                Get in Touch
              </h2>
              <p className="text-gray-300 mb-8 leading-relaxed">
                Have questions? We're here to help! Fill out the form or reach
                out to us directly using the contact information below.
              </p>

              <div className="space-y-6">
                {contactInfo.map((info, index) => {
                  const Icon = info.icon;
                  const content = (
                    <div className="flex items-start space-x-4 p-4 rounded-lg transition-colors" style={{ backgroundColor: "rgba(0, 229, 255, 0.05)" }}>
                      <div className="p-3 rounded-lg" style={{ background: "linear-gradient(135deg, #00E5FF, #FF2E88)" }}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <div className="text-sm text-gray-400 mb-1">
                          {info.title}
                        </div>
                        <div className="text-white font-medium">
                          {info.value}
                        </div>
                      </div>
                    </div>
                  );

                  return info.link ? (
                    <a key={index} href={info.link} className="block">
                      {content}
                    </a>
                  ) : (
                    <div key={index}>{content}</div>
                  );
                })}
              </div>

              {/* Additional Info */}
              <div className="mt-8 p-6 rounded-lg" style={{ backgroundColor: "rgba(0, 229, 255, 0.08)", border: "1px solid rgba(0, 229, 255, 0.3)" }}>
                <h3 className="text-white font-semibold mb-2">
                  Quick Response Guarantee
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  We pride ourselves on fast, professional communication. Expect
                  to hear back from us within 24 hours, often much sooner!
                </p>
              </div>
            </div>

            {/* Quote Form */}
            <div className="lg:col-span-2">
              <div className="rounded-xl p-5 sm:p-6 md:p-8 shadow-2xl" style={{ backgroundColor: "rgba(0, 229, 255, 0.05)", border: "1px solid rgba(0, 229, 255, 0.15)" }}>
                <h2 className="text-3xl font-bold text-white mb-2">
                  Fill us in... about your event!
                </h2>
                <p className="text-gray-400 mb-8">
                  Fill out the form below and we'll get back to you with a
                  customised package for your event.
                </p>
                <QuoteForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-padding" style={{ backgroundColor: "rgba(0, 229, 255, 0.04)" }}>
        <div className="container mx-auto px-5 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-[clamp(1.5rem,5vw,2.25rem)] sm:text-4xl font-bold text-white mb-4 break-words">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-400">
              Quick answers to common questions
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-6">
            {[
              {
                question: "How far in advance should I book?",
                answer:
                  "We recommend booking 3-6 months in advance for peak season (May-October), but we can often accommodate last-minute requests depending on availability.",
              },
              {
                question: "Do you travel for events?",
                answer:
                  "Yes! We regularly service events throughout the region. Travel fees may apply for events outside our primary service area.",
              },
              {
                question: "Can I combine multiple services?",
                answer:
                  "Absolutely! Many of our clients mix and match services to create the perfect entertainment package for their event.",
              },
              {
                question: "What's included in your pricing?",
                answer:
                  "All pricing includes equipment, setup, breakdown, experienced DJ/Host throughout your event. We'll provide a detailed breakdown in your custom quote.",
              },
            ].map((faq, index) => (
              <div key={index} className="rounded-lg p-6" style={{ backgroundColor: "rgba(11, 15, 26, 0.8)", border: "1px solid rgba(0, 229, 255, 0.1)" }}>
                <h3 className="text-xl font-semibold text-white mb-3">
                  {faq.question}
                </h3>
                <p className="text-gray-400 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
