"use client";

import * as React from "react";
import { X } from "lucide-react";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [isAnimating, setIsAnimating] = React.useState(false);
  const [shouldRender, setShouldRender] = React.useState(false);

  React.useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      document.body.style.overflow = "hidden";
      // Trigger animation after render - increased delay for smoother entrance
      setTimeout(() => setIsAnimating(true), 50);
    } else {
      setIsAnimating(false);
      // Wait for animation to complete before unmounting
      const timer = setTimeout(() => {
        setShouldRender(false);
        document.body.style.overflow = "unset";
      }, 700); // Match this to transition duration
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  React.useEffect(() => {
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  if (!shouldRender) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity duration-700 ease-out ${
          isAnimating ? "opacity-100" : "opacity-0"
        }`}
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className={`fixed inset-y-0 right-0 z-50 w-full max-w-md bg-white shadow-2xl transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] dark:bg-zinc-900 sm:max-w-lg ${
          isAnimating ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col">
          {/* Header */}
          <div
            className={`flex items-center justify-between border-b border-zinc-200 p-6 transition-all delay-200 duration-700 dark:border-zinc-800 ${
              isAnimating
                ? "translate-y-0 opacity-100"
                : "-translate-y-4 opacity-0"
            }`}
          >
            <h2 className="text-base font-bold text-zinc-900 dark:text-zinc-50">
              Let&apos;s work together
            </h2>
            <button
              onClick={onClose}
              className="rounded-md p-2 text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-600 dark:hover:bg-zinc-800 dark:hover:text-zinc-300"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Form */}
          <div
            className={`flex-1 overflow-y-auto p-6 transition-all delay-300 duration-700 ${
              isAnimating
                ? "translate-y-0 opacity-100"
                : "translate-y-4 opacity-0"
            }`}
          >
            <form className="space-y-5">
              {/* To Field */}
              <div>
                <label
                  htmlFor="to"
                  className="mb-1.5 block text-[10px] font-medium text-zinc-700 dark:text-zinc-300"
                >
                  To:
                </label>
                <input
                  type="text"
                  id="to"
                  value="Francisco Lourenço - Product, Growth, AI, Software & Web3"
                  disabled
                  className="w-full rounded-md border border-zinc-200 bg-zinc-50 px-2.5 py-1.5 text-[11px] text-zinc-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-400"
                />
              </div>

              {/* From Field */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-1.5 block text-[10px] font-medium text-zinc-700 dark:text-zinc-300"
                >
                  From:
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="Enter Your Email Address"
                  required
                  className="w-full rounded-md border border-zinc-300 bg-white px-2.5 py-1.5 text-[11px] text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-400 focus:outline-none focus:ring-1 focus:ring-zinc-400 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-50 dark:placeholder:text-zinc-500 dark:focus:border-zinc-600 dark:focus:ring-zinc-600"
                />
              </div>

              {/* Message Field */}
              <div>
                <label
                  htmlFor="message"
                  className="mb-1.5 block text-[10px] font-medium text-zinc-700 dark:text-zinc-300"
                >
                  Message:
                </label>
                <textarea
                  id="message"
                  rows={8}
                  placeholder="Tell me about your project..."
                  required
                  className="w-full resize-none rounded-md border border-zinc-300 bg-white px-2.5 py-1.5 text-[11px] text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-400 focus:outline-none focus:ring-1 focus:ring-zinc-400 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-50 dark:placeholder:text-zinc-500 dark:focus:border-zinc-600 dark:focus:ring-zinc-600"
                />
              </div>

              {/* Submit Button */}
              <div className="flex gap-2 pt-2">
                <button
                  type="submit"
                  className="flex h-7 flex-1 items-center justify-center rounded-md border border-zinc-300 bg-zinc-100 px-3 text-[10px] font-medium transition-colors hover:bg-zinc-200 dark:border-zinc-700/50 dark:bg-zinc-800/50 dark:hover:bg-zinc-700/50"
                >
                  Send Email
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="flex h-7 items-center justify-center rounded-md border border-zinc-300 bg-zinc-100 px-3 text-[10px] font-medium transition-colors hover:bg-zinc-200 dark:border-zinc-700/50 dark:bg-zinc-800/50 dark:hover:bg-zinc-700/50"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
