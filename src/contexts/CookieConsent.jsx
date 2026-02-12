import { createContext, useContext, useState, useEffect } from "react";

const STORAGE_KEY = "ledjs-cookie-consent";

const CookieConsentContext = createContext({
  hasConsent: null,
  acceptCookies: () => {},
  declineCookies: () => {},
  openBanner: () => {},
});

export const useCookieConsent = () => useContext(CookieConsentContext);

export const CookieConsentProvider = ({ children }) => {
  const [hasConsent, setHasConsent] = useState(null);
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "true") {
      setHasConsent(true);
      setShowBanner(false);
    } else if (stored === "false") {
      setHasConsent(false);
      setShowBanner(false);
    } else {
      setHasConsent(null);
      setShowBanner(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem(STORAGE_KEY, "true");
    setHasConsent(true);
    setShowBanner(false);
  };

  const declineCookies = () => {
    localStorage.setItem(STORAGE_KEY, "false");
    setHasConsent(false);
    setShowBanner(false);
  };

  const openBanner = () => {
    setShowBanner(true);
  };

  return (
    <CookieConsentContext.Provider
      value={{
        hasConsent,
        showBanner,
        acceptCookies,
        declineCookies,
        openBanner,
      }}
    >
      {children}
    </CookieConsentContext.Provider>
  );
};
