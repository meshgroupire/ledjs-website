import { useState } from "react";
import { Helmet } from "@dr.pogodin/react-helmet";
import {
  ChevronLeft,
  ChevronRight,
  Send,
  CheckCircle,
  AlertCircle,
  Heart,
} from "lucide-react";
import emailjs from "@emailjs/browser";

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID =
  import.meta.env.VITE_EMAILJS_WEDDING_TEMPLATE_ID ||
  import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

const STEPS = [
  "Couple & Event",
  "Timeline",
  "Introductions",
  "Music Style",
  "Playlists",
  "Special Moments",
  "MC Style",
  "Final Details",
];

const inputClasses =
  "w-full min-h-[44px] px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/50 transition-all text-base";

const labelClasses = "block text-white font-medium mb-2";

const WeddingQuestionnaire = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    brideName: "",
    groomName: "",
    email: "",
    phone: "",
    pronounceBride: "",
    pronounceGroom: "",
    weddingDate: "",
    guestCount: "",
    venueName: "",
    venueAddress: "",
    venueContact: "",
    ceremonyMusic: "",
    ceremonyStart: "",
    ceremonyLocation: "",
    receptionStart: "",
    drinksReception: "",
    dinnerStart: "",
    speechesTime: "",
    firstDance: "",
    cakeCutting: "",
    aftersStart: "",
    receptionEnd: "",
    dinnerStyle: "",
    announceFood: "",
    introStyle: "",
    bridalParty: "",
    partyIntro: "",
    speechOrder: "",
    gracePerson: "",
    musicStyle: "",
    priorities: [],
    guestDemographic: "",
    preludeSongs: "",
    processionalSong: "",
    bridalEntranceSong: "",
    signingRegister: "",
    recessionalSong: "",
    drinksReceptionStyle: "",
    drinksReceptionSpecific: "",
    dinnerStyleMusic: "",
    dinnerSpecific: "",
    afters: "",
    aftersCount: "",
    aftersMusic: "",
    firstDanceSong: "",
    firstDanceVersion: "",
    firstDanceEdit: "",
    parentDances: "",
    mustPlaySongs: "",
    playIfPossible: "",
    doNotPlay: "",
    explicitContent: "",
    traditions: [],
    bouquetSong: "",
    garterSong: "",
    lastDanceSong: "",
    specialDedications: "",
    surprises: "",
    mcStyle: [],
    guestRequests: "",
    danceStrategy: "",
    interactive: [],
    otherEntertainment: "",
    otherEntDetails: "",
    coordinator: "",
    pointPerson: "",
    venueRestrictions: "",
    addons: [],
    inspirations: "",
    concerns: "",
    dreamVibe: "",
    additionalNotes: "",
  });

  const [status, setStatus] = useState({
    submitting: false,
    success: false,
    error: false,
    message: "",
  });

  const totalSteps = STEPS.length;

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? prev[name].includes(value)
            ? prev[name].filter((v) => v !== value)
            : [...prev[name], value]
          : value,
    }));
  };

  const handleCheckboxArray = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: prev[name].includes(value)
        ? prev[name].filter((v) => v !== value)
        : [...prev[name], value],
    }));
  };

  const formatForEmail = () => {
    const lines = [];
    const add = (label, value) => {
      if (value && String(value).trim()) lines.push(`${label}: ${value}`);
    };
    const addArr = (label, arr) => {
      if (arr?.length) lines.push(`${label}: ${arr.join(", ")}`);
    };

    lines.push("=== COUPLE & EVENT ===");
    add("Bride", formData.brideName);
    add("Groom", formData.groomName);
    add("Email", formData.email);
    add("Phone", formData.phone);
    add("Pronounce Bride", formData.pronounceBride);
    add("Pronounce Groom", formData.pronounceGroom);
    add("Wedding Date", formData.weddingDate);
    add("Guest Count", formData.guestCount);
    add("Venue", formData.venueName);
    add("Venue Address", formData.venueAddress);
    add("Venue Contact", formData.venueContact);

    lines.push("\n=== TIMELINE ===");
    add("Ceremony Music", formData.ceremonyMusic);
    add("Ceremony Start", formData.ceremonyStart);
    add("Ceremony Location", formData.ceremonyLocation);
    add("Reception Start", formData.receptionStart);
    add("Drinks Reception", formData.drinksReception);
    add("Meal Service", formData.dinnerStart);
    add("Speeches", formData.speechesTime);
    add("First Dance Time", formData.firstDance);
    add("Cake Cutting", formData.cakeCutting);
    add("Afters Start", formData.aftersStart);
    add("Reception End", formData.receptionEnd);
    add("Dinner Style", formData.dinnerStyle);
    add("Announce Buffet", formData.announceFood);

    lines.push("\n=== INTRODUCTIONS ===");
    add("Intro Style", formData.introStyle);
    add("Bridal Party", formData.bridalParty);
    add("Party Intro", formData.partyIntro);
    add("Speech Order", formData.speechOrder);
    add("Grace", formData.gracePerson);

    lines.push("\n=== MUSIC PREFERENCES ===");
    add("Music Style", formData.musicStyle);
    addArr("Priorities", formData.priorities);
    add("Guest Demographics", formData.guestDemographic);
    add("Prelude", formData.preludeSongs);
    add("Processional", formData.processionalSong);
    add("Bridal Entrance", formData.bridalEntranceSong);
    add("Signing", formData.signingRegister);
    add("Recessional", formData.recessionalSong);
    add("Drinks Style", formData.drinksReceptionStyle);
    add("Drinks Requests", formData.drinksReceptionSpecific);
    add("Meal Style", formData.dinnerStyleMusic);
    add("Meal Requests", formData.dinnerSpecific);
    add("Afters", formData.afters);
    add("Afters Count", formData.aftersCount);
    add("Afters Music", formData.aftersMusic);

    lines.push("\n=== FIRST DANCE & PLAYLISTS ===");
    add("First Dance Song", formData.firstDanceSong);
    add("First Dance Version", formData.firstDanceVersion);
    add("First Dance Notes", formData.firstDanceEdit);
    add("Parent Dances", formData.parentDances);
    add("Must-Play", formData.mustPlaySongs);
    add("Play If Possible", formData.playIfPossible);
    add("Do NOT Play", formData.doNotPlay);
    add("Explicit Content", formData.explicitContent);

    lines.push("\n=== SPECIAL MOMENTS ===");
    addArr("Traditions", formData.traditions);
    add("Bouquet Song", formData.bouquetSong);
    add("Garter Song", formData.garterSong);
    add("Last Dance", formData.lastDanceSong);
    add("Dedications", formData.specialDedications);
    add("Surprises", formData.surprises);

    lines.push("\n=== MC & LOGISTICS ===");
    addArr("MC Style", formData.mcStyle);
    add("Guest Requests", formData.guestRequests);
    add("Dance Strategy", formData.danceStrategy);
    addArr("Interactive", formData.interactive);
    add("Other Entertainment", formData.otherEntertainment);
    add("Other Entertainment Details", formData.otherEntDetails);
    add("Coordinator", formData.coordinator);
    add("Point Person", formData.pointPerson);
    add("Venue Restrictions", formData.venueRestrictions);
    addArr("Add-ons", formData.addons);

    lines.push("\n=== ADDITIONAL ===");
    add("Inspirations", formData.inspirations);
    add("Concerns", formData.concerns);
    add("Dream Vibe", formData.dreamVibe);
    add("Notes", formData.additionalNotes);

    return lines.join("\n");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ submitting: true, success: false, error: false, message: "" });

    if (!formData.brideName || !formData.groomName || !formData.email || !formData.phone) {
      setStatus({
        submitting: false,
        error: true,
        message: "Please fill in bride, groom, email, and phone.",
      });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setStatus({
        submitting: false,
        error: true,
        message: "Please enter a valid email address.",
      });
      return;
    }

    try {
      const payload = {
        name: `${formData.brideName} & ${formData.groomName}`,
        email: formData.email,
        phone: formData.phone,
        details: formatForEmail(),
        weddingQuestionnaire: formatForEmail(),
        time: new Date().toLocaleString("en-IE", {
          dateStyle: "medium",
          timeStyle: "short",
        }),
      };

      await emailjs.send(SERVICE_ID, TEMPLATE_ID, payload, {
        publicKey: PUBLIC_KEY,
      });

      setStatus({
        submitting: false,
        success: true,
        error: false,
        message:
          "Thank you! We've received your questionnaire and will be in touch within 48 hours.",
      });
    } catch (err) {
      console.error("Wedding questionnaire error:", err);
      setStatus({
        submitting: false,
        success: false,
        error: true,
        message:
          "Something went wrong. Please try again or contact us directly.",
      });
    }
  };

  const canProceed = () => {
    if (step === 1) {
      return (
        formData.brideName?.trim() &&
        formData.groomName?.trim() &&
        formData.email?.trim() &&
        formData.phone?.trim()
      );
    }
    return true;
  };

  if (status.success) {
    return (
      <div
        className="min-h-screen flex items-center justify-center px-5 py-16"
        style={{ backgroundColor: "#1C1C1C" }}
      >
        <Helmet>
          <title>Questionnaire Submitted | LEDJS Wedding DJ</title>
        </Helmet>
        <div className="max-w-lg w-full text-center">
          <CheckCircle className="w-16 h-16 text-primary-500 mx-auto mb-6" />
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            Thank You!
          </h1>
          <p className="text-gray-300 mb-8">{status.message}</p>
          <p className="text-gray-500 text-sm italic">
            We'll review your responses and be in touch within 48 hours to
            discuss your perfect wedding soundtrack.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen py-12 px-4 sm:px-6"
      style={{ backgroundColor: "#1C1C1C" }}
    >
      <Helmet>
        <title>Pre-Wedding DJ Questionnaire | LEDJS</title>
        <meta
          name="robots"
          content="noindex, nofollow"
        />
      </Helmet>

      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 text-secondary-500 mb-4">
            <Heart className="w-5 h-5" />
            <span className="text-sm font-semibold tracking-wider uppercase">
              Wedding DJ
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
            Pre-Wedding Questionnaire
          </h1>
          <p className="text-gray-400 text-sm sm:text-base">
            Let's make your special day unforgettable
          </p>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between gap-1 mb-2">
            {STEPS.map((s, i) => (
              <div
                key={s}
                className={`h-1 flex-1 rounded-full transition-colors ${
                  i + 1 <= step ? "bg-primary-500" : "bg-gray-700"
                }`}
                title={s}
              />
            ))}
          </div>
          <p className="text-xs text-gray-500 text-center">
            Step {step} of {totalSteps}: {STEPS[step - 1]}
          </p>
        </div>

        {/* Intro (step 1 only) */}
        {step === 1 && (
          <div className="mb-8 p-4 bg-gray-800/50 border-l-4 border-primary-500 rounded-r-lg">
            <p className="text-gray-300 text-sm">
              This questionnaire helps us understand your vision. Complete at
              least 2–3 weeks before your wedding. Don't worry if you don't have
              all the answers—we can refine details together!
            </p>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Step 1: Couple & Event */}
          {step === 1 && (
            <div className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="brideName" className={labelClasses}>
                    Bride's Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="brideName"
                    name="brideName"
                    value={formData.brideName}
                    onChange={handleChange}
                    className={inputClasses}
                    placeholder="e.g. Sarah Murphy"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="groomName" className={labelClasses}>
                    Groom's Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="groomName"
                    name="groomName"
                    value={formData.groomName}
                    onChange={handleChange}
                    className={inputClasses}
                    placeholder="e.g. John Smith"
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="email" className={labelClasses}>
                    Contact Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={inputClasses}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="phone" className={labelClasses}>
                    Contact Phone <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={inputClasses}
                    inputMode="tel"
                    required
                  />
                </div>
              </div>
              <div>
                <label htmlFor="weddingDate" className={labelClasses}>
                  Wedding Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  id="weddingDate"
                  name="weddingDate"
                  value={formData.weddingDate}
                  onChange={handleChange}
                  className={inputClasses}
                  required
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="guestCount" className={labelClasses}>
                    Expected Guest Count <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    id="guestCount"
                    name="guestCount"
                    value={formData.guestCount}
                    onChange={handleChange}
                    className={inputClasses}
                    min="1"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="venueName" className={labelClasses}>
                    Venue Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="venueName"
                    name="venueName"
                    value={formData.venueName}
                    onChange={handleChange}
                    className={inputClasses}
                    required
                  />
                </div>
              </div>
              <div>
                <label htmlFor="venueAddress" className={labelClasses}>
                  Venue Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="venueAddress"
                  name="venueAddress"
                  value={formData.venueAddress}
                  onChange={handleChange}
                  className={inputClasses}
                  required
                />
              </div>
              <div>
                <label htmlFor="pronounceBride" className={labelClasses}>
                  How to pronounce bride's name <span className="text-gray-500 text-xs">(if needed)</span>
                </label>
                <input
                  type="text"
                  id="pronounceBride"
                  name="pronounceBride"
                  value={formData.pronounceBride}
                  onChange={handleChange}
                  className={inputClasses}
                  placeholder="e.g. Siobhan (Shi-VAWN)"
                />
              </div>
              <div>
                <label htmlFor="pronounceGroom" className={labelClasses}>
                  How to pronounce groom's name <span className="text-gray-500 text-xs">(if needed)</span>
                </label>
                <input
                  type="text"
                  id="pronounceGroom"
                  name="pronounceGroom"
                  value={formData.pronounceGroom}
                  onChange={handleChange}
                  className={inputClasses}
                />
              </div>
              <div>
                <label htmlFor="venueContact" className={labelClasses}>
                  Venue contact person & phone
                </label>
                <input
                  type="text"
                  id="venueContact"
                  name="venueContact"
                  value={formData.venueContact}
                  onChange={handleChange}
                  className={inputClasses}
                  placeholder="Optional"
                />
              </div>
            </div>
          )}

          {/* Step 2: Timeline */}
          {step === 2 && (
            <div className="space-y-5">
              <div className="p-3 bg-amber-900/20 border-l-4 border-amber-500 rounded-r text-amber-200 text-sm">
                Provide your best estimate—we'll finalize with your venue.
              </div>
              <div>
                <label className={labelClasses}>DJ providing ceremony music?</label>
                <div className="flex gap-6">
                  {["yes", "no"].map((v) => (
                    <label key={v} className="flex items-center gap-2 cursor-pointer text-gray-300">
                      <input
                        type="radio"
                        name="ceremonyMusic"
                        value={v}
                        checked={formData.ceremonyMusic === v}
                        onChange={handleChange}
                        className="text-primary-500"
                      />
                      {v === "yes" ? "Yes" : "No"}
                    </label>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="ceremonyStart" className={labelClasses}>
                    Ceremony start time
                  </label>
                  <input
                    type="time"
                    id="ceremonyStart"
                    name="ceremonyStart"
                    value={formData.ceremonyStart}
                    onChange={handleChange}
                    className={inputClasses}
                  />
                </div>
                <div>
                  <label htmlFor="ceremonyLocation" className={labelClasses}>
                    Ceremony location
                  </label>
                  <input
                    type="text"
                    id="ceremonyLocation"
                    name="ceremonyLocation"
                    value={formData.ceremonyLocation}
                    onChange={handleChange}
                    className={inputClasses}
                    placeholder="Church or outdoor"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="receptionStart" className={labelClasses}>
                    Reception start <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="time"
                    id="receptionStart"
                    name="receptionStart"
                    value={formData.receptionStart}
                    onChange={handleChange}
                    className={inputClasses}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="receptionEnd" className={labelClasses}>
                    Reception end <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="time"
                    id="receptionEnd"
                    name="receptionEnd"
                    value={formData.receptionEnd}
                    onChange={handleChange}
                    className={inputClasses}
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="drinksReception" className={labelClasses}>
                    Drinks reception start
                  </label>
                  <input
                    type="time"
                    id="drinksReception"
                    name="drinksReception"
                    value={formData.drinksReception}
                    onChange={handleChange}
                    className={inputClasses}
                  />
                </div>
                <div>
                  <label htmlFor="dinnerStart" className={labelClasses}>
                    Meal service time
                  </label>
                  <input
                    type="time"
                    id="dinnerStart"
                    name="dinnerStart"
                    value={formData.dinnerStart}
                    onChange={handleChange}
                    className={inputClasses}
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="speechesTime" className={labelClasses}>
                    Speeches time
                  </label>
                  <input
                    type="time"
                    id="speechesTime"
                    name="speechesTime"
                    value={formData.speechesTime}
                    onChange={handleChange}
                    className={inputClasses}
                  />
                </div>
                <div>
                  <label htmlFor="firstDance" className={labelClasses}>
                    First dance time
                  </label>
                  <input
                    type="time"
                    id="firstDance"
                    name="firstDance"
                    value={formData.firstDance}
                    onChange={handleChange}
                    className={inputClasses}
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="cakeCutting" className={labelClasses}>
                    Cake cutting time
                  </label>
                  <input
                    type="time"
                    id="cakeCutting"
                    name="cakeCutting"
                    value={formData.cakeCutting}
                    onChange={handleChange}
                    className={inputClasses}
                  />
                </div>
                <div>
                  <label htmlFor="aftersStart" className={labelClasses}>
                    Afters start <span className="text-gray-500 text-xs">(evening guests)</span>
                  </label>
                  <input
                    type="time"
                    id="aftersStart"
                    name="aftersStart"
                    value={formData.aftersStart}
                    onChange={handleChange}
                    className={inputClasses}
                  />
                </div>
              </div>
              <div>
                <label htmlFor="dinnerStyle" className={labelClasses}>
                  Meal service style
                </label>
                <select
                  id="dinnerStyle"
                  name="dinnerStyle"
                  value={formData.dinnerStyle}
                  onChange={handleChange}
                  className={inputClasses}
                >
                  <option value="">Select...</option>
                  <option value="plated">Plated / Sit-down</option>
                  <option value="buffet">Buffet</option>
                  <option value="carvery">Carvery</option>
                  <option value="family">Family style</option>
                  <option value="stations">Food stations</option>
                </select>
              </div>
              <div>
                <label className={labelClasses}>
                  Should DJ announce when guests can approach buffet?
                </label>
                <div className="flex gap-6">
                  {["yes", "no"].map((v) => (
                    <label key={v} className="flex items-center gap-2 cursor-pointer text-gray-300">
                      <input
                        type="radio"
                        name="announceFood"
                        value={v}
                        checked={formData.announceFood === v}
                        onChange={handleChange}
                        className="text-primary-500"
                      />
                      {v === "yes" ? "Yes" : "No"}
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Introductions */}
          {step === 3 && (
            <div className="space-y-5">
              <div>
                <label htmlFor="introStyle" className={labelClasses}>
                  How would you like to be introduced? <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="introStyle"
                  name="introStyle"
                  value={formData.introStyle}
                  onChange={handleChange}
                  className={inputClasses}
                  placeholder="e.g. Mr. and Mrs. Smith, John and Mary Smith"
                  required
                />
              </div>
              <div>
                <label htmlFor="bridalParty" className={labelClasses}>
                  Bridal party (names & pronunciations)
                </label>
                <textarea
                  id="bridalParty"
                  name="bridalParty"
                  value={formData.bridalParty}
                  onChange={handleChange}
                  className={`${inputClasses} min-h-[100px] resize-y`}
                  placeholder={"Best Man: Michael O'Brien (O-BRY-an)\nMaid of Honour: Sarah Murphy"}
                />
              </div>
              <div>
                <label className={labelClasses}>
                  Introduce bridal party when entering?
                </label>
                <div className="flex gap-6">
                  {["yes", "no"].map((v) => (
                    <label key={v} className="flex items-center gap-2 cursor-pointer text-gray-300">
                      <input
                        type="radio"
                        name="partyIntro"
                        value={v}
                        checked={formData.partyIntro === v}
                        onChange={handleChange}
                        className="text-primary-500"
                      />
                      {v === "yes" ? "Yes" : "No"}
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <label htmlFor="speechOrder" className={labelClasses}>
                  Order of speeches
                </label>
                <textarea
                  id="speechOrder"
                  name="speechOrder"
                  value={formData.speechOrder}
                  onChange={handleChange}
                  className={`${inputClasses} min-h-[80px] resize-y`}
                  placeholder={"1. Father of the Bride\n2. Best Man\n3. Maid of Honour"}
                />
              </div>
              <div>
                <label htmlFor="gracePerson" className={labelClasses}>
                  Who will say Grace before the meal?
                </label>
                <input
                  type="text"
                  id="gracePerson"
                  name="gracePerson"
                  value={formData.gracePerson}
                  onChange={handleChange}
                  className={inputClasses}
                  placeholder="If yes, who?"
                />
              </div>
            </div>
          )}

          {/* Step 4: Music style */}
          {step === 4 && (
            <div className="space-y-5">
              <div>
                <label htmlFor="musicStyle" className={labelClasses}>
                  Overall music style / vibe
                </label>
                <textarea
                  id="musicStyle"
                  name="musicStyle"
                  value={formData.musicStyle}
                  onChange={handleChange}
                  className={`${inputClasses} min-h-[80px] resize-y`}
                  placeholder="e.g. Mix of classic & modern, heavy on 80s/90s, Irish trad, dance/electronic"
                />
              </div>
              <div>
                <label className={labelClasses}>Reception priority</label>
                <div className="space-y-2">
                  {[
                    ["packed_dancefloor", "Packed dance floor all night"],
                    ["background_ambience", "Background ambience for conversation"],
                    ["varied_ages", "Music for all age groups"],
                    ["specific_style", "Stick to our specific style"],
                  ].map(([val, lab]) => (
                    <label key={val} className="flex items-center gap-3 cursor-pointer text-gray-300">
                      <input
                        type="checkbox"
                        checked={formData.priorities?.includes(val)}
                        onChange={() => handleCheckboxArray("priorities", val)}
                        className="rounded text-primary-500"
                      />
                      {lab}
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <label htmlFor="guestDemographic" className={labelClasses}>
                  Guest demographics & musical tastes
                </label>
                <textarea
                  id="guestDemographic"
                  name="guestDemographic"
                  value={formData.guestDemographic}
                  onChange={handleChange}
                  className={`${inputClasses} min-h-[80px] resize-y`}
                  placeholder="Age ranges, cultural backgrounds—helps us read the room"
                />
              </div>
              <div>
                <label htmlFor="preludeSongs" className={labelClasses}>
                  Prelude music (as guests arrive)
                </label>
                <textarea
                  id="preludeSongs"
                  name="preludeSongs"
                  value={formData.preludeSongs}
                  onChange={handleChange}
                  className={`${inputClasses} min-h-[60px] resize-y`}
                  placeholder="Song titles and artists"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="processionalSong" className={labelClasses}>
                    Processional song
                  </label>
                  <input
                    type="text"
                    id="processionalSong"
                    name="processionalSong"
                    value={formData.processionalSong}
                    onChange={handleChange}
                    className={inputClasses}
                  />
                </div>
                <div>
                  <label htmlFor="bridalEntranceSong" className={labelClasses}>
                    Bridal entrance song
                  </label>
                  <input
                    type="text"
                    id="bridalEntranceSong"
                    name="bridalEntranceSong"
                    value={formData.bridalEntranceSong}
                    onChange={handleChange}
                    className={inputClasses}
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="signingRegister" className={labelClasses}>
                    Signing of register
                  </label>
                  <input
                    type="text"
                    id="signingRegister"
                    name="signingRegister"
                    value={formData.signingRegister}
                    onChange={handleChange}
                    className={inputClasses}
                  />
                </div>
                <div>
                  <label htmlFor="recessionalSong" className={labelClasses}>
                    Recessional song
                  </label>
                  <input
                    type="text"
                    id="recessionalSong"
                    name="recessionalSong"
                    value={formData.recessionalSong}
                    onChange={handleChange}
                    className={inputClasses}
                  />
                </div>
              </div>
              <div>
                <label htmlFor="drinksReceptionStyle" className={labelClasses}>
                  Drinks reception music style
                </label>
                <select
                  id="drinksReceptionStyle"
                  name="drinksReceptionStyle"
                  value={formData.drinksReceptionStyle}
                  onChange={handleChange}
                  className={inputClasses}
                >
                  <option value="">Select...</option>
                  <option value="jazz">Jazz standards</option>
                  <option value="acoustic">Acoustic</option>
                  <option value="classical">Classical</option>
                  <option value="irish_trad">Irish traditional</option>
                  <option value="lounge">Lounge / chill</option>
                  <option value="soft_pop">Soft pop / rock</option>
                  <option value="dj_choice">DJ's choice</option>
                </select>
              </div>
              <div>
                <label htmlFor="drinksReceptionSpecific" className={labelClasses}>
                  Specific drinks reception song requests
                </label>
                <textarea
                  id="drinksReceptionSpecific"
                  name="drinksReceptionSpecific"
                  value={formData.drinksReceptionSpecific}
                  onChange={handleChange}
                  className={`${inputClasses} min-h-[60px] resize-y`}
                  placeholder="Any specific songs or artists during drinks?"
                />
              </div>
              <div>
                <label htmlFor="dinnerStyleMusic" className={labelClasses}>
                  Meal music style
                </label>
                <select
                  id="dinnerStyleMusic"
                  name="dinnerStyleMusic"
                  value={formData.dinnerStyleMusic}
                  onChange={handleChange}
                  className={inputClasses}
                >
                  <option value="">Select...</option>
                  <option value="similar_drinks">Similar to drinks reception</option>
                  <option value="upbeat_background">Upbeat background</option>
                  <option value="romantic">Romantic / love songs</option>
                  <option value="irish">Irish music mix</option>
                  <option value="dj_choice">DJ's choice</option>
                </select>
              </div>
              <div>
                <label htmlFor="dinnerSpecific" className={labelClasses}>
                  Specific meal music requests
                </label>
                <textarea
                  id="dinnerSpecific"
                  name="dinnerSpecific"
                  value={formData.dinnerSpecific}
                  onChange={handleChange}
                  className={`${inputClasses} min-h-[60px] resize-y`}
                  placeholder="Any specific songs or artists for the meal?"
                />
              </div>
            </div>
          )}

          {/* Step 5: Playlists */}
          {step === 5 && (
            <div className="space-y-5">
              <div>
                <label className={labelClasses}>Evening guests (afters)?</label>
                <div className="flex gap-6">
                  {["yes", "no"].map((v) => (
                    <label key={v} className="flex items-center gap-2 cursor-pointer text-gray-300">
                      <input
                        type="radio"
                        name="afters"
                        value={v}
                        checked={formData.afters === v}
                        onChange={handleChange}
                        className="text-primary-500"
                      />
                      {v === "yes" ? "Yes" : "No"}
                    </label>
                  ))}
                </div>
              </div>
              {formData.afters === "yes" && (
                <>
                  <div>
                    <label htmlFor="aftersCount" className={labelClasses}>
                      Approx. number of evening guests
                    </label>
                    <input
                      type="number"
                      id="aftersCount"
                      name="aftersCount"
                      value={formData.aftersCount}
                      onChange={handleChange}
                      className={inputClasses}
                      min="0"
                    />
                  </div>
                  <div>
                    <label htmlFor="aftersMusic" className={labelClasses}>
                      Music preferences when evening guests arrive
                    </label>
                    <textarea
                      id="aftersMusic"
                      name="aftersMusic"
                      value={formData.aftersMusic}
                      onChange={handleChange}
                      className={`${inputClasses} min-h-[60px] resize-y`}
                      placeholder="e.g. Ramp up energy, more Irish music"
                    />
                  </div>
                </>
              )}
              <div>
                <label htmlFor="firstDanceSong" className={labelClasses}>
                  First dance song <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="firstDanceSong"
                  name="firstDanceSong"
                  value={formData.firstDanceSong}
                  onChange={handleChange}
                  className={inputClasses}
                  placeholder="Song title and artist"
                  required
                />
              </div>
              <div>
                <label htmlFor="firstDanceVersion" className={labelClasses}>
                  Specific version? <span className="text-gray-500 text-xs">(original, cover, instrumental)</span>
                </label>
                <input
                  type="text"
                  id="firstDanceVersion"
                  name="firstDanceVersion"
                  value={formData.firstDanceVersion}
                  onChange={handleChange}
                  className={inputClasses}
                />
              </div>
              <div>
                <label htmlFor="firstDanceEdit" className={labelClasses}>
                  First dance instructions
                </label>
                <textarea
                  id="firstDanceEdit"
                  name="firstDanceEdit"
                  value={formData.firstDanceEdit}
                  onChange={handleChange}
                  className={`${inputClasses} min-h-[60px] resize-y`}
                  placeholder="e.g. Fade out after 2 min, play full song"
                />
              </div>
              <div>
                <label htmlFor="parentDances" className={labelClasses}>
                  Parent dances
                </label>
                <textarea
                  id="parentDances"
                  name="parentDances"
                  value={formData.parentDances}
                  onChange={handleChange}
                  className={`${inputClasses} min-h-[80px] resize-y`}
                  placeholder={"Bride & Father: Song - Artist\nGroom & Mother: Song - Artist"}
                />
              </div>
              <div>
                <label htmlFor="mustPlaySongs" className={labelClasses}>
                  Must-play songs
                </label>
                <textarea
                  id="mustPlaySongs"
                  name="mustPlaySongs"
                  value={formData.mustPlaySongs}
                  onChange={handleChange}
                  className={`${inputClasses} min-h-[120px] resize-y`}
                  placeholder={"Mr. Brightside - The Killers\nGalway Girl - Steve Earle\nDon't Stop Believin' - Journey"}
                />
              </div>
              <div>
                <label htmlFor="playIfPossible" className={labelClasses}>
                  Play if possible
                </label>
                <textarea
                  id="playIfPossible"
                  name="playIfPossible"
                  value={formData.playIfPossible}
                  onChange={handleChange}
                  className={`${inputClasses} min-h-[80px] resize-y`}
                  placeholder="Songs you'd love to hear but aren't essentials"
                />
              </div>
              <div>
                <label htmlFor="doNotPlay" className={labelClasses}>
                  Do NOT play
                </label>
                <textarea
                  id="doNotPlay"
                  name="doNotPlay"
                  value={formData.doNotPlay}
                  onChange={handleChange}
                  className={`${inputClasses} min-h-[100px] resize-y`}
                  placeholder="Songs, artists, or genres to avoid"
                />
              </div>
              <div>
                <label className={labelClasses}>Explicit content preference</label>
                <div className="space-y-2">
                  {[
                    ["clean_only", "Clean versions only"],
                    ["mild_ok", "Mild language okay (radio edits)"],
                    ["no_restrictions", "No restrictions"],
                  ].map(([val, lab]) => (
                    <label key={val} className="flex items-center gap-3 cursor-pointer text-gray-300">
                      <input
                        type="radio"
                        name="explicitContent"
                        value={val}
                        checked={formData.explicitContent === val}
                        onChange={handleChange}
                        className="text-primary-500"
                      />
                      {lab}
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 6: Special moments */}
          {step === 6 && (
            <div className="space-y-5">
              <div>
                <label className={labelClasses}>Traditional moments</label>
                <div className="space-y-2">
                  {[
                    ["bouquet_toss", "Bouquet toss"],
                    ["garter_toss", "Garter toss"],
                    ["anniversary_dance", "Anniversary dance"],
                    ["grand_march", "Grand March (Irish tradition)"],
                  ].map(([val, lab]) => (
                    <label key={val} className="flex items-center gap-3 cursor-pointer text-gray-300">
                      <input
                        type="checkbox"
                        checked={formData.traditions?.includes(val)}
                        onChange={() => handleCheckboxArray("traditions", val)}
                        className="rounded text-primary-500"
                      />
                      {lab}
                    </label>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="bouquetSong" className={labelClasses}>
                    Bouquet toss song
                  </label>
                  <input
                    type="text"
                    id="bouquetSong"
                    name="bouquetSong"
                    value={formData.bouquetSong}
                    onChange={handleChange}
                    className={inputClasses}
                  />
                </div>
                <div>
                  <label htmlFor="garterSong" className={labelClasses}>
                    Garter toss song
                  </label>
                  <input
                    type="text"
                    id="garterSong"
                    name="garterSong"
                    value={formData.garterSong}
                    onChange={handleChange}
                    className={inputClasses}
                  />
                </div>
              </div>
              <div>
                <label htmlFor="lastDanceSong" className={labelClasses}>
                  Last dance song
                </label>
                <input
                  type="text"
                  id="lastDanceSong"
                  name="lastDanceSong"
                  value={formData.lastDanceSong}
                  onChange={handleChange}
                  className={inputClasses}
                  placeholder="The final song of the night"
                />
              </div>
              <div>
                <label htmlFor="specialDedications" className={labelClasses}>
                  Special dedications or tributes
                </label>
                <textarea
                  id="specialDedications"
                  name="specialDedications"
                  value={formData.specialDedications}
                  onChange={handleChange}
                  className={`${inputClasses} min-h-[80px] resize-y`}
                  placeholder="Songs for grandparents, tributes, etc."
                />
              </div>
              <div>
                <label htmlFor="surprises" className={labelClasses}>
                  Special surprises or performances
                </label>
                <textarea
                  id="surprises"
                  name="surprises"
                  value={formData.surprises}
                  onChange={handleChange}
                  className={`${inputClasses} min-h-[80px] resize-y`}
                  placeholder="Flash mob, surprise dance—we need to coordinate!"
                />
              </div>
            </div>
          )}

          {/* Step 7: MC style & logistics */}
          {step === 7 && (
            <div className="space-y-5">
              <div>
                <label className={labelClasses}>Preferred MC style</label>
                <div className="space-y-2">
                  {[
                    ["high_energy", "High energy, interactive"],
                    ["professional", "Professional, minimal chatter"],
                    ["fun_engaging", "Fun and engaging, not over-the-top"],
                    ["background", "Stay in background, let music speak"],
                  ].map(([val, lab]) => (
                    <label key={val} className="flex items-center gap-3 cursor-pointer text-gray-300">
                      <input
                        type="checkbox"
                        checked={formData.mcStyle?.includes(val)}
                        onChange={() => handleCheckboxArray("mcStyle", val)}
                        className="rounded text-primary-500"
                      />
                      {lab}
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <label className={labelClasses}>Guest requests</label>
                <div className="space-y-2">
                  {[
                    ["take_all", "Take all requests"],
                    ["selective", "Selective (DJ discretion)"],
                    ["no_requests", "No requests—stick to our plan"],
                  ].map(([val, lab]) => (
                    <label key={val} className="flex items-center gap-3 cursor-pointer text-gray-300">
                      <input
                        type="radio"
                        name="guestRequests"
                        value={val}
                        checked={formData.guestRequests === val}
                        onChange={handleChange}
                        className="text-primary-500"
                      />
                      {lab}
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <label className={labelClasses}>If dance floor empties?</label>
                <div className="space-y-2">
                  {[
                    ["whatever_it_takes", "Do whatever it takes—group dances, line dances"],
                    ["music_only", "Change music, no gimmicks"],
                    ["relaxed", "Keep it relaxed"],
                  ].map(([val, lab]) => (
                    <label key={val} className="flex items-center gap-3 cursor-pointer text-gray-300">
                      <input
                        type="radio"
                        name="danceStrategy"
                        value={val}
                        checked={formData.danceStrategy === val}
                        onChange={handleChange}
                        className="text-primary-500"
                      />
                      {lab}
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <label className={labelClasses}>Interactive elements okay?</label>
                <div className="space-y-2">
                  {[
                    ["line_dances", "Line dances (Cha Cha Slide, etc.)"],
                    ["group_dances", "Group dances (Siege of Ennis)"],
                    ["games", "Fun games"],
                    ["none", "None—just music"],
                  ].map(([val, lab]) => (
                    <label key={val} className="flex items-center gap-3 cursor-pointer text-gray-300">
                      <input
                        type="checkbox"
                        checked={formData.interactive?.includes(val)}
                        onChange={() => handleCheckboxArray("interactive", val)}
                        className="rounded text-primary-500"
                      />
                      {lab}
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <label className={labelClasses}>Other band/entertainment?</label>
                <div className="flex gap-6 mb-3">
                  {["yes", "no"].map((v) => (
                    <label key={v} className="flex items-center gap-2 cursor-pointer text-gray-300">
                      <input
                        type="radio"
                        name="otherEntertainment"
                        value={v}
                        checked={formData.otherEntertainment === v}
                        onChange={handleChange}
                        className="text-primary-500"
                      />
                      {v === "yes" ? "Yes" : "No"}
                    </label>
                  ))}
                </div>
                {formData.otherEntertainment === "yes" && (
                  <input
                    type="text"
                    name="otherEntDetails"
                    value={formData.otherEntDetails}
                    onChange={handleChange}
                    className={inputClasses}
                    placeholder="Band name, set times"
                  />
                )}
              </div>
              <div>
                <label htmlFor="coordinator" className={labelClasses}>
                  Wedding coordinator name & contact
                </label>
                <input
                  type="text"
                  id="coordinator"
                  name="coordinator"
                  value={formData.coordinator}
                  onChange={handleChange}
                  className={inputClasses}
                />
              </div>
              <div>
                <label htmlFor="pointPerson" className={labelClasses}>
                  Main point person on the day
                </label>
                <input
                  type="text"
                  id="pointPerson"
                  name="pointPerson"
                  value={formData.pointPerson}
                  onChange={handleChange}
                  className={inputClasses}
                  placeholder="Name and phone"
                />
              </div>
              <div>
                <label htmlFor="venueRestrictions" className={labelClasses}>
                  Venue restrictions or special requirements
                </label>
                <textarea
                  id="venueRestrictions"
                  name="venueRestrictions"
                  value={formData.venueRestrictions}
                  onChange={handleChange}
                  className={`${inputClasses} min-h-[80px] resize-y`}
                  placeholder="Sound limits, load-in times"
                />
              </div>
              <div>
                <label className={labelClasses}>Additional services</label>
                <div className="space-y-2">
                  {[
                    ["uplighting", "Uplighting"],
                    ["photo_booth", "Photo booth"],
                    ["led_wristbands", "LED wristbands"],
                    ["special_effects", "Special effects (sparklers, etc.)"],
                  ].map(([val, lab]) => (
                    <label key={val} className="flex items-center gap-3 cursor-pointer text-gray-300">
                      <input
                        type="checkbox"
                        checked={formData.addons?.includes(val)}
                        onChange={() => handleCheckboxArray("addons", val)}
                        className="rounded text-primary-500"
                      />
                      {lab}
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 8: Final details */}
          {step === 8 && (
            <div className="space-y-5">
              <div>
                <label htmlFor="inspirations" className={labelClasses}>
                  Musical inspirations or playlists
                </label>
                <textarea
                  id="inspirations"
                  name="inspirations"
                  value={formData.inspirations}
                  onChange={handleChange}
                  className={`${inputClasses} min-h-[80px] resize-y`}
                  placeholder="Spotify links, other weddings with great music"
                />
              </div>
              <div>
                <label htmlFor="concerns" className={labelClasses}>
                  Concerns or special considerations
                </label>
                <textarea
                  id="concerns"
                  name="concerns"
                  value={formData.concerns}
                  onChange={handleChange}
                  className={`${inputClasses} min-h-[80px] resize-y`}
                  placeholder="Family dynamics, sensitive topics"
                />
              </div>
              <div>
                <label htmlFor="dreamVibe" className={labelClasses}>
                  Dream reception in 3–5 words
                </label>
                <input
                  type="text"
                  id="dreamVibe"
                  name="dreamVibe"
                  value={formData.dreamVibe}
                  onChange={handleChange}
                  className={inputClasses}
                  placeholder="e.g. Fun, energetic, classy, emotional"
                />
              </div>
              <div>
                <label htmlFor="additionalNotes" className={labelClasses}>
                  Anything else we should know?
                </label>
                <textarea
                  id="additionalNotes"
                  name="additionalNotes"
                  value={formData.additionalNotes}
                  onChange={handleChange}
                  className={`${inputClasses} min-h-[100px] resize-y`}
                  placeholder="Final thoughts or ideas"
                />
              </div>
              <div className="p-4 bg-gray-800/50 rounded-lg text-center text-gray-400 text-sm">
                <p>
                  <strong className="text-white">Thank you!</strong> We'll review
                  your responses and be in touch within 48 hours. This is a
                  guide, not a contract—we can adjust as we get closer.
                </p>
              </div>
            </div>
          )}

          {/* Status message */}
          {status.error && (
            <div className="flex items-center gap-2 p-4 mb-6 bg-red-900/20 border border-red-500/50 rounded-lg text-red-200">
              <AlertCircle className="w-5 h-5 shrink-0" />
              <p>{status.message}</p>
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between gap-4 mt-8">
            <button
              type="button"
              onClick={() => setStep((s) => Math.max(1, s - 1))}
              disabled={step === 1}
              className="btn-secondary flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-5 h-5" />
              Back
            </button>
            {step < totalSteps ? (
              <button
                type="button"
                onClick={() => setStep((s) => Math.min(totalSteps, s + 1))}
                disabled={step === 1 && !canProceed()}
                className="btn-primary flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
                <ChevronRight className="w-5 h-5" />
              </button>
            ) : (
              <button
                type="submit"
                disabled={status.submitting}
                className="btn-primary flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status.submitting ? (
                  "Sending..."
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Submit
                  </>
                )}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default WeddingQuestionnaire;
