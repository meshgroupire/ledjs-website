import { useCookieConsent } from "../contexts/CookieConsent";

const CookieBanner = () => {
  const { showBanner, acceptCookies, declineCookies } = useCookieConsent();

  if (!showBanner) return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6 animate-in slide-in-from-bottom duration-300"
      role="dialog"
      aria-label="Cookie consent"
    >
      <div
        className="container mx-auto max-w-4xl rounded-lg shadow-2xl p-6 md:p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
        style={{
          backgroundColor: "#0f4446",
          border: "1px solid #135658",
        }}
      >
        <div className="flex-1">
          <h3 className="text-white font-semibold text-lg mb-2">
            We use cookies
          </h3>
          <p className="text-gray-300 text-sm md:text-base leading-relaxed">
            We use cookies for security and to protect our contact form from
            spam (Cloudflare Turnstile). Accepting cookies enables the full
            contact form. You can reach us at{" "}
            <a
              href="mailto:dave@theleds.ie"
              className="text-primary-400 hover:text-primary-300 underline"
            >
              dave@theleds.ie
            </a>{" "}
            if you prefer not to accept.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 shrink-0">
          <button
            onClick={acceptCookies}
            className="btn-primary px-6 py-2.5 inline-flex items-center justify-center"
            aria-label="Accept cookies"
          >
            Accept
          </button>
          <button
            onClick={declineCookies}
            className="px-6 py-2.5 rounded-md border border-gray-500 text-gray-300 hover:bg-gray-700 transition-colors"
            aria-label="Decline cookies"
          >
            Decline
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieBanner;
