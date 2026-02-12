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
    <div className="bg-gray-900 min-h-screen">
      <Helmet>
        <title>Get a Quote - Contact LEDJS | Free Event Quote Request</title>
        <meta name="description" content="Request a free quote for your event. LEDJS offers LED wristbands, speed quizzing, music bingo, and DJ services. Get in touch - we respond within 24 hours." />
      </Helmet>
      {/* Page Header */}
      <section className="gradient-bg py-16 sm:py-20">
        <div className="container mx-auto px-5 sm:px-6 text-center">
          <h1 className="text-[clamp(1.75rem,5vw,3rem)] sm:text-5xl md:text-6xl font-bold text-white mb-6 break-words">
            Get Your Free Quote
          </h1>
          <p className="text-[clamp(0.875rem,3vw,1rem)] sm:text-xl text-white/90 max-w-3xl mx-auto">
            Tell us about your event and we'll create a custom package just for
            you
          </p>
        </div>
      </section>

      {/* Contact Form and Info Section */}
      <section className="section-padding bg-gray-900">
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
                    <div className="flex items-start space-x-4 p-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors">
                      <div className="bg-linear-to-br from-primary-600 to-secondary-600 p-3 rounded-lg">
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
              <div className="mt-8 p-6 bg-linear-to-br from-primary-600/10 to-secondary-600/10 rounded-lg border border-primary-500/20">
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
              <div className="bg-gray-800 rounded-xl p-5 sm:p-6 md:p-8 shadow-2xl">
                <h2 className="text-3xl font-bold text-white mb-2">
                  Request a Quote
                </h2>
                <p className="text-gray-400 mb-8">
                  Fill out the form below and we'll get back to you with a
                  customized quote for your event
                </p>
                <QuoteForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-padding bg-gray-800">
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
              <div key={index} className="bg-gray-900 rounded-lg p-6">
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
