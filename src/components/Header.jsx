import { useState, useRef } from "react"; // ✅ ADDED: useRef for a close-delay timer
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const location = useLocation();

  const closeTimerRef = useRef(null); // ✅ ADDED: holds a timeout id for delayed close

  const navItems = [
    { name: "HOME", path: "/" },
    {
      name: "SERVICES",
      path: "/services",
    },
    {
      name: "ABOUT",
      path: "/about",
    },
    { name: "CONTACT", path: "/contact" },
  ];

  const isActive = (path) => location.pathname === path;

  // ✅ ADDED: open dropdown and cancel any pending close
  const openDropdown = (path) => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    setActiveDropdown(path);
  };

  // ✅ ADDED: close dropdown after a short delay (prevents "gap" flicker)
  const closeDropdownWithDelay = () => {
    closeTimerRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 150);
  };

  return (
    <header
      className="sticky top-0 z-50 shadow-lg border-b"
      style={{ backgroundColor: "#1C1C1C", borderColor: "#135658" }}
    >
      <nav className="container mx-auto px-5 sm:px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center group">
            <img
              src="/images/logo.png"
              alt="LEDJS Logo"
              className="h-10 w-auto group-hover:opacity-90 transition-opacity"
              onError={(e) => {
                e.target.src = "/images/logo.svg";
              }}
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => {
              if (item.subItems) {
                return (
                  <div
                    key={item.path}
                    className="relative group"
                    onMouseEnter={() => openDropdown(item.path)} // ✅ CHANGED: uses openDropdown()
                    onMouseLeave={closeDropdownWithDelay} // ✅ CHANGED: delayed close prevents submenu disappearing
                  >
                    <Link
                      to={item.path}
                      className={`font-semibold text-sm tracking-wide uppercase transition-colors flex items-center space-x-1 ${
                        isActive(item.path)
                          ? "text-primary-500"
                          : "text-gray-300 hover:text-white"
                      }`}
                    >
                      <span>{item.name}</span>
                      <ChevronDown className="w-4 h-4" />
                    </Link>

                    {activeDropdown === item.path && (
                      <div
                        className="absolute top-full left-0 mt-2 w-56 rounded-lg shadow-xl border overflow-hidden z-50"
                        style={{
                          backgroundColor: "#0f4446",
                          borderColor: "#135658",
                        }}
                        onMouseEnter={() => openDropdown(item.path)} // ✅ ADDED: keeps it open when hovering the panel
                        onMouseLeave={closeDropdownWithDelay} // ✅ ADDED: closes when leaving the panel too
                      >
                        {item.subItems.map((subItem) => (
                          <Link
                            key={subItem.path}
                            to={subItem.path}
                            className="block px-4 py-3 transition-colors"
                            style={{ color: "#D8B382" }}
                            onMouseEnter={(e) => {
                              e.target.style.backgroundColor = "#135658";
                              e.target.style.color = "#FFFFFF";
                            }}
                            onMouseLeave={(e) => {
                              e.target.style.backgroundColor = "transparent";
                              e.target.style.color = "#D8B382";
                            }}
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`font-semibold text-sm tracking-wide uppercase transition-colors ${
                    isActive(item.path)
                      ? "text-primary-500"
                      : "text-gray-300 hover:text-white"
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </div>

          {/* Mobile Menu Button - 44x44 min touch target */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-3 min-w-[44px] min-h-[44px] flex items-center justify-center text-white hover:text-primary-500 transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div
            className="md:hidden mt-4 pb-4 border-t"
            style={{ borderColor: "#135658" }}
          >
            <div className="flex flex-col space-y-2 pt-4">
              {navItems.map((item) => (
                <div key={item.path}>
                  <Link
                    to={item.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={`font-semibold text-sm tracking-wide uppercase transition-colors py-3 min-h-[44px] flex items-center block ${
                      isActive(item.path)
                        ? "text-primary-500"
                        : "text-gray-300 hover:text-white"
                    }`}
                  >
                    {item.name}
                  </Link>

                  {item.subItems && (
                    <div className="ml-4 mt-2 space-y-2">
                      {item.subItems.map((subItem) => (
                        <Link
                          key={subItem.path}
                          to={subItem.path}
                          onClick={() => setIsMenuOpen(false)}
                          className="text-gray-400 hover:text-primary-500 transition-colors block py-1"
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
