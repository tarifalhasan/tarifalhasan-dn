"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { X, Send, Bot, User, Minimize2, Maximize2, Sparkles } from "lucide-react"

interface Message {
  id: string
  text: string
  sender: "user" | "ai"
  timestamp: Date
}

interface AIChatbotProps {
  isOpen: boolean
  onClose: () => void
}

export const AIChatbot = ({ isOpen, onClose }: AIChatbotProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hello! I'm Tarif's AI assistant, powered by LangChain and advanced language models. I have comprehensive knowledge about his expertise in AI development, full-stack architecture, and enterprise solutions. How may I assist you today?",
      sender: "ai",
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    const currentInput = inputValue
    setInputValue("")
    setIsTyping(true)

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: currentInput,
          conversationHistory: messages.slice(-5), // Send last 5 messages for context
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to get AI response")
      }

      const data = await response.json()

      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: data.response,
        sender: "ai",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, aiResponse])
    } catch (error) {
      console.error("Error getting AI response:", error)
      const errorResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: "I apologize, but I'm experiencing technical difficulties. Please try again in a moment, or feel free to contact Tarif directly through the contact form.",
        sender: "ai",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorResponse])
    } finally {
      setIsTyping(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md" onClick={onClose}>
      <div
        className={`bg-white/90 dark:bg-slate-950/90 border border-white/40 dark:border-white/10 rounded-2xl shadow-[0_35px_120px_rgba(6,10,35,0.65)] backdrop-blur-2xl w-full max-w-lg mx-auto ${
          isMinimized ? "h-16" : "h-[650px]"
        } flex flex-col overflow-hidden`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-5 border-b border-white/30 dark:border-white/5 bg-gradient-to-r from-[#7c3aed] via-[#a855f7] to-[#22d3ee] text-white">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center shadow-lg">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-base font-semibold">Tarif AI Assistant</h3>
              <p className="text-xs text-teal-200 flex items-center">
                <div className="w-2 h-2 bg-teal-200 rounded-full mr-2 animate-pulse"></div>
                LangChain Powered • Online
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" onClick={() => setIsMinimized(!isMinimized)} className="text-white/80 hover:text-white hover:bg-white/20 p-2 h-9 w-9 rounded-lg transition-all duration-200">
              {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
            </Button>
            <Button variant="ghost" size="sm" onClick={onClose} className="text-white/80 hover:text-white hover:bg-white/20 p-2 h-9 w-9 rounded-lg transition-all duration-200">
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {!isMinimized && (
          <>
            <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-gradient-to-b from-white/50 via-white/30 to-white/10 dark:from-slate-950/40 dark:to-slate-950/80">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`flex items-start space-x-3 max-w-[85%]`}>
                    {message.sender === "ai" && (
                      <div className="w-8 h-8 bg-gradient-to-br from-[#7c3aed] via-[#a855f7] to-[#22d3ee] rounded-xl flex items-center justify-center flex-shrink-0 mt-1 shadow-lg">
                        <Bot className="w-4 h-4 text-white" />
                      </div>
                    )}
                    <div
                      className={`px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                        message.sender === "user"
                          ? "bg-gradient-to-r from-[#4f46e5] via-[#7c3aed] to-[#22d3ee] text-white shadow-lg"
                          : "bg-white/80 dark:bg-white/5 text-slate-800 dark:text-slate-100 border border-white/40 dark:border-white/10 shadow-md backdrop-blur-sm"
                      }`}
                    >
                      {message.text}
                    </div>
                    {message.sender === "user" && (
                      <div className="w-8 h-8 bg-white/80 dark:bg-slate-800 rounded-xl flex items-center justify-center flex-shrink-0 mt-1 shadow-md">
                        <User className="w-4 h-4 text-slate-600 dark:text-slate-200" />
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-[#7c3aed] via-[#a855f7] to-[#22d3ee] rounded-xl flex items-center justify-center flex-shrink-0 mt-1 shadow-lg">
                      <Bot className="w-4 h-4 text-white" />
                    </div>
                      <div className="bg-white/80 dark:bg-white/5 border border-white/40 dark:border-white/10 px-4 py-3 rounded-2xl shadow-md backdrop-blur-sm">
                      <div className="flex items-center space-x-1">
                          <span className="text-xs text-slate-500 dark:text-slate-300 mr-2">AI is processing</span>
                        <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="p-5 border-t border-white/30 dark:border-white/5 bg-gradient-to-r from-white/80 to-white/50 dark:from-slate-950/50 dark:to-slate-950/80 backdrop-blur-sm">
              <div className="flex space-x-3">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask about Tarif's expertise, projects, or experience..."
                  className="flex-1 bg-white/80 dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-900 dark:text-slate-100 placeholder:text-slate-500 dark:placeholder:text-slate-400 focus:border-violet-400 focus:ring-2 focus:ring-violet-400/20 rounded-xl h-12 px-4 backdrop-blur-sm transition-all duration-200"
                  disabled={isTyping}
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || isTyping}
                  className="bg-gradient-to-r from-[#7c3aed] via-[#a855f7] to-[#22d3ee] hover:from-[#6d28d9] hover:via-[#9333ea] hover:to-[#0ea5e9] text-white border-0 h-12 px-4 rounded-xl shadow-lg transition-all duration-200 disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
