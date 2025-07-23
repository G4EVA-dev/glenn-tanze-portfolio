"use client"

import { motion } from "framer-motion"
import { useState } from "react"

export default function TechStack() {
  const [hoveredTech, setHoveredTech] = useState<string | null>(null)

  const techCategories = [
    {
      category: "Frontend",
      color: "bg-blue-500",
      technologies: [
        { name: "React", icon: "⚛️", level: 95 },
        { name: "Next.js", icon: "▲", level: 90 },
        { name: "TypeScript", icon: "📘", level: 88 },
        { name: "Tailwind CSS", icon: "🎨", level: 92 },
        { name: "JavaScript", icon: "🟨", level: 95 },
        { name: "HTML/CSS", icon: "🌐", level: 98 },
      ],
    },
    {
      category: "Backend",
      color: "bg-green-500",
      technologies: [
        { name: "Node.js", icon: "🟢", level: 90 },
        { name: "Express.js", icon: "🚀", level: 88 },
        { name: "NestJS", icon: "🔴", level: 85 },
        { name: "PostgreSQL", icon: "🐘", level: 87 },
        { name: "Firebase", icon: "🔥", level: 90 },
        { name: "REST APIs", icon: "🔗", level: 92 },
      ],
    },
    {
      category: "Mobile & Tools",
      color: "bg-purple-500",
      technologies: [
        { name: "React Native", icon: "📱", level: 85 },
        { name: "Git/GitHub", icon: "🐙", level: 95 },
        { name: "VSCode", icon: "💙", level: 98 },
        { name: "Figma", icon: "🎨", level: 80 },
        { name: "Postman", icon: "📮", level: 90 },
        { name: "Framer Motion", icon: "🎭", level: 88 },
      ],
    },
    {
      category: "Others",
      color: "bg-orange-500",
      technologies: [
        { name: "GSAP", icon: "⚡", level: 82 },
        { name: "Redux", icon: "🔄", level: 85 },
        { name: "Zustand", icon: "🐻", level: 88 },
        { name: "Jest/Vitest", icon: "🧪", level: 80 },
        { name: "Firebase Auth", icon: "🔐", level: 90 },
        { name: "Vercel", icon: "▲", level: 92 },
      ],
    },
  ]

  return (
    <section id="tech" className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Tech Stack</h2>
          <div className="w-24 h-1 bg-blue-500 mx-auto mb-8"></div>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Technologies and tools I use to bring ideas to life
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {techCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.category}
              className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl"
              initial={{ opacity: 0, x: categoryIndex % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center mb-6">
                <div className={`w-4 h-4 ${category.color} rounded-full mr-3`}></div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{category.category}</h3>
              </div>

              <div className="space-y-4">
                {category.technologies.map((tech, techIndex) => (
                  <motion.div
                    key={tech.name}
                    className="relative"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: techIndex * 0.05 }}
                    viewport={{ once: true }}
                    onHoverStart={() => setHoveredTech(tech.name)}
                    onHoverEnd={() => setHoveredTech(null)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center">
                        <span className="text-2xl mr-3">{tech.icon}</span>
                        <span className="font-semibold text-gray-900 dark:text-white">{tech.name}</span>
                      </div>
                      <span className="text-sm text-gray-500 dark:text-gray-400">{tech.level}%</span>
                    </div>

                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <motion.div
                        className={`h-2 ${category.color} rounded-full`}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${tech.level}%` }}
                        transition={{ duration: 1, delay: techIndex * 0.1 }}
                        viewport={{ once: true }}
                      />
                    </div>

                    {hoveredTech === tech.name && (
                      <motion.div
                        className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 px-2 py-1 rounded text-sm"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                      >
                        {tech.level}% Proficiency
                      </motion.div>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
