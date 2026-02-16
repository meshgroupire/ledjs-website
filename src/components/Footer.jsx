import { Link } from "react-router-dom";
import {
  Facebook,
  Instagram,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Our Services", path: "/services" },
    { name: "Who We Are", path: "/about" },
    { name: "Get In Touch", path: "/contact" },
  ];  

  const socialLinks = [
    { name: "Facebook", icon: Facebook, url: "https://facebook.com/theledjs" },
    { name: "Instagram", icon: Instagram, url: "https://instagram.com/theledjs" },
  ];

  return (
    <footer className="border-t" style={{ backgroundColor: "#0B0F1A", borderColor: "rgba(0, 229, 255, 0.2)" }}>
      <div className="container mx-auto px-5 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div>
            <Link to="/" className="inline-block mb-4">
              <img
                src="/images/logo.png"
                alt="LEDJS Logo"
                className="h-10 w-auto hover:opacity-90 transition-opacity"
                onError={(e) => {
                  e.target.src = "/images/logo.svg";
                }}
              />
            </Link>
            <p className="text-gray-400 mb-4">
              Creating unforgettable interactive entertainment experiences for
              your special events.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-lg transition-all duration-300 hover:scale-110"
            style={{ backgroundColor: "rgba(0, 229, 255, 0.1)" }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "rgba(255, 46, 136, 0.3)";
              e.currentTarget.style.boxShadow = "0 0 15px rgba(255, 46, 136, 0.4)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "rgba(0, 229, 255, 0.1)";
              e.currentTarget.style.boxShadow = "none";
            }}
                    aria-label={social.name}
                  >
                    <Icon className="w-5 h-5 text-cyan" style={{ color: "#00E5FF" }} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-cyan transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <Mail className="w-5 h-5 mt-0.5" style={{ color: "#00E5FF" }} />
                <a
                  href="mailto:dave@theledjs.ie"
                  className="text-gray-400 hover:text-cyan transition-colors"
                >
                  info@theledjs.ie
                </a>
              </li>
              <li className="flex items-start space-x-3">
                <Phone className="w-5 h-5 mt-0.5" style={{ color: "#00E5FF" }} />
                <a
                  href="tel:+1234567890"
                  className="text-gray-400 hover:text-cyan transition-colors"
                >
                  (086) 895 7442
                </a>
              </li>
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 mt-0.5" style={{ color: "#00E5FF" }} />
                <span className="text-gray-400">Longford, Ireland</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center text-gray-400" style={{ borderColor: "rgba(0, 229, 255, 0.2)" }}>
          <p>&copy; {currentYear} LEDJS. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
