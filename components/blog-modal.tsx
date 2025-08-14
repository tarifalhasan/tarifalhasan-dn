"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"

interface BlogPost {
  id: string
  title: string
  excerpt: string
  content: string
  date: string
  readTime: string
  category: string
  author: string
  tags: string[]
}

interface BlogModalProps {
  isOpen: boolean
  onClose: () => void
  post: BlogPost | null
}

export function BlogModal({ isOpen, onClose, post }: BlogModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }

    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", handleEscape)
    }

    return () => {
      document.removeEventListener("keydown", handleEscape)
    }
  }, [isOpen, onClose])

  if (!isOpen || !post) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-slate-900/95 backdrop-blur-md border border-slate-700 rounded-xl shadow-2xl overflow-hidden">
        {/* Terminal Header */}
        <div className="bg-slate-800 border-b border-slate-700 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <div className="text-slate-300 font-mono text-sm">
                <span className="text-emerald-400">$</span> cat ./blog/{post.id}.md
              </div>
            </div>
            <Button
              onClick={onClose}
              variant="ghost"
              size="sm"
              className="text-slate-400 hover:text-slate-200 hover:bg-slate-700"
            >
              ✕
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-80px)] p-8">
          {/* Article Header */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xs bg-slate-700 text-slate-300 px-2 py-1 rounded font-mono">{post.category}</span>
              <div className="flex items-center gap-4 text-xs text-slate-400">
                <span className="flex items-center gap-1">📅 {post.date}</span>
                <span className="flex items-center gap-1">⏱️ {post.readTime}</span>
                <span className="flex items-center gap-1">👤 {post.author}</span>
              </div>
            </div>

            <h1 className="text-3xl font-bold text-indigo-300 mb-4 leading-tight">{post.title}</h1>

            <p className="text-slate-300 text-lg leading-relaxed mb-6">{post.excerpt}</p>

            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs bg-indigo-900/50 text-indigo-300 px-2 py-1 rounded border border-indigo-700"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* Article Content */}
          <div className="prose prose-invert prose-slate max-w-none">
            <div
              className="text-slate-300 leading-relaxed space-y-6"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>

          {/* Footer */}
          <div className="mt-12 pt-8 border-t border-slate-700">
            <div className="flex items-center justify-between">
              <div className="text-slate-400 text-sm">
                <span className="text-emerald-400 font-mono">$</span> Thanks for reading!
              </div>
              <Button onClick={onClose} className="bg-indigo-600 hover:bg-indigo-700 text-white">
                Close Article
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
