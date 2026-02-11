import { useState, useRef } from 'react';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { Turnstile } from '@marsidev/react-turnstile';

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
const TURNSTILE_SITE_KEY = import.meta.env.VITE_TURNSTILE_SITE_KEY;

const QuoteForm = () => {
  const turnstileRef = useRef(null);
  const [captchaToken, setCaptchaToken] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    eventDate: '',
    eventType: '',
    services: [],
    guests: '',
    details: '',
  });

  const [status, setStatus] = useState({
    submitting: false,
    success: false,
    error: false,
    message: '',
  });

  const serviceOptions = [
    'LED Wristbands',
    'Speed Quizzing',
    'Music Bingo',
    'General DJ Services',
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (service) => {
    setFormData((prev) => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter((s) => s !== service)
        : [...prev.services, service],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ submitting: true, success: false, error: false, message: '' });

    // Basic validation
    if (!formData.name || !formData.email) {
      setStatus({
        submitting: false,
        success: false,
        error: true,
        message: 'Please fill in all required fields.',
      });
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setStatus({
        submitting: false,
        success: false,
        error: true,
        message: 'Please enter a valid email address.',
      });
      return;
    }

    // Captcha validation
    if (!captchaToken) {
      setStatus({
        submitting: false,
        success: false,
        error: true,
        message: 'Please complete the captcha verification.',
      });
      return;
    }

    // Form submission
    try {
      setStatus({ submitting: true, success: false, error: false });
    
      const response = await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        formData,
        { publicKey: PUBLIC_KEY }
      );
    
      console.log('EmailJS Success:', response);
    
      setStatus({
        submitting: false,
        success: true,
        error: false,
        message: "Thank you! We've received your quote request and will get back to you within 24 hours.",
      });

      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        eventDate: '',
        eventType: '',
        services: [],
        guests: '',
        details: '',
      });

      // Clear success message and reset captcha after 5 seconds
      setCaptchaToken(null);
      turnstileRef.current?.reset();
      setTimeout(() => {
        setStatus({ submitting: false, success: false, error: false, message: '' });
      }, 5000);
    } catch (error) {
      console.error('EmailJS Error:', error);

      setStatus({
        submitting: false,
        success: false,
        error: true,
        message: 'Something went wrong. Please try again or contact us directly.',
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Name */}
      <div>
        <label htmlFor="name" className="block text-white font-medium mb-2">
          Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          required
          className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/50 transition-all"
          placeholder="Your full name"
        />
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-white font-medium mb-2">
          Email <span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          required
          className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/50 transition-all"
          placeholder="your.email@example.com"
        />
      </div>

      {/* Phone */}
      <div>
        <label htmlFor="phone" className="block text-white font-medium mb-2">
          Phone
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleInputChange}
          className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/50 transition-all"
          placeholder="(086) 123-4567"
        />
      </div>

      {/* Event Date and Type */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="eventDate" className="block text-white font-medium mb-2">
            Event Date
          </label>
          <input
            type="date"
            id="eventDate"
            name="eventDate"
            value={formData.eventDate}
            onChange={handleInputChange}
            className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/50 transition-all"
          />
        </div>

        <div>
          <label htmlFor="eventType" className="block text-white font-medium mb-2">
            Event Type
          </label>
          <input
            type="text"
            id="eventType"
            name="eventType"
            value={formData.eventType}
            onChange={handleInputChange}
            className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/50 transition-all"
            placeholder="Wedding, Corporate, etc."
          />
        </div>
      </div>

      {/* Services Interested In */}
      <div>
        <label className="block text-white font-medium mb-3">
          Services Interested In
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {serviceOptions.map((service) => (
            <label
              key={service}
              className="flex items-center space-x-3 bg-gray-700 px-4 py-3 rounded-lg cursor-pointer hover:bg-gray-600 transition-colors"
            >
              <input
                type="checkbox"
                checked={formData.services.includes(service)}
                onChange={() => handleCheckboxChange(service)}
                className="w-5 h-5 text-primary-500 bg-gray-600 border-gray-500 rounded focus:ring-primary-500 focus:ring-2"
              />
              <span className="text-white">{service}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Number of Guests */}
      <div>
        <label htmlFor="guests" className="block text-white font-medium mb-2">
          Number of Guests
        </label>
        <input
          type="number"
          id="guests"
          name="guests"
          value={formData.guests}
          onChange={handleInputChange}
          min="1"
          className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/50 transition-all"
          placeholder="Estimated number of guests"
        />
      </div>

      {/* Additional Details */}
      <div>
        <label htmlFor="details" className="block text-white font-medium mb-2">
          Additional Details
        </label>
        <textarea
          id="details"
          name="details"
          value={formData.details}
          onChange={handleInputChange}
          rows="5"
          className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/50 transition-all resize-none"
          placeholder="Tell us more about your event and what you're looking for..."
        ></textarea>
      </div>

      {/* Captcha */}
      {TURNSTILE_SITE_KEY && (
        <div>
          <Turnstile
            ref={turnstileRef}
            siteKey={TURNSTILE_SITE_KEY}
            onSuccess={(token) => setCaptchaToken(token)}
            onExpire={() => setCaptchaToken(null)}
            options={{
              theme: 'dark',
              size: 'normal',
            }}
          />
        </div>
      )}

      {/* Status Messages */}
      {status.message && (
        <div
          className={`flex items-start space-x-3 p-4 rounded-lg ${
            status.success
              ? 'bg-green-500/10 border border-green-500'
              : 'bg-red-500/10 border border-red-500'
          }`}
        >
          {status.success ? (
            <CheckCircle className="w-6 h-6 text-green-500 shrink-0 mt-0.5" />
          ) : (
            <AlertCircle className="w-6 h-6 text-red-500 shrink-0 mt-0.5" />
          )}
          <p className={status.success ? 'text-green-300' : 'text-red-300'}>
            {status.message}
          </p>
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={status.submitting}
        className="btn-primary w-full inline-flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status.submitting ? (
          <>
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            <span>Sending...</span>
          </>
        ) : (
          <>
            <span>Send Quote Request</span>
            <Send className="w-5 h-5" />
          </>
        )}
      </button>
    </form>
  );
};

export default QuoteForm;
