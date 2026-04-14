import React, { useRef } from "react";
import Navbar from "../components/Navbar";
import { aboutData } from "../data/aboutData.js";
import { motion, useInView } from "framer-motion";
import { useNavigate } from "react-router-dom";

/* ─── Reusable Animation Wrapper ─────────────────────────────── */
const FadeUp = ({ children, delay = 0, className = "" }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

/* ─── Section Label ───────────────────────────────────────────── */
const SectionLabel = ({ text }) => (
  <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#5af04f]/30 bg-[#5af04f]/10 text-[#5af04f] text-xs font-mono font-semibold tracking-widest uppercase mb-4">
    <span className="w-1.5 h-1.5 rounded-full bg-[#5af04f] animate-pulse" />
    {text}
  </span>
);

/* ─── Hex/Grid Background Pattern ────────────────────────────── */
const GridBg = ({ opacity = "0.03" }) => (
  <div
    className="absolute inset-0 pointer-events-none"
    style={{
      backgroundImage: `
        linear-gradient(rgba(90,240,79,${opacity}) 1px, transparent 1px),
        linear-gradient(90deg, rgba(90,240,79,${opacity}) 1px, transparent 1px)
      `,
      backgroundSize: "48px 48px",
    }}
  />
);

/* ─── Glow Orb ────────────────────────────────────────────────── */
const GlowOrb = ({
  color = "#5af04f",
  size = 400,
  top,
  left,
  right,
  opacity = 0.12,
}) => (
  <div
    className="absolute rounded-full pointer-events-none blur-[120px]"
    style={{
      width: size,
      height: size,
      background: color,
      opacity,
      top,
      left,
      right,
    }}
  />
);

/* ─── Tag Badge ───────────────────────────────────────────────── */
const Tag = ({ text, accent }) => (
  <span
    className="px-2 py-0.5 rounded text-[10px] font-bold font-mono uppercase tracking-wider"
    style={{
      background: `${accent}18`,
      color: accent,
      border: `1px solid ${accent}40`,
    }}
  >
    {text}
  </span>
);

/* ─── Feature Card ────────────────────────────────────────────── */
const FeatureCard = ({ feature, index }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const isEven = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: isEven ? -50 : 50 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
      className={`group relative flex flex-col ${
        isEven ? "lg:flex-row" : "lg:flex-row-reverse"
      } gap-6 lg:gap-10 items-center bg-gray-900/60 border border-gray-800 rounded-2xl overflow-hidden hover:border-gray-700 transition-all duration-500`}
      style={{
        boxShadow: `0 0 0 0 ${feature.accent}`,
      }}
      whileHover={{
        boxShadow: `0 0 30px 0 ${feature.accent}22`,
      }}
    >
      {/* Gradient accent strip */}
      <div
        className={`absolute top-0 ${isEven ? "left-0" : "right-0"} w-1 h-full transition-all duration-500 group-hover:w-1.5`}
        style={{
          background: `linear-gradient(to bottom, ${feature.accent}, transparent)`,
        }}
      />

      {/* Image side */}
      <div className="relative w-full lg:w-2/5 h-48 lg:h-64 overflow-hidden flex-shrink-0 bg-gray-950">
        {feature.image ? (
          <img
            src={feature.image}
            alt={feature.title}
            className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
          />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center text-6xl"
            style={{
              background: `radial-gradient(circle, ${feature.accent}15, transparent 70%)`,
            }}
          >
            {feature.icon}
          </div>
        )}
        <div
          className="absolute inset-0"
          style={{
            background: isEven
              ? `linear-gradient(to right, transparent 60%, rgba(17,24,39,0.9))`
              : `linear-gradient(to left, transparent 60%, rgba(17,24,39,0.9))`,
          }}
        />
      </div>

      {/* Content side */}
      <div className={`flex-1 p-6 lg:py-8 ${isEven ? "lg:pr-8" : "lg:pl-8"}`}>
        <div className="flex items-center gap-3 mb-3">
          <span className="text-2xl">{feature.icon}</span>
          <Tag text={feature.tag} accent={feature.accent} />
        </div>
        <h3 className="text-xl lg:text-2xl font-bold text-white mb-3 leading-snug">
          {feature.title}
        </h3>
        <p className="text-gray-400 text-sm lg:text-base leading-relaxed">
          {feature.description}
        </p>
        {/* Decorative corner accent */}
        <div
          className="mt-5 w-8 h-0.5 rounded-full transition-all duration-500 group-hover:w-14"
          style={{ background: feature.accent }}
        />
      </div>
    </motion.div>
  );
};

