"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/dist/ScrollTrigger"
import { ChevronDown, Github, Linkedin, Mail, Twitter } from "lucide-react"
import { useInView } from "react-intersection-observer"
import TypingAnimation from "./TypingAnimation"

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const subtitleRef = useRef<HTMLDivElement>(null)
  const socialLinksRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const { ref: typingRef, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  // GSAP Animations
  useEffect(() => {
    if (!titleRef.current || !socialLinksRef.current || !imageRef.current) return

    gsap.registerPlugin(ScrollTrigger)

    // Title animation
    gsap.from(titleRef.current, {
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
    gsap.from(socialLinksRef.current, {
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

    // Image animation
    gsap.from(imageRef.current, {
      scale: 0.8,
      opacity: 0,
      duration: 0.8,
      delay: 0.6,
      ease: "back.out(1.7)",
      scrollTrigger: {
        trigger: imageRef.current,
        start: "top 80%",
        end: "bottom 20%",
        scrub: true,
        markers: false,
      },
    })

    // Typing animation visibility
    if (inView) {
      gsap.to(typingRef, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
      })
    }

    // Image glow animation
    const glow = imageRef.current?.querySelector(".glow")
    if (glow) {
      gsap.to(glow, {
        scale: 1.1,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut",
      })
    }
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const particles: Array<{
      x: number
      y: number
      vx: number
      vy: number
      size: number
      opacity: number
    }> = []

    // Create particles
    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.5 + 0.2,
      })
    }

    function animate() {
      if (!ctx || !canvas) return

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach((particle) => {
        particle.x += particle.vx
        particle.y += particle.vy

        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1

        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(59, 130, 246, ${particle.opacity})`
        ctx.fill()
      })
      requestAnimationFrame(animate)
    }
    animate()

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // GSAP Animations
  useEffect(() => {
    if (!titleRef.current || !socialLinksRef.current || !imageRef.current) return

    gsap.registerPlugin(ScrollTrigger)

    // Title animation
    gsap.from(titleRef.current, {
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
    gsap.from(socialLinksRef.current, {
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

    // Image animation
    gsap.from(imageRef.current, {
      scale: 0.8,
      opacity: 0,
      duration: 0.8,
      delay: 0.6,
      ease: "back.out(1.7)",
      scrollTrigger: {
        trigger: imageRef.current,
        start: "top 80%",
        end: "bottom 20%",
        scrub: true,
        markers: false,
      },
    })

    // Image glow animation
    const glow = imageRef.current?.querySelector(".glow")
    if (glow) {
      gsap.to(glow, {
        scale: 1.1,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut",
      })
    }
  }, [])

  const socialLinks = [
    { icon: Github, href: "https://github.com/G4EVA-dev", label: "GitHub" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/tanze-glenn/", label: "LinkedIn" },
    { icon: Twitter, href: "https://x.com/GlennTanze", label: "Twitter" },
    { icon: Mail, href: "mailto:tanzeglenn@gmail.com", label: "Email" },
  ]

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background particles */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none opacity-30" />

      {/* Main content */}
      <div className="relative z-10 flex flex-col lg:flex-row items-start justify-start px-4 sm:px-6 lg:px-12 max-w-6xl mx-auto gap-28 pt-32 pb-16">
        {/* Left Section - Text */}
        <div className="lg:w-1/2 text-center lg:text-left lg:pr-16">
          <div ref={titleRef} className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-6">
            <span>Hi👋🏾 I'm{''} </span>
            <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
             Efuetlancha Glenn
            </span>
          </div>
          <div ref={typingRef} className="text-lg sm:text-xl mb-8">
            <div className="typing-text opacity-0 translate-y-4">
              {/* <p><TypingAnimation text="👋🏾 Hi, I'm Glenn Tanze — Full Stack Developer | Problem Solver | Builder of Scalable Web and Mobile Solutions" /></p> */}
            </div>
          </div>
          <div ref={socialLinksRef} className="flex justify-center lg:justify-start gap-8 mt-10">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group"
              >
                <div className="relative">
                  <link.icon className="w-6 h-6 transition-transform group-hover:scale-125" />
                  <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 bg-black text-white px-3 py-1 rounded-full text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                    {link.label}
                  </span>
                </div>
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
        <ChevronDown className="w-10 h-10 text-gray-400 dark:text-gray-500 hover:text-gray-300 transition-colors" />
      </motion.div>
    </section>
  )
}
