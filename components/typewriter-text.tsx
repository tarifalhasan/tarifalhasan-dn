"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

interface TypewriterTextProps {
  texts: string[]
  delay?: number
  typeSpeed?: number
  deleteSpeed?: number
  pauseTime?: number
}

export const TypewriterText = ({
  texts,
  delay = 0,
  typeSpeed = 100,
  deleteSpeed = 50,
  pauseTime = 2000,
}: TypewriterTextProps) => {
  const [displayText, setDisplayText] = useState("")
  const [currentTextIndex, setCurrentTextIndex] = useState(0)
  const [currentCharIndex, setCurrentCharIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    if (!texts || texts.length === 0) return

    const currentText = texts[currentTextIndex]

    const timer = setTimeout(
      () => {
        if (isPaused) {
          setIsPaused(false)
          setIsDeleting(true)
          return
        }

        if (isDeleting) {
          if (currentCharIndex > 0) {
            setDisplayText(currentText.substring(0, currentCharIndex - 1))
            setCurrentCharIndex((prev) => prev - 1)
          } else {
            setIsDeleting(false)
            setCurrentTextIndex((prev) => (prev + 1) % texts.length)
          }
        } else {
          if (currentCharIndex < currentText.length) {
            setDisplayText(currentText.substring(0, currentCharIndex + 1))
            setCurrentCharIndex((prev) => prev + 1)
          } else {
            setIsPaused(true)
          }
        }
      },
      isPaused ? pauseTime : isDeleting ? deleteSpeed : typeSpeed,
    )

    return () => clearTimeout(timer)
  }, [currentCharIndex, currentTextIndex, isDeleting, isPaused, texts, typeSpeed, deleteSpeed, pauseTime])

  // Reset when texts change
  useEffect(() => {
    setDisplayText("")
    setCurrentTextIndex(0)
    setCurrentCharIndex(0)
    setIsDeleting(false)
    setIsPaused(false)
  }, [texts])

  return (
    <span className="inline-block">
      {displayText}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.8, repeat: Number.POSITIVE_INFINITY }}
        className="inline-block w-0.5 h-6 bg-green-400 ml-1"
      />
    </span>
  )
}
