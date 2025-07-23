"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/dist/ScrollTrigger"
import { Github, Linkedin, Mail, Twitter, ChevronDown } from "lucide-react"
import { useInView } from "react-intersection-observer"
import Particles from "react-tsparticles"
import { loadFull } from "tsparticles"
import TypingAnimation from "./TypingAnimation"

// Add Google Fonts
const Orbitron = "Orbitron, sans-serif"
const Syne = "Syne, sans-serif"

// Particle configuration
const particlesOptions = {
  background: {
    color: {
      value: "#0a0a23",
    },
  },
  fpsLimit: 60,
  interactivity: {
    events: {
      onClick: {
        enable: true,
        mode: "push",
      },
      onHover: {
        enable: true,
        mode: "repulse",
      },
      resize: true,
    },
    modes: {
      push: {
        quantity: 4,
      },
      repulse: {
        distance: 200,
        duration: 0.4,
      },
    },
  },
  particles: {
    color: {
      value: "#ffffff",
    },
    links: {
      color: "#8899ff",
      distance: 150,
      enable: true,
      opacity: 0.5,
      width: 1,
    },
    move: {
      direction: "none" as const,
      enable: true,
      outModes: {
        default: "out" as const,
      },
      random: false,
      speed: 2,
      straight: false,
    },
    number: {
      density: {
        enable: true,
        area: 800,
      },
      value: 80,
    },
    opacity: {
      value: 0.5,
    },
    shape: {
      type: "circle",
    },
    size: {
      value: { min: 1, max: 5 },
    },
  },
  detectRetina: true,
}

export default function Hero() {
  const [ref, inView] = useInView({
    threshold: 0.1,
  })

  const titleRef = useRef<HTMLHeadingElement>(null)
  const socialLinksRef = useRef<HTMLDivElement>(null)
  const particlesRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // GSAP Animations
    if (!titleRef.current || !socialLinksRef.current) return

    gsap.registerPlugin(ScrollTrigger)

    // Title animation
    const titleAnimation = gsap.from(titleRef.current, {
      y: 100,
      opacity: 0,
      duration: 1,
      ease: "power4.out",
      scrollTrigger: {
        trigger: titleRef.current,
        start: "top 80%",
        end: "bottom 20%",
        scrub: true,
        markers: false,
      },
    })

    // Social links animation
    const socialLinksAnimation = gsap.from(socialLinksRef.current, {
      scale: 0.8,
      opacity: 0,
      duration: 0.5,
      delay: 0.4,
      ease: "back.out(1.7)",
      scrollTrigger: {
        trigger: socialLinksRef.current,
        start: "top 80%",
        end: "bottom 20%",
        scrub: true,
        markers: false,
      },
    })

    // Handle resize
    const handleResize = () => {
      const canvas = particlesRef.current?.querySelector("canvas")
      if (canvas) {
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
      }
    }

    window.addEventListener("resize", handleResize)

    return () => {
      // Cleanup animations
      if (titleAnimation) titleAnimation.kill()
      if (socialLinksAnimation) socialLinksAnimation.kill()
      window.removeEventListener("resize", handleResize)
    }
  }, [inView])

  // Particle initialization functions
  const particlesInit = async (engine: any) => {
    await loadFull(engine)
  }

  const particlesLoaded = async (container: any) => {
    console.log("Particles container loaded")
  }

  const socialLinks = [
    { icon: Github, href: "https://github.com/G4EVA-dev", label: "GitHub" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/tanze-glenn/", label: "LinkedIn" },
    { icon: Twitter, href: "https://x.com/GlennTanze", label: "Twitter" },
    { icon: Mail, href: "mailto:tanzeglenn@gmail.com", label: "Email" },
  ]

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Space-themed background */}
      <div className="absolute inset-0 bg-[#0a0a23] overflow-hidden">
        <Particles
          id="tsparticles"
          options={particlesOptions}
          init={particlesInit}
          loaded={particlesLoaded}
        />
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-12 max-w-6xl mx-auto gap-24 pt-32 pb-24">
        {/* Content */}
        <div className="text-center">
          <div ref={titleRef} className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 font-[Orbitron] text-white">
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Efuetlancha Glenn
            </span>
          </div>
          <div className="text-xl sm:text-2xl mb-8 font-[Syne] text-gray-300">
            <TypingAnimation text="Full Stack Developer | Problem Solver | Builder of Scalable Web and Mobile Solutions" />
          </div>
          <div ref={socialLinksRef} className="flex justify-center gap-8 mt-10">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group"
              >
                <motion.div
                  className="relative"
                  whileHover={{ scale: 1.2 }}
                  transition={{ type: "spring", stiffness: 300, damping: 17 }}
                >
                  <div className="p-2 bg-gray-800/50 rounded-full transition-all duration-300 group-hover:bg-gray-700/50">
                    <link.icon className="w-6 h-6 text-white" />
                  </div>
                  <motion.span
                    className="absolute bottom-full left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-cyan-400 to-blue-500 text-white px-3 py-1 rounded-full text-sm opacity-0 group-hover:opacity-100 transition-opacity"
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    whileHover={{ y: -5, opacity: 1 }}
                  >
                    {link.label}
                  </motion.span>
                </motion.div>
              </a>
            ))}
          </div>
        </div>

        {/* Right Section - Image */}
        <div className="lg:w-1/2 relative lg:pl-16">
          <div ref={imageRef} className="relative mx-auto lg:mx-0">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-3xl opacity-30"></div>
            <div className="relative">
              <div className="glow absolute inset-0 rounded-full blur-3xl bg-gradient-to-r from-blue-500/40 to-purple-500/40"></div>
              <img
                src="/profile.jpg"
                alt="Efuetlancha Glenn"
                className="relative rounded-full w-72 h-72 object-cover shadow-2xl ring-4 ring-blue-500/50 transition-transform hover:scale-105 hover:ring-blue-500/70"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
      >
        <motion.div
          className="text-white"
          whileHover={{ scale: 1.2 }}
          transition={{ type: "spring", stiffness: 300, damping: 17 }}
        >
          <ChevronDown className="w-10 h-10" />
        </motion.div>
      </motion.div>
    </section>
  )
}
