"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

interface TypewriterTextProps {
  text?: string
  texts?: string[]
  delay?: number
  typeSpeed?: number
  deleteSpeed?: number
  pauseTime?: number
}

export const TypewriterText = ({
  text,
  texts,
  delay = 0,
  typeSpeed = 100,
  deleteSpeed = 50,
  pauseTime = 2000,
}: TypewriterTextProps) => {
  const textArray = texts || (text ? [text] : [])

  const [displayText, setDisplayText] = useState("")
  const [currentTextIndex, setCurrentTextIndex] = useState(0)
  const [currentCharIndex, setCurrentCharIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [hasStarted, setHasStarted] = useState(false)

  useEffect(() => {
    if (!textArray || textArray.length === 0) return

    if (!hasStarted) {
      const initialTimer = setTimeout(() => {
        setHasStarted(true)
      }, delay)
      return () => clearTimeout(initialTimer)
    }

    const currentText = textArray[currentTextIndex]

    const timer = setTimeout(
      () => {
        if (isPaused) {
          setIsPaused(false)
          if (textArray.length > 1) {
            setIsDeleting(true)
          }
          return
        }

        if (isDeleting) {
          if (currentCharIndex > 0) {
            setDisplayText(currentText.substring(0, currentCharIndex - 1))
            setCurrentCharIndex((prev) => prev - 1)
          } else {
            setIsDeleting(false)
            setCurrentTextIndex((prev) => (prev + 1) % textArray.length)
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
  }, [
    currentCharIndex,
    currentTextIndex,
    isDeleting,
    isPaused,
    textArray,
    typeSpeed,
    deleteSpeed,
    pauseTime,
    delay,
    hasStarted,
  ])

  useEffect(() => {
    setDisplayText("")
    setCurrentTextIndex(0)
    setCurrentCharIndex(0)
    setIsDeleting(false)
    setIsPaused(false)
    setHasStarted(false)
  }, [text, texts])

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
