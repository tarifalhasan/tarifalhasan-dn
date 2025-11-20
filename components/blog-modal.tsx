"use client";

import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  readTime: string;
  category: string;
  author: string;
  tags: string[];
}

interface BlogModalProps {
  isOpen: boolean;
  onClose: () => void;
  post: BlogPost | null;
}

export function BlogModal({ isOpen, onClose, post }: BlogModalProps) {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  const copyToClipboard = async (code: string, id: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedCode(id);
      setTimeout(() => setCopiedCode(null), 2000);
    } catch (err) {
      console.error("Failed to copy code:", err);
    }
  };

  const formatContent = (content: string) => {
    // Replace code blocks with VS Code styled ones
    return content.replace(
      /```(\w+)?\n([\s\S]*?)```/g,
      (match, language, code) => {
        const lang = language || "javascript";
        const codeId = Math.random().toString(36).substr(2, 9);
        const lines = code.trim().split("\n");
        const numberedLines = lines
          .map(
            (line: string, index: number) =>
              `<span class="line-number">${
                index + 1
              }</span><span class="line-content">${line}</span>`
          )
          .join("\n");

        return `
        <div class="vs-code-block" data-language="${lang}">
          <div class="vs-code-header">
            <div class="vs-code-dots">
              <span class="dot red"></span>
              <span class="dot yellow"></span>
              <span class="dot green"></span>
            </div>
            <div class="vs-code-title">${
              lang === "js" ? "coder.js" : `code.${lang}`
            }</div>
            <div class="vs-code-actions">
              <button class="copy-btn" onclick="window.copyCode('${codeId}', \`${code
          .trim()
          .replace(/`/g, "\\`")}\`)">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                  <path d="m5 15-4-4 4-4"></path>
                </svg>
              </button>
            </div>
          </div>
          <div class="vs-code-content">
            <div class="vs-code-editor">
              <pre class="line-numbers-wrapper"><code class="language-${lang}">${numberedLines}</code></pre>
            </div>
            <div class="vs-code-footer">
              <div class="status-left">UTF-8</div>
              <div class="status-center">${
                lang === "js"
                  ? "JavaScript"
                  : lang.charAt(0).toUpperCase() + lang.slice(1)
              }</div>
              <div class="status-right">Ln ${lines.length}, Col ${
          lines[lines.length - 1]?.length || 0
        }</div>
            </div>
          </div>
        </div>
      `;
      }
    );
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      (window as any).copyCode = async (id: string, code: string) => {
        await copyToClipboard(code, id);
      };
    }
  }, []);

  if (!isOpen || !post) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-white/90 dark:bg-slate-950/90 backdrop-blur-2xl border border-white/40 dark:border-white/10 rounded-2xl shadow-[0_35px_120px_rgba(6,10,35,0.55)] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#7c3aed] via-[#a855f7] to-[#22d3ee] p-4 text-white">
          <div className="flex items-center justify-between">
            <div className="text-sm uppercase tracking-[0.35em] font-semibold opacity-80">
              Journal Entry
            </div>
            <Button
              onClick={onClose}
              variant="ghost"
              size="sm"
              className="text-white hover:text-white/80 hover:bg-white/10"
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
              <span className="text-xs luminous-pill text-slate-800 dark:text-slate-100">
                {post.category}
              </span>
              <div className="flex items-center gap-4 text-xs text-slate-600 dark:text-slate-400">
                <span className="flex items-center gap-1">📅 {post.date}</span>
                <span className="flex items-center gap-1">
                  ⏱️ {post.readTime}
                </span>
                <span className="flex items-center gap-1">
                  👤 {post.author}
                </span>
              </div>
            </div>

            <h1 className="text-3xl font-bold text-slate-900 dark:text-indigo-200 mb-4 leading-tight">
              {post.title}
            </h1>

            <p className="text-slate-700 dark:text-slate-300 text-lg leading-relaxed mb-6">
              {post.excerpt}
            </p>

            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-2 py-1 rounded border border-white/30 bg-white/70 text-slate-800 dark:bg-white/5 dark:text-indigo-200"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* Article Content */}
          <div className="prose prose-slate dark:prose-invert max-w-none">
            <div
              className="text-slate-700 dark:text-slate-300 leading-relaxed space-y-6 vs-code-container"
              dangerouslySetInnerHTML={{ __html: formatContent(post.content) }}
            />
          </div>

          {/* Footer */}
          <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-700">
            <div className="flex items-center justify-between">
              <div className="text-slate-600 dark:text-slate-400 text-sm">
                Thanks for reading!
              </div>
              <Button
                onClick={onClose}
                className="bg-gradient-to-r from-[#7c3aed] via-[#a855f7] to-[#22d3ee] hover:from-[#6d28d9] hover:via-[#9333ea] hover:to-[#0ea5e9] text-white"
              >
                Close Article
              </Button>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .vs-code-block {
          margin: 1.5rem 0;
          border-radius: 8px;
          overflow: hidden;
          background: #1e1e1e;
          border: 1px solid #2d2d30;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
        }

        .vs-code-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: #2d2d30;
          padding: 8px 16px;
          border-bottom: 1px solid #3e3e42;
          height: 35px;
        }

        .vs-code-dots {
          display: flex;
          gap: 8px;
        }

        .dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
        }

        .dot.red {
          background: #ff5f56;
        }
        .dot.yellow {
          background: #ffbd2e;
        }
        .dot.green {
          background: #27ca3f;
        }

        .vs-code-title {
          color: #cccccc;
          font-size: 13px;
          font-family: "SF Mono", Monaco, "Cascadia Code", "Roboto Mono",
            Consolas, "Courier New", monospace;
          font-weight: 400;
        }

        .copy-btn {
          background: transparent;
          border: none;
          color: #cccccc;
          cursor: pointer;
          padding: 6px;
          border-radius: 4px;
          transition: background-color 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .copy-btn:hover {
          background: #404040;
        }

        .vs-code-content {
          background: #1e1e1e;
          position: relative;
        }

        .vs-code-editor {
          background: #1e1e1e;
          overflow-x: auto;
          min-height: 100px;
        }

        .line-numbers-wrapper {
          margin: 0;
          padding: 0;
          background: transparent;
          display: block;
        }

        .line-numbers-wrapper code {
          display: block;
          padding: 16px 0;
          background: transparent;
          color: #d4d4d4;
          font-family: "SF Mono", Monaco, "Cascadia Code", "Roboto Mono",
            Consolas, "Courier New", monospace;
          font-size: 14px;
          line-height: 1.5;
          white-space: pre;
        }

        .line-number {
          display: inline-block;
          width: 40px;
          padding-right: 16px;
          padding-left: 16px;
          color: #858585;
          text-align: right;
          user-select: none;
          background: #1e1e1e;
          border-right: 1px solid #2d2d30;
        }

        .line-content {
          padding-left: 16px;
          color: #d4d4d4;
        }

        .vs-code-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: #007acc;
          color: white;
          padding: 4px 16px;
          font-size: 12px;
          font-family: "SF Mono", Monaco, "Cascadia Code", "Roboto Mono",
            Consolas, "Courier New", monospace;
          height: 22px;
        }

        .status-left,
        .status-center,
        .status-right {
          font-size: 12px;
        }

        /* Enhanced VS Code syntax highlighting to match the image */
        .language-javascript .line-content,
        .language-js .line-content {
          color: #d4d4d4;
        }

        /* Keywords like const, let, var */
        .line-content:has-text("const"),
        .line-content:has-text("let"),
        .line-content:has-text("var") {
          color: #569cd6;
        }

        /* Strings */
        .line-content:has-text("'"),
        .line-content:has-text('"') {
          color: #ce9178;
        }

        /* Object properties */
        .line-content:has-text("name:"),
        .line-content:has-text("role:"),
        .line-content:has-text("location:") {
          color: #9cdcfe;
        }

        /* Arrays and brackets */
        .line-content:has-text("["),
        .line-content:has-text("]"),
        .line-content:has-text("{"),
        .line-content:has-text("}") {
          color: #ffd700;
        }
      `}</style>
    </div>
  );
}
