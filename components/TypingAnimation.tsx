import { motion } from 'framer-motion'
import { useEffect, useState, useRef } from 'react'
import { gsap } from 'gsap'

interface TypingAnimationProps {
  text: string
  cursor?: boolean
}

export default function TypingAnimation({ text, cursor = true }: TypingAnimationProps) {
  const textRef = useRef<HTMLSpanElement>(null)
  const [displayedText, setDisplayedText] = useState('')
  const [isTyping, setIsTyping] = useState(false)

  useEffect(() => {
    let timeout: NodeJS.Timeout
    let currentIndex = 0

    const typeText = () => {
      if (currentIndex < text.length) {
        setDisplayedText(prev => prev + text[currentIndex])
        currentIndex++
        timeout = setTimeout(typeText, 50)
      } else {
        setIsTyping(true)
        setTimeout(() => {
          setIsTyping(false)
        }, 2000)
      }
    }

    typeText()

    return () => clearTimeout(timeout)
  }, [text])

  useEffect(() => {
    if (textRef.current) {
      gsap.to(textRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "power3.out"
      })
    }
  }, [displayedText])

  return (
    <div className="inline-flex items-center">
      <span ref={textRef} className="whitespace-pre-wrap opacity-0 translate-y-2">
        {displayedText}
      </span>
      {cursor && isTyping && (
        <motion.span
          className="ml-1 inline-block"
          animate={{
            opacity: [1, 0, 1],
          }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
          }}
        >
          ▌
        </motion.span>
      )}
    </div>
  )
}
