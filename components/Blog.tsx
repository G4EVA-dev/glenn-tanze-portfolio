"use client"

import { motion } from "framer-motion"
import { Calendar, Clock, ArrowRight, Tag } from "lucide-react"

export default function Blog() {
  const blogPosts = [
    {
      id: 1,
      title: "Building Scalable React Applications with TypeScript",
      excerpt:
        "Learn how to structure large React applications using TypeScript for better maintainability and developer experience.",
      date: "2024-01-15",
      readTime: "8 min read",
      category: "React",
      image: "/placeholder.svg?height=200&width=300",
      tags: ["React", "TypeScript", "Architecture"],
    },
    {
      id: 2,
      title: "The Future of Web Development: Server Components",
      excerpt: "Exploring React Server Components and how they revolutionize the way we build web applications.",
      date: "2024-01-10",
      readTime: "6 min read",
      category: "Next.js",
      image: "/placeholder.svg?height=200&width=300",
      tags: ["Next.js", "Server Components", "Performance"],
    },
    {
      id: 3,
      title: "Mastering CSS Grid and Flexbox for Modern Layouts",
      excerpt: "A comprehensive guide to creating responsive layouts using CSS Grid and Flexbox techniques.",
      date: "2024-01-05",
      readTime: "10 min read",
      category: "CSS",
      image: "/placeholder.svg?height=200&width=300",
      tags: ["CSS", "Layout", "Responsive Design"],
    },
    {
      id: 4,
      title: "Building Real-time Applications with WebSockets",
      excerpt: "Learn how to implement real-time features in your web applications using WebSockets and Socket.io.",
      date: "2023-12-28",
      readTime: "12 min read",
      category: "Backend",
      image: "/placeholder.svg?height=200&width=300",
      tags: ["WebSockets", "Real-time", "Node.js"],
    },
    {
      id: 5,
      title: "Mobile-First Design Principles",
      excerpt: "Understanding the importance of mobile-first design and how to implement it effectively.",
      date: "2023-12-20",
      readTime: "7 min read",
      category: "Design",
      image: "/placeholder.svg?height=200&width=300",
      tags: ["Mobile", "UX/UI", "Design"],
    },
    {
      id: 6,
      title: "Optimizing React Performance: Tips and Tricks",
      excerpt: "Practical techniques to improve your React application performance and user experience.",
      date: "2023-12-15",
      readTime: "9 min read",
      category: "Performance",
      image: "/placeholder.svg?height=200&width=300",
      tags: ["React", "Performance", "Optimization"],
    },
  ]

  return (
    <section id="blog" className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Latest Blog Posts</h2>
          <div className="w-24 h-1 bg-blue-500 mx-auto mb-8"></div>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Sharing insights, tutorials, and thoughts on web development
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <motion.article
              key={post.id}
              className="bg-gray-50 dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group cursor-pointer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <div className="relative overflow-hidden">
                <img
                  src={post.image || "/placeholder.svg"}
                  alt={post.title}
                  className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute top-4 left-4 bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  {post.category}
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm mb-3">
                  <Calendar size={16} className="mr-2" />
                  <span className="mr-4">{new Date(post.date).toLocaleDateString()}</span>
                  <Clock size={16} className="mr-2" />
                  <span>{post.readTime}</span>
                </div>

                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-500 transition-colors duration-200">
                  {post.title}
                </h3>

                <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">{post.excerpt}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center px-2 py-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded text-xs"
                    >
                      <Tag size={12} className="mr-1" />
                      {tag}
                    </span>
                  ))}
                </div>

                <motion.div
                  className="flex items-center text-blue-500 font-semibold group-hover:text-blue-600"
                  whileHover={{ x: 5 }}
                >
                  Read More
                  <ArrowRight size={16} className="ml-2 transition-transform duration-200 group-hover:translate-x-1" />
                </motion.div>
              </div>
            </motion.article>
          ))}
        </div>

        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <motion.button
            className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View All Posts
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}
