"use client";

import * as React from "react";
import { X, ChevronDown, Check } from "lucide-react";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface CustomDropdownProps {
  id: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  placeholder: string;
  required?: boolean;
}

function CustomDropdown({
  id,
  name,
  value,
  onChange,
  options,
  placeholder,
  required = false,
}: CustomDropdownProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [focusedIndex, setFocusedIndex] = React.useState(-1);
  const dropdownRef = React.useRef<HTMLDivElement>(null);
  const buttonRef = React.useRef<HTMLButtonElement>(null);

  const selectedLabel = options.find((opt) => opt.value === value)?.label || placeholder;

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setFocusedIndex(-1);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isOpen]);

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setIsOpen(!isOpen);
    } else if (e.key === "Escape") {
      setIsOpen(false);
      setFocusedIndex(-1);
      buttonRef.current?.focus();
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (!isOpen) {
        setIsOpen(true);
      } else {
        setFocusedIndex((prev) =>
          prev < options.length - 1 ? prev + 1 : prev
        );
      }
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (isOpen) {
        setFocusedIndex((prev) => (prev > 0 ? prev - 1 : 0));
      }
    }
  };

  const handleOptionKeyDown = (
    e: React.KeyboardEvent<HTMLButtonElement>,
    optionValue: string,
    index: number
  ) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onChange(optionValue);
      setIsOpen(false);
      setFocusedIndex(-1);
      buttonRef.current?.focus();
    }
  };

  const handleOptionClick = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
    setFocusedIndex(-1);
    buttonRef.current?.focus();
  };

  // Scroll focused option into view
  React.useEffect(() => {
    if (focusedIndex >= 0 && isOpen) {
      const optionElement = dropdownRef.current?.querySelector(
        `[data-option-index="${focusedIndex}"]`
      ) as HTMLElement;
      optionElement?.scrollIntoView({ block: "nearest" });
    }
  }, [focusedIndex, isOpen]);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        ref={buttonRef}
        type="button"
        id={id}
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={handleKeyDown}
        className="w-full cursor-pointer rounded-md border border-zinc-300 bg-zinc-100 px-3 py-2 pr-8 text-left text-sm transition-colors hover:bg-zinc-200 focus:border-zinc-400 focus:outline-none focus:ring-1 focus:ring-zinc-400 dark:border-zinc-700/50 dark:bg-zinc-800/50 dark:hover:bg-zinc-700/50 dark:focus:border-zinc-600 dark:focus:ring-zinc-600"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-required={required}
      >
        <span
          className={`block truncate ${
            value === ""
              ? "text-zinc-400 dark:text-zinc-500"
              : "text-zinc-900 dark:text-zinc-50"
          }`}
        >
          {selectedLabel}
        </span>
      </button>
      <ChevronDown
        className={`pointer-events-none absolute right-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500 transition-transform dark:text-zinc-400 ${
          isOpen ? "rotate-180" : ""
        }`}
      />
      {isOpen && (
        <div className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md border border-zinc-300 bg-white shadow-lg focus:outline-none dark:border-zinc-700 dark:bg-zinc-800">
          <ul
            role="listbox"
            className="py-1 text-xs"
            aria-label={name}
          >
            {options.map((option, index) => (
              <li key={option.value} role="option" aria-selected={value === option.value}>
                <button
                  type="button"
                  data-option-index={index}
                  onClick={() => handleOptionClick(option.value)}
                  onKeyDown={(e) => handleOptionKeyDown(e, option.value, index)}
                  onMouseEnter={() => setFocusedIndex(index)}
                  className={`w-full cursor-pointer px-3 py-2 text-left text-xs text-zinc-900 transition-colors hover:bg-zinc-100 focus:bg-zinc-100 focus:outline-none dark:text-zinc-50 dark:hover:bg-zinc-700 dark:focus:bg-zinc-700 ${
                    value === option.value
                      ? "bg-zinc-100 dark:bg-zinc-700"
                      : ""
                  } ${
                    focusedIndex === index
                      ? "bg-zinc-100 dark:bg-zinc-700"
                      : ""
                  }`}
                >
                  {option.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
      {/* Hidden input for form submission */}
      <input type="hidden" name={name} value={value} required={required} />
    </div>
  );
}

interface MultiselectDropdownProps {
  id: string;
  name: string;
  value: string[];
  onChange: (value: string[]) => void;
  options: { value: string; label: string }[];
  placeholder: string;
  required?: boolean;
}

function MultiselectDropdown({
  id,
  name,
  value,
  onChange,
  options,
  placeholder,
  required = false,
}: MultiselectDropdownProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [focusedIndex, setFocusedIndex] = React.useState(-1);
  const dropdownRef = React.useRef<HTMLDivElement>(null);
  const buttonRef = React.useRef<HTMLButtonElement>(null);

  const selectedCount = value.length;
  const displayText =
    selectedCount === 0
      ? placeholder
      : selectedCount === 1
      ? options.find((opt) => value.includes(opt.value))?.label || `${selectedCount} selected`
      : `${selectedCount} selected`;

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setFocusedIndex(-1);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isOpen]);

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setIsOpen(!isOpen);
    } else if (e.key === "Escape") {
      setIsOpen(false);
      setFocusedIndex(-1);
      buttonRef.current?.focus();
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (!isOpen) {
        setIsOpen(true);
      } else {
        setFocusedIndex((prev) =>
          prev < options.length - 1 ? prev + 1 : prev
        );
      }
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (isOpen) {
        setFocusedIndex((prev) => (prev > 0 ? prev - 1 : 0));
      }
    }
  };

  const handleOptionKeyDown = (
    e: React.KeyboardEvent<HTMLButtonElement>,
    optionValue: string,
    index: number
  ) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggleOption(optionValue);
    }
  };

  const toggleOption = (optionValue: string) => {
    const isSelected = value.includes(optionValue);
    if (isSelected) {
      onChange(value.filter((v) => v !== optionValue));
    } else {
      onChange([...value, optionValue]);
    }
    setFocusedIndex(-1);
  };

  const handleOptionClick = (optionValue: string) => {
    toggleOption(optionValue);
  };

  // Scroll focused option into view
  React.useEffect(() => {
    if (focusedIndex >= 0 && isOpen) {
      const optionElement = dropdownRef.current?.querySelector(
        `[data-option-index="${focusedIndex}"]`
      ) as HTMLElement;
      optionElement?.scrollIntoView({ block: "nearest" });
    }
  }, [focusedIndex, isOpen]);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        ref={buttonRef}
        type="button"
        id={id}
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={handleKeyDown}
        className="w-full cursor-pointer rounded-md border border-zinc-300 bg-zinc-100 px-3 py-2 pr-8 text-left text-sm transition-colors hover:bg-zinc-200 focus:border-zinc-400 focus:outline-none focus:ring-1 focus:ring-zinc-400 dark:border-zinc-700/50 dark:bg-zinc-800/50 dark:hover:bg-zinc-700/50 dark:focus:border-zinc-600 dark:focus:ring-zinc-600"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-required={required}
        aria-multiselectable="true"
      >
        <span
          className={`block truncate ${
            selectedCount === 0
              ? "text-zinc-400 dark:text-zinc-500"
              : "text-zinc-900 dark:text-zinc-50"
          }`}
        >
          {displayText}
        </span>
      </button>
      <ChevronDown
        className={`pointer-events-none absolute right-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500 transition-transform dark:text-zinc-400 ${
          isOpen ? "rotate-180" : ""
        }`}
      />
      {isOpen && (
        <div className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md border border-zinc-300 bg-white shadow-lg focus:outline-none dark:border-zinc-700 dark:bg-zinc-800">
          <ul
            role="listbox"
            className="py-1 text-xs"
            aria-label={name}
            aria-multiselectable="true"
          >
            {options.map((option, index) => {
              const isSelected = value.includes(option.value);
              return (
                <li
                  key={option.value}
                  role="option"
                  aria-selected={isSelected}
                >
                  <button
                    type="button"
                    data-option-index={index}
                    onClick={() => handleOptionClick(option.value)}
                    onKeyDown={(e) => handleOptionKeyDown(e, option.value, index)}
                    onMouseEnter={() => setFocusedIndex(index)}
                    className={`flex w-full cursor-pointer items-center gap-2 px-3 py-2 text-left text-xs text-zinc-900 transition-colors hover:bg-zinc-100 focus:bg-zinc-100 focus:outline-none dark:text-zinc-50 dark:hover:bg-zinc-700 dark:focus:bg-zinc-700 ${
                      isSelected
                        ? "bg-zinc-100 dark:bg-zinc-700"
                        : ""
                    } ${
                      focusedIndex === index
                        ? "bg-zinc-100 dark:bg-zinc-700"
                        : ""
                    }`}
                  >
                    <div
                      className={`flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded border ${
                        isSelected
                          ? "border-zinc-900 bg-zinc-900 dark:border-zinc-50 dark:bg-zinc-50"
                          : "border-zinc-300 dark:border-zinc-600"
                      }`}
                    >
                      {isSelected && (
                        <Check className="h-2.5 w-2.5 text-white dark:text-zinc-900" />
                      )}
                    </div>
                    <span className="flex-1 truncate">{option.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}
      {/* Hidden inputs for form submission */}
      {value.map((val, index) => (
        <input
          key={`${name}-${index}`}
          type="hidden"
          name={`${name}[]`}
          value={val}
        />
      ))}
      {required && value.length === 0 && (
        <input type="hidden" name={name} value="" required />
      )}
    </div>
  );
}

export function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [isAnimating, setIsAnimating] = React.useState(false);
  const [shouldRender, setShouldRender] = React.useState(false);
  const [formData, setFormData] = React.useState({
    inquiryType: [] as string[],
    name: "",
    email: "",
    message: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleMultiselectChange = (name: string, value: string[]) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here (e.g., send email, API call, etc.)
    console.log("Form submitted:", formData);
    // You can add your email sending logic here
    onClose();
  };

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
        // Reset form data when modal closes
        setFormData({
          inquiryType: [],
          name: "",
          email: "",
          message: "",
        });
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
            <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-50 underline decoration-green-400 decoration-2">
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
            <form className="space-y-5" onSubmit={handleSubmit}>
              {/* To Field */}
              <div>
                <label
                  htmlFor="to"
                  className="mb-1.5 block text-xs font-medium text-zinc-700 dark:text-zinc-300"
                >
                  To:
                </label>
                <input
                  type="text"
                  id="to"
                  value="Francisco Lourenço - Product, Growth, AI, Software & Web3"
                  disabled
                  className="w-full rounded-md border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm text-zinc-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-400"
                />
              </div>

              {/* Inquiry Type Field */}
              <div>
                <label
                  htmlFor="inquiryType"
                  className="mb-1.5 block text-xs font-medium text-zinc-700 dark:text-zinc-300"
                >
                  Inquiry Type: <span className="text-red-500">*</span>
                </label>
                <MultiselectDropdown
                  id="inquiryType"
                  name="inquiryType"
                  value={formData.inquiryType}
                  onChange={(value) => handleMultiselectChange("inquiryType", value)}
                  placeholder="Select an option..."
                  required
                  options={[
                    { value: "marketing-growth", label: "Marketing & Growth Strategy" },
                    { value: "ido-token", label: "IDO/Token Launch Consultation" },
                    { value: "community", label: "Community Building & Engagement" },
                    { value: "partnership", label: "Partnership Opportunities" },
                    { value: "advisory", label: "Advisory Role" },
                    { value: "speaking", label: "Speaking/Content Collaboration" },
                    { value: "hiring", label: "Career Opportunity (I'm hiring)" },
                    { value: "job-seeking", label: "Job Opportunity (I'm looking for work)" },
                    { value: "general", label: "General Inquiry" },
                  ]}
                />
              </div>

              {/* Name Field */}
              <div>
                <label
                  htmlFor="name"
                  className="mb-1.5 block text-xs font-medium text-zinc-700 dark:text-zinc-300"
                >
                  Name: <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter Your Name"
                  required
                  className="w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-400 focus:outline-none focus:ring-1 focus:ring-zinc-400 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-50 dark:placeholder:text-zinc-500 dark:focus:border-zinc-600 dark:focus:ring-zinc-600"
                />
              </div>

              {/* Email Field */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-1.5 block text-xs font-medium text-zinc-700 dark:text-zinc-300"
                >
                  Email: <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter Your Email Address"
                  required
                  className="w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-400 focus:outline-none focus:ring-1 focus:ring-zinc-400 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-50 dark:placeholder:text-zinc-500 dark:focus:border-zinc-600 dark:focus:ring-zinc-600"
                />
              </div>

              {/* Message Field */}
              <div>
                <label
                  htmlFor="message"
                  className="mb-1.5 block text-xs font-medium text-zinc-700 dark:text-zinc-300"
                >
                  Message: <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={8}
                  placeholder="Tell me more about your inquiry..."
                  required
                  className="w-full resize-none rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-400 focus:outline-none focus:ring-1 focus:ring-zinc-400 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-50 dark:placeholder:text-zinc-500 dark:focus:border-zinc-600 dark:focus:ring-zinc-600"
                />
              </div>

              {/* Submit Button */}
              <div className="flex gap-2 pt-2">
                <button
                  type="submit"
                  className="flex h-9 flex-1 items-center justify-center rounded-md border border-zinc-300 bg-zinc-100 px-4 text-xs font-medium transition-colors hover:bg-zinc-200 dark:border-zinc-700/50 dark:bg-zinc-800/50 dark:hover:bg-zinc-700/50"
                >
                  Send Email
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="flex h-9 items-center justify-center rounded-md border border-zinc-300 bg-zinc-100 px-4 text-xs font-medium transition-colors hover:bg-zinc-200 dark:border-zinc-700/50 dark:bg-zinc-800/50 dark:hover:bg-zinc-700/50"
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
