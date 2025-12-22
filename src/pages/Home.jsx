import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { Shield, Lock, Cloud, Zap, ChevronRight, CheckCircle } from "lucide-react";

// --- Components for Layout & Animation ---

const FadeIn = ({ children, delay = 0, className = "" }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.8, delay, ease: [0.25, 0.1, 0.25, 1.0] }}
    className={className}
  >
    {children}
  </motion.div>
);

const Section = ({ children, className = "" }) => (
  <section className={`px-6 md:px-12 max-w-7xl mx-auto py-24 md:py-32 ${className}`}>
    {children}
  </section>
);

const Button = ({ children, to, variant = "primary" }) => {
  const baseStyle = "inline-flex items-center justify-center px-8 py-4 rounded-full text-base font-medium transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]";
  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40",
    secondary: "bg-white text-gray-900 border border-gray-200 hover:border-gray-300 hover:bg-gray-50",
    text: "text-blue-600 hover:text-blue-700 font-semibold p-0 bg-transparent hover:bg-transparent"
  };

  return (
    <Link to={to} className={`${baseStyle} ${variants[variant]}`}>
      {children}
    </Link>
  );
};

// --- Main Page Component ---

const Home = () => {
  const { scrollY } = useScroll();
      const [scrolled, setScrolled] = useState(false);

  // Parallax effect for hero
  const heroY = useTransform(scrollY, [0, 500], [0, 150]);
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#FBFBFD] text-gray-900 font-sans selection:bg-blue-100 selection:text-blue-900 overflow-hidden">
      
      {/* Navigation */}
    

      {/* Hero Section */}
      <div className="relative pt-40 pb-20 md:pt-48 md:pb-32 px-6 flex flex-col items-center text-center overflow-hidden">
        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="relative z-10 max-w-4xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl md:text-7xl font-bold tracking-tight text-gray-900 mb-6 leading-[1.1]"
          >
            Your memories, <br />
            <span className="text-gray-500">securely beautiful.</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-xl text-gray-500 max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Securely store, manage, and access your photos from anywhere. 
            Privacy-first cloud storage designed for peace of mind.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Button to="/register">Start Free Trial</Button>
            <Button to="/features" variant="text">Learn more <ChevronRight size={16} className="ml-1" /></Button>
          </motion.div>
        </motion.div>

        {/* Hero Visual Abstract Mockup */}
       {/* Hero Visual Mosaic Grid */}
<motion.div
  initial={{ opacity: 0, y: 100 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
  className="mt-20 relative z-0 w-full max-w-5xl"
>
  <div className="bg-white p-2 rounded-3xl shadow-2xl border border-gray-200">
    
    {/* Grid Layout: 4 columns, 2 rows (Standard Bento) */}
    <div className="grid grid-cols-4 grid-rows-2 gap-2 h-[500px] w-full">
      
      {/* 1. Main Large Image (Left) */}
      <div className="col-span-2 row-span-2 rounded-2xl overflow-hidden relative group">
        <img 
          src="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800&q=80" 
          alt="Main memory" 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-60" />
        <p className="absolute bottom-4 left-4 text-white font-medium text-lg">Mountain Trips</p>
      </div>

      {/* 2. Top Middle */}
      <div className="col-span-1 row-span-1 rounded-2xl overflow-hidden relative group">
        <img 
          src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500&q=80" 
          alt="Camera" 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
        />
      </div>

      {/* 3. Top Right */}
      <div className="col-span-1 row-span-1 rounded-2xl overflow-hidden relative group">
        <img 
          src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&q=80" 
          alt="Portrait" 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
        />
      </div>

      {/* 4. Bottom Middle (Wide) */}
      <div className="col-span-2 row-span-1 rounded-2xl overflow-hidden relative group">
        <img 
          src="https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&q=80" 
          alt="Night sky" 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
        />
      </div>

    </div>
  </div>
</motion.div>
      </div>

      {/* Story Section 1 */}
      <Section>
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <FadeIn className="order-2 md:order-1 bg-gray-100 rounded-3xl aspect-square flex items-center justify-center">
             <Cloud className="text-blue-500 w-24 h-24 opacity-80" />
          </FadeIn>
          <FadeIn className="order-1 md:order-2" delay={0.2}>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Effortless Sync.</h2>
            <p className="text-lg text-gray-500 leading-relaxed mb-6">
              Photos uploaded from your phone appear instantly on your desktop. We handle the complexity of cloud infrastructure so you can focus on the moments that matter.
            </p>
            <ul className="space-y-3">
              {['Automatic Backups', 'Original Quality', 'Cross-Platform'].map((item) => (
                <li key={item} className="flex items-center text-gray-700 font-medium">
                  <CheckCircle className="w-5 h-5 text-blue-600 mr-3" /> {item}
                </li>
              ))}
            </ul>
          </FadeIn>
        </div>
      </Section>

      {/* Story Section 2 */}
      <Section className="bg-white">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Privacy by Design.</h2>
            <p className="text-lg text-gray-500 leading-relaxed">
              Your data belongs to you. We use end-to-end encryption to ensure that not even we can see your personal photos. Security isn't a feature; it's our foundation.
            </p>
          </FadeIn>
          <FadeIn delay={0.2} className="bg-gray-50 border border-gray-100 rounded-3xl aspect-square flex items-center justify-center shadow-inner">
             <Lock className="text-gray-900 w-24 h-24" />
          </FadeIn>
        </div>
      </Section>

      {/* Brand/Trust Carousel */}
      <div className="py-16 bg-[#FBFBFD] overflow-hidden border-y border-gray-100">
        <p className="text-center text-sm font-semibold text-gray-400 uppercase tracking-widest mb-10">Trusted by teams at</p>
        <div className="relative flex overflow-x-hidden group">
          <div className="animate-marquee whitespace-nowrap flex space-x-16 px-8">
            {/* Repeating Logos for marquee effect (Abstract names) */}
            {['Acme', 'Global', 'Stark', 'Wayne', 'Cyberdyne', 'Umbrella', 'Massive', 'Hooli'].map((brand, i) => (
              <span key={i} className="text-2xl font-bold text-gray-300 select-none hover:text-gray-400 transition-colors cursor-default">
                {brand}
              </span>
            ))}
            {['Acme', 'Global', 'Stark', 'Wayne', 'Cyberdyne', 'Umbrella', 'Massive', 'Hooli'].map((brand, i) => (
              <span key={`dup-${i}`} className="text-2xl font-bold text-gray-300 select-none hover:text-gray-400 transition-colors cursor-default">
                {brand}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Features Cards */}
      <Section>
        <div className="text-center mb-16">
          <FadeIn>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">Powerful Simplicity.</h2>
            <p className="text-gray-500 text-lg">Everything you need, nothing you don't.</p>
          </FadeIn>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { icon: Zap, title: "Lightning Fast", desc: "Optimized for speed. Load thousands of photos without a stutter." },
            { icon: Shield, title: "Bank-Grade Security", desc: "AES-256 encryption keeps your files safe from prying eyes." },
            { icon: Cloud, title: "Infinite Storage", desc: "Scalable plans that grow with your library. Never run out of space." }
          ].map((feature, i) => (
            <FadeIn key={i} delay={i * 0.1} className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl hover:shadow-gray-200/50 transition-all duration-300">
              <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 text-blue-600">
                <feature.icon size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-gray-500 leading-relaxed">{feature.desc}</p>
            </FadeIn>
          ))}
        </div>
      </Section>

      {/* Final CTA */}
      <div className="py-32 px-6 text-center bg-gray-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-blue-600/10 blur-3xl opacity-30 transform -translate-y-1/2"></div>
        <FadeIn className="relative z-10 max-w-2xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">Ready to protect your memories?</h2>
          <p className="text-gray-400 text-lg mb-10">Join thousands of photographers and families who trust PhotoSafe.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register" className="bg-blue-600 text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-blue-500 transition-all shadow-lg shadow-blue-900/50">
              Get Started for Free
            </Link>
          </div>
        </FadeIn>
      </div>

      {/* Footer */}
 

      {/* Custom CSS for Marquee Animation */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
};

export default Home;