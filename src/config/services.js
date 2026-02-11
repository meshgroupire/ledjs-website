// Service Configuration with Image References
// To update images: Place new images in public/images/services/ folder and update the filename below
// Image format: Rectangular images recommended (e.g., 800x500px or 1200x600px)

export const services = [
  {
    id: "wedding-djs",
    title: "Wedding DJs",
    description:
      "Professional wedding DJ services that create the perfect atmosphere for your special day. From ceremony music to keeping the dance floor packed all night long.",
    shortDescription:
      "Professional wedding DJ services that create the perfect atmosphere for your special day.",
    longDescription:
      "Our wedding DJ service provides complete entertainment from ceremony to reception. We work closely with you to understand your musical preferences and create the perfect atmosphere for your big day. Our experienced DJs know how to read the crowd, keep energy levels high, and ensure everyone has an unforgettable time.",
    link: "/services#wedding-djs",
    gradient: "from-purple-600 to-pink-600",
    image: "/images/services/wedding-djs.jpg",
    features: [
      "Professional MC services",
      "Professional lighting and sound",
      "Pre-wedding consultation and planning",
      "Experience with all venue types",
      "Custom playlist creation",
    ],
  },
  {
    id: "party-djs",
    title: "Party DJs",
    description:
      "High-energy party DJ services for birthdays, celebrations, corporate events, and any occasion that needs great music and entertainment.",
    shortDescription:
      "High-energy party DJ services for birthdays, celebrations, and corporate events.",
    longDescription:
      "Whether it's a birthday, anniversary, corporate event, or any celebration, our party DJs bring the energy and expertise to make your event unforgettable. We tailor our music selection and style to match your event and audience, ensuring the perfect atmosphere from start to finish.",
    link: "/services#party-djs",
    gradient: "from-pink-600 to-purple-600",
    image: "/images/services/ledjs5.jpg",
    features: [
      "Tailored music for any occasion",
      "Professional lighting and sound",
      "Experience with all event types",
      "Flexible packages and pricing",
      "Interactive entertainment options available",
    ],
  },
  {
    id: "led-wristbands",
    title: "LED Wristband Experience",
    description:
      "Transform your event into a mesmerizing light show with our cutting-edge LED wristband technology. Each wristband synchronizes wirelessly to create stunning visual effects that pulse, flash, and flow in perfect harmony with your music.",
    shortDescription:
      "Transform your event into a mesmerizing light show with synchronized LED wristbands.",
    longDescription:
      "Our LED wristbands are perfect for enhancing your wedding, party or event. They create a unified visual experience that connects every guest, turning your audience into part of the show. With customizable colors and patterns, we can match any theme or brand.",
    link: "/services#led-wristbands",
    gradient: "from-purple-600 to-pink-600",
    image: "/images/services/ledjs6.jpg",
    features: [
      "Wireless synchronised control system",
      "Multiple color modes and patterns",
      "Customisable to match your brand colors or event",
    ],
  },
  {
    id: "speed-quizzing",
    title: "Speed Quizzing",
    description:
      "Bring excitement and friendly competition to your event with our interactive speed quizzing system. Fast-paced questions, real-time scoring, and instant results keep your guests engaged and entertained throughout the event.",
    shortDescription:
      "Interactive speed quizzing system with real-time scoring and instant results.",
    longDescription:
      "Speed Quizzing is perfect for corporate team building, fundraisers, pub nights, and private parties. Our system handles all the scoring automatically, with live leaderboards displayed on screen. Questions can be customized to your industry, interests, or event theme.",
    link: "/services#speed-quizzing",
    gradient: "from-pink-600 to-cyan-600",
    image: "/images/services/ledjs9.jpg",
    features: [
      "Real-time scoring and leaderboards",
      "Individual or team-based gameplay",
      "Great for corporate events and fundraisers",
      "Prizes and awards coordination available",
      "Perfect for all ages.",
    ],
  },
  {
    id: "music-bingo",
    title: "Music Bingo",
    description:
      "Combine the nostalgia of bingo with the joy of music! Players mark off songs on their bingo cards as they hear them play, creating an interactive experience that appeals to all ages and music preferences.",
    shortDescription:
      "A musical twist on the classic game that combines bingo with your favorite tunes.",
    longDescription:
      "Music Bingo is the perfect icebreaker and entertainment option for any event. We curate playlists tailored to your audience - from classic hits to current chart-toppers. It's easy to play, incredibly fun, and creates great energy at any gathering.",
    link: "/services#music-bingo",
    gradient: "from-cyan-600 to-blue-600",
    image: "/images/services/music-bingo.jpg",
    features: [
      "Curated playlists for any musical taste",
      "Custom bingo cards for each player",
      "Interactive and engaging gameplay",
      "Fun for all ages and demographics",
      "Themed rounds available (80s, 90s, country, etc.)",
      "Prize packages can be arranged",
    ],
  },
  {
    id: "karaoke",
    title: "Karaoke Entertainment",
    description:
      "Bring out the star in everyone with our professional karaoke setup! Featuring an extensive song library, crystal-clear sound system, and LED lighting effects that create the perfect stage atmosphere for unforgettable performances.",
    shortDescription:
      "Professional karaoke setup with thousands of songs and crystal-clear sound.",
    longDescription:
      "Our karaoke service turns any venue into a professional performance space. With thousands of songs spanning all genres and decades, everyone can find their perfect song. Professional sound equipment, dynamic lighting, and an encouraging host ensure your guests feel like superstars. Perfect for parties, corporate events, birthdays, and celebrations of all kinds.",
    link: "/services#karaoke",
    gradient: "from-orange-600 to-red-600",
    image: "/images/services/karaoke.jpg",
    features: [
      "Extensive library with thousands of songs",
      "Professional sound system and microphones",
      "Supportive host to keep the energy high",
      "Song requests and queue management",
      "Suitable for all ages and skill levels",
    ],
  },
];

// Helper function to get service by ID
export const getServiceById = (id) => {
  return services.find((service) => service.id === id);
};

// Helper function to get all service images (useful for preloading)
export const getAllServiceImages = () => {
  return services.map((service) => service.image);
};
