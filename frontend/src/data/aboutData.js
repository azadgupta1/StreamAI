export const aboutData = {
  hero: {
    logo: "/about/streamaiLogo.png",
    tagline: "Stream Smarter. Not Harder.",
    description:
      "StreamAI is an intelligent live streaming platform that combines real-time video broadcasting with advanced Artificial Intelligence to enhance both content creation and viewing experience. Unlike traditional streaming platforms, StreamAI integrates AI directly into the streaming pipeline to automate tasks such as transcription, summarization, and chat moderation.",
    subDescription:
      "The platform is designed to provide a seamless, low-latency streaming experience while improving accessibility and engagement through smart features. Streamers can focus on creating content, while the system handles analysis and optimization in real time. For viewers, StreamAI delivers a richer experience with interactive tools, insights, and easy navigation through long streams.",
  },

  stats: [
    { value: "< 1s", label: "Stream Latency" },
    { value: "99.9%", label: "Uptime SLA" },
    { value: "AI", label: "Powered Moderation" },
    { value: "4K", label: "Max Resolution" },
  ],

  features: [
    {
      id: 1,
      icon: "📡",
      title: "Live Streaming Infrastructure",
      shortTitle: "Live Infra",
      description:
        "StreamAI provides low-latency live streaming using optimized infrastructure, ensuring smooth video delivery across web and mobile devices.",
      image: "/about/liveInfra.png",
      accent: "#5af04f",
      tag: "Core",
    },
    {
      id: 2,
      icon: "🔐",
      title: "Secure Authentication & User Roles",
      shortTitle: "Secure Auth",
      description:
        "Implements JWT-based authentication with role-based access control for streamers, viewers, and administrators, ensuring a secure and scalable system.",
      image: "/about/secureAuth.png",
      accent: "#7b35d9",
      tag: "Security",
    },
    {
      id: 3,
      icon: "💬",
      title: "Real-Time Chat with AI Moderation",
      shortTitle: "AI Chat",
      description:
        "Enables live interaction through chat, enhanced with AI-based toxicity detection to filter harmful or spam messages and maintain a safe community environment.",
      image: "/about/chat.png",
      accent: "#5af04f",
      tag: "AI",
    },
    {
      id: 4,
      icon: "🎙️",
      title: "Speech-to-Text Transcription",
      shortTitle: "Transcription",
      description:
        "Uses AI to convert live audio into real-time transcripts, improving accessibility and allowing users to follow content more easily.",
      image: "/about/transcript.png",
      accent: "#7b35d9",
      tag: "AI",
    },
    {
      id: 5,
      icon: "🧠",
      title: "AI-Powered Summarization",
      shortTitle: "Summarization",
      description:
        "Generates instant summaries of live streams using advanced NLP models, helping viewers quickly understand key points.",
      image: "/about/summization.png",
      accent: "#5af04f",
      tag: "AI",
    },
    {
      id: 6,
      icon: "⭐",
      title: "Highlight & Timestamp Generation",
      shortTitle: "Highlights",
      description:
        "Automatically identifies important moments in streams using chat activity and content signals, making navigation and content review easier.",
      image: "/about/highlights.png",
      accent: "#7b35d9",
      tag: "Smart",
    },
    {
      id: 7,
      icon: "📊",
      title: "Analytics & Insights Dashboard",
      shortTitle: "Analytics",
      description:
        "Provides streamers with performance analytics, including viewer engagement, trends, and interaction metrics to improve content strategy.",
      image: "/about/insights.png",
      accent: "#5af04f",
      tag: "Analytics",
    },
    {
      id: 8,
      icon: "▶️",
      title: "Personalized Viewing Experience",
      shortTitle: "Personalized",
      description:
        "Features like trending streams, continue watching, and recommendations help users discover and resume content effortlessly.",
      image: null,
      accent: "#7b35d9",
      tag: "UX",
    },
  ],

  team: [
    {
      id: 1,
      name: "Azad",
      role: "Full-Stack Lead Engineer",
      avatar: "ST",
    },
    {
      id: 2,
      name: "Sarang",
      role: "Full-Stack Lead Engineer",
      avatar: "RE",
    },
    {
      id: 3,
      name: "Om",
      role: "Full-Stack & AI/ML Engineer",
      avatar: "AM",
    },
    {
      id: 4,
      name: "Omkar",
      role: "Full-Stack Developer",
      avatar: "AI",
    },
  ],
};