/* ─── Stat Card ───────────────────────────────────────────────── */
const StatCard = ({ stat, index }) => (
  <FadeUp delay={index * 0.1}>
    <div className="relative flex flex-col items-center justify-center p-6 rounded-xl bg-gray-900/80 border border-gray-800 overflow-hidden group hover:border-[#5af04f]/40 transition-colors duration-300">
      <div className="absolute inset-0 bg-gradient-to-br from-[#5af04f]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <span className="text-3xl lg:text-4xl font-black font-mono text-[#5af04f] drop-shadow-[0_0_12px_rgba(90,240,79,0.5)]">
        {stat.value}
      </span>
      <span className="text-gray-500 text-xs font-medium tracking-widest uppercase mt-1">
        {stat.label}
      </span>
    </div>
  </FadeUp>
);

/* ─── Team Card ───────────────────────────────────────────────── */
const TeamCard = ({ member, index }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.6,
        delay: index * 0.12,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group relative rounded-2xl bg-gray-900/70 border border-gray-800 overflow-hidden hover:border-gray-700 transition-all duration-500 flex flex-col"
      whileHover={{ y: -6 }}
    >
      {/* Glow on hover */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#5af04f]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      <div className="p-6 flex flex-col items-center text-center flex-1">
        {/* Avatar */}
        {/* <div
          className={`relative w-20 h-20 rounded-2xl flex items-center justify-center text-2xl font-black text-gray-950 mb-4 bg-gradient-to-br bg-amber-200 shadow-lg`}
        >
          {member.avatar}
          <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-[#5af04f] border-2 border-gray-900 animate-pulse" />
        </div> */}

        <h3 className="text-lg font-bold text-white">{member.name}</h3>
        <p className="text-[#5af04f] text-sm font-mono font-semibold mb-3">
          {member.role}
        </p>

        {/* Social links */}
        {/* <div className="flex gap-3 mt-5">
          <a
            href={member.github}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-white text-xs font-medium transition-colors duration-200"
          >
            <svg
              className="w-3.5 h-3.5"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
            </svg>
            GitHub
          </a>
          <a
            href={member.linkedin}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#7b35d9]/20 hover:bg-[#7b35d9]/30 text-[#7b35d9] hover:text-white text-xs font-medium border border-[#7b35d9]/30 transition-colors duration-200"
          >
            <svg
              className="w-3.5 h-3.5"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
            LinkedIn
          </a>
        </div> */}
        {/* Top gradient bar */}
        <div className={`h-1.5 w-full bg-gradient-to-r bg-amber-200`} />
      </div>
    </motion.div>
  );
};

/* ─── Main Page ───────────────────────────────────────────────── */
const AboutPage = () => {
  const { hero, stats, features, team } = aboutData;
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col overflow-x-hidden">
      <Navbar />

      {/* ── HERO SECTION ─────────────────────────────────────── */}
      <section className="relative pt-24 pb-20 lg:pt-32 lg:pb-28 overflow-hidden">
        <GridBg opacity="0.025" />
        <GlowOrb
          color="#5af04f"
          size={600}
          top="-200px"
          left="-100px"
          opacity={0.08}
        />
        <GlowOrb
          color="#7b35d9"
          size={500}
          top="-100px"
          right="-100px"
          opacity={0.08}
        />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
          {/* Logo */}
          <FadeUp>
            <img
              src={hero.logo}
              alt="StreamAI"
              className="w-20 h-20 lg:w-24 lg:h-24 object-contain mb-6 drop-shadow-[0_0_24px_rgba(90,240,79,0.4)]"
            />
          </FadeUp>

          <FadeUp delay={0.1}>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black tracking-tight mb-4 leading-[1.05]">
              <span className="text-white">Stream</span>
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage: "linear-gradient(135deg, #5af04f, #7b35d9)",
                }}
              >
                AI
              </span>
            </h1>
          </FadeUp>

          <FadeUp delay={0.15}>
            <p
              className="text-xl sm:text-2xl font-semibold mb-6 font-mono"
              style={{ color: "#5af04f" }}
            >
              {hero.tagline}
            </p>
          </FadeUp>

          <FadeUp delay={0.2}>
            <p className="text-gray-400 text-base sm:text-lg max-w-3xl leading-relaxed mb-4">
              {hero.description}
            </p>
          </FadeUp>

          <FadeUp delay={0.25}>
            <p className="text-gray-500 text-sm sm:text-base max-w-2xl leading-relaxed">
              {hero.subDescription}
            </p>
          </FadeUp>

          {/* Divider */}
          <FadeUp delay={0.3} className="w-full mt-14">
            <div className="flex items-center gap-4">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-800 to-transparent" />
              <div
                className="w-2 h-2 rounded-full"
                style={{ background: "#5af04f", boxShadow: "0 0 10px #5af04f" }}
              />
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-800 to-transparent" />
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── STATS SECTION ────────────────────────────────────── */}
      <section className="relative py-10 border-y border-gray-800/60 bg-gray-900/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, i) => (
              <StatCard key={i} stat={stat} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES SECTION ─────────────────────────────────── */}
      <section className="relative py-20 lg:py-28 overflow-hidden">
        <GridBg opacity="0.02" />
        <GlowOrb
          color="#7b35d9"
          size={600}
          top="10%"
          right="-200px"
          opacity={0.07}
        />
        <GlowOrb
          color="#5af04f"
          size={500}
          top="60%"
          left="-150px"
          opacity={0.06}
        />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section header */}
          <div className="text-center mb-14">
            <FadeUp>
              <SectionLabel text="Core Features" />
            </FadeUp>
            <FadeUp delay={0.1}>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mt-2 mb-4">
                Everything You Need to{" "}
                <span
                  className="bg-clip-text text-transparent"
                  style={{
                    backgroundImage: "linear-gradient(90deg, #5af04f, #7b35d9)",
                  }}
                >
                  Stream Smarter
                </span>
              </h2>
            </FadeUp>
            <FadeUp delay={0.15}>
              <p className="text-gray-500 max-w-xl mx-auto text-sm sm:text-base">
                Eight powerful AI-driven features built into every stream,
                working silently so you don't have to.
              </p>
            </FadeUp>
          </div>

          {/* Feature cards */}
          <div className="flex flex-col gap-6">
            {features.map((feature, index) => (
              <FeatureCard key={feature.id} feature={feature} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* ── TEAM SECTION ─────────────────────────────────────── */}
      <section className="relative py-20 lg:py-28 overflow-hidden bg-gray-900/20 border-t border-gray-800/50">
        <GridBg opacity="0.025" />
        <GlowOrb color="#5af04f" size={500} top="0" left="20%" opacity={0.06} />
        <GlowOrb
          color="#7b35d9"
          size={400}
          top="50%"
          right="10%"
          opacity={0.07}
        />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section header */}
          <div className="text-center mb-14">
            <FadeUp delay={0.1}>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mt-2 mb-4">
                The Minds Behind{" "}
                <span
                  className="bg-clip-text text-transparent"
                  style={{
                    backgroundImage: "linear-gradient(90deg, #7b35d9, #5af04f)",
                  }}
                >
                  StreamAI
                </span>
              </h2>
            </FadeUp>
            <FadeUp delay={0.15}>
              <p className="text-gray-500 max-w-xl mx-auto text-sm sm:text-base">
                A passionate team of engineers and designers building the future
                of intelligent live streaming.
              </p>
            </FadeUp>
          </div>

          {/* Team grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {team.map((member, index) => (
              <TeamCard key={member.id} member={member} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER CTA ───────────────────────────────────────── */}
      <section className="relative py-16 overflow-hidden border-t border-gray-800/60">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(90,240,79,0.06) 0%, transparent 70%)",
          }}
        />
        <FadeUp className="relative max-w-3xl mx-auto px-4 text-center">
          <p className="text-2xl sm:text-3xl font-black text-white mb-2">
            Ready to go live?
          </p>
          <p className="text-gray-500 text-sm mb-8">
            Join thousands of streamers already using StreamAI.
          </p>
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="px-8 py-3.5 rounded-xl font-bold text-gray-950 text-sm transition-shadow duration-300"
            style={{
              background: "linear-gradient(135deg, #5af04f, #3dd132)",
              boxShadow: "0 0 0 0 #5af04f",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.boxShadow =
                "0 0 24px 0 rgba(90,240,79,0.4)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.boxShadow = "0 0 0 0 #5af04f")
            }
            onClick={() => navigate("/")}
          >
            Start Streaming Free
          </motion.button>
        </FadeUp>
      </section>
    </div>
  );
};

export default AboutPage;
